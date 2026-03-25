"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Briefcase, Calendar, Clock, Download, ChevronRight, Loader2 } from "lucide-react"
import { fetchTenders } from "@/lib/api"
import type { Tender } from "@/types"

export default function TendersPage() {
    const [tenders, setTenders] = useState<Tender[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadTenders() {
            try {
                const data = await fetchTenders()
                setTenders(data)
            } catch (err) {
                console.error("Failed to load tenders:", err)
            } finally {
                setLoading(false)
            }
        }
        loadTenders()
    }, [])

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-bocra-gold/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bocra-gold/10 text-bocra-gold text-sm font-semibold tracking-wide uppercase mb-6">
                        <Briefcase className="w-4 h-4" />
                        Procurement
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Tenders
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Partner with us. View available tender opportunities, expressions of interest,
                        and awarded contracts as part of our transparent procurement process.
                    </p>
                </div>
            </section>

            {/* Tenders List */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-5xl px-6 lg:px-8">

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-bocra-blue animate-spin mb-4" />
                            <p className="text-muted-foreground">Fetching procurement opportunities...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {tenders.length === 0 ? (
                                <div className="text-center py-20 border-2 border-dashed border-border rounded-3xl">
                                    <p className="text-muted-foreground">No active tenders found at this time.</p>
                                </div>
                            ) : (
                                tenders.map((tender) => (
                                    <div
                                        key={tender.id}
                                        className="group p-6 sm:p-8 rounded-3xl bg-card border border-border/50 hover:border-bocra-blue/30 hover:shadow-xl hover:shadow-bocra-blue/5 transition-all duration-300"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                            {/* Info */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                                                        {tender.tenderNumber}
                                                    </span>
                                                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide
                                                        ${tender.status === 'OPEN' ? 'bg-bocra-green/10 text-bocra-green' : 'bg-muted text-muted-foreground'}
                                                    `}>
                                                        {tender.status}
                                                    </span>
                                                </div>

                                                <h2 className="font-display text-2xl font-bold text-foreground group-hover:text-bocra-blue transition-colors mb-2">
                                                    {tender.title}
                                                </h2>

                                                <p className="inline-flex items-center gap-2 text-sm font-medium text-bocra-gold mb-6">
                                                    <div className="w-2 h-2 rounded-full bg-bocra-gold" />
                                                    {tender.type}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>Published: {tender.publishDate}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-foreground font-medium">
                                                        <Clock className="w-4 h-4 text-destructive" />
                                                        <span>Closes: {tender.closingDate}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col gap-3 lg:items-end lg:w-48 flex-shrink-0 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-6">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                                                    Actions
                                                </p>
                                                <button className="flex items-center justify-between w-full sm:w-auto lg:w-full px-4 py-2.5 rounded-xl bg-bocra-blue/5 hover:bg-bocra-blue/10 text-bocra-blue text-sm font-medium transition-colors">
                                                    <span className="truncate mr-3">Tender Notice</span>
                                                    <Download className="w-4 h-4 flex-shrink-0" />
                                                </button>

                                                {tender.status === 'OPEN' && (
                                                    <button className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-colors">
                                                        View Details
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    )
}
