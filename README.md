# Sonar

Sonar is a professional observability platform for SaaS teams.
It combines uptime monitoring, real SDK-based error tracing, alert routing, incident timelines, and status communication in one product.

## Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS
- Backend: NestJS, GraphQL with Apollo, Prisma with MongoDB
- Auth: Google OAuth and email/password with bcrypt

## Workspace Layout

- `client/` for the product frontend
- `server/` for the NestJS GraphQL backend
- `packages/sdk/` for the first-party SDK (`@sonar/sdk`)
- `testing-hub/` for SDK integration testing
- `docs/` for roadmap and architecture notes

## Development

Run both applications from the root:

```bash
npm install
npm run dev
```

By default:

- client: `http://localhost:3000`
- server: `http://localhost:8080`
- GraphQL: `http://localhost:8080/graphql`

## Product Modules

- Workspaces and team access
- Projects, services, and environments
- Uptime checks and check history
- Incident lifecycle and timelines
- Error tracing and grouped events
- Alert routing (email, Slack, webhook)
- Status pages
- Real-time notifications (SSE, toasts, side panel)

## Design Direction

- Deep black dark mode first, with light mode support
- Monochrome grayscale UI with subtle status colors
- Sharp corners, no shadows
- Calm operational tone over flashy security aesthetics
