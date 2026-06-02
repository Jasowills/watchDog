import { AlertTriangle, LifeBuoy } from 'lucide-react'
import { useStatusPages } from '@/lib/api'

export function StatusPagesPage() {
  const { data: statusPages, isLoading, error } = useStatusPages()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-sm text-[var(--text-muted)]">Loading status pages…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertTriangle className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">Failed to load status pages</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {error instanceof Error ? error.message : 'An unexpected error occurred.'}
        </p>
      </div>
    )
  }

  if (!statusPages || statusPages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <LifeBuoy className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">No status pages</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Create a public status page to communicate with your users.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className="divide-y divide-[var(--border-soft)] border border-[var(--border-soft)]">
        {statusPages.map((page) => (
          <div
            key={page.id}
            className="flex items-start justify-between gap-4 px-5 py-4"
          >
            <div>
              <p className="text-sm font-medium text-[var(--text-main)]">{page.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{page.slug}</p>
            </div>
            <span className="border border-[var(--border-soft)] bg-[var(--surface-panel-soft)] px-2 py-1 text-xs text-[var(--text-muted)]">
              {page.visibility}
            </span>
          </div>
        ))}
      </div>

      <section className="border border-[var(--border-soft)] p-5">
        <p className="text-sm font-semibold text-[var(--text-main)]">About status pages</p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
          Public status pages show real-time service state for your users. Each page
          maps to a dedicated subdomain and can display the health of selected services.
        </p>
      </section>
    </div>
  )
}
