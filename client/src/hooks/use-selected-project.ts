import { useCallback, useMemo } from 'react'
import { useProjects } from '@/lib/api'

const STORAGE_KEY = 'sonar:selected-project-id'

function getStoredId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function storeId(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // noop
  }
}

export function useSelectedProject() {
  const { data: projects } = useProjects()
  const list = projects ?? []

  const selected = useMemo(() => {
    const stored = getStoredId()
    if (stored) {
      const match = list.find((p) => p.id === stored)
      if (match) return match
    }
    return list[0] ?? null
  }, [list])

  const setProject = useCallback((id: string) => {
    storeId(id)
  }, [])

  return { project: selected, projects: list, setProject }
}
