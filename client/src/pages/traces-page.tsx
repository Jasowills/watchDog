import { Activity } from 'lucide-react'
import { useErrorGroups } from '@/lib/api'
import { useSelectedProject } from '@/hooks/use-selected-project'
import { PageNotice } from '@/components/page-notice'

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function TracesPage() {
  const { project } = useSelectedProject()
  const { data: groups, isLoading, isError, refetch } = useErrorGroups(project?.slug)

  if (isLoading) {
    return <PageNotice variant="loading" message="Loading errors…" />
  }

  if (isError) {
    return (
      <PageNotice
        variant="error"
        message="Could not reach the API."
        onRetry={() => void refetch()}
      />
    )
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Activity className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">No errors yet</p>
        <p className="mt-1 max-w-sm text-center text-sm text-[var(--text-muted)]">
          Errors ingested via the API will show up here as grouped traces.
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-[var(--border-soft)] border border-[var(--border-soft)]">
      {groups.map((group) => (
        <div
          key={group.fingerprint}
          className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span
                className={`inline-block h-2 w-2 shrink-0 ${
                  group.status === 'OPEN'
                    ? 'bg-[var(--dot-down)]'
                    : group.status === 'RESOLVED'
                      ? 'bg-[var(--dot-healthy)]'
                      : 'bg-[var(--dot-degraded)]'
                }`}
              />
              <p className="truncate text-sm font-medium text-[var(--text-main)]">
                {group.title}
              </p>
            </div>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {group.serviceName ?? 'unknown'} · {group.environmentName}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span>{group.occurrenceCount} events</span>
            <span>{relativeTime(group.lastSeenAt)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
