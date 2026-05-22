import { Activity, ArrowUpRight, Package, Siren } from 'lucide-react'

import { incidentFeed } from '@/data/mock-data'
import { useDeployments, useOverviewSnapshot } from '@/lib/api'
import type { Monitor } from '@/lib/api'
import {
  formatInterval,
  formatLatency,
  monitorStateMeta,
} from '@/lib/monitor-state'
import { deploymentStatusMeta } from '@/lib/deployment-status'
import { timeAgo } from '@/lib/format'
import { PageNotice } from '@/components/page-notice'

function medianLatency(monitors: Monitor[]): string {
  const values = monitors
    .map((monitor) => monitor.latestLatencyMs)
    .filter((value): value is number => value != null)
    .sort((a, b) => a - b)

  if (values.length === 0) {
    return '—'
  }

  const middle = Math.floor(values.length / 2)
  const median =
    values.length % 2 === 0
      ? Math.round((values[middle - 1] + values[middle]) / 2)
      : values[middle]

  return `${median} ms`
}

export function OverviewPage() {
  const { data, isLoading, isError, refetch } = useOverviewSnapshot()
  const { data: deploys } = useDeployments(5)

  if (isLoading) {
    return <PageNotice variant="loading" message="Loading workspace pulse…" />
  }

  if (isError || !data) {
    return (
      <PageNotice
        variant="error"
        message="Could not reach the Watchdog API. Confirm the server is running on port 3001."
        onRetry={() => void refetch()}
      />
    )
  }

  const [primaryMetric, ...secondaryMetrics] = data.metrics
  const monitors = data.monitors

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
      <div className="space-y-6">
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_300px]">
          <article className="rise-in surface-card overflow-hidden p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <span>Production posture</span>
              <span className="rounded-full border border-[var(--border-soft)] bg-[var(--accent-soft)] px-3 py-1 text-[color:var(--accent-strong)] dark:text-[var(--accent)]">
                {data.productionMonitorCount} services under watch
              </span>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div>
                <h2 className="max-w-2xl font-[var(--font-display)] text-[clamp(2.5rem,4vw,4.6rem)] leading-[0.93] tracking-[-0.055em] text-[var(--text-main)] dark:text-white">
                  {data.projectName} health, in one calm surface.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)] lg:text-lg">
                  Watchdog should help teams orient themselves within seconds: what is healthy, what is drifting, and what needs a clear response before it becomes an outage.
                </p>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-[var(--text-main)] dark:text-white">
                  <div className="rounded-[1rem] border border-[var(--border-soft)] bg-[var(--surface-page)] px-4 py-3">
                    Median fleet latency <span className="ml-2 font-semibold">{medianLatency(monitors)}</span>
                  </div>
                  <div className="rounded-[1rem] border border-[var(--border-soft)] bg-[var(--surface-page)] px-4 py-3">
                    Monitors under watch <span className="ml-2 font-semibold">{monitors.length}</span>
                  </div>
                </div>
              </div>

              <div className="surface-inverse p-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {primaryMetric?.label ?? 'Uptime'}
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                  {primaryMetric?.value ?? '—'}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {primaryMetric?.detail ?? 'Rolling uptime across monitored production surfaces.'}
                </p>
                <div className="mt-8 space-y-4 border-t border-white/10 pt-4">
                  {secondaryMetrics.map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-white/68">{item.label}</p>
                        <p className="mt-1 text-xs leading-5 text-white/45">{item.detail}</p>
                      </div>
                      <p className="text-lg font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="rise-in surface-inverse p-6 shadow-[0_24px_54px_color-mix(in_oklch,var(--surface-inverse)_16%,transparent)]" style={{ animationDelay: '80ms' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white/60">Active incident</p>
                <h3 className="mt-3 text-[1.9rem] font-semibold tracking-[-0.04em] leading-tight">Checkout latency is under review.</h3>
              </div>
              <span className="rounded-full bg-[color:color-mix(in_oklch,var(--warning-soft)_75%,transparent)] px-3 py-1 text-xs font-medium text-white">Sev 2</span>
            </div>

            <div className="mt-8 space-y-4">
              {incidentFeed.map((item) => (
                <div key={item.title} className="flex gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8">
                    <Siren className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-medium text-white">{item.title}</p>
                      <span className="text-xs uppercase tracking-[0.16em] text-white/40">{item.timestamp}</span>
                    </div>
                    <p className="text-sm leading-6 text-white/68">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rise-in surface-card p-5 lg:p-6" style={{ animationDelay: '120ms' }}>
          <div className="mb-5 flex flex-col gap-3 border-b border-[var(--border-soft)] pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)] dark:text-white">Monitor ledger</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                A denser operational view, but still calm enough to scan in seconds.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              {monitors.length} active checks
            </div>
          </div>

          {monitors.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
              No monitors yet. Create your first HTTP check to start measuring uptime.
            </p>
          ) : (
            <>
              <div className="hidden grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr_auto] gap-4 px-4 pb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] md:grid">
                <span>Service</span>
                <span>Environment</span>
                <span>Cadence</span>
                <span>Latency</span>
                <span className="text-right">State</span>
              </div>

              <div className="space-y-3">
                {monitors.map((monitor) => {
                  const state = monitorStateMeta(monitor.latestState)

                  return (
                    <div
                      key={monitor.id}
                      className="grid gap-4 rounded-[1rem] border border-[var(--border-soft)] px-4 py-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-panel-soft)] md:grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr_auto] md:items-center"
                    >
                      <div>
                        <p className="font-medium text-[var(--text-main)] dark:text-white">{monitor.name}</p>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">{monitor.serviceName}</p>
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
            </>
          )}
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rise-in surface-card p-6" style={{ animationDelay: '140ms' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)] dark:text-white">Recent deploys</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Line releases up against the incident timeline to see what changed.
              </p>
            </div>
            <Package className="h-5 w-5 text-[var(--accent-strong)]" />
          </div>

          {!deploys ? (
            <p className="mt-6 text-sm text-[var(--text-muted)]">Loading deploys…</p>
          ) : deploys.length === 0 ? (
            <p className="mt-6 text-sm leading-6 text-[var(--text-muted)]">
              No deploys recorded yet. POST to <span className="font-[var(--font-mono)]">/ingest/deployments</span> from CI to start tracking.
            </p>
          ) : (
            <ul className="mt-6 space-y-4">
              {deploys.map((deploy) => {
                const status = deploymentStatusMeta(deploy.status)

                return (
                  <li
                    key={deploy.id}
                    className="border-t border-[var(--border-soft)] pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate font-[var(--font-mono)] text-sm text-[var(--text-main)] dark:text-white">
                        {deploy.version}
                      </p>
                      <span className="flex shrink-0 items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
                        <span className={`h-2 w-2 rounded-full ${status.dotClass}`} />
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-[var(--text-muted)]">
                      {deploy.environmentName} · {deploy.deployedBy ?? 'Unknown'} · {timeAgo(deploy.deployedAt)}
                    </p>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <section className="rise-in surface-card p-6" style={{ animationDelay: '180ms' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)] dark:text-white">Trace handoff</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                The tracing surface should explain why the incident exists, not merely repeat that it exists.
              </p>
            </div>
            <Activity className="h-5 w-5 text-[var(--accent-strong)]" />
          </div>

          <ul className="mt-6 space-y-4 text-sm leading-6 text-[var(--text-muted)]">
            <li className="border-t border-[var(--border-soft)] pt-4 first:border-t-0 first:pt-0">Capture grouped exceptions by environment and release.</li>
            <li className="border-t border-[var(--border-soft)] pt-4">Link spikes to incidents instead of isolating errors in another product.</li>
            <li className="border-t border-[var(--border-soft)] pt-4">Preserve enough metadata to make the trace surface genuinely useful later.</li>
          </ul>
        </section>

        <section className="rise-in surface-muted p-6" style={{ animationDelay: '220ms' }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[var(--text-main)] dark:text-white">Next response step</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Move from signal to ownership quickly.</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[var(--accent-strong)]" />
          </div>
          <div className="mt-6 rounded-[1rem] border border-[var(--border-soft)] bg-[var(--surface-panel)] p-4">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Suggested action</p>
            <p className="mt-3 text-base font-semibold text-[var(--text-main)] dark:text-white">Review the latest checkout deployment and compare trace volume by environment.</p>
          </div>
        </section>
      </aside>
    </div>
  )
}
