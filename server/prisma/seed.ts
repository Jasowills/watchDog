import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const minutesAgo = (minutes: number): Date =>
  new Date(Date.now() - minutes * 60_000);

async function seedCheckHistory(
  monitorId: string,
  baseLatencyMs: number,
  latestState: string,
  intervalSeconds: number,
): Promise<void> {
  await prisma.checkResult.deleteMany({ where: { monitorId } });

  const now = Date.now();
  const points = 18;

  await prisma.checkResult.createMany({
    data: Array.from({ length: points }, (_, index) => {
      const jitter = ((index * 23) % 60) - 30;
      const isRecent = index < 3;

      return {
        monitorId,
        state: isRecent ? latestState : 'HEALTHY',
        statusCode: latestState === 'DOWN' && isRecent ? 503 : 200,
        latencyMs: Math.max(40, baseLatencyMs + jitter),
        region: 'eu-west-1',
        checkedAt: new Date(now - index * intervalSeconds * 1000),
        createdAt: new Date(now - index * intervalSeconds * 1000),
      };
    }),
  });
}

async function upsertById<T extends { id: string }>(
  model: { findFirst: (args: { where: { id: string } }) => Promise<T | null>; create: (args: { data: T }) => Promise<T>; update: (args: { where: { id: string }; data: Partial<T> }) => Promise<T> },
  id: string,
  data: T,
): Promise<T> {
  const existing = await model.findFirst({ where: { id } });
  if (existing) {
    return model.update({ where: { id }, data });
  }
  return model.create({ data });
}

