import { alertChannels } from '@/data/mock-data'

export function AlertsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-3">
        {alertChannels.map((channel) => (
          <article
            key={channel.name}
            className="surface-card p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-panel-soft)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--text-main)] dark:text-white">{channel.name}</p>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{channel.scope}</p>
              </div>
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent-strong)] dark:text-[var(--accent)]">
                {channel.type}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="surface-inverse p-6">
        <p className="text-sm font-semibold text-white/65">Routing principle</p>
        <p className="mt-3 text-sm leading-6 text-white/68">
          Alerts should travel with intent. Production failures escalate fast, staging noise stays visible without becoming another source of fatigue.
        </p>
        <ul className="mt-5 space-y-3 text-sm leading-6 text-white/64">
          <li>Production incidents route to Slack immediately.</li>
          <li>Error bursts can fan out to email digests when they cross defined thresholds.</li>
          <li>Webhooks stay available for teams that need their own orchestration path.</li>
        </ul>
      </section>
    </div>
  )
}