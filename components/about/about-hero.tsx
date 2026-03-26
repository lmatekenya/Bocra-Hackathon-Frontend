"use client"

import { motion } from "framer-motion"
import { Shield, ArrowDown } from "lucide-react"

export function AboutHero() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />

            {/* Animated orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-1/4 w-96 h-96 bg-bocra-blue/15 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-bocra-green/15 rounded-full blur-3xl"
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-bocra-blue/50" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#about-grid)" />
                </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-bocra-blue/10 border border-bocra-blue/20 mb-8"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bocra-blue to-bocra-green flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-bocra-blue text-sm font-semibold tracking-wide uppercase">
                        Est. 1 April 2013
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
                >
                    About{" "}
                    <span className="bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
                        BOCRA
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                >
                    The Botswana Communications Regulatory Authority is the independent regulatory body
                    overseeing telecommunications, broadcasting, internet, and postal services — building
                    a connected and digitally driven society for all Batswana.
                </motion.p>

                {/* Scroll cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-flex flex-col items-center gap-2 text-muted-foreground"
                    >
                        <span className="text-xs uppercase tracking-widest">Explore</span>
                        <ArrowDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
