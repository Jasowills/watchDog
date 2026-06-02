import { useState } from 'react'
import { AlertTriangle, Cable, ExternalLink, Monitor, Package, Terminal } from 'lucide-react'
import { useServices, useMonitors, useErrorGroups, useDeployments, useEnvironments } from '@/lib/api'
import { useSelectedProject } from '@/hooks/use-selected-project'

type ConnectionStatus = 'active' | 'degraded' | 'inactive'

function StatusDot({ status }: { status: ConnectionStatus }) {
  const colors: Record<ConnectionStatus, string> = {
    active: 'bg-[var(--dot-healthy)]',
    degraded: 'bg-[var(--dot-degraded)]',
    inactive: 'bg-[var(--dot-down)]',
  }
  return <span className={`block h-2 w-2 rounded-full ${colors[status]}`} />
}

function ConnectionCard({
  name,
  status,
  children,
}: {
  name: string
  status: ConnectionStatus
  children: React.ReactNode
}) {
  return (
    <div className="border border-[var(--border-soft)]">
      <div className="flex items-center gap-3 border-b border-[var(--border-soft)] px-5 py-4">
        <StatusDot status={status} />
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--text-main)]">{name}</p>
        </div>
      </div>
      <div className="divide-y divide-[var(--border-soft)]">{children}</div>
    </div>
  )
}

function ConnectionRow({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof Terminal
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-[var(--text-muted)]" />
        <span className="text-xs text-[var(--text-muted)]">{label}</span>
      </div>
      <span className="text-xs font-medium text-[var(--text-main)]">{value}</span>
    </div>
  )
}

export function ConnectionsPage() {
  const { projectSlug } = useSelectedProject()
  const { data: services, isLoading: servicesLoading } = useServices(projectSlug)
  const { data: monitors } = useMonitors(projectSlug)
  const { data: errorGroups } = useErrorGroups(projectSlug)
  const { data: deployments } = useDeployments()
  const { data: environments } = useEnvironments(projectSlug)

  const [search, setSearch] = useState('')

  if (servicesLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-sm text-[var(--text-muted)]">Loading connections…</p>
      </div>
    )
  }

  if (!services || services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Cable className="mb-4 h-10 w-10 text-[var(--text-muted)]" />
        <p className="text-lg font-semibold text-[var(--text-main)]">No connections</p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Install the Watchdog SDK in your services to see them here.
        </p>
      </div>
    )
  }

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  )

  const monitorCountForService = (id: string) =>
    monitors?.filter((m) => m.serviceName === services.find((s) => s.id === id)?.name).length ?? 0

  const errorCountForService = (id: string) =>
    errorGroups?.filter((g) => g.serviceId === id).length ?? 0

  const deployCountForService = (id: string) =>
    deployments?.filter((d) => d.serviceName === services.find((s) => s.id === id)?.name).length ?? 0

  const envNames =
    environments?.map((e) => e.name).join(', ') ?? '—'

  return (
    <div className="max-w-2xl space-y-6">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services…"
          className="w-full border border-[var(--border-soft)] bg-[var(--surface-panel)] px-3 py-2 pl-9 text-sm text-[var(--text-main)] outline-none placeholder:text-[var(--text-soft)] focus:border-[var(--border-strong)]"
        />
        <Terminal className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-[var(--text-muted)]">
          No services match &ldquo;{search}&rdquo;.
        </p>
      )}

      <div className="space-y-4">
        {filtered.map((service) => {
          const monitorCount = monitorCountForService(service.id)
          const errorCount = errorCountForService(service.id)
          const deployCount = deployCountForService(service.id)

          let status: ConnectionStatus = 'inactive'
          if (monitorCount > 0 || errorCount > 0 || deployCount > 0) {
            status = 'active'
          }
          if (monitorCount === 0 && errorCount === 0 && deployCount > 0) {
            status = 'degraded'
          }

          return (
            <ConnectionCard key={service.id} name={service.name} status={status}>
              <ConnectionRow
                label="Environments"
                value={envNames}
                icon={Terminal}
              />
              <ConnectionRow
                label="Monitors"
                value={String(monitorCount)}
                icon={Monitor}
              />
              <ConnectionRow
                label="Error groups"
                value={String(errorCount)}
                icon={AlertTriangle}
              />
              <ConnectionRow
                label="Deployments"
                value={String(deployCount)}
                icon={Package}
              />
              {service.description && (
                <ConnectionRow
                  label="Description"
                  value={service.description}
                  icon={ExternalLink}
                />
              )}
            </ConnectionCard>
          )
        })}
      </div>
    </div>
  )
}
