import { type Request, type Response, Router } from 'express'
import { sonar } from '../sonar.js'

export const triggerRouter = Router()

function requireSonar(_req: Request, res: Response, next: () => void) {
  if (!sonar) {
    res.status(400).json({ ok: false, message: 'SONAR_PROJECT_KEY and SONAR_ENVIRONMENT_KEY must be set in .env' })
    return
  }
  next()
}

triggerRouter.use(requireSonar)

triggerRouter.post('/error', (_req: Request, res: Response) => {
  try {
    throw new Error('Manual test error from testing-hub')
  } catch (err) {
    sonar!.captureError(err as Error, {
      fingerprint: 'my-awesome-api:manual-error',
      metadata: { source: 'trigger-route', timestamp: Date.now() },
    })
    res.json({ ok: true, captured: true, message: 'Error captured via SDK' })
  }
})

triggerRouter.post('/errors/batch', async (_req: Request, res: Response) => {
  const errors = [
    { message: 'Batch error A', fingerprint: 'my-awesome-api:batch:A' },
    { message: 'Batch error B', fingerprint: 'my-awesome-api:batch:B' },
    { message: 'Batch error C', fingerprint: 'my-awesome-api:batch:C' },
  ]
  for (const e of errors) {
    sonar!.captureError(new Error(e.message), {
      fingerprint: e.fingerprint,
    })
    await new Promise((r) => setTimeout(r, 50))
  }
  res.json({ ok: true, captured: errors.length })
})

triggerRouter.post('/errors/with-stack', (_req: Request, res: Response) => {
  function deeplyNested() {
    function inner() {
      throw new Error('Deep stack trace error')
    }
    inner()
  }
  try {
    deeplyNested()
  } catch (err) {
    sonar!.captureError(err as Error, {
      fingerprint: 'my-awesome-api:deep-stack',
      metadata: { layer: 'deeplyNested' },
    })
    res.json({ ok: true, captured: true })
  }
})

triggerRouter.post('/rejection', async (_req: Request, res: Response) => {
  sonar!.captureError(new Error('Simulated unhandled rejection'), {
    fingerprint: 'UnhandledRejection',
  })
  res.json({ ok: true, captured: true })
})

triggerRouter.post('/deploy', async (_req: Request, res: Response) => {
  await sonar!.recordDeployment({
    version: `${Date.now()}`,
    status: 'SUCCEEDED',
    description: 'Deployed from my-awesome-api',
    deployedBy: 'kate',
  })
  res.json({ ok: true, deployed: true })
})

triggerRouter.post('/deploy/fail', async (_req: Request, res: Response) => {
  await sonar!.recordDeployment({
    version: `${Date.now()}`,
    status: 'FAILED',
    description: 'Rolled back — db migration failed',
    deployedBy: 'kate',
  })
  res.json({ ok: true, deployed: true, status: 'FAILED' })
})
