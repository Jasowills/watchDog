import {
  Activity,
  BellRing,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  Radar,
  Settings,
  Siren,
} from 'lucide-react'

export const navigationItems = [
  { label: 'Overview', path: '/', icon: LayoutDashboard },
  { label: 'Monitors', path: '/monitors', icon: Radar },
  { label: 'Traces', path: '/traces', icon: Activity },
  { label: 'Incidents', path: '/incidents', icon: Siren },
  { label: 'Alerts', path: '/alerts', icon: BellRing },
  { label: 'Status pages', path: '/status-pages', icon: LifeBuoy },
  { label: 'Settings', path: '/settings', icon: Settings },
] as const

export const healthSummary = [
  {
    label: 'Uptime',
    value: '99.98%',
    detail: 'Measured across twelve production checks in the last day.',
    icon: Gauge,
  },
  {
    label: 'Notifications',
    value: '14',
    detail: 'Slack, email, and webhook deliveries sent today.',
    icon: BellRing,
  },
  {
    label: 'Live environments',
    value: '3',
    detail: 'Production, staging, and sandbox are modelled separately.',
    icon: Radar,
  },
] as const

export const monitorRows = [
  {
    name: 'public-api',
    environment: 'Production',
    interval: '30 sec',
    latency: '182 ms',
    state: 'Healthy',
  },
  {
    name: 'billing-worker',
    environment: 'Staging',
    interval: '60 sec',
    latency: '410 ms',
    state: 'Reviewing',
  },
  {
    name: 'checkout-web',
    environment: 'Production',
    interval: '30 sec',
    latency: '226 ms',
    state: 'Healthy',
  },
  {
    name: 'status-ingest',
    environment: 'Sandbox',
    interval: '90 sec',
    latency: '301 ms',
    state: 'Healthy',
  },
] as const

export const incidentFeed = [
  {
    title: 'Latency drift detected',
    copy: 'Checkout web exceeded its rolling threshold in eu-west for six minutes.',
    timestamp: '09:14 UTC',
  },
  {
    title: 'Slack alert delivered',
    copy: 'The growth engineering channel received an escalation with trace samples attached.',
    timestamp: '09:16 UTC',
  },
  {
    title: 'Error rate back to baseline',
    copy: 'The release candidate was rolled back and new events settled inside the normal range.',
    timestamp: '09:22 UTC',
  },
] as const

export const traceGroups = [
  {
    fingerprint: 'TypeError: Cannot read properties of undefined',
    service: 'checkout-web',
    environment: 'Production',
    events: 184,
    lastSeen: '3 min ago',
  },
  {
    fingerprint: 'PrismaClientKnownRequestError',
    service: 'billing-worker',
    environment: 'Staging',
    events: 29,
    lastSeen: '14 min ago',
  },
  {
    fingerprint: 'FetchError: socket hang up',
    service: 'public-api',
    environment: 'Production',
    events: 11,
    lastSeen: '41 min ago',
  },
] as const

export const incidentRows = [
  {
    name: 'Checkout latency spike',
    severity: 'Sev 2',
    owner: 'Growth platform',
    status: 'Monitoring',
    startedAt: '09:14 UTC',
  },
  {
    name: 'Webhook delivery drift',
    severity: 'Sev 3',
    owner: 'Core services',
    status: 'Resolved',
    startedAt: 'Yesterday',
  },
] as const

export const alertChannels = [
  {
    name: 'Primary engineering Slack',
    type: 'Slack',
    scope: 'Production incidents',
  },
  {
    name: 'On-call inbox',
    type: 'Email',
    scope: 'Escalations and digests',
  },
  {
    name: 'Ops webhook',
    type: 'Webhook',
    scope: 'Downstream routing',
  },
] as const

export const statusServices = [
  { name: 'API', state: 'Operational' },
  { name: 'Checkout', state: 'Monitoring' },
  { name: 'Worker queue', state: 'Operational' },
] as const

export const settingsSections = [
  {
    title: 'Workspace',
    copy: 'Memberships, roles, and environment access for the Acorn workspace.',
  },
  {
    title: 'Integrations',
    copy: 'Supabase auth, Slack delivery credentials, and outbound webhook secrets.',
  },
  {
    title: 'Projects and environments',
    copy: 'Keep production, staging, and sandbox isolated without hiding them from operators.',
  },
] as const