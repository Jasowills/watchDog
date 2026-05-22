export const fallbackWorkspace = {
  id: 'workspace_acorn',
  name: 'Acorn',
  slug: 'acorn',
  createdAt: new Date('2026-04-12T08:00:00.000Z'),
  updatedAt: new Date('2026-04-12T09:30:00.000Z'),
};

export const fallbackProjects = [
  {
    id: 'project_core-platform',
    name: 'Core platform',
    slug: 'core-platform',
    workspaceId: fallbackWorkspace.id,
    createdAt: new Date('2026-04-12T08:05:00.000Z'),
    updatedAt: new Date('2026-04-12T09:20:00.000Z'),
  },
];

export const fallbackEnvironments = [
  {
    id: 'env_production',
    name: 'Production',
    key: 'production',
    color: '#0f766e',
    projectId: fallbackProjects[0].id,
    createdAt: new Date('2026-04-12T08:10:00.000Z'),
    updatedAt: new Date('2026-04-12T09:10:00.000Z'),
  },
  {
    id: 'env_staging',
    name: 'Staging',
    key: 'staging',
    color: '#475569',
    projectId: fallbackProjects[0].id,
    createdAt: new Date('2026-04-12T08:11:00.000Z'),
    updatedAt: new Date('2026-04-12T09:11:00.000Z'),
  },
  {
    id: 'env_sandbox',
    name: 'Sandbox',
    key: 'sandbox',
    color: '#a16207',
    projectId: fallbackProjects[0].id,
    createdAt: new Date('2026-04-12T08:12:00.000Z'),
    updatedAt: new Date('2026-04-12T09:12:00.000Z'),
  },
];

export const fallbackServices = [
  {
    id: 'service_public-api',
    name: 'Public API',
    slug: 'public-api',
    description: 'Primary customer-facing API surface.',
    projectId: fallbackProjects[0].id,
    createdAt: new Date('2026-04-12T08:13:00.000Z'),
    updatedAt: new Date('2026-04-12T09:13:00.000Z'),
  },
  {
    id: 'service_checkout-web',
    name: 'Checkout web',
    slug: 'checkout-web',
    description: 'The purchasing and subscription flow.',
    projectId: fallbackProjects[0].id,
    createdAt: new Date('2026-04-12T08:14:00.000Z'),
    updatedAt: new Date('2026-04-12T09:14:00.000Z'),
  },
  {
    id: 'service_billing-worker',
    name: 'Billing worker',
    slug: 'billing-worker',
    description: 'Background job execution for billing tasks.',
    projectId: fallbackProjects[0].id,
    createdAt: new Date('2026-04-12T08:15:00.000Z'),
    updatedAt: new Date('2026-04-12T09:15:00.000Z'),
  },
];

export const fallbackMonitors = [
  {
    id: 'monitor_public-api',
    name: 'public-api',
    targetUrl: 'https://api.acorn.app/health',
    method: 'GET',
    expectedStatus: 200,
    intervalSeconds: 30,
    timeoutSeconds: 10,
    isActive: true,
    serviceId: fallbackServices[0].id,
    environmentId: fallbackEnvironments[0].id,
    createdAt: new Date('2026-04-12T08:15:00.000Z'),
    updatedAt: new Date('2026-04-12T09:20:00.000Z'),
    service: fallbackServices[0],
    environment: fallbackEnvironments[0],
    checkResults: [
      {
        state: 'HEALTHY',
        latencyMs: 182,
        checkedAt: new Date('2026-04-12T09:28:00.000Z'),
      },
    ],
  },
  {
    id: 'monitor_checkout-web',
    name: 'checkout-web',
    targetUrl: 'https://app.acorn.app/checkout',
    method: 'GET',
    expectedStatus: 200,
    intervalSeconds: 30,
    timeoutSeconds: 10,
    isActive: true,
    serviceId: fallbackServices[1].id,
    environmentId: fallbackEnvironments[0].id,
    createdAt: new Date('2026-04-12T08:16:00.000Z'),
    updatedAt: new Date('2026-04-12T09:25:00.000Z'),
    service: fallbackServices[1],
    environment: fallbackEnvironments[0],
    checkResults: [
      {
        state: 'DEGRADED',
        latencyMs: 226,
        checkedAt: new Date('2026-04-12T09:29:00.000Z'),
      },
    ],
  },
  {
    id: 'monitor_billing-worker',
    name: 'billing-worker',
    targetUrl: 'https://worker.acorn.app/health',
    method: 'GET',
    expectedStatus: 200,
    intervalSeconds: 60,
    timeoutSeconds: 10,
    isActive: true,
    serviceId: fallbackServices[2].id,
    environmentId: fallbackEnvironments[1].id,
    createdAt: new Date('2026-04-12T08:17:00.000Z'),
    updatedAt: new Date('2026-04-12T09:26:00.000Z'),
    service: fallbackServices[2],
    environment: fallbackEnvironments[1],
    checkResults: [
      {
        state: 'DEGRADED',
        latencyMs: 410,
        checkedAt: new Date('2026-04-12T09:27:00.000Z'),
      },
    ],
  },
];

const minutesAgo = (minutes: number): Date =>
  new Date(Date.now() - minutes * 60_000);

export const fallbackDeployments = [
  {
    id: 'deploy_checkout-rollback',
    version: 'checkout-web@2026.5.14',
    status: 'ROLLED_BACK',
    description: 'Checkout summary refactor — rolled back after latency drift.',
    deployedBy: 'Dayo Akinyele',
    deployedAt: minutesAgo(46),
    environmentId: fallbackEnvironments[0].id,
    serviceId: fallbackServices[1].id,
    environment: fallbackEnvironments[0],
    service: fallbackServices[1],
  },
  {
    id: 'deploy_api-release',
    version: 'public-api@2026.5.20',
    status: 'SUCCEEDED',
    description: 'Rate-limit headers and health endpoint cleanup.',
    deployedBy: 'Priya Nair',
    deployedAt: minutesAgo(184),
    environmentId: fallbackEnvironments[0].id,
    serviceId: fallbackServices[0].id,
    environment: fallbackEnvironments[0],
    service: fallbackServices[0],
  },
  {
    id: 'deploy_billing-staging',
    version: 'billing-worker@2026.5.21',
    status: 'SUCCEEDED',
    description: 'Retry backoff tuning for invoice jobs.',
    deployedBy: 'Marco Reyes',
    deployedAt: minutesAgo(472),
    environmentId: fallbackEnvironments[1].id,
    serviceId: fallbackServices[2].id,
    environment: fallbackEnvironments[1],
    service: fallbackServices[2],
  },
];
