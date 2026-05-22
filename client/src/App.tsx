import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppShell } from '@/components/app-shell'
import { Button } from '@/components/ui/button'
import { AlertsPage } from '@/pages/alerts-page'
import { IncidentsPage } from '@/pages/incidents-page'
import { MonitorsPage } from '@/pages/monitors-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { OverviewPage } from '@/pages/overview-page'
import { SettingsPage } from '@/pages/settings-page'
import { StatusPagesPage } from '@/pages/status-pages-page'
import { TracesPage } from '@/pages/traces-page'
import { useTheme } from '@/hooks/use-theme'

const pageMeta = {
  '/': {
    title: 'Operational overview',
    eyebrow: 'Workspace pulse',
    description:
      'A sharper control surface for uptime, incidents, and traces across the workspace, designed to keep teams oriented before pressure turns into noise.',
  },
  '/monitors': {
    title: 'Monitors',
    eyebrow: 'Coverage and cadence',
    description:
      'Checks are organised by service and environment so the team can see exactly what is being measured and how quickly issues are detected.',
  },
  '/traces': {
    title: 'Traces',
    eyebrow: 'Error ingestion',
    description:
      'This is where the SDK-backed tracing workflow will live: grouped exceptions, release context, and the bridge between noisy failures and useful investigation.',
  },
  '/incidents': {
    title: 'Incidents',
    eyebrow: 'Response timeline',
    description:
      'Incidents should be easy to scan, easy to own, and easy to communicate. The timeline is the emotional center of the product.',
  },
  '/alerts': {
    title: 'Alert routing',
    eyebrow: 'Delivery rules',
    description:
      'Alerting should feel intentional. The product needs enough routing control to be trustworthy without collapsing into an enterprise maze.',
  },
  '/status-pages': {
    title: 'Status pages',
    eyebrow: 'External communication',
    description:
      'Public service communication should inherit the same calm, clear language as the rest of the product, not read like a separate tool.',
  },
  '/settings': {
    title: 'Settings',
    eyebrow: 'Workspace configuration',
    description:
      'Workspaces, environments, and integrations need a cleaner structure now so scaling the rest of the product later stays predictable.',
  },
} as const

function App() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const currentMeta = pageMeta[location.pathname as keyof typeof pageMeta] ?? {
    title: 'Watchdog',
    eyebrow: 'Workspace',
    description: 'The route is outside the current product shell.',
  }

  return (
    <AppShell
      title={currentMeta.title}
      eyebrow={currentMeta.eyebrow}
      description={currentMeta.description}
      theme={theme}
      onToggleTheme={toggleTheme}
      actions={
        <>
          <span className="rounded-[1rem] border border-[var(--border-soft)] bg-[var(--accent-soft)] px-3 py-2 text-xs font-medium text-[var(--accent-strong)] dark:text-[var(--accent)]">
            System status steady
          </span>
          <Button variant="ghost">Product brief</Button>
        </>
      }
    >
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/monitors" element={<MonitorsPage />} />
        <Route path="/traces" element={<TracesPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/status-pages" element={<StatusPagesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

export default App
