import { Sonar } from '@sonar/sdk'

const ENDPOINT = process.env.SONAR_ENDPOINT ?? 'http://localhost:8080'
const PROJECT_KEY = process.env.SONAR_PROJECT_KEY
const ENVIRONMENT_KEY = process.env.SONAR_ENVIRONMENT_KEY
const API_KEY = process.env.SONAR_API_KEY

export type SdkStatus = { ok: boolean; message: string }

export const sonar = PROJECT_KEY && ENVIRONMENT_KEY
  ? (() => {
      const s = new Sonar({
        projectKey: PROJECT_KEY,
        environment: ENVIRONMENT_KEY,
        endpoint: ENDPOINT,
        release: `my-awesome-api@${Date.now()}`,
      })
      if (API_KEY) s.setToken(API_KEY)
      return s
    })()
  : null

export async function checkSdkStatus(): Promise<SdkStatus> {
  if (!PROJECT_KEY || !ENVIRONMENT_KEY) {
    return { ok: false, message: 'SONAR_PROJECT_KEY and SONAR_ENVIRONMENT_KEY must be set' }
  }
  if (!API_KEY) {
    return { ok: false, message: 'SONAR_API_KEY is not set' }
  }
  if (API_KEY === 'wdp_xxxxxxxx_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy') {
    return { ok: false, message: 'SONAR_API_KEY is still the placeholder — create a real key in Sonar Settings → API Keys' }
  }
  // Test the API key against the server
  try {
    // First try a lightweight key check
    const verifyRes = await fetch(`${ENDPOINT}/auth/verify-key`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    const verify = await verifyRes.json()
    if (!verify.valid) {
      return { ok: false, message: `Key rejected: ${verify.reason} (prefix: ${API_KEY.slice(0, 12)}...)` }
    }

    const res = await fetch(`${ENDPOINT}/ingest/errors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        fingerprint: 'testing-hub:healthcheck',
        message: 'SDK connectivity test',
        projectKey: PROJECT_KEY,
        environmentKey: ENVIRONMENT_KEY,
      }),
    })
    if (res.ok) {
      return { ok: true, message: `project=${PROJECT_KEY} env=${ENVIRONMENT_KEY} endpoint=${ENDPOINT}` }
    }
    if (res.status === 401) {
      const body = await res.json().catch(() => null)
      return { ok: false, message: body?.message ?? 'API key rejected by server (401)' }
    }
    return { ok: false, message: `Server returned ${res.status}` }
  } catch (err) {
    return { ok: false, message: `Cannot reach Sonar server at ${ENDPOINT}` }
  }
}
