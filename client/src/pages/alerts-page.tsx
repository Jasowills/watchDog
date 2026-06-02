import { AlertTriangle, BellRing } from 'lucide-react'
import { useAlertChannels } from '@/lib/api'

export function AlertsPage() {
  const { data: channels, isLoading, error } = useAlertChannels()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-sm text-[var(--text-muted)]">Loading alert channels…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertTriangle className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">Failed to load alert channels</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {error instanceof Error ? error.message : 'An unexpected error occurred.'}
        </p>
      </div>
    )
  }

  if (!channels || channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <BellRing className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">No alert channels</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Configure Slack, email, or webhook channels to route alerts.
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-[var(--border-soft)] border border-[var(--border-soft)]">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="flex items-start justify-between gap-4 px-5 py-4"
        >
          <div>
            <p className="text-sm font-medium text-[var(--text-main)]">{channel.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{channel.destination}</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                channel.isEnabled ? 'bg-[var(--dot-healthy)]' : 'bg-[var(--dot-down)]'
              }`}
            />
            <span className="border border-[var(--border-soft)] bg-[var(--surface-panel-soft)] px-2 py-1 text-xs text-[var(--text-muted)]">
              {channel.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
