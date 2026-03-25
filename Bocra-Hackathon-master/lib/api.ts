// =============================================================================
// BOCRA Website — Centralized API Helper
// =============================================================================
// All API calls go through these functions for type safety and consistency.
// Set NEXT_PUBLIC_API_URL in .env.local to point to your backend.

import type { NewsArticle, Complaint, SearchResult, Stat, APIResponse, Inquiry, CyberIncident } from "@/types"

import { getAuthHeader } from "./auth"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8083"

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...getAuthHeader(),
                ...((options?.headers as any) || {}),
            } as any,
            ...options,
        })

        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`API error: ${res.status} - ${errorText}`)
        }

        return await res.json()
    } catch (error) {
        console.error(`[BOCRA API] ${endpoint} failed:`, error)
        throw error
    }
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------
export async function fetchNews(limit?: number): Promise<NewsArticle[]> {
    const params = limit ? `?limit=${limit}` : ""
    return await apiFetch<NewsArticle[]>(`/api/v1/news${params}`)
}

// ---------------------------------------------------------------------------
// Complaints
// ---------------------------------------------------------------------------
export async function submitComplaint(complaint: Omit<Complaint, "id" | "ticketId" | "status" | "createdAt">): Promise<{ success: boolean; ticketId?: string; message?: string }> {
    return await apiFetch<{ success: boolean; ticketId: string; message: string }>("/api/v1/complaints", {
        method: "POST",
        body: JSON.stringify(complaint),
    })
}

// ---------------------------------------------------------------------------
// Inquiries
// ---------------------------------------------------------------------------
export async function submitInquiry(inquiry: Omit<Inquiry, "id" | "status" | "submittedAt">): Promise<{ success: boolean; message?: string }> {
    return await apiFetch<{ success: boolean; message: string }>("/api/v1/inquiries", {
        method: "POST",
        body: JSON.stringify(inquiry),
    })
}

// ---------------------------------------------------------------------------
// Cyber Incidents
// ---------------------------------------------------------------------------
export async function submitCyberIncident(incident: Omit<CyberIncident, "id" | "status" | "reportedAt">): Promise<{ success: boolean; incidentId?: string; message?: string }> {
    return await apiFetch<{ success: boolean; incidentId: string; message: string }>("/api/v1/cyber-incidents", {
        method: "POST",
        body: JSON.stringify(incident),
    })
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------
export async function searchSite(query: string, filter?: string): Promise<SearchResult[]> {
    const params = new URLSearchParams({ q: query })
    if (filter && filter !== "All") params.set("filter", filter)
    return await apiFetch<SearchResult[]>(`/api/v1/search?${params}`)
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------
export async function fetchStats(): Promise<Stat[]> {
    return await apiFetch<Stat[]>("/api/v1/stats")
}

// ---------------------------------------------------------------------------
// Tenders
// ---------------------------------------------------------------------------
export async function fetchTenders(): Promise<any[]> {
    return await apiFetch<any[]>("/api/v1/tenders")
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------
export async function fetchDocuments(category?: string): Promise<any[]> {
    const params = category ? `?category=${category}` : ""
    return await apiFetch<any[]>(`/api/v1/documents${params}`)
}
