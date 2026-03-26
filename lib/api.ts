import type {
  AdminProfile,
  AuditLog,
  Complaint,
  CyberIncident,
  Document,
  Inquiry,
  NewsArticle,
  SearchResult,
  Stat,
  Tender,
} from "@/types"
import { getAdminToken } from "./admin-session"

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8083"
    : "https://bocra-hackathon-backend-production.up.railway.app")

interface ApiFetchOptions extends RequestInit {
  parseAsText?: boolean
}

async function apiFetch<T>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const isFormData = options.body instanceof FormData
  const token = getAdminToken()

  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: "omit",
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  })

  if (!response.ok) {
    let message = "Unexpected API error."
    try {
      const json = await response.json()
      message = json.message || json.error || message
    } catch {
      const text = await response.text()
      if (text) message = text
    }
    throw new Error(`${response.status} ${response.statusText}: ${message}`)
  }

  if (options.parseAsText) {
    return (await response.text()) as T
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  username: string
  role: string
  token: string
}

export async function loginAdmin(payload: LoginPayload): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function logoutAdmin(): Promise<void> {
  await apiFetch<void>("/api/v1/auth/logout", { method: "POST" })
}

export async function fetchAdminProfile(): Promise<AdminProfile> {
  return apiFetch<AdminProfile>("/api/v1/auth/me")
}

export async function fetchNews(limit?: number, category?: string): Promise<NewsArticle[]> {
  const params = new URLSearchParams()
  if (limit) params.set("limit", String(limit))
  if (category) params.set("category", category)
  const query = params.toString()
  return apiFetch<NewsArticle[]>(`/api/v1/news${query ? `?${query}` : ""}`)
}

export async function createNewsArticle(
  article: Omit<NewsArticle, "id" | "publishedAt">,
): Promise<NewsArticle> {
  return apiFetch<NewsArticle>("/api/v1/news", {
    method: "POST",
    body: JSON.stringify(article),
  })
}

export async function submitComplaint(
  complaint: Omit<Complaint, "id" | "ticketId" | "status" | "createdAt">,
): Promise<{ success: boolean; ticketId?: string; message?: string }> {
  return apiFetch<{ success: boolean; ticketId?: string; message?: string }>(
    "/api/v1/complaints",
    {
      method: "POST",
      body: JSON.stringify(complaint),
    },
  )
}

export async function fetchAdminComplaints(): Promise<Complaint[]> {
  return apiFetch<Complaint[]>("/api/v1/admin/complaints")
}

export async function fetchAdminInquiries(): Promise<Inquiry[]> {
  return apiFetch<Inquiry[]>("/api/v1/admin/inquiries")
}

export async function fetchAdminCyberIncidents(): Promise<CyberIncident[]> {
  return apiFetch<CyberIncident[]>("/api/v1/admin/cyber-incidents")
}

export async function fetchAdminAuditLogs(): Promise<AuditLog[]> {
  return apiFetch<AuditLog[]>("/api/v1/admin/audit-logs")
}

export async function submitInquiry(
  inquiry: Omit<Inquiry, "id" | "status" | "submittedAt">,
): Promise<{ success: boolean; message?: string }> {
  return apiFetch<{ success: boolean; message?: string }>("/api/v1/inquiries", {
    method: "POST",
    body: JSON.stringify(inquiry),
  })
}

export async function submitCyberIncident(
  incident: Omit<CyberIncident, "id" | "incidentId" | "status" | "reportedAt">,
): Promise<{ success: boolean; incidentId?: string; message?: string }> {
  return apiFetch<{ success: boolean; incidentId?: string; message?: string }>(
    "/api/v1/cyber-incidents",
    {
      method: "POST",
      body: JSON.stringify(incident),
    },
  )
}

export async function searchSite(query: string, filter?: string): Promise<SearchResult[]> {
  const params = new URLSearchParams({ q: query })
  if (filter && filter !== "All") {
    params.set("filter", filter)
  }
  return apiFetch<SearchResult[]>(`/api/v1/search?${params.toString()}`)
}

export async function fetchStats(): Promise<Stat[]> {
  return apiFetch<Stat[]>("/api/v1/stats")
}

export async function fetchTenders(): Promise<Tender[]> {
  return apiFetch<Tender[]>("/api/v1/tenders")
}

export async function createTender(
  tender: Omit<Tender, "id">,
): Promise<Tender> {
  return apiFetch<Tender>("/api/v1/tenders", {
    method: "POST",
    body: JSON.stringify(tender),
  })
}

export async function fetchDocuments(category?: string): Promise<Document[]> {
  const params = category ? `?category=${encodeURIComponent(category)}` : ""
  return apiFetch<Document[]>(`/api/v1/documents${params}`)
}
