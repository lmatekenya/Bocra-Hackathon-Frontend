"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileText, CheckSquare, Clock, ArrowRight, Download, Scale } from "lucide-react"

export default function LicensingPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-bocra-gold/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bocra-gold/10 text-bocra-gold text-sm font-semibold tracking-wide uppercase mb-6">
                        <FileText className="w-4 h-4" />
                        Compliance & Permits
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                        Regulatory <span className="text-transparent bg-clip-text bg-gradient-to-r from-bocra-gold to-bocra-blue">Licensing</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        A transparent and streamlined process for acquiring operational licenses in Botswana’s communications, broadcasting, and postal sectors.
                    </p>
                </div>
            </section>

            {/* License Categories */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="font-display text-3xl font-bold text-foreground mb-4">License Categories</h2>
                            <p className="text-muted-foreground">Select your industry sector to view specific requirements.</p>
                        </div>
                        <a href="/documents" className="inline-flex items-center gap-2 text-bocra-blue font-semibold hover:text-bocra-blue/80">
                            <Download className="w-4 h-4" /> Download Fee Schedule
                        </a>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Network Facilities Provider (NFP)",
                                desc: "For licensees who own, operate or provide physical infrastructure (towers, fibre, satellites, base stations) used for carrying services and applications.",
                            },
                            {
                                title: "Services & Applications Provider (SAP)",
                                desc: "Non-infrastructure based service providers that deliver specific services (speech, data, VoIP) to end users using NFP infrastructure.",
                            },
                            {
                                title: "Content Services Provider (CSP)",
                                desc: "Providers of content material solely for broadcasting (TV and Radio) and Subscription TV services.",
                            },
                            {
                                title: "Designated Postal Operator (DPO)",
                                desc: "Designation to carry universal postal service obligations across Botswana.",
                            },
                            {
                                title: "Commercial Postal Operator (CPO)",
                                desc: "Commercial postal operators providing value-added courier and express delivery services.",
                            },
                            {
                                title: "Type Approval",
                                desc: "Certification for radio and telecommunications terminal equipment entering the Botswana market.",
                            }
                        ].map((license, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="p-8 rounded-3xl bg-card border border-border/50 hover:border-bocra-gold/50 hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full"
                            >
                                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-bocra-blue transition-colors">{license.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{license.desc}</p>
                                <div className="flex items-center font-semibold text-bocra-gold text-sm group-hover:translate-x-2 transition-transform">
                                    View Requirements <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24 bg-card border-y border-border">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">Licensing Process</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-bocra-blue/10 flex items-center justify-center text-bocra-blue mb-6">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">1. Application Submission</h3>
                            <p className="text-sm text-muted-foreground">Submit completed forms alongside the application fee and business plan.</p>
                        </div>
                        <div className="flex flex-col items-center relative">
                            <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-border -z-10" />
                            <div className="w-16 h-16 rounded-full bg-bocra-gold/10 flex items-center justify-center text-bocra-gold mb-6 bg-card">
                                <Scale className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">2. Evaluation</h3>
                            <p className="text-sm text-muted-foreground">BOCRA assesses technical, financial, and legal competency.</p>
                        </div>
                        <div className="flex flex-col items-center relative">
                            <div className="w-16 h-16 rounded-full bg-bocra-green/10 flex items-center justify-center text-bocra-green mb-6 bg-card">
                                <CheckSquare className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2">3. Issuance</h3>
                            <p className="text-sm text-muted-foreground">Upon Board approval and fee payment, the license is formally granted.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
