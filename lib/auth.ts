"use client"

import type { AdminProfile } from "@/types"
import { fetchAdminProfile, loginAdmin, logoutAdmin } from "./api"
import {
  clearAdminSession,
  getAdminSession,
  saveAdminSession,
} from "./admin-session"

export async function signInAdmin(username: string, password: string): Promise<AdminProfile> {
  const response = await loginAdmin({ username, password })
  const profile = { username: response.username, role: response.role }
  saveAdminSession({ ...profile, token: response.token })
  return profile
}

export async function signOutAdmin(): Promise<void> {
  try {
    await logoutAdmin()
  } finally {
    clearCachedAdminProfile()
  }
}

export async function getAuthenticatedAdmin(): Promise<AdminProfile> {
  const profile = await fetchAdminProfile()
  const existing = getAdminSession()
  if (existing) {
    saveAdminSession({ ...profile, token: existing.token })
  }
  return profile
}

export function getCachedAdminProfile(): AdminProfile | null {
  const session = getAdminSession()
  if (!session) return null
  return { username: session.username, role: session.role }
}

export function clearCachedAdminProfile(): void {
  clearAdminSession()
}
