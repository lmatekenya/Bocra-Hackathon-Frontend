"use client"

import { motion } from "framer-motion"
import { Phone, Radio, Globe, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

const mandateAreas = [
    {
        icon: Phone,
        title: "Telecommunications",
        description:
            "Regulating all aspects of telecommunications (wire, cellular, satellite, cable). Processing applications, issuing licenses, managing spectrum, and ensuring consumer protection.",
        href: "/mandate/telecommunications",
    },
    {
        icon: Radio,
        title: "Broadcasting",
        description:
            "Regulating all broadcasting (except state broadcasting), subscription management, and re-broadcasting. Licensing commercial radio and TV stations across Botswana.",
        href: "/mandate/broadcasting",
    },
    {
        icon: Globe,
        title: "Internet & ICTs",
        description:
            "Regulating the Internet and ICTs, managing the .bw country code top-level domain (ccTLD), facilitating internet growth, and ensuring consumer protection in the digital landscape.",
        href: "/mandate/internet",
    },
    {
        icon: Mail,
        title: "Postal Services",
        description:
            "Supervising the provision of postal services, issuing licenses for ordinary mail and courier services, and ensuring safe, reliable, and affordable service throughout the country.",
        href: "/mandate/postal",
    },
]

const strategicPillars = [
    { label: "Competition", color: "bg-bocra-blue" },
    { label: "Universal Access & Service", color: "bg-bocra-green" },
    { label: "Consumer Protection", color: "bg-bocra-gold" },
    { label: "Resource Optimisation", color: "bg-bocra-blue" },
    { label: "Talent Management", color: "bg-bocra-green" },
    { label: "Stakeholder Engagement", color: "bg-bocra-gold" },
]

export function AboutMandate() {
    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-medium mb-6">
                        Our Mandate
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        What We Regulate
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Established under the Communications Regulatory Authority Act, 2012, BOCRA oversees
                        all aspects of Botswana&apos;s communications sector.
                    </p>
                </motion.div>

                {/* Mandate Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {mandateAreas.map((area, index) => (
                        <motion.div
                            key={area.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.07 }}
                        >
                            <Link
                                href={area.href}
                                className="block h-full outline-none"
                            >
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    className="h-full relative rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:border-bocra-blue/30 hover:bg-card transition-all duration-300 group"
                                >
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-5 h-5 text-bocra-blue" />
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bocra-blue/10 to-bocra-green/10 group-hover:from-bocra-blue/20 group-hover:to-bocra-green/20 flex items-center justify-center mb-4 transition-colors">
                                        <area.icon className="w-6 h-6 text-bocra-blue" />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-bocra-blue transition-colors">{area.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Strategic Pillars */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="rounded-3xl bg-gradient-to-br from-bocra-blue/10 to-bocra-green/10 border border-bocra-blue/20 p-10"
                >
                    <h3 className="font-display text-2xl font-bold text-foreground text-center mb-3">
                        Strategic Plan 2024–2029
                    </h3>
                    <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
                        Six pillars guiding BOCRA toward a digitally enabled economy for Botswana.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {strategicPillars.map((pillar, index) => (
                            <motion.div
                                key={pillar.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="flex items-center gap-3 bg-card/60 backdrop-blur-sm rounded-xl p-4 border border-border/50"
                            >
                                <div className={`w-3 h-3 rounded-full ${pillar.color} flex-shrink-0`} />
                                <span className="text-sm font-medium text-foreground">{pillar.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
