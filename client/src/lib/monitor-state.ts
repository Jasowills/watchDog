import type { MonitorState } from '@/lib/api'

type MonitorStateMeta = {
  label: string
  dotClass: string
}

// Status stays semantically colored — the one functional exception to the
// monochrome chrome, since operational state must read at a glance.
const META: Record<MonitorState, MonitorStateMeta> = {
  HEALTHY: { label: 'Healthy', dotClass: 'bg-[oklch(0.72_0.17_152)]' },
  DEGRADED: { label: 'Degraded', dotClass: 'bg-[oklch(0.78_0.16_75)]' },
  DOWN: { label: 'Down', dotClass: 'bg-[oklch(0.62_0.22_22)]' },
}

export function monitorStateMeta(state: MonitorState | string): MonitorStateMeta {
  return META[state as MonitorState] ?? META.HEALTHY
}

export function formatInterval(seconds: number): string {
  if (seconds % 60 === 0) {
    return `${seconds / 60} min`
  }
  return `${seconds} sec`
}

export function formatLatency(latencyMs: number | null): string {
  return latencyMs == null ? '—' : `${latencyMs} ms`
}
