import type { DeploymentStatus } from '@/lib/api'

type DeploymentStatusMeta = {
  label: string
  dotClass: string
}

const META: Record<DeploymentStatus, DeploymentStatusMeta> = {
  SUCCEEDED: { label: 'Succeeded', dotClass: 'bg-[var(--dot-healthy)]' },
  IN_PROGRESS: { label: 'In progress', dotClass: 'bg-[var(--dot-degraded)]' },
  ROLLED_BACK: { label: 'Rolled back', dotClass: 'bg-[var(--dot-degraded)]' },
  FAILED: { label: 'Failed', dotClass: 'bg-[var(--dot-down)]' },
}

export function deploymentStatusMeta(
  status: DeploymentStatus | string,
): DeploymentStatusMeta {
  return META[status as DeploymentStatus] ?? META.SUCCEEDED
}
