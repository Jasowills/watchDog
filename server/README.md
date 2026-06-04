# Sonar Server

The server is a NestJS application that owns the GraphQL API, authentication boundaries, monitor execution workflows, alert routing, and error ingestion pipeline.

## Current Baseline

- NestJS application shell
- Apollo GraphQL wired at `/graphql`
- Simple REST readiness route at `/`
- Prisma with MongoDB
- Google OAuth and email/password authentication

## Local Development

```bash
npm run start:dev
```

The server defaults to port `8080`.

## Direction

- GraphQL is the main application API.
- REST should remain narrow and practical for health checks or ingestion edges when needed.
- Domain modules should follow product boundaries such as workspaces, monitors, incidents, alerts, and traces.
