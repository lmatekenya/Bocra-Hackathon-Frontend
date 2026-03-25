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
    User as UserIcon,
    ChevronRight,
    Clock,
    CheckCircle2,
    Search,
    RefreshCw
} from "lucide-react"
import { getAuth, clearAuth } from "@/lib/auth"
import { motion } from "framer-motion"
import type { Complaint } from "@/types"

export default function AdminDashboard() {
    const [auth, setAuth] = useState(getAuth())
    const [complaints, setComplaints] = useState<Complaint[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (!auth.token) {
            router.push("/admin/login")
            return
        }
        loadComplaints()
    }, [auth, router])

    const loadComplaints = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:8083/api/v1/admin/complaints", {
                headers: { "Authorization": `Bearer ${auth.token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setComplaints(data)
            }
        } catch (err) {
            console.error("Failed to load complaints", err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        clearAuth()
        router.push("/admin/login")
    }

    if (!auth.token) return null

    return (
        <main className="min-h-screen bg-muted/30 text-foreground flex flex-col">
            <Navbar />

            <div className="flex-1 pt-32 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                                <LayoutDashboard className="w-8 h-8 text-bocra-blue" />
                                Admin Command Center
                            </h1>
                            <p className="text-muted-foreground mt-1">Logged in as <span className="text-foreground font-semibold uppercase">{auth.username}</span> ({auth.role})</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={loadComplaints} className="p-3 rounded-xl bg-card border border-border hover:bg-muted transition-all">
                                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                            <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all">
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        
                        {/* Sidebar Nav */}
                        <div className="lg:col-span-3 space-y-2">
                            <nav className="space-y-1">
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-bocra-blue text-white font-semibold">
                                    <div className="flex items-center gap-3">
                                        <MessageSquare className="w-5 h-5" />
                                        Complaints
                                    </div>
                                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{complaints.length}</span>
                                </button>
                                <button onClick={() => router.push("/admin/news")} className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-card transition-all text-muted-foreground hover:text-foreground">
                                    <Newspaper className="w-5 h-5" />
                                    Manage News
                                </button>
                                <button onClick={() => router.push("/admin/tenders")} className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-card transition-all text-muted-foreground hover:text-foreground">
                                    <Briefcase className="w-5 h-5" />
                                    Manage Tenders
                                </button>
                            </nav>
                        </div>

                        {/* Main Content: Complaints Table */}
                        <div className="lg:col-span-9 space-y-6">
                            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                                <div className="p-6 border-b border-border flex items-center justify-between">
                                    <h2 className="text-xl font-bold">Consumer Complaints</h2>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input placeholder="Search tickets..." className="pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm outline-none w-64 focus:border-bocra-blue" />
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
                                            {loading ? (
                                                Array(3).fill(0).map((_, i) => (
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
                                            ) : complaints.map((c) => (
                                                <tr key={c.id} className="hover:bg-muted/20 transition-all">
                                                    <td className="px-6 py-5 font-mono text-sm font-bold text-bocra-blue">#{c.ticketId || c.id}</td>
                                                    <td className="px-6 py-5">
                                                        <div className="text-sm font-semibold">{c.fullName}</div>
                                                        <div className="text-xs text-muted-foreground">{c.email || 'No email provided'}</div>
                                                    </td>
                                                    <td className="px-6 py-5 text-sm">{c.serviceProvider}</td>
                                                    <td className="px-6 py-5">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                                                            <Clock className="w-3 h-3" />
                                                            PENDING
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-5 text-xs text-muted-foreground">Recent</td>
                                                    <td className="px-6 py-5 text-right">
                                                        <button className="p-2 hover:bg-muted rounded-lg transition-all">
                                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
