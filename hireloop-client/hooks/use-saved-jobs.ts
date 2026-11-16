"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "hireloop:saved-jobs"
const UPDATE_EVENT = "hireloop:saved-jobs-updated"

function readSavedJobs(): string[] {
  if (typeof window === "undefined") {
    return []
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    const parsed = value ? (JSON.parse(value) as unknown) : []

    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : []
  } catch {
    return []
  }
}

function writeSavedJobs(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT))
}

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>([])

  useEffect(() => {
    const sync = () => setSavedIds(readSavedJobs())

    sync()
    window.addEventListener(UPDATE_EVENT, sync)
    window.addEventListener("storage", sync)

    return () => {
      window.removeEventListener(UPDATE_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  const toggleSaved = useCallback((jobId: string) => {
    const current = readSavedJobs()
    const next = current.includes(jobId)
      ? current.filter((id) => id !== jobId)
      : [jobId, ...current]

    writeSavedJobs(next)
  }, [])

  const removeSaved = useCallback((jobId: string) => {
    const next = readSavedJobs().filter((id) => id !== jobId)
    writeSavedJobs(next)
  }, [])

  return {
    savedIds,
    isSaved: (jobId: string) => savedIds.includes(jobId),
    toggleSaved,
    removeSaved,
  }
}
