import { traceGroups } from '@/data/mock-data'

export function TracesPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <article className="surface-card p-6">
          <p className="text-sm font-semibold text-[var(--text-main)] dark:text-white">Error tracing surface</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            The real SDK ingestion path belongs here. Grouped events should feel operational, not like a developer afterthought bolted onto uptime data.
          </p>
        </article>
        <article className="surface-inverse p-6">
          <p className="text-sm font-semibold text-white/65">Top release</p>
          <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">2026.04.12-rc2</p>
          <p className="mt-2 text-sm text-white/60">Latest deployment associated with trace volume changes.</p>
        </article>
      </section>

      <section className="space-y-3">
        {traceGroups.map((group) => (
          <article
            key={group.fingerprint}
            className="surface-card p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-panel-soft)]"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--text-main)] dark:text-white">{group.fingerprint}</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {group.service} · {group.environment}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm lg:text-right">
                <div>
                  <p className="text-[var(--text-muted)]">Events</p>
                  <p className="mt-1 font-medium text-[var(--text-main)] dark:text-slate-100">{group.events}</p>
                </div>
                <div>
                  <p className="text-[var(--text-muted)]">Last seen</p>
                  <p className="mt-1 font-medium text-[var(--text-main)] dark:text-slate-100">{group.lastSeen}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}