# Sonar Architecture Notes

## Application Shape

Sonar is structured as a product monorepo with:

- `client/` for the Vite React application
- `server/` for the NestJS GraphQL backend
- `packages/sdk/` for the first-party Node.js SDK (`@sonar/sdk`)
- `testing-hub/` for SDK integration testing

## Frontend Notes

- Use a stable app shell with workspace-aware navigation.
- Separate overview, monitor, incident, error, alert, and status page routes clearly.
- Prefer server-driven data through GraphQL and client caching through TanStack Query.
- Keep design tokens explicit so the product does not inherit default shadcn aesthetics.

## Backend Notes

- Keep GraphQL schema aligned to product domains.
- Validate JWTs in NestJS and enforce app-level roles there.
- Use background processing for monitor execution and alert delivery.
- Keep ingestion pipelines isolated from primary request-response paths where practical.

## Initial Domain Objects

- User
- Workspace
- Membership
- Project
- Environment
- Service
- Monitor
- CheckResult
- Incident
- IncidentUpdate
- ErrorGroup
- ErrorEvent
- AlertChannel
- AlertRule
- Notification
- StatusPage

## Deployment Direction

- Frontend can deploy to Vercel or another static hosting platform.
- Backend can deploy to a Node-capable service with background worker support.

## Key Technical Constraints

- Multi-environment support is required.
- Real SDK ingestion is required.
- Deep black dark mode first, with light mode support.
- Monitoring and ingestion workloads should be designed so they can scale independently later.
