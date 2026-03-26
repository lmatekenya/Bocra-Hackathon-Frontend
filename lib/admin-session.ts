"use client"

import type { AdminProfile } from "@/types"

const ADMIN_SESSION_KEY = "bocra_admin_session"

export interface AdminSession extends AdminProfile {
  token: string
}

export function saveAdminSession(session: AdminSession): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
  }
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") {
    return null
  }

  const raw = sessionStorage.getItem(ADMIN_SESSION_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as AdminSession
  } catch {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    return null
  }
}

export function getAdminToken(): string | null {
  return getAdminSession()?.token ?? null
}

export function clearAdminSession(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
  }
}
