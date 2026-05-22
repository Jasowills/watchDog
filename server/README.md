# Watchdog Server

The server is a NestJS application that will own the GraphQL API, authentication boundaries, monitor execution workflows, alert routing, and error ingestion pipeline.

## Current Baseline

- NestJS application shell
- Apollo GraphQL wired at `/graphql`
- Simple REST readiness route at `/`
- Space reserved for Supabase, Prisma, and ingestion work

## Local Development

```bash
npm run start:dev
```

The server defaults to port `3001`.

## Direction

- GraphQL is the main application API.
- REST should remain narrow and practical for health checks or ingestion edges when needed.
- Domain modules should follow product boundaries such as workspaces, monitors, incidents, alerts, and traces.
