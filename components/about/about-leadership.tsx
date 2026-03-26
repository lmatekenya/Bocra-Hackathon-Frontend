"use client"

import { motion } from "framer-motion"
import { Users, ArrowRight } from "lucide-react"

const executives = [
    {
        name: "Mr. Martin Mokgware",
        role: "Chief Executive",
        bio: "An economist with extensive leadership experience in telecommunications regulation. Mr. Mokgware leads BOCRA's overall strategic direction and operations.",
        isCEO: true,
    },
    {
        name: "Ms. Bonny Mine",
        role: "Director — Finance",
        bio: "Responsible for BOCRA's financial management, budgeting, and fiscal accountability.",
        isCEO: false,
    },
    {
        name: "Mr. Bathopi Luke",
        role: "Director — Technical Services",
        bio: "Oversees the technical regulatory functions including spectrum management and network quality monitoring.",
        isCEO: false,
    },
    {
        name: "Ms. Tebogo Mmoshe",
        role: "Director — Licensing",
        bio: "Leads the licensing function, managing the issuance and compliance monitoring of all communications licences.",
        isCEO: false,
    },
    {
        name: "Ms. Maitseo Ratladi",
        role: "Director — Broadband & Universal Service",
        bio: "Drives initiatives to expand broadband connectivity and ensure universal access to communications services across Botswana.",
        isCEO: false,
    },
    {
        name: "Ms. Joyce Isa-Molwane",
        role: "Director — Legal, Compliance & Board Secretary",
        bio: "Provides legal oversight, ensures regulatory compliance, and serves as Secretary to the Board of Directors.",
        isCEO: false,
    },
]

function getInitials(name: string) {
    return name
        .replace(/^(Dr\.|Mr\.|Ms\.)\s+/, "")
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
}

export function AboutLeadership() {
    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-medium mb-6">
                        Executive Management
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        Leadership Team
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Experienced professionals driving BOCRA&apos;s mission and day-to-day regulatory operations.
                    </p>
                </motion.div>

                {/* CEO featured */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-10"
                >
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="relative rounded-3xl bg-gradient-to-r from-bocra-blue/10 via-bocra-green/5 to-bocra-blue/10 border border-bocra-blue/20 p-8 md:p-10 overflow-hidden"
                    >
                        {/* Decorative glow */}
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-bocra-blue/10 rounded-full blur-3xl" />

                        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-bocra-blue to-bocra-green flex items-center justify-center shadow-2xl shadow-bocra-blue/25">
                                    <span className="font-display text-3xl font-bold text-white">
                                        {getInitials(executives[0].name)}
                                    </span>
                                </div>
                            </div>
                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                                    <h3 className="font-display text-2xl font-bold text-foreground">
                                        {executives[0].name}
                                    </h3>
                                    <span className="inline-block px-3 py-1 rounded-full bg-bocra-blue text-white text-xs font-semibold">
                                        {executives[0].role}
                                    </span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                    {executives[0].bio}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Rest of leadership */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {executives.slice(1).map((exec, index) => (
                        <motion.div
                            key={exec.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="h-full rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:border-bocra-green/20 hover:bg-card transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bocra-green/15 to-bocra-blue/15 group-hover:from-bocra-green/25 group-hover:to-bocra-blue/25 flex items-center justify-center flex-shrink-0 transition-colors">
                                        <span className="font-display text-sm font-bold text-bocra-green">
                                            {getInitials(exec.name)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground leading-tight text-sm">{exec.name}</h3>
                                        <span className="text-xs text-bocra-green font-medium">{exec.role}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{exec.bio}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 p-6 rounded-2xl bg-card/50 border border-border/50">
                        <Users className="w-8 h-8 text-bocra-blue" />
                        <div className="text-left">
                            <p className="font-semibold text-foreground">Work with us</p>
                            <p className="text-sm text-muted-foreground">Join our team and help shape Botswana's digital future.</p>
                        </div>
                        <motion.a
                            href="/contact"
                            whileHover={{ x: 4 }}
                            className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-bocra-blue to-bocra-green text-white text-sm font-semibold"
                        >
                            Contact BOCRA
                            <ArrowRight className="w-4 h-4" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
