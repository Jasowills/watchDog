type AvatarProps = {
  src?: string | null
  name?: string | null
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-7 w-7 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={`${sizeClasses[size]} rounded object-cover`}
      />
    )
  }

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center border border-[var(--border-soft)] bg-[var(--surface-page)] font-semibold text-[var(--text-muted)]`}
    >
      {name?.charAt(0).toUpperCase() ?? '?'}
    </div>
  )
}
