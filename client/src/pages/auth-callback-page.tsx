import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { MarketingLayout } from '@/components/marketing-layout'

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { resolveAuth } = useAuth()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      navigate('/login', { replace: true })
      return
    }

    const apiUrl =
      import.meta.env.VITE_API_URL ?? 'http://localhost:8080/graphql'
    const serverOrigin = new URL(apiUrl).origin

    fetch(`${serverOrigin}/auth/google`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        code,
        redirectUri: `${window.location.origin}/auth/callback`,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Auth failed')
        return res.json()
      })
      .then((data) => {
        resolveAuth(data.token)
        navigate('/app/overview', { replace: true })
      })
      .catch(() => {
        navigate('/login', { replace: true })
      })
  }, [navigate, searchParams])

  return (
    <MarketingLayout>
      <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-5">
        <div className="text-center">
          <div
            aria-hidden
            className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[var(--border-soft)] border-t-[var(--text-main)]"
          />
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Completing sign-in…
          </p>
        </div>
      </div>
    </MarketingLayout>
  )
}
