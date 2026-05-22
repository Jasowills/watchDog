# Watchdog Roadmap

## Phase 0: Foundation

- Define product model and workspace hierarchy
- Establish design context and agent instructions
- Decide monorepo structure for client and server
- Set env and secret handling conventions

## Phase 1: Shell, Auth, and Workspaces

- Scaffold frontend and backend apps
- Configure Supabase Auth with Google OAuth
- Build login, onboarding, workspace creation, and invitations
- Implement workspace roles and project switching

## Phase 2: Projects, Environments, and Services

- Add project setup flow
- Support multiple environments per project
- Model services and service groups
- Build empty states that guide first monitor creation

## Phase 3: Uptime Monitoring

- Create monitor CRUD
- Support HTTP checks with status code and keyword assertions
- Schedule checks and persist results
- Build overview dashboard and monitor detail pages

## Phase 4: Alerts and Incidents

- Add email, Slack, and webhook channels
- Implement alert rules and notification routing
- Create incidents from failed checks
- Build incident timelines and resolution workflow

## Phase 5: Status Pages

- Support branded public status pages
- Publish incident updates and maintenance events
- Expose service health summaries externally

## Phase 6: Error Tracing

- Design first-party SDK ingestion contract
- Create ingestion API and validation pipeline
- Group errors into stable fingerprints
- Build error event detail and linked incident views

## Phase 7: Hardening

- Add audit logs
- Improve retries and job resilience
- Add onboarding polish and quality-of-life flows
- Prepare billing placeholders and deployment docs