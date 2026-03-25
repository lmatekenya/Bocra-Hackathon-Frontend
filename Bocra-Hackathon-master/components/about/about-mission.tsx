"use client"

import { motion } from "framer-motion"
import { Eye, Target, Compass } from "lucide-react"

const pillars = [
    {
        title: "Our Mission",
        content:
            "To regulate the communications sector to promote competition, innovation, consumer protection, and universal access.",
        icon: Target,
        gradient: "from-bocra-blue to-bocra-blue/70",
        glow: "shadow-bocra-blue/20",
    },
    {
        title: "Our Vision",
        content:
            "A connected and Digitally Driven Society — a digitally enabled economy that fosters an inclusive, resilient, and competitive digital ecosystem to empower individuals, businesses, and government entities.",
        icon: Eye,
        gradient: "from-bocra-green to-bocra-green/70",
        glow: "shadow-bocra-green/20",
    },
    {
        title: "Our Values",
        content:
            "Integrity, transparency, accountability, excellence, and stakeholder-centricity drive everything we do as we lead Botswana into a digitally connected future.",
        icon: Compass,
        gradient: "from-bocra-gold to-bocra-gold/70",
        glow: "shadow-bocra-gold/20",
    },
]

export function AboutMission() {
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
                        Who We Are
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        Mission, Vision & Values
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <motion.div
                                whileHover={{ y: -6 }}
                                className={`relative h-full rounded-3xl bg-card/60 backdrop-blur-sm border border-border/50 p-8 hover:border-transparent hover:shadow-2xl ${pillar.glow} transition-all duration-300 group overflow-hidden`}
                            >
                                {/* Glow overlay on hover */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                    <pillar.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                                    {pillar.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {pillar.content}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
