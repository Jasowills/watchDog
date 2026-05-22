import type { DeploymentStatus } from '@/lib/api'

type DeploymentStatusMeta = {
  label: string
  dotClass: string
}

const META: Record<DeploymentStatus, DeploymentStatusMeta> = {
  SUCCEEDED: { label: 'Succeeded', dotClass: 'bg-[oklch(0.72_0.17_152)]' },
  IN_PROGRESS: { label: 'In progress', dotClass: 'bg-[var(--text-muted)]' },
  ROLLED_BACK: { label: 'Rolled back', dotClass: 'bg-[oklch(0.78_0.16_75)]' },
  FAILED: { label: 'Failed', dotClass: 'bg-[oklch(0.62_0.22_22)]' },
}

export function deploymentStatusMeta(
  status: DeploymentStatus | string,
): DeploymentStatusMeta {
  return META[status as DeploymentStatus] ?? META.SUCCEEDED
}
