"use client"

import { motion } from "framer-motion"
import { Crown, Award } from "lucide-react"

const boardMembers = [
    {
        name: "Dr. Bokamoso Basutli",
        role: "Chairperson",
        bio: "Professional engineer and Head of the Department of Electrical and Communications Systems Engineering at the Botswana International University of Science and Technology (BIUST).",
        isChair: true,
    },
    {
        name: "Mr. Moabi Pusumane",
        role: "Vice Chairperson",
        bio: "Commercial Director at Coca-Cola Beverages Botswana, bringing extensive commercial leadership and corporate governance experience.",
        isChair: false,
    },
    {
        name: "Ms. Montle Phuthego",
        role: "Board Member",
        bio: "A business development and trade expert with wide-ranging experience in strategy, trade facilitation, and economic development.",
        isChair: false,
    },
    {
        name: "Ms. Alta Dimpho Seleka",
        role: "Board Member",
        bio: "A finance professional with extensive experience in public financial management, bringing fiscal oversight and accountability expertise.",
        isChair: false,
    },
    {
        name: "Ms. Lebogang George",
        role: "Board Member",
        bio: "Partner at AJA/MCL and an attorney specialising in commercial, ICT, and corporate governance law.",
        isChair: false,
    },
    {
        name: "Mr. Ronald Kgafela",
        role: "Board Member",
        bio: "A human capital and organisational development leader with specialised expertise in talent strategy and workforce transformation.",
        isChair: false,
    },
    {
        name: "Dr. Kennedy Ramojela",
        role: "Board Member",
        bio: "A media and communications scholar, contributing academic expertise and research insight to BOCRA's regulatory and policy work.",
        isChair: false,
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

export function AboutBoard() {
    return (
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full border border-bocra-green/10"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-bocra-gold/10 text-bocra-gold text-sm font-medium mb-6">
                        Governance
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        Board of Directors
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Appointed by the Minister responsible for Communications, our Board provides
                        strategic oversight and accountability for BOCRA's mandate.
                    </p>
                </motion.div>

                {/* Chairperson highlighted */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-10 flex justify-center"
                >
                    <motion.div
                        whileHover={{ y: -6 }}
                        className="relative max-w-sm w-full rounded-3xl bg-gradient-to-br from-bocra-blue/15 to-bocra-green/10 border border-bocra-blue/30 p-8 text-center overflow-hidden"
                    >
                        <div className="absolute top-4 right-4">
                            <Crown className="w-5 h-5 text-bocra-gold" />
                        </div>
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bocra-blue to-bocra-green flex items-center justify-center mx-auto mb-4 shadow-xl shadow-bocra-blue/25">
                            <span className="font-display text-2xl font-bold text-white">
                                {getInitials(boardMembers[0].name)}
                            </span>
                        </div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-1">
                            {boardMembers[0].name}
                        </h3>
                        <span className="inline-block px-3 py-1 rounded-full bg-bocra-blue/10 text-bocra-blue text-xs font-semibold mb-3">
                            {boardMembers[0].role}
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {boardMembers[0].bio}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Vice Chair + remaining members */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boardMembers.slice(1).map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="h-full rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-6 hover:border-bocra-blue/20 hover:bg-card transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-bocra-blue/20 to-bocra-green/20 group-hover:from-bocra-blue/30 group-hover:to-bocra-green/30 flex items-center justify-center transition-colors flex-shrink-0">
                                        <span className="font-display text-lg font-bold text-bocra-blue">
                                            {getInitials(member.name)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground leading-tight">{member.name}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            {member.role === "Vice Chairperson" && (
                                                <Award className="w-3 h-3 text-bocra-gold" />
                                            )}
                                            <span className="text-xs text-bocra-green font-medium">{member.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
