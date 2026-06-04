# Sonar Client

The client is a Vite-based React application for the Sonar product surface.

## Stack

- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui foundation files

## Local Development

```bash
npm run dev
```

By default the client expects the GraphQL API at `http://localhost:8080/graphql`.

## Notes

- The product uses a deep black dark mode by default, with light mode support.
- Aliases use `@/` for app imports.
- Shared UI primitives live under `src/components/ui`.
