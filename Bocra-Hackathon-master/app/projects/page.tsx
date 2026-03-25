"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Globe, TowerControl, Tv, ArrowRight, CheckCircle2 } from "lucide-react"

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-bocra-green/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bocra-green/10 text-bocra-green text-sm font-semibold tracking-wide uppercase mb-6">
                        <Globe className="w-4 h-4" />
                        National Initiatives
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                        Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-bocra-green to-bocra-blue">Projects</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Discover the key initiatives BOCRA is executing to modernize Botswana’s digital infrastructure, protect the environment, and establish robust communication platforms.
                    </p>
                </div>
            </section>

            {/* Projects Timeline/Grid */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
                    
                    {/* Project 1: .bw ccTLD */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-bocra-blue/10 flex items-center justify-center text-bocra-blue mb-6">
                                <Globe className="w-8 h-8" />
                            </div>
                            <h2 className="font-display text-3xl font-bold text-foreground mb-4">.bw Domain Management (ccTLD)</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                The Government of Botswana mandated BOCRA to perform regulatory and administrative functions for registering the `.bw` Country Code Top-Level Domain (ccTLD).
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                A Technical Advisory Committee (TAC) composed of ISPs, PTOs, and key stakeholders was established to guide domain operations, formulate policy, and increase public awareness. Internet Service Providers (ISPs) act as official retailers for the `.bw` domain space.
                            </p>
                            <a href="https://nic.net.bw" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-bocra-blue font-semibold hover:text-bocra-green transition-colors">
                                Visit the .bw Registry <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 h-[400px] rounded-3xl bg-card border border-border overflow-hidden relative"
                        >
                            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Digital globe" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-bocra-blue/80 to-transparent flex items-end p-8">
                                <h3 className="text-white font-display text-3xl font-bold">Securing Botswana's Digital Identity</h3>
                            </div>
                        </motion.div>
                    </div>

                    {/* Project 2: Infrastructure Sharing */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center pt-16 border-t border-border">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="h-[400px] rounded-3xl bg-card border border-border overflow-hidden relative"
                        >
                            <img src="https://images.unsplash.com/photo-1544396821-4fcecadfb829?q=80&w=2070&auto=format&fit=crop" alt="Telecommunication towers" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-bocra-green/80 to-transparent flex items-end p-8">
                                <h3 className="text-white font-display text-3xl font-bold">Protecting The Environment</h3>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-bocra-green/10 flex items-center justify-center text-bocra-green mb-6">
                                <TowerControl className="w-8 h-8" />
                            </div>
                            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Infrastructure Sharing Guidelines</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                The rapid proliferation of telecommunications infrastructure negatively impacted the visual landscape across Botswana. In collaboration with the Department of Environmental Affairs, BOCRA established strict guidelines.
                            </p>
                            <ul className="space-y-3 mb-6">
                                {[
                                    "Minimize or avoid unnecessary infrastructure duplication",
                                    "Protect the environment and public health",
                                    "Promote fair competition via mutually agreed sharing",
                                    "Redirect operator funds towards core network innovation"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle2 className="w-5 h-5 text-bocra-green flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Project 3: Digital Switchover */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center pt-16 border-t border-border">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-bocra-gold/10 flex items-center justify-center text-bocra-gold mb-6">
                                <Tv className="w-8 h-8" />
                            </div>
                            <h2 className="font-display text-3xl font-bold text-foreground mb-4">Digital Broadcasting Switchover</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                In alignment with the International Telecommunication Union (ITU) Regional Radiocommunications Conference (RRC 06), BOCRA leads Botswana's digital switchover/migration process.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                The initiative spearheads the transition from legacy analogue TV and radio services to high-definition Digital Terrestrial Television (DTT), unlocking superior broadcast quality and freeing up valuable spectrum for mobile broadband.
                            </p>
                            <a href="/documents" className="inline-flex items-center gap-2 text-bocra-blue font-semibold hover:text-bocra-gold transition-colors">
                                View Technical Guidelines <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 h-[400px] rounded-3xl bg-card border border-border overflow-hidden relative"
                        >
                            <img src="https://images.unsplash.com/photo-1593460613898-cdb5b29dc0a4?q=80&w=2070&auto=format&fit=crop" alt="Digital broadcast" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-t from-bocra-gold/80 to-transparent flex items-end p-8">
                                <h3 className="text-white font-display text-3xl font-bold">The Future of Broadcasting</h3>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    )
}
