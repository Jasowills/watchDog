import { Activity, Package, Plus } from 'lucide-react'
import { useState } from 'react'

import { useDeployments, useOverviewSnapshot } from '@/lib/api'
import {
  formatInterval,
  formatLatency,
  monitorStateMeta,
} from '@/lib/monitor-state'
import { deploymentStatusMeta } from '@/lib/deployment-status'
import { timeAgo } from '@/lib/format'
import { PageNotice } from '@/components/page-notice'
import { GettingStarted } from '@/features/getting-started/getting-started'
import { CreateMonitorModal } from '@/features/create/create-monitor-modal'

export function OverviewPage() {
  const { data, isLoading, isError, refetch } = useOverviewSnapshot()
  const { data: deploys } = useDeployments(5)
  const [showCreateMonitor, setShowCreateMonitor] = useState(false)

  if (isLoading) {
    return <PageNotice variant="loading" message="Loading…" />
  }

  if (isError || !data) {
    return (
      <PageNotice
        variant="error"
        message="Could not reach the API."
        onRetry={() => void refetch()}
      />
    )
  }

  const monitors = data.monitors

  if (monitors.length === 0) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.2fr_320px]">
        <GettingStarted hasMonitors={false} hasDeploys={false} />
        <aside>
          <section className="border border-[var(--border-soft)] p-5">
            <p className="text-sm font-semibold text-[var(--text-main)]">Next step</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Create your first monitor to start tracking uptime and latency.
            </p>
          </section>
        </aside>
      </div>
    )
  }

  const [primaryMetric, ...secondaryMetrics] = data.metrics

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-[var(--border-soft)] bg-[var(--surface-panel)] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
            {primaryMetric?.label ?? 'Uptime'}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-[-0.04em]">
            {primaryMetric?.value ?? '—'}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {primaryMetric?.detail ?? ''}
          </p>
        </div>
        {secondaryMetrics.map((item) => (
          <div key={item.label} className="border border-[var(--border-soft)] bg-[var(--surface-panel)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-bold tracking-[-0.04em]">
              {item.value}
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Monitor list */}
      <div className="border border-[var(--border-soft)]">
        <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-4">
          <p className="text-sm font-semibold text-[var(--text-main)]">Monitors</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted)]">{monitors.length} checks</span>
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
                    {monitor.serviceName} · {monitor.environmentName}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span>Every {formatInterval(monitor.intervalSeconds)}</span>
                  <span>{formatLatency(monitor.latestLatencyMs)}</span>
                  <span className={`flex items-center gap-1.5 text-[var(--text-muted)]`}>
                    <span className={`inline-block h-2 w-2 ${state.dotClass}`} />
                    {state.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Deployments sidebar */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div />

        <aside className="space-y-4">
          <section className="border border-[var(--border-soft)]">
            <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-5 py-4">
              <p className="text-sm font-semibold text-[var(--text-main)]">Recent deploys</p>
              <Package className="h-4 w-4 text-[var(--text-muted)]" />
            </div>

            <div className="divide-y divide-[var(--border-soft)]">
              {!deploys ? (
                <p className="px-5 py-4 text-sm text-[var(--text-muted)]">Loading…</p>
              ) : deploys.length === 0 ? (
                <p className="px-5 py-4 text-sm text-[var(--text-muted)]">
                  No deploys yet. POST from CI to <code className="text-[var(--text-main)]">/ingest/deployments</code>.
                </p>
              ) : (
                deploys.map((deploy) => {
                  const status = deploymentStatusMeta(deploy.status)
                  return (
                    <div key={deploy.id} className="px-5 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="truncate font-mono text-sm text-[var(--text-main)]">
                          {deploy.version}
                        </p>
                        <span className="flex shrink-0 items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          <span className={`inline-block h-2 w-2 ${status.dotClass}`} />
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {deploy.environmentName} · {deploy.deployedBy ?? 'Unknown'} · {timeAgo(deploy.deployedAt)}
                      </p>
                    </div>
                  )
                })
              )}
            </div>
          </section>

          <section className="border border-[var(--border-soft)] p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[var(--text-main)]">Traces</p>
              <Activity className="h-4 w-4 text-[var(--text-muted)]" />
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Grouped error events from your services show up in the traces view.
            </p>
          </section>
        </aside>
      </div>

      <CreateMonitorModal open={showCreateMonitor} onClose={() => setShowCreateMonitor(false)} />
    </div>
  )
}
