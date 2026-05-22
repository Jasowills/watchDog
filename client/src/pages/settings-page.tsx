import { settingsSections } from '@/data/mock-data'

export function SettingsPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {settingsSections.map((section) => (
        <article
          key={section.title}
          className="surface-card p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-panel-soft)]"
        >
          <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--text-main)] dark:text-white">{section.title}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{section.copy}</p>
        </article>
      ))}
    </div>
  )
}