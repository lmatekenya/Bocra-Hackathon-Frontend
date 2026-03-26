"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Briefcase,
  LogOut,
  ChevronRight,
  Clock,
  Search,
  RefreshCw,
  Loader2,
  ShieldAlert,
  Mail,
  Activity,
} from "lucide-react"
import {
  fetchAdminAuditLogs,
  fetchAdminComplaints,
  fetchAdminCyberIncidents,
  fetchAdminInquiries,
} from "@/lib/api"
import {
  clearCachedAdminProfile,
  getAuthenticatedAdmin,
  signOutAdmin,
} from "@/lib/auth"
import type {
  AdminProfile,
  AuditLog,
  Complaint,
  CyberIncident,
  Inquiry,
} from "@/types"

function formatDate(value?: string) {
  if (!value) return "Recent"
  try {
    return new Date(value).toLocaleDateString("en-BW", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  } catch {
    return "Recent"
  }
}

function formatDateTime(value?: string) {
  if (!value) return "Recent"
  try {
    return new Date(value).toLocaleString("en-BW", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return "Recent"
  }
}

export default function AdminDashboard() {
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [incidents, setIncidents] = useState<CyberIncident[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [loadingDashboard, setLoadingDashboard] = useState(true)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const loadDashboardData = async () => {
    setLoadingDashboard(true)
    setError(null)

    try {
      const [complaintData, inquiryData, incidentData, auditData] = await Promise.all([
        fetchAdminComplaints(),
        fetchAdminInquiries(),
        fetchAdminCyberIncidents(),
        fetchAdminAuditLogs(),
      ])

      setComplaints(complaintData)
      setInquiries(inquiryData)
      setIncidents(incidentData)
      setAuditLogs(auditData)
    } catch (dashboardError) {
      console.error("Failed to load admin dashboard data", dashboardError)
      setError("Unable to refresh admin data at the moment.")
    } finally {
      setLoadingDashboard(false)
    }
  }

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const me = await getAuthenticatedAdmin()
        setProfile(me)
        await loadDashboardData()
      } catch {
        clearCachedAdminProfile()
        router.replace("/admin/login")
      } finally {
        setCheckingSession(false)
      }
    }

    void bootstrap()
  }, [router])

  const handleLogout = async () => {
    await signOutAdmin()
    router.push("/admin/login")
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen grid place-items-center bg-background text-foreground">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          Verifying administrator session...
        </div>
      </main>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <main className="min-h-screen bg-muted/30 text-foreground flex flex-col">
      <Navbar />

      <div className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-bocra-blue" />
                Admin Command Center
              </h1>
              <p className="text-muted-foreground mt-1">
                Logged in as{" "}
                <span className="text-foreground font-semibold uppercase">
                  {profile.username}
                </span>{" "}
                ({profile.role})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadDashboardData}
                className="p-3 rounded-xl bg-card border border-border hover:bg-muted transition-all"
              >
                <RefreshCw
                  className={`w-5 h-5 ${loadingDashboard ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Complaints</p>
              <p className="mt-2 text-2xl font-bold">{complaints.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Inquiries</p>
              <p className="mt-2 text-2xl font-bold">{inquiries.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Cyber Incidents</p>
              <p className="mt-2 text-2xl font-bold">{incidents.length}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Audit Events</p>
              <p className="mt-2 text-2xl font-bold">{auditLogs.length}</p>
            </div>
          </div>

          {error && (
            <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 space-y-2">
              <nav className="space-y-1">
                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-bocra-blue text-white font-semibold">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5" />
                    Complaints
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                    {complaints.length}
                  </span>
                </button>
                <button
                  onClick={() => router.push("/admin/news")}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-card transition-all text-muted-foreground hover:text-foreground"
                >
                  <Newspaper className="w-5 h-5" />
                  Manage News
                </button>
                <button
                  onClick={() => router.push("/admin/tenders")}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-card transition-all text-muted-foreground hover:text-foreground"
                >
                  <Briefcase className="w-5 h-5" />
                  Manage Tenders
                </button>
              </nav>
            </div>

            <div className="lg:col-span-9 space-y-6">
              <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="text-xl font-bold">Consumer Complaints</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      placeholder="Search tickets..."
                      className="pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm outline-none w-64 focus:border-bocra-blue"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <th className="px-6 py-4">Ticket ID</th>
                        <th className="px-6 py-4">Consumer</th>
                        <th className="px-6 py-4">Provider</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {loadingDashboard ? (
                        Array.from({ length: 3 }).map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            <td colSpan={6} className="px-6 py-8 h-16 bg-muted/10"></td>
                          </tr>
                        ))
                      ) : complaints.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                            No complaints found in the system.
                          </td>
                        </tr>
                      ) : (
                        complaints.map((complaint) => (
                          <tr key={complaint.id} className="hover:bg-muted/20 transition-all">
                            <td className="px-6 py-5 font-mono text-sm font-bold text-bocra-blue">
                              #{complaint.ticketId || complaint.id}
                            </td>
                            <td className="px-6 py-5">
                              <div className="text-sm font-semibold">{complaint.fullName}</div>
                              <div className="text-xs text-muted-foreground">
                                {complaint.email || "No email provided"}
                              </div>
                            </td>
                            <td className="px-6 py-5 text-sm">{complaint.serviceProvider}</td>
                            <td className="px-6 py-5">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                                <Clock className="w-3 h-3" />
                                {complaint.status || "PENDING"}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-xs text-muted-foreground">
                              {formatDate(complaint.createdAt)}
                            </td>
                            <td className="px-6 py-5 text-right">
                              <button className="p-2 hover:bg-muted rounded-lg transition-all">
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Mail className="w-5 h-5 text-bocra-blue" />
                    Recent Inquiries
                  </h3>
                  <div className="mt-4 space-y-3">
                    {inquiries.slice(0, 5).map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="rounded-xl border border-border/70 bg-muted/20 px-4 py-3"
                      >
                        <p className="text-sm font-semibold">
                          {inquiry.firstName} {inquiry.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{inquiry.inquiryType}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(inquiry.submittedAt)}
                        </p>
                      </div>
                    ))}
                    {inquiries.length === 0 && !loadingDashboard && (
                      <p className="text-sm text-muted-foreground">No inquiries submitted yet.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                    Recent Cyber Incidents
                  </h3>
                  <div className="mt-4 space-y-3">
                    {incidents.slice(0, 5).map((incident) => (
                      <div
                        key={incident.id}
                        className="rounded-xl border border-border/70 bg-muted/20 px-4 py-3"
                      >
                        <p className="text-sm font-semibold">{incident.incidentType}</p>
                        <p className="text-xs text-muted-foreground">
                          {incident.incidentId || `INC-${incident.id}`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(incident.reportedAt)}
                        </p>
                      </div>
                    ))}
                    {incidents.length === 0 && !loadingDashboard && (
                      <p className="text-sm text-muted-foreground">
                        No cyber incidents submitted yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-bocra-green" />
                  Security Audit Trail
                </h3>
                <div className="mt-4 space-y-3">
                  {auditLogs.slice(0, 8).map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-muted/20 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold">{log.eventType}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.actor}
                          {log.target ? ` • ${log.target}` : ""}
                          {log.details ? ` • ${log.details}` : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            log.outcome === "SUCCESS"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-red-500/10 text-red-600"
                          }`}
                        >
                          {log.outcome}
                        </span>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatDateTime(log.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {auditLogs.length === 0 && !loadingDashboard && (
                    <p className="text-sm text-muted-foreground">No audit events recorded yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

