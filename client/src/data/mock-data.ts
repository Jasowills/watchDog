import {
  Activity,
  BellRing,
  Cable,
  LayoutDashboard,
  LifeBuoy,
  Radar,
  Settings,
  Siren,
} from 'lucide-react'

export const navigationItems = [
  { label: 'Overview', path: '/app/overview', icon: LayoutDashboard },
  { label: 'Monitors', path: '/app/monitors', icon: Radar },
  { label: 'Traces', path: '/app/traces', icon: Activity },
  { label: 'Incidents', path: '/app/incidents', icon: Siren },
  { label: 'Alerts', path: '/app/alerts', icon: BellRing },
  { label: 'Status pages', path: '/app/status-pages', icon: LifeBuoy },
  { label: 'Connections', path: '/app/connections', icon: Cable },
  { label: 'Settings', path: '/app/settings', icon: Settings },
] as const