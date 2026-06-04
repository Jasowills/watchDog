export type SonarOptions = {
  projectKey: string
  environment: string
  release?: string
  endpoint?: string
}

export type CaptureErrorOptions = {
  fingerprint?: string
  metadata?: Record<string, unknown>
  stack?: string
}

export type RecordDeploymentOptions = {
  version: string
  status?: 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'ROLLED_BACK'
  description?: string
  deployedBy?: string
  serviceId?: string
}

export type CaptureErrorPayload = {
  fingerprint: string
  title: string
  serviceId?: string
  stack?: string
  release?: string
  metadata?: Record<string, unknown>
}

export type ErrorPayload = CaptureErrorPayload & {
  projectKey: string
  environmentKey: string
}

export type DeploymentPayload = {
  projectKey: string
  environmentKey: string
  serviceId?: string
  version: string
  status: string
  description?: string
  deployedBy?: string
}

export type AuthResponse = {
  token: string
}

export type IngestResponse = {
  id: string
}
