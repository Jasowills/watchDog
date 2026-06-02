export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <polygon
        points="80,18 130,47 130,105 80,134 30,105 30,47"
        className="fill-[var(--surface-elevated)] stroke-[var(--text-main)]"
        strokeWidth="1"
      />
      <line x1="80" y1="18" x2="80" y2="134"
        className="stroke-[var(--text-main)] opacity-20"
        strokeWidth="0.6" />
      <circle cx="80" cy="76" r="28"
        className="stroke-[var(--text-main)]"
        strokeWidth="0.9" fill="none" />
      <circle cx="80" cy="76" r="12"
        className="stroke-[var(--text-main)]"
        strokeWidth="0.9" fill="none" />
      <circle cx="80" cy="76" r="4"
        className="fill-[var(--text-main)]" />
      <polyline
        points="10,148 28,148 36,136 44,158 52,136 60,158 68,148 80,148 86,132 92,164 98,148 148,148"
        className="stroke-[var(--text-soft)] opacity-40"
        strokeWidth="0.75" fill="none" />
      <polyline
        points="36,136 44,158 52,136 60,158 68,148"
        className="stroke-[var(--text-main)]"
        strokeWidth="1.5" fill="none" />
      <circle cx="44" cy="158" r="2.5" className="fill-[var(--text-main)]" />
      <circle cx="52" cy="136" r="2.5" className="fill-[var(--text-main)]" />
    </svg>
  )
}

export function LogoFull({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <svg
        viewBox="0 0 480 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-auto"
        aria-hidden
      >
        <polygon
          points="80,22 118,44 118,88 80,110 42,88 42,44"
          className="fill-[var(--surface-elevated)] stroke-[var(--text-main)]"
          strokeWidth="0.75"
        />
        <line x1="80" y1="22" x2="80" y2="110"
          className="stroke-[var(--text-main)] opacity-20"
          strokeWidth="0.5" />
        <circle cx="80" cy="66" r="18"
          className="stroke-[var(--text-main)]"
          strokeWidth="0.75" fill="none" />
        <circle cx="80" cy="66" r="8"
          className="stroke-[var(--text-main)]"
          strokeWidth="0.75" fill="none" />
        <circle cx="80" cy="66" r="2.5"
          className="fill-[var(--text-main)]" />
        <polyline
          points="20,128 38,128 44,118 50,138 56,118 62,138 68,128 80,128 85,112 90,144 95,128 150,128"
          className="stroke-[var(--text-soft)] opacity-40"
          strokeWidth="0.75" fill="none" />
        <polyline
          points="44,118 50,138 56,118 62,138 68,128"
          className="stroke-[var(--text-main)]"
          strokeWidth="1.25" fill="none" />
        <circle cx="50" cy="138" r="2" className="fill-[var(--text-main)]" />
        <circle cx="56" cy="118" r="2" className="fill-[var(--text-main)]" />
        <text
          x="178" y="78"
          className="fill-[var(--text-main)]"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: 22, letterSpacing: 8 }}
        >WATCHDOG</text>
        <text
          x="178" y="98"
          className="fill-[var(--text-soft)]"
          style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 400, fontSize: 9, letterSpacing: 4 }}
        >OBSERVABILITY PLATFORM</text>
      </svg>
    </div>
  )
}
