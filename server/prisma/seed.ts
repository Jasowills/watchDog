import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const minutesAgo = (minutes: number): Date =>
  new Date(Date.now() - minutes * 60_000);

async function seedCheckHistory(
  monitorId: string,
  baseLatencyMs: number,
  latestState: 'HEALTHY' | 'DEGRADED' | 'DOWN',
  intervalSeconds: number,
): Promise<void> {
  // Rebuild check history on every run so it always looks recent.
  await prisma.checkResult.deleteMany({ where: { monitorId } });

  const now = Date.now();
  const points = 18;

  await prisma.checkResult.createMany({
    data: Array.from({ length: points }, (_, index) => {
      // Deterministic jitter so the data looks alive without being random.
      const jitter = ((index * 23) % 60) - 30;
      const isRecent = index < 3;

      return {
        monitorId,
        state: isRecent ? latestState : 'HEALTHY',
        statusCode: latestState === 'DOWN' && isRecent ? 503 : 200,
        latencyMs: Math.max(40, baseLatencyMs + jitter),
        region: 'eu-west-1',
        checkedAt: new Date(now - index * intervalSeconds * 1000),
      };
    }),
  });
}

async function main(): Promise<void> {
  const owner = await prisma.user.upsert({
    where: { id: 'user_owner' },
    update: {},
    create: {
      id: 'user_owner',
      authUserId: 'seed-auth-owner',
      email: 'ops@acorn.app',
      fullName: 'Dayo Akinyele',
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { id: 'workspace_acorn' },
    update: { name: 'Acorn' },
    create: { id: 'workspace_acorn', name: 'Acorn', slug: 'acorn' },
  });

  await prisma.membership.upsert({
    where: { workspaceId_userId: { workspaceId: workspace.id, userId: owner.id } },
    update: { role: 'OWNER' },
    create: { workspaceId: workspace.id, userId: owner.id, role: 'OWNER' },
  });

  const project = await prisma.project.upsert({
    where: { id: 'project_core-platform' },
    update: { name: 'Core platform' },
    create: {
      id: 'project_core-platform',
      name: 'Core platform',
      slug: 'core-platform',
      workspaceId: workspace.id,
    },
  });

  const environments = [
    { id: 'env_production', name: 'Production', key: 'production', color: '#22c55e' },
    { id: 'env_staging', name: 'Staging', key: 'staging', color: '#a1a1a1' },
    { id: 'env_sandbox', name: 'Sandbox', key: 'sandbox', color: '#eab308' },
  ];

  for (const environment of environments) {
    await prisma.environment.upsert({
      where: { id: environment.id },
      update: { name: environment.name, color: environment.color },
      create: { ...environment, projectId: project.id },
    });
  }

  const services = [
    {
      id: 'service_public-api',
      name: 'Public API',
      slug: 'public-api',
      description: 'Primary customer-facing API surface.',
    },
    {
      id: 'service_checkout-web',
      name: 'Checkout web',
      slug: 'checkout-web',
      description: 'The purchasing and subscription flow.',
    },
    {
      id: 'service_billing-worker',
      name: 'Billing worker',
      slug: 'billing-worker',
      description: 'Background job execution for billing tasks.',
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: { name: service.name, description: service.description },
      create: { ...service, projectId: project.id },
    });
  }

  const monitors = [
    {
      id: 'monitor_public-api',
      name: 'public-api',
      targetUrl: 'https://api.acorn.app/health',
      intervalSeconds: 30,
      serviceId: 'service_public-api',
      environmentId: 'env_production',
      baseLatencyMs: 182,
      latestState: 'HEALTHY' as const,
    },
    {
      id: 'monitor_checkout-web',
      name: 'checkout-web',
      targetUrl: 'https://app.acorn.app/checkout',
      intervalSeconds: 30,
      serviceId: 'service_checkout-web',
      environmentId: 'env_production',
      baseLatencyMs: 226,
      latestState: 'DEGRADED' as const,
    },
    {
      id: 'monitor_billing-worker',
      name: 'billing-worker',
      targetUrl: 'https://worker.acorn.app/health',
      intervalSeconds: 60,
      serviceId: 'service_billing-worker',
      environmentId: 'env_staging',
      baseLatencyMs: 410,
      latestState: 'DEGRADED' as const,
    },
  ];

  for (const monitor of monitors) {
    await prisma.monitor.upsert({
      where: { id: monitor.id },
      update: { name: monitor.name, targetUrl: monitor.targetUrl },
      create: {
        id: monitor.id,
        name: monitor.name,
        type: 'HTTP',
        targetUrl: monitor.targetUrl,
        method: 'GET',
        expectedStatus: 200,
        intervalSeconds: monitor.intervalSeconds,
        timeoutSeconds: 10,
        isActive: true,
        serviceId: monitor.serviceId,
        environmentId: monitor.environmentId,
      },
    });

    await seedCheckHistory(
      monitor.id,
      monitor.baseLatencyMs,
      monitor.latestState,
      monitor.intervalSeconds,
    );
  }

  const deployments = [
    {
      id: 'deploy_checkout-rollback',
      version: 'checkout-web@2026.5.14',
      status: 'ROLLED_BACK' as const,
      description:
        'Checkout summary refactor — rolled back after latency drift.',
      deployedBy: 'Dayo Akinyele',
      deployedAt: minutesAgo(46),
      environmentId: 'env_production',
      serviceId: 'service_checkout-web',
    },
    {
      id: 'deploy_api-release',
      version: 'public-api@2026.5.20',
      status: 'SUCCEEDED' as const,
      description: 'Rate-limit headers and health endpoint cleanup.',
      deployedBy: 'Priya Nair',
      deployedAt: minutesAgo(184),
      environmentId: 'env_production',
      serviceId: 'service_public-api',
    },
    {
      id: 'deploy_billing-staging',
      version: 'billing-worker@2026.5.21',
      status: 'SUCCEEDED' as const,
      description: 'Retry backoff tuning for invoice jobs.',
      deployedBy: 'Marco Reyes',
      deployedAt: minutesAgo(472),
      environmentId: 'env_staging',
      serviceId: 'service_billing-worker',
    },
  ];

  for (const deployment of deployments) {
    await prisma.deployment.upsert({
      where: { id: deployment.id },
      update: { status: deployment.status, deployedAt: deployment.deployedAt },
      create: deployment,
    });
  }

  const incident = await prisma.incident.upsert({
    where: { id: 'incident_checkout-latency' },
    update: {},
    create: {
      id: 'incident_checkout-latency',
      title: 'Checkout latency spike',
      summary:
        'Checkout web exceeded its rolling latency threshold in eu-west.',
      severity: 'SEV_2',
      status: 'MONITORING',
      startedAt: minutesAgo(48),
      workspaceId: workspace.id,
      projectId: project.id,
      environmentId: 'env_production',
      serviceId: 'service_checkout-web',
      ownerUserId: owner.id,
    },
  });

  await prisma.incidentUpdate.deleteMany({ where: { incidentId: incident.id } });
  await prisma.incidentUpdate.createMany({
    data: [
      {
        incidentId: incident.id,
        kind: 'DETECTED',
        body: 'Automated check flagged latency drift on checkout-web.',
        actorUserId: owner.id,
        createdAt: minutesAgo(48),
      },
      {
        incidentId: incident.id,
        kind: 'INVESTIGATING',
        body: 'Growth platform is comparing trace volume against the last release.',
        actorUserId: owner.id,
        createdAt: minutesAgo(34),
      },
      {
        incidentId: incident.id,
        kind: 'MONITORING',
        body: 'Release candidate rolled back. Watching error rate return to baseline.',
        actorUserId: owner.id,
        createdAt: minutesAgo(12),
      },
    ],
  });

  const errorGroup = await prisma.errorGroup.upsert({
    where: {
      environmentId_fingerprint: {
        environmentId: 'env_production',
        fingerprint: 'checkout-web:TypeError:undefined-cart',
      },
    },
    update: { lastSeenAt: minutesAgo(3), occurrenceCount: 184 },
    create: {
      fingerprint: 'checkout-web:TypeError:undefined-cart',
      title: "TypeError: Cannot read properties of undefined (reading 'cart')",
      status: 'OPEN',
      firstSeenAt: minutesAgo(52),
      lastSeenAt: minutesAgo(3),
      occurrenceCount: 184,
      projectId: project.id,
      environmentId: 'env_production',
      serviceId: 'service_checkout-web',
    },
  });

  await prisma.errorEvent.deleteMany({ where: { errorGroupId: errorGroup.id } });
  await prisma.errorEvent.createMany({
    data: [
      {
        eventKey: 'evt_checkout_001',
        message: "Cannot read properties of undefined (reading 'cart')",
        stack:
          "TypeError: Cannot read properties of undefined (reading 'cart')\n    at CheckoutSummary (checkout.tsx:42:18)",
        release: 'checkout-web@2026.5.14',
        occurredAt: minutesAgo(3),
        errorGroupId: errorGroup.id,
      },
      {
        eventKey: 'evt_checkout_002',
        message: "Cannot read properties of undefined (reading 'cart')",
        stack:
          "TypeError: Cannot read properties of undefined (reading 'cart')\n    at CheckoutSummary (checkout.tsx:42:18)",
        release: 'checkout-web@2026.5.14',
        occurredAt: minutesAgo(19),
        errorGroupId: errorGroup.id,
      },
    ],
  });

  const alertChannel = await prisma.alertChannel.upsert({
    where: { id: 'channel_primary-slack' },
    update: {},
    create: {
      id: 'channel_primary-slack',
      name: 'Primary engineering Slack',
      type: 'SLACK',
      destination: '#growth-engineering',
      isEnabled: true,
      workspaceId: workspace.id,
      creatorUserId: owner.id,
    },
  });

  await prisma.alertRule.upsert({
    where: { id: 'rule_production-incidents' },
    update: {},
    create: {
      id: 'rule_production-incidents',
      name: 'Production incidents to Slack',
      triggerType: 'INCIDENT_CREATED',
      minimumSeverity: 'SEV_2',
      isEnabled: true,
      workspaceId: workspace.id,
      projectId: project.id,
      environmentId: 'env_production',
      alertChannelId: alertChannel.id,
    },
  });

  const statusPage = await prisma.statusPage.upsert({
    where: { id: 'status_acorn-public' },
    update: {},
    create: {
      id: 'status_acorn-public',
      name: 'Acorn status',
      slug: 'acorn',
      headline: 'Live operational status for the Acorn platform.',
      visibility: 'PUBLIC',
      workspaceId: workspace.id,
      projectId: project.id,
    },
  });

  const statusPageServices = [
    { serviceId: 'service_public-api', displayName: 'API', sortOrder: 0 },
    { serviceId: 'service_checkout-web', displayName: 'Checkout', sortOrder: 1 },
    {
      serviceId: 'service_billing-worker',
      displayName: 'Worker queue',
      sortOrder: 2,
    },
  ];

  for (const link of statusPageServices) {
    await prisma.statusPageService.upsert({
      where: {
        statusPageId_serviceId: {
          statusPageId: statusPage.id,
          serviceId: link.serviceId,
        },
      },
      update: { displayName: link.displayName, sortOrder: link.sortOrder },
      create: { ...link, statusPageId: statusPage.id },
    });
  }

  console.log('Seed complete: workspace "Acorn" with 3 monitors and history.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
