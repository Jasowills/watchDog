import { useMonitors } from '@/lib/api'
import {
  formatInterval,
  formatLatency,
  monitorStateMeta,
} from '@/lib/monitor-state'
import { PageNotice } from '@/components/page-notice'

export function MonitorsPage() {
  const { data: monitors, isLoading, isError, refetch } = useMonitors()

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.45fr_0.95fr]">
        <article className="surface-card p-6">
          <p className="text-sm font-semibold text-[var(--text-main)] dark:text-white">Monitor coverage</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
            Model checks by service and environment from day one so staging noise never blurs production health.
          </p>
        </article>
        <article className="surface-inverse p-6">
          <p className="text-sm font-semibold text-white/68">Active checks</p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.05em]">
            {monitors ? monitors.length : '—'}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/60">Fast enough to be useful, restrained enough to stay affordable.</p>
        </article>
      </section>

      {isLoading ? (
        <PageNotice variant="loading" message="Loading monitors…" />
      ) : isError || !monitors ? (
        <PageNotice
          variant="error"
          message="Could not reach the Watchdog API. Confirm the server is running on port 3001."
          onRetry={() => void refetch()}
        />
      ) : monitors.length === 0 ? (
        <PageNotice
          variant="empty"
          message="No monitors yet. Create an HTTP check against a service endpoint to start measuring uptime."
        />
      ) : (
        <section className="surface-card p-4 md:p-6">
          <div className="mb-4 grid gap-3 border-b border-[var(--border-soft)] px-2 pb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] md:grid-cols-[1.3fr_1fr_1fr_1fr_auto]">
            <span>Service</span>
            <span>Environment</span>
            <span>Interval</span>
            <span>Latency</span>
            <span>Status</span>
          </div>

          <div className="space-y-3">
            {monitors.map((monitor) => {
              const state = monitorStateMeta(monitor.latestState)

              return (
                <div
                  key={monitor.id}
                  className="grid gap-3 rounded-[1rem] border border-[var(--border-soft)] px-4 py-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-panel-soft)] md:grid-cols-[1.3fr_1fr_1fr_1fr_auto] md:items-center"
                >
                  <div>
                    <p className="font-medium text-[var(--text-main)] dark:text-white">{monitor.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{monitor.serviceName} · {monitor.method} {monitor.targetUrl}</p>
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">{monitor.environmentName}</p>
                  <p className="text-sm text-[var(--text-muted)]">Every {formatInterval(monitor.intervalSeconds)}</p>
                  <p className="text-sm font-medium text-[var(--text-main)] dark:text-white">{formatLatency(monitor.latestLatencyMs)}</p>
                  <div className="flex items-center justify-start gap-3 md:justify-end">
                    <span className={`h-2.5 w-2.5 rounded-full ${state.dotClass}`} />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{state.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
