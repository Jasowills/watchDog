import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

type Row = {
  name: string
  env: string
  latency: string
  state: 'Healthy' | 'Degraded'
  dotClass: string
  spark: string
  tick?: boolean
}

const rows: Row[] = [
  {
    name: 'public-api',
    env: 'production',
    latency: '182 ms',
    state: 'Healthy',
    dotClass: 'bg-[oklch(0.72_0.17_152)]',
    spark: '0,26 16,21 32,27 48,14 64,19 80,9 96,17 112,7 128,13 144,6 160,11',
  },
  {
    name: 'checkout-web',
    env: 'production',
    latency: '226 ms',
    state: 'Degraded',
    dotClass: 'bg-[oklch(0.78_0.16_75)]',
    spark: '0,16 16,20 32,12 48,22 64,11 80,21 96,9 112,23 128,14 144,25 160,17',
    tick: true,
  },
  {
    name: 'billing-worker',
    env: 'staging',
    latency: '96 ms',
    state: 'Healthy',
    dotClass: 'bg-[oklch(0.72_0.17_152)]',
    spark: '0,24 16,18 32,22 48,15 64,20 80,14 96,21 112,12 128,18 144,10 160,15',
  },
]

const tiles = [
  { label: 'Uptime', value: '99.98', suffix: '%', counter: true },
  { label: 'p95 latency', value: '226 ms', suffix: '' },
  { label: 'Open incidents', value: '1', suffix: '' },
]

export function HeroMockup() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      root.querySelectorAll('.mk-spark').forEach((node, index) => {
        const poly = node as SVGPolylineElement
        const length = poly.getTotalLength()
        gsap.set(poly, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(poly, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          delay: 0.55 + index * 0.16,
        })
      })

      const uptime = root.querySelector('[data-mk-uptime]')
      if (uptime) {
        const proxy = { v: 99 }
        gsap.to(proxy, {
          v: 99.98,
          duration: 1.9,
          delay: 0.3,
          ease: 'power2.out',
          onUpdate: () => {
            uptime.textContent = proxy.v.toFixed(2)
          },
        })
      }

      const tick = root.querySelector('[data-mk-tick]')
      if (tick) {
        const proxy = { v: 226 }
        gsap.to(proxy, {
          v: 248,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.4,
          onUpdate: () => {
            tick.textContent = `${Math.round(proxy.v)} ms`
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[1.4rem] border border-[var(--border-soft)] bg-[var(--surface-panel)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)]"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-[var(--border-soft)] bg-[var(--surface-page)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
        <span className="ml-3 font-[var(--font-mono)] text-xs text-[var(--text-muted)]">
          watchdog.app/overview
        </span>
        <span className="ml-auto flex items-center gap-2 rounded-full border border-[var(--border-soft)] px-2.5 py-1 text-[0.65rem] font-medium text-[var(--text-muted)]">
          <span className="signal-pulse h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.17_152)]" />
          Live
        </span>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {/* context line */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Acorn · Production
            </p>
            <p className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white">
              Operational overview
            </p>
          </div>
          <span className="font-[var(--font-mono)] text-xs text-[var(--text-muted)]">
            14:32 UTC
          </span>
        </div>

        {/* metric tiles */}
        <div className="grid grid-cols-3 gap-3">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="rounded-[0.85rem] border border-[var(--border-soft)] bg-[var(--surface-page)] p-3"
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {tile.label}
              </p>
              <p className="mt-2 font-[var(--font-mono)] text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                {tile.counter ? (
                  <>
                    <span data-mk-uptime>{tile.value}</span>
                    {tile.suffix}
                  </>
                ) : (
                  tile.value
                )}
              </p>
            </div>
          ))}
        </div>

        {/* monitor list */}
        <div className="rounded-[0.95rem] border border-[var(--border-soft)] bg-[var(--surface-page)]">
          <p className="border-b border-[var(--border-soft)] px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Monitors
          </p>
          <div className="divide-y divide-[var(--border-soft)]">
            {rows.map((row) => (
              <div
                key={row.name}
                className="flex items-center gap-3 px-4 py-3"
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${row.dotClass}`} />
                <div className="min-w-0">
                  <p className="truncate font-[var(--font-mono)] text-[0.8rem] text-white">
                    {row.name}
                  </p>
                  <p className="text-[0.66rem] text-[var(--text-muted)]">{row.env}</p>
                </div>
                <svg
                  className="ml-auto hidden h-8 w-[120px] shrink-0 sm:block"
                  viewBox="0 0 160 32"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <polyline
                    className="mk-spark"
                    points={row.spark}
                    fill="none"
                    stroke="var(--text-muted)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="w-[68px] shrink-0 text-right">
                  <p
                    className="font-[var(--font-mono)] text-[0.78rem] text-white"
                    data-mk-tick={row.tick ? '' : undefined}
                  >
                    {row.latency}
                  </p>
                  <p
                    className={`text-[0.62rem] font-medium ${
                      row.state === 'Degraded'
                        ? 'text-[oklch(0.78_0.16_75)]'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {row.state}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* deploy correlation footnote */}
        <div className="flex items-center gap-2.5 rounded-[0.85rem] border border-[var(--border-soft)] bg-[var(--surface-page)] px-4 py-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[oklch(0.78_0.16_75)]" />
          <p className="truncate text-[0.72rem] text-[var(--text-muted)]">
            Last deploy{' '}
            <span className="font-[var(--font-mono)] text-white">
              checkout-web@2026.5.14
            </span>{' '}
            · 46m before this incident
          </p>
        </div>
      </div>
    </div>
  )
}
