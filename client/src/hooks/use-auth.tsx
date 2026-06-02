import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'watchdog_token'

type User = {
  sub: string
  email: string
  name: string | null
  picture: string | null
}

type AuthState =
  | { status: 'loading'; user: null }
  | { status: 'authenticated'; user: User }
  | { status: 'unauthenticated'; user: null }

type AuthContextValue = {
  state: AuthState
  signInWithGoogle: () => void
  signOut: () => void
  resolveAuth: (token: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function decodeToken(token: string): User | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name ?? null,
      picture: payload.picture ?? null,
    }
  } catch {
    return null
  }
}

export function getToken(): string | null {
  return localStorage.getItem(STORAGE_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(STORAGE_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const token = getToken()
    if (token) {
      const user = decodeToken(token)
      return user
        ? { status: 'authenticated', user }
        : { status: 'unauthenticated', user: null }
    }
    return { status: 'unauthenticated', user: null }
  })

  const resolveAuth = (token: string) => {
    setToken(token)
    const user = decodeToken(token)
    setState(
      user
        ? { status: 'authenticated', user }
        : { status: 'unauthenticated', user: null },
    )
  }

  const signInWithGoogle = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) {
      console.error('VITE_GOOGLE_CLIENT_ID is not set')
      return
    }
    const redirectUri = `${window.location.origin}/auth/callback`
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
    })
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  }

  const signOut = () => {
    clearToken()
    setState({ status: 'unauthenticated', user: null })
  }

  return (
    <AuthContext.Provider
      value={{ state, signInWithGoogle, signOut, resolveAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
