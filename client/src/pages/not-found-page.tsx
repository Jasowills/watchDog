import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-panel)] p-8 dark:border-slate-800">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">Route not found</p>
      <h2 className="mt-4 font-[var(--font-display)] text-4xl tracking-[-0.04em] text-slate-950 dark:text-white">That page is not part of the current shell.</h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
        Keep the product map clean while the foundations are still being laid. Head back to the main workspace view.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Return to overview</Link>
      </Button>
    </div>
  )
}