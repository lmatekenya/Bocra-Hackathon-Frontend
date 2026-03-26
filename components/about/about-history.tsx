"use client"

import { motion } from "framer-motion"

const timeline = [
    {
        year: "2012",
        title: "Communications Regulatory Authority Act",
        description:
            "Parliament of Botswana passes the CRA Act, 2012 — the legal foundation establishing the framework for a unified Communications Regulatory Authority.",
    },
    {
        year: "2013",
        title: "BOCRA Established",
        description:
            "On 1 April 2013 BOCRA officially opens its doors, replacing the Botswana Telecommunications Authority (BTA) with a broader mandate covering telecommunications, broadcasting, internet, ICTs, and postal services.",
    },
    {
        year: "2016",
        title: ".BW Domain Management",
        description:
            "BOCRA assumes responsibility for managing the .bw country-code top-level domain as a national resource, ensuring its efficient and non-discriminatory operation for Botswana citizens and businesses.",
    },
    {
        year: "2019",
        title: "Cybersecurity Expansion",
        description:
            "BOCRA expands its mandate to include active cybersecurity regulation, establishing frameworks to protect Botswana's national digital infrastructure against emerging cyber threats.",
    },
    {
        year: "2024",
        title: "Strategic Plan 2024–2029",
        description:
            "BOCRA launches its ambitious 5-year Strategic Plan with the vision of 'A Digitally Enabled Economy', outlining six pillars: competition, universal access, consumer protection, resource optimisation, talent management, and stakeholder engagement.",
    },
    {
        year: "2025",
        title: "New Board Appointed",
        description:
            "The Minister of Communications appoints a new seven-member Board of Directors effective August 2025, led by Chairperson Dr. Bokamoso Basutli, to steer BOCRA into its next chapter.",
    },
]

export function AboutHistory() {
    return (
        <section className="relative py-28 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full border border-bocra-blue/10"
                />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-bocra-green/10 text-bocra-green text-sm font-medium mb-6">
                        Our Journey
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                        History & Milestones
                    </h2>
                    <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                        Over a decade of shaping Botswana's digital landscape.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-border/30">
                        <motion.div
                            className="w-full bg-gradient-to-b from-bocra-blue to-bocra-green"
                            initial={{ scaleY: 0, originY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ height: "100%" }}
                        />
                    </div>

                    <div className="space-y-12 lg:space-y-16">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                className={`relative flex gap-8 lg:gap-0 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                    }`}
                            >
                                {/* Mobile / Desktop dot */}
                                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                                    <motion.div
                                        whileInView={{ scale: [0, 1.3, 1] }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.08 + 0.2 }}
                                        className="w-6 h-6 rounded-full bg-gradient-to-br from-bocra-blue to-bocra-green border-4 border-background shadow-lg shadow-bocra-blue/30"
                                    />
                                </div>

                                {/* Content card */}
                                <div
                                    className={`ml-20 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"
                                        }`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-bocra-blue/20 transition-colors"
                                    >
                                        <div className="inline-flex items-center gap-2 mb-3">
                                            <span className="font-display text-2xl font-bold bg-gradient-to-r from-bocra-blue to-bocra-green bg-clip-text text-transparent">
                                                {item.year}
                                            </span>
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Spacer for opposite side on desktop */}
                                <div className="hidden lg:block lg:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
