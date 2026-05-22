# Watchdog Architecture Notes

## Application Shape

Watchdog should be structured as a product monorepo with at least:

- `client/` for the Vite React application
- `server/` for the NestJS GraphQL backend
- `packages/` for shared types or future SDK packages

## Frontend Notes

- Use a stable app shell with workspace-aware navigation.
- Separate overview, monitor, incident, error, alert, and status page routes clearly.
- Prefer server-driven data through GraphQL and client caching through TanStack Query.
- Keep design tokens explicit so the product does not inherit default shadcn aesthetics.

## Backend Notes

- Keep GraphQL schema aligned to product domains.
- Validate Supabase JWTs in NestJS and enforce app-level roles there.
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
- Supabase remains the primary managed database and auth provider.

## Key Technical Constraints

- Multi-environment support is required.
- Real SDK ingestion is required.
- The product must work well in light mode first, with dark mode as a first-class secondary theme.
- Monitoring and ingestion workloads should be designed so they can scale independently later.