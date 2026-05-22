import { type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, ShieldCheck } from 'lucide-react'

import { navigationItems } from '@/data/mock-data'
import { cn } from '@/lib/utils'
import { useProjects, useWorkspaces } from '@/lib/api'
import { ThemeToggle } from '@/components/theme-toggle'

type AppShellProps = {
  title: string
  description: string
  eyebrow?: string
  actions?: ReactNode
  children: ReactNode
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function AppShell({
  title,
  description,
  eyebrow,
  actions,
  children,
  theme,
  onToggleTheme,
}: AppShellProps) {
  const location = useLocation()
  const { data: workspaces } = useWorkspaces()
  const { data: projects } = useProjects()
  const workspaceName = workspaces?.[0]?.name ?? 'Workspace'
  const projectName = projects?.[0]?.name ?? 'No project yet'

  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-main)] transition-colors dark:text-slate-50">
      <div className="mx-auto grid min-h-screen max-w-[1680px] gap-5 px-3 py-3 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-5 lg:py-5">
        <aside className="rise-in flex flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-panel)] shadow-[0_18px_44px_color-mix(in_oklch,var(--surface-inverse)_8%,transparent)]">
          <div className="border-b border-[var(--border-soft)] px-5 pb-5 pt-6">
            <div className="flex items-center gap-3 rounded-[1.5rem]">
            <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[var(--surface-inverse)] text-[var(--surface-page)] dark:text-[var(--text-main)]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Watchdog
              </p>
              <p className="text-sm text-[var(--text-main)] dark:text-white">{workspaceName}</p>
            </div>
          </div>

          <button className="mt-5 flex items-center justify-between rounded-[1rem] border border-[var(--border-soft)] bg-[var(--surface-page)] px-4 py-3 text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Current project</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-main)] dark:text-white">{projectName}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
          </button>
          </div>

          <nav className="space-y-1 px-3 py-4">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'group flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm font-medium transition-[background-color,color,transform] duration-200',
                    isActive
                      ? 'bg-[var(--text-main)] text-[var(--surface-page)] shadow-[0_8px_20px_color-mix(in_oklch,black_28%,transparent)]'
                      : 'text-[var(--text-muted)] hover:bg-[var(--surface-panel-soft)] hover:text-[var(--text-main)] hover:translate-x-0.5',
                  )}
                >
                  <Icon className={cn('h-4 w-4', isActive ? 'text-[var(--surface-page)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-main)]')} />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-auto border-t border-[var(--border-soft)] px-5 py-5">
            <div className="rounded-[1.25rem] bg-[var(--surface-page)] p-4">
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent-strong)]" />
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">Release cadence</p>
              </div>
              <p className="mt-3 text-sm font-medium text-[var(--text-main)] dark:text-white">Tracing SDK workstream is next.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Keep the shell disciplined now so the denser investigative views feel credible later.
              </p>
            </div>
          </div>
        </aside>

        <div className="rise-in flex min-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-[1.75rem] border border-[var(--border-soft)] bg-[var(--surface-panel)] shadow-[0_22px_60px_color-mix(in_oklch,var(--surface-inverse)_8%,transparent)]">
          <header className="border-b border-[var(--border-soft)] px-5 py-5 lg:px-8 lg:py-6">
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--accent-soft)] px-3 py-1.5 text-[color:var(--accent-strong)] dark:bg-[var(--accent-soft)]">
                <span className="signal-pulse h-2 w-2 rounded-full bg-[var(--accent-strong)]" />
                Control surface live
              </span>
              <span>3 environments visible</span>
              <span>12 linked alert rules</span>
            </div>

            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="space-y-4">
                {eyebrow ? (
                  <span className="inline-flex rounded-full border border-[var(--border-soft)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {eyebrow}
                  </span>
                ) : null}
                <div>
                  <h1 className="max-w-4xl font-[var(--font-display)] text-[clamp(2.8rem,5vw,5rem)] leading-[0.96] tracking-[-0.045em] text-[var(--text-main)] dark:text-white">
                    {title}
                  </h1>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--text-muted)] lg:text-lg">
                    {description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 self-start xl:justify-end">
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                {actions}
              </div>
            </div>
          </header>

          <main className="flex-1 px-5 py-5 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  )
}