import { AlertTriangle, Siren } from 'lucide-react'
import { useIncidents } from '@/lib/api'

export function IncidentsPage() {
  const { data: incidents, isLoading, error } = useIncidents()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-sm text-[var(--text-muted)]">Loading incidents…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertTriangle className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">Failed to load incidents</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {error instanceof Error ? error.message : 'An unexpected error occurred.'}
        </p>
      </div>
    )
  }

  if (!incidents || incidents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Siren className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">No incidents</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Incidents will appear here when monitors trigger alerts.
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-[var(--border-soft)] border border-[var(--border-soft)]">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-[var(--text-main)]">{incident.title}</p>
            <p className="text-xs text-[var(--text-muted)]">
              Opened {new Date(incident.startedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="border border-[var(--border-soft)] px-2 py-1 text-[var(--text-main)]" style={{ backgroundColor: 'var(--surface-danger)' }}>
              {incident.severity}
            </span>
            <span className="border border-[var(--border-soft)] px-2 py-1 text-[var(--text-muted)]">
              {incident.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
