"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Satellite, Globe2, RadioReceiver, ShieldAlert, ArrowRight } from "lucide-react"

export default function SatellitePage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-bocra-blue/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-semibold tracking-wide uppercase mb-6">
                        <Satellite className="w-4 h-4" />
                        Space & Orbit
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                        Satellite <span className="text-transparent bg-clip-text bg-gradient-to-r from-bocra-blue to-bocra-green">Services</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Coordinating Botswana’s orbital slots and regulating Earth Station and Very Small Aperture Terminal (VSAT) operations to ensure global connectivity.
                    </p>
                </div>
            </section>

            {/* Services Overview */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            Bridging the Digital Divide
                        </h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            Satellite communication is vital for delivering broadband access to Botswana's remote and geographically challenging regions. BOCRA facilitates the licensing of satellite operators to ensure seamless integration with national networks.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We collaborate strictly with the International Telecommunication Union (ITU) to file, coordinate, and register Botswana’s orbital assignments.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            { icon: Globe2, title: "ITU Coordination", desc: "International orbital slot filing and compliance." },
                            { icon: RadioReceiver, title: "VSAT Licensing", desc: "Regulating private and commercial earth stations." },
                            { icon: Satellite, title: "Operator Landing", desc: "Approving foreign satellite footprint landing rights." },
                            { icon: ShieldAlert, title: "Interference Check", desc: "Protecting earth stations from signal jamming." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 rounded-3xl bg-card border border-border/50 hover:border-bocra-blue/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-bocra-blue/10 flex items-center justify-center text-bocra-blue mb-4">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
