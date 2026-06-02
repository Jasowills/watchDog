import { Plus, Radar } from 'lucide-react'
import { useState } from 'react'
import { useMonitors } from '@/lib/api'
import {
  formatInterval,
  formatLatency,
  monitorStateMeta,
} from '@/lib/monitor-state'
import { PageNotice } from '@/components/page-notice'
import { CreateMonitorModal } from '@/features/create/create-monitor-modal'

export function MonitorsPage() {
  const { data: monitors, isLoading, isError, refetch } = useMonitors()
  const [showCreateMonitor, setShowCreateMonitor] = useState(false)

  if (isLoading) {
    return <PageNotice variant="loading" message="Loading monitors…" />
  }

  if (isError || !monitors) {
    return (
      <PageNotice
        variant="error"
        message="Could not reach the API."
        onRetry={() => void refetch()}
      />
    )
  }

  if (monitors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Radar className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">No monitors yet</p>
        <p className="mt-1 max-w-sm text-center text-sm text-[var(--text-muted)]">
          Create an HTTP check to start measuring uptime and latency for your services.
        </p>
        <button
          onClick={() => setShowCreateMonitor(true)}
          className="mt-5 flex items-center gap-1 border border-[var(--border-soft)] px-4 py-2 text-sm font-medium text-[var(--text-main)] hover:bg-[var(--surface-panel-soft)]"
        >
          <Plus className="h-4 w-4" />
          Create monitor
        </button>
        <CreateMonitorModal open={showCreateMonitor} onClose={() => setShowCreateMonitor(false)} />
      </div>
    )
  }

  return (
    <>
      <div className="border border-[var(--border-soft)]">
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-4">
          <p className="text-sm font-semibold text-[var(--text-main)]">All monitors</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted)]">{monitors.length} active</span>
            <button
              onClick={() => setShowCreateMonitor(true)}
              className="flex items-center gap-1 border border-[var(--border-soft)] px-3 py-1.5 text-xs font-medium text-[var(--text-main)] hover:bg-[var(--surface-panel-soft)]"
            >
              <Plus className="h-3 w-3" />
              Create
            </button>
          </div>
        </div>

        <div className="divide-y divide-[var(--border-soft)]">
          {monitors.map((monitor) => {
            const state = monitorStateMeta(monitor.latestState)
            return (
              <div
                key={monitor.id}
                className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text-main)]">{monitor.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {monitor.serviceName} · {monitor.method} {monitor.targetUrl}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span>{monitor.environmentName}</span>
                  <span>Every {formatInterval(monitor.intervalSeconds)}</span>
                  <span>{formatLatency(monitor.latestLatencyMs)}</span>
                  <span className="flex items-center gap-1.5">
                    <span className={`inline-block h-2 w-2 ${state.dotClass}`} />
                    {state.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <CreateMonitorModal open={showCreateMonitor} onClose={() => setShowCreateMonitor(false)} />
    </>
  )
}
