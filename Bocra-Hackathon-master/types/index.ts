// =============================================================================
// BOCRA Website — Shared TypeScript Types
// =============================================================================

export interface NewsArticle {
  id: number | string
  title: string
  summary: string
  content?: string
  publishedAt?: string
  category: string
  imageUrl?: string
  slug: string
}

export interface Complaint {
  id?: number | string
  ticketId?: string
  fullName: string
  email: string
  contactNumber: string
  serviceProvider: string
  providerReference?: string
  complaintDetails: string
  status?: string
  createdAt?: string
}

export interface Inquiry {
  id?: number
  firstName: string
  lastName: string
  email: string
  inquiryType: string
  message: string
  status?: string
  submittedAt?: string
}

export interface CyberIncident {
  id?: number
  incidentId?: string
  reporterType: string
  organizationName?: string
  incidentType: string
  dateOfIncident: string
  email: string
  description: string
  status?: string
  reportedAt?: string
}

export interface License {
  id: string
  type: string
  applicant: string
  status: "active" | "pending" | "expired" | "suspended"
  dateIssued: string
  expiryDate: string
}

export interface SearchResult {
  type: "service" | "news" | "license" | "regulation" | "complaint" | "domain"
  title: string
  description: string
  url: string
  relevance?: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  stats: string
}

export interface Stat {
  id: string
  value: number
  suffix: string
  label: string
  description: string
}

export interface Tender {
  id: number
  tenderNumber: string
  title: string
  type: string
  publishDate: string
  closingDate: string
  status: string
  description?: string
}

export interface Document {
  id: number
  name: string
  category: string
  size: string
  date: string
  url: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  fax?: string
}

export interface APIResponse<T> {
  data: T
  success: boolean
  message?: string
  total?: number
}

export interface AdminProfile {
  username: string
  role: string
}
