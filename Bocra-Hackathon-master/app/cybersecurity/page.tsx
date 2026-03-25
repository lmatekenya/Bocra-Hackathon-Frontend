"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, AlertTriangle, ShieldAlert, CheckCircle, FileWarning, Send, Loader2, AlertCircle } from "lucide-react"
import { submitCyberIncident } from "@/lib/api"
import { motion } from "framer-motion"
import type { CyberIncident } from "@/types"

const advisories = [
    {
        id: "ADV-2024-012",
        title: "Critical Phishing Campaign Mymicking Local Banks",
        severity: "CRITICAL",
        date: "2024-03-22",
        description: "A highly sophisticated phishing campaign is currently targeting citizens using SMS links identical to major telecom and banking portals. Do not click unverified links.",
        cve: "N/A"
    },
    {
        id: "ADV-2024-011",
        title: "Zero-Day in Enterprise Remote Desktop Tools",
        severity: "HIGH",
        date: "2024-03-15",
        description: "A remote code execution vulnerability exists in popular RDP gateways widely used by parastatals. Immediate patching is recommended.",
        cve: "CVE-2024-12345"
    },
    {
        id: "ADV-2024-010",
        title: "Update Required: Smart Home IoT Devices",
        severity: "MEDIUM",
        date: "2024-02-28",
        description: "Several commonly imported smart TV box brands have been found to contain pre-installed malware communicating with known botnets.",
        cve: "CVE-2024-67890"
    }
]

export default function CybersecurityPage() {
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [incidentId, setIncidentId] = useState("")
    
    const [formData, setFormData] = useState({
        reporterType: "",
        incidentType: "",
        email: "",
        description: "",
        organizationName: "",
        dateOfIncident: new Date().toISOString().split('T')[0]
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        const generatedId = `INC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        
        try {
            const res = await submitCyberIncident({
                ...formData,
                incidentId: generatedId
            })
            if (res.success) {
                setIncidentId(res.incidentId || generatedId)
                setSuccess(true)
            } else {
                setError(res.message || "Failed to submit report")
            }
        } catch (err: any) {
            setError(err.message || "Connection error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-red-500 to-bocra-blue" />
                <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-bocra-blue/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-semibold tracking-wide uppercase mb-6">
                        <Shield className="w-4 h-4" />
                        National CSIRT
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Cybersecurity Center
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Botswana's Computer Security Incident Response Team (BwCSIRT). Monitor national threat advisories, learn about digital safety, and report cyber incidents.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid lg:grid-cols-12 gap-16">

                        {/* Advisories - Left Col */}
                        <div className="lg:col-span-7 space-y-8">
                            <h2 className="font-display text-3xl font-bold flex items-center gap-3 mb-8">
                                <ShieldAlert className="w-8 h-8 text-bocra-blue" />
                                Threat Advisories
                            </h2>

                            <div className="space-y-6">
                                {advisories.map((alert) => (
                                    <div key={alert.id} className="p-6 rounded-3xl bg-card border border-border hover:border-bocra-blue/30 transition-all">
                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${alert.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500' :
                                                     alert.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500' :
                                                         'bg-yellow-500/10 text-yellow-500'}`}
                                            >
                                                {alert.severity} SEVERITY
                                            </span>
                                            <span className="text-sm font-mono text-muted-foreground">{alert.id}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3">{alert.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{alert.description}</p>

                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50 text-sm">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <AlertTriangle className="w-4 h-4" />
                                                CVE: {alert.cve}
                                            </div>
                                            <span className="text-bocra-blue font-medium">{alert.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Report Form - Right Col */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-28 p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl shadow-bocra-blue/5 overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

                                {success ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 relative z-10">
                                        <div className="w-20 h-20 rounded-full bg-bocra-green/10 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle className="w-10 h-10 text-bocra-green" />
                                        </div>
                                        <h3 className="font-display text-2xl font-bold mb-4">Incident Reported</h3>
                                        <p className="text-muted-foreground mb-8">
                                            Your report has been received. Ticket ID: <span className="font-bold text-red-500">{incidentId}</span>.
                                            Critical incidents are reviewed within 4 hours.
                                        </p>
                                        <button onClick={() => setSuccess(false)} className="w-full px-6 py-3 rounded-xl bg-muted text-foreground font-semibold">
                                            Submit Another Report
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                        <h3 className="font-display text-2xl font-bold mb-2">Report an Incident</h3>
                                        <p className="text-sm text-muted-foreground mb-8">Confidentially report a cyber attack or breach to BwCSIRT.</p>

                                        {error && (
                                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" /> {error}
                                            </div>
                                        )}

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold uppercase text-muted-foreground">Reporter Type</label>
                                                    <select name="reporterType" value={formData.reporterType} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all">
                                                        <option value="">Select...</option>
                                                        <option>Individual/Citizen</option>
                                                        <option>Corporate/SME</option>
                                                        <option>Government/Parastatal</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-semibold uppercase text-muted-foreground">Incident Type</label>
                                                    <select name="incidentType" value={formData.incidentType} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all">
                                                        <option value="">Select...</option>
                                                        <option>Malware/Ransomware</option>
                                                        <option>Phishing/Scam</option>
                                                        <option>Data Breach</option>
                                                        <option>DDoS Attack</option>
                                                        <option>Other</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase text-muted-foreground">Contact Email</label>
                                                <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Secure comms address" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase text-muted-foreground">Description</label>
                                                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Summary of what happened..." className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all resize-none"></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-all disabled:opacity-70"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileWarning className="w-5 h-5" />}
                                            {loading ? "Transmitting..." : "Submit Incident Report"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
