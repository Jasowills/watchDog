import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AppShell } from '@/components/app-shell'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { AlertsPage } from '@/pages/alerts-page'
import { AuthCallbackPage } from '@/pages/auth-callback-page'
import { ConnectionsPage } from '@/pages/connections-page'
import { DocsPage } from '@/pages/docs-page'
import { IncidentsPage } from '@/pages/incidents-page'
import { LoginPage } from '@/pages/login-page'
import { MonitorsPage } from '@/pages/monitors-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { PrivacyPage } from '@/pages/privacy-page'
import { TermsPage } from '@/pages/terms-page'
import { OverviewPage } from '@/pages/overview-page'
import { SettingsPage } from '@/pages/settings-page'
import { StatusPagesPage } from '@/pages/status-pages-page'
import { TracesPage } from '@/pages/traces-page'
import { useTheme } from '@/hooks/use-theme'

const LandingPage = lazy(() =>
  import('@/pages/landing/landing-page').then((module) => ({
    default: module.LandingPage,
  })),
)

const pageMeta = {
  '/app/overview': {
    title: 'Overview',
    eyebrow: 'Workspace',
    description: 'Uptime, monitors, and recent deploys at a glance.',
  },
  '/app/monitors': {
    title: 'Monitors',
    eyebrow: 'Checks',
    description: 'HTTP checks grouped by service and environment.',
  },
  '/app/traces': {
    title: 'Traces',
    eyebrow: 'Errors',
    description: 'Grouped error events ingested from your services.',
  },
  '/app/incidents': {
    title: 'Incidents',
    eyebrow: 'Response',
    description: 'Active and past incidents with timeline updates.',
  },
  '/app/alerts': {
    title: 'Alerts',
    eyebrow: 'Routing',
    description: 'Delivery rules for Slack, email, and webhooks.',
  },
  '/app/status-pages': {
    title: 'Status pages',
    eyebrow: 'External',
    description: 'Public status pages for your users.',
  },
  '/app/connections': {
    title: 'Connections',
    eyebrow: 'SDK',
    description: 'Services connected via the Watchdog SDK.',
  },
  '/app/settings': {
    title: 'Settings',
    eyebrow: 'Config',
    description: 'Workspace, projects, and integrations.',
  },
} as const

const PUBLIC_ROUTES = ['/', '/login', '/auth/callback', '/privacy', '/terms', '/docs']

function AppContent() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { state } = useAuth()

  if (state.status === 'loading') {
    return <div className="min-h-dvh bg-[var(--surface-page)]" />
  }

  if (location.pathname === '/') {
    if (state.status === 'authenticated') {
      return <Navigate to="/app/overview" replace />
    }
    return (
      <Suspense
        fallback={<div className="min-h-dvh bg-[var(--surface-page)]" />}
      >
        <LandingPage />
      </Suspense>
    )
  }

  if (
    state.status === 'unauthenticated' &&
    !PUBLIC_ROUTES.includes(location.pathname)
  ) {
    return <Navigate to="/login" replace />
  }

  const isPublicMarketingRoute =
    location.pathname === '/login' ||
    location.pathname === '/auth/callback' ||
    location.pathname === '/privacy' ||
    location.pathname === '/terms' ||
    location.pathname === '/docs'

  if (isPublicMarketingRoute) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Routes>
    )
  }

  const currentMeta = pageMeta[location.pathname as keyof typeof pageMeta] ?? {
    title: 'Watchdog',
    eyebrow: 'Workspace',
    description: '',
  }

  return (
    <AppShell
      title={currentMeta.title}
      eyebrow={currentMeta.eyebrow}
      description={currentMeta.description}
      theme={theme}
      onToggleTheme={toggleTheme}
    >
      <Routes>
        <Route path="/app/overview" element={<OverviewPage />} />
        <Route path="/app/monitors" element={<MonitorsPage />} />
        <Route path="/app/traces" element={<TracesPage />} />
        <Route path="/app/incidents" element={<IncidentsPage />} />
        <Route path="/app/alerts" element={<AlertsPage />} />
        <Route path="/app/status-pages" element={<StatusPagesPage />} />
        <Route path="/app/connections" element={<ConnectionsPage />} />
        <Route path="/app/settings" element={<SettingsPage />} />
        <Route path="/app" element={<Navigate replace to="/app/overview" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
