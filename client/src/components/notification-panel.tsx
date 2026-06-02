import { useState, useRef, useEffect } from 'react'
import { Bell, CheckCheck, Circle } from 'lucide-react'
import {
  useNotifications,
  useUnreadCount,
  useMarkAllNotificationsRead,
} from '@/lib/api'
import { timeAgo } from '@/lib/format'

function NotificationDot({ type }: { type: string }) {
  const colors: Record<string, string> = {
    monitor_down: 'bg-[var(--dot-down)]',
    monitor_up: 'bg-[var(--dot-healthy)]',
    monitor_degraded: 'bg-[var(--dot-degraded)]',
    incident_created: 'bg-[var(--dot-down)]',
    incident_resolved: 'bg-[var(--dot-healthy)]',
    deploy_completed: 'bg-[var(--dot-healthy)]',
    alert_fired: 'bg-[var(--dot-degraded)]',
  }
  return (
    <span
      className={`mt-1 inline-block h-2 w-2 shrink-0 rounded-full ${colors[type] ?? 'bg-[var(--text-soft)]'}`}
    />
  )
}

export function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const { data: notifications } = useNotifications()
  const { data: unreadCount } = useUnreadCount()
  const markAllRead = useMarkAllNotificationsRead()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [open])

  const unread = unreadCount ?? 0
  const items = notifications ?? []

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center text-[var(--text-muted)] hover:bg-[var(--surface-panel-soft)] hover:text-[var(--text-main)]"
        title="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[14px] items-center justify-center bg-[var(--text-main)] px-1 text-[10px] font-bold text-[var(--surface-page)] leading-none">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 border border-[var(--border-soft)] bg-[var(--surface-page)]">
          <div className="flex items-center justify-between border-b border-[var(--border-soft)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)]">
              Notifications
            </p>
            {unread > 0 && (
              <button
                onClick={() => markAllRead.mutateAsync()}
                className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-main)]"
              >
                <CheckCheck className="h-3 w-3" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center py-10">
                <Bell className="mb-2 h-6 w-6 text-[var(--text-soft)]" />
                <p className="text-sm text-[var(--text-muted)]">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border-soft)]">
                {items.map((n) => (
                  <div
                    key={n.id}
                    className={`flex gap-3 px-4 py-3 ${n.read ? '' : 'bg-[var(--surface-panel-soft)]'}`}
                  >
                    <NotificationDot type={n.type} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm ${n.read ? 'text-[var(--text-muted)]' : 'font-medium text-[var(--text-main)]'}`}>
                        {n.title}
                      </p>
                      {n.body && (
                        <p className="mt-0.5 text-xs text-[var(--text-soft)]">{n.body}</p>
                      )}
                      <p className="mt-1 text-[11px] text-[var(--text-soft)]">
                        {timeAgo(n.createdAt)}
                      </p>
                    </div>
                    {!n.read && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--text-main)]" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
