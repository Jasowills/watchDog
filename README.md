# Watchdog

Watchdog is a professional observability platform for SaaS teams.
It combines uptime monitoring, real SDK-based error tracing, alert routing, incident timelines, and status communication in one product.

## Planned Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: NestJS, GraphQL with Apollo
- Database: Supabase Postgres
- Auth: Supabase Auth with Google OAuth

## Workspace Layout

- `client/` for the product frontend
- `server/` for the NestJS GraphQL backend
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
- Alert routing
- Status pages

## Design Direction

- Premium enterprise product
- Light-first interface with dark mode support
- Clean, spacious layouts with strong hierarchy
- Calm operational tone over flashy security aesthetics