async function main(): Promise<void> {
  const now = new Date();

  const owner = await upsertById(prisma.user, 'user_owner', {
    id: 'user_owner',
    authUserId: 'seed-auth-owner',
    email: 'ops@acorn.app',
    fullName: 'Dayo Akinyele',
    avatarUrl: null,
    createdAt: now,
    updatedAt: now,
  } as any);

  const workspace = await upsertById(prisma.workspace, 'workspace_acorn', {
    id: 'workspace_acorn',
    name: 'Acorn',
    slug: 'acorn',
    createdAt: now,
    updatedAt: now,
  } as any);

  const existingMembership = await prisma.membership.findFirst({
    where: { workspaceId: workspace.id, userId: owner.id },
  });
  if (!existingMembership) {
    await prisma.membership.create({
      data: {
        workspaceId: workspace.id,
        userId: owner.id,
        role: 'OWNER',
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  const project = await upsertById(prisma.project, 'project_core-platform', {
    id: 'project_core-platform',
    name: 'Core platform',
    slug: 'core-platform',
    workspaceId: workspace.id,
    createdAt: now,
    updatedAt: now,
  } as any);

  const environments = [
    { id: 'env_production', name: 'Production', key: 'production', color: '#22c55e' },
    { id: 'env_staging', name: 'Staging', key: 'staging', color: '#a1a1a1' },
    { id: 'env_sandbox', name: 'Sandbox', key: 'sandbox', color: '#eab308' },
  ];

  for (const environment of environments) {
    await upsertById(prisma.environment, environment.id, {
      ...environment,
      projectId: project.id,
      createdAt: now,
      updatedAt: now,
    } as any);
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
    await upsertById(prisma.service, service.id, {
      ...service,
      projectId: project.id,
      createdAt: now,
      updatedAt: now,
    } as any);
  }

  const monitorDefs = [
    {
      id: 'monitor_public-api',
      name: 'public-api',
      targetUrl: 'https://api.acorn.app/health',
      intervalSeconds: 30,
      serviceId: 'service_public-api',
      environmentId: 'env_production',
      baseLatencyMs: 182,
      latestState: 'HEALTHY',
    },
    {
      id: 'monitor_checkout-web',
      name: 'checkout-web',
      targetUrl: 'https://app.acorn.app/checkout',
      intervalSeconds: 30,
      serviceId: 'service_checkout-web',
      environmentId: 'env_production',
      baseLatencyMs: 226,
      latestState: 'DEGRADED',
    },
    {
      id: 'monitor_billing-worker',
      name: 'billing-worker',
      targetUrl: 'https://worker.acorn.app/health',
      intervalSeconds: 60,
      serviceId: 'service_billing-worker',
      environmentId: 'env_staging',
      baseLatencyMs: 410,
      latestState: 'DEGRADED',
    },
  ];

  for (const monitor of monitorDefs) {
    await upsertById(prisma.monitor, monitor.id, {
      id: monitor.id,
      name: monitor.name,
      type: 'HTTP',
      targetUrl: monitor.targetUrl,
      method: 'GET',
      expectedStatus: 200,
      expectedKeyword: null,
      intervalSeconds: monitor.intervalSeconds,
      timeoutSeconds: 10,
      isActive: true,
      serviceId: monitor.serviceId,
      environmentId: monitor.environmentId,
      createdAt: now,
      updatedAt: now,
    } as any);

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
      status: 'ROLLED_BACK',
      description: 'Checkout summary refactor — rolled back after latency drift.',
      deployedBy: 'Dayo Akinyele',
      deployedAt: minutesAgo(46),
      environmentId: 'env_production',
      serviceId: 'service_checkout-web',
    },
    {
      id: 'deploy_api-release',
      version: 'public-api@2026.5.20',
      status: 'SUCCEEDED',
      description: 'Rate-limit headers and health endpoint cleanup.',
      deployedBy: 'Priya Nair',
      deployedAt: minutesAgo(184),
      environmentId: 'env_production',
      serviceId: 'service_public-api',
    },
    {
      id: 'deploy_billing-staging',
      version: 'billing-worker@2026.5.21',
      status: 'SUCCEEDED',
      description: 'Retry backoff tuning for invoice jobs.',
      deployedBy: 'Marco Reyes',
      deployedAt: minutesAgo(472),
      environmentId: 'env_staging',
      serviceId: 'service_billing-worker',
    },
  ];

  for (const deployment of deployments) {
    await upsertById(prisma.deployment, deployment.id, {
      ...deployment,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
  }

  const incident = await upsertById(prisma.incident, 'incident_checkout-latency', {
    id: 'incident_checkout-latency',
    title: 'Checkout latency spike',
    summary: 'Checkout web exceeded its rolling latency threshold in eu-west.',
    severity: 'SEV_2',
    status: 'MONITORING',
    startedAt: minutesAgo(48),
    resolvedAt: null,
    workspaceId: workspace.id,
    projectId: project.id,
    environmentId: 'env_production',
    serviceId: 'service_checkout-web',
    ownerUserId: owner.id,
    createdAt: now,
    updatedAt: now,
  } as any);

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

  const existingErrorGroup = await prisma.errorGroup.findFirst({
    where: {
      environmentId: 'env_production',
      fingerprint: 'checkout-web:TypeError:undefined-cart',
    },
  });

  const errorGroup = existingErrorGroup
    ? await prisma.errorGroup.update({
        where: { id: existingErrorGroup.id },
        data: { lastSeenAt: minutesAgo(3), occurrenceCount: 184, updatedAt: new Date() },
      })
    : await prisma.errorGroup.create({
        data: {
          fingerprint: 'checkout-web:TypeError:undefined-cart',
          title: "TypeError: Cannot read properties of undefined (reading 'cart')",
          status: 'OPEN',
          firstSeenAt: minutesAgo(52),
          lastSeenAt: minutesAgo(3),
          occurrenceCount: 184,
          projectId: project.id,
          environmentId: 'env_production',
          serviceId: 'service_checkout-web',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

  await prisma.errorEvent.deleteMany({ where: { errorGroupId: errorGroup.id } });
  await prisma.errorEvent.createMany({
    data: [
      {
        eventKey: 'evt_checkout_001',
        message: "Cannot read properties of undefined (reading 'cart')",
        stack: "TypeError: Cannot read properties of undefined (reading 'cart')\n    at CheckoutSummary (checkout.tsx:42:18)",
        release: 'checkout-web@2026.5.14',
        occurredAt: minutesAgo(3),
        errorGroupId: errorGroup.id,
        createdAt: new Date(),
      },
      {
        eventKey: 'evt_checkout_002',
        message: "Cannot read properties of undefined (reading 'cart')",
        stack: "TypeError: Cannot read properties of undefined (reading 'cart')\n    at CheckoutSummary (checkout.tsx:42:18)",
        release: 'checkout-web@2026.5.14',
        occurredAt: minutesAgo(19),
        errorGroupId: errorGroup.id,
        createdAt: new Date(),
      },
    ],
  });

  const alertChannel = await upsertById(prisma.alertChannel, 'channel_primary-slack', {
    id: 'channel_primary-slack',
    name: 'Primary engineering Slack',
    type: 'SLACK',
    destination: '#growth-engineering',
    secretRef: null,
    isEnabled: true,
    workspaceId: workspace.id,
    creatorUserId: owner.id,
    createdAt: now,
    updatedAt: now,
  } as any);

  await upsertById(prisma.alertRule, 'rule_production-incidents', {
    id: 'rule_production-incidents',
    name: 'Production incidents to Slack',
    triggerType: 'INCIDENT_CREATED',
    minimumSeverity: 'SEV_2',
    isEnabled: true,
    workspaceId: workspace.id,
    projectId: project.id,
    environmentId: 'env_production',
    serviceId: null,
    alertChannelId: alertChannel.id,
    createdAt: now,
    updatedAt: now,
  } as any);

  const statusPage = await upsertById(prisma.statusPage, 'status_acorn-public', {
    id: 'status_acorn-public',
    name: 'Acorn status',
    slug: 'acorn',
    headline: 'Live operational status for the Acorn platform.',
    visibility: 'PUBLIC',
    workspaceId: workspace.id,
    projectId: project.id,
    createdAt: now,
    updatedAt: now,
  } as any);

  const statusPageServiceLinks = [
    { serviceId: 'service_public-api', displayName: 'API', sortOrder: 0 },
    { serviceId: 'service_checkout-web', displayName: 'Checkout', sortOrder: 1 },
    { serviceId: 'service_billing-worker', displayName: 'Worker queue', sortOrder: 2 },
  ];

  for (const link of statusPageServiceLinks) {
    const existingLink = await prisma.statusPageService.findFirst({
      where: { statusPageId: statusPage.id, serviceId: link.serviceId },
    });

    if (existingLink) {
      await prisma.statusPageService.update({
        where: { id: existingLink.id },
        data: { displayName: link.displayName, sortOrder: link.sortOrder },
      });
    } else {
      await prisma.statusPageService.create({
        data: {
          ...link,
          statusPageId: statusPage.id,
          sortOrder: link.sortOrder,
        },
      });
    }
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
