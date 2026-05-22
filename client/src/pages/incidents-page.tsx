import { incidentFeed, incidentRows } from '@/data/mock-data'

export function IncidentsPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      <section className="space-y-3">
        {incidentRows.map((incident) => (
          <article
            key={incident.name}
            className="surface-card p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-panel-soft)]"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--text-main)] dark:text-white">{incident.name}</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {incident.owner} · Opened {incident.startedAt}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="rounded-full bg-[var(--warning-soft)] px-3 py-1 font-medium text-[var(--text-main)] dark:text-white">
                  {incident.severity}
                </span>
                <span className="rounded-full border border-[var(--border-soft)] px-3 py-1 font-medium text-[var(--text-muted)] dark:text-slate-300">
                  {incident.status}
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="surface-inverse p-6">
        <p className="text-sm font-semibold text-white/65">Incident timeline</p>
        <div className="mt-5 space-y-5">
          {incidentFeed.map((entry) => (
            <div key={entry.title} className="relative pl-6">
              <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              <p className="text-sm font-medium text-white">{entry.title}</p>
              <p className="mt-1 text-sm leading-6 text-white/68">{entry.copy}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/35">{entry.timestamp}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}