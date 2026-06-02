# @watchdog/sdk

Official Node.js SDK for [Watchdog](https://watchdog.dev) — error capture, deploy tracking, and uptime monitoring.

## Installation

```bash
npm install @watchdog/sdk
```

## Usage

```typescript
import Watchdog from '@watchdog/sdk'

const wd = new Watchdog({
  projectKey: process.env.WATCHDOG_PROJECT_KEY!,
  environment: process.env.WATCHDOG_ENVIRONMENT || 'development',
})

// Capture an error
try {
  await processOrder(data)
} catch (err) {
  wd.captureError(err, {
    fingerprint: 'OrderProcessingError',
    metadata: { orderId: data.id },
  })
}

// Track a deployment
await wd.recordDeployment({
  version: 'v1.2.3',
  status: 'succeeded',
  description: 'Release candidate 3',
  deployedBy: 'deploy-bot',
})

// Auto-capture uncaught exceptions and rejections
wd.setupGlobalHandlers()

// Express error middleware
app.use(wd.middleware())
```

## API

### `new Watchdog(options)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `projectKey` | `string` | required | Your Watchdog project ID |
| `environment` | `string` | required | e.g. `production`, `staging` |
| `release` | `string` | `undefined` | Current release version |
| `captureUser` | `boolean` | `false` | Attach environment context |
| `endpoint` | `string` | `https://api.watchdog.dev` | API base URL |

### `captureError(error, options?)`

Send an error to Watchdog. Errors with the same fingerprint are grouped automatically.

### `recordDeployment(options)`

Record a deployment. Appears on the incident timeline.

### `setupGlobalHandlers()`

Registers `process.on('uncaughtException')` and `process.on('unhandledRejection')` handlers.

### `middleware()`

Returns an Express error-handling middleware function.

## Publishing

```bash
npm run build
npm publish --access public
```
