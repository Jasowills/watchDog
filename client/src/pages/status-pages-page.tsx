import { statusServices } from '@/data/mock-data'

export function StatusPagesPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="surface-card p-6">
        <p className="text-sm font-semibold text-[var(--text-main)] dark:text-white">Communication model</p>
        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
          Status pages should read like clear operator communication, not like an afterthought generated from internal data.
        </p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--text-muted)]">
          <li>Public summary for external stakeholders.</li>
          <li>Maintenance windows and incident updates on the same timeline.</li>
          <li>Service state badges that map cleanly to internal incident states.</li>
        </ul>
      </section>

      <section className="surface-inverse p-6 shadow-[0_18px_50px_color-mix(in_oklch,var(--surface-inverse)_14%,transparent)]">
        <div className="border-b border-white/10 pb-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/45">Status preview</p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl tracking-[-0.04em] text-white">Acorn platform status</h2>
          <p className="mt-2 text-sm text-white/65">Current system status and recent updates.</p>
        </div>

        <div className="mt-5 space-y-3">
          {statusServices.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between rounded-[1rem] border border-white/10 px-4 py-4"
            >
              <p className="font-medium text-white">{service.name}</p>
              <span className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-white/80">
                {service.state}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}