"use client"

import { motion } from "framer-motion"
import { MessageSquareWarning, FileCheck2, Globe2, ShieldAlert, ArrowUpRight } from "lucide-react"

const actions = [
  {
    title: "File Complaint",
    description: "Report issues with your telecommunications or broadcast services",
    icon: MessageSquareWarning,
    href: "#complaint",
    color: "from-bocra-blue to-bocra-blue/80",
    glowColor: "shadow-bocra-blue/25",
    delay: 0,
  },
  {
    title: "Apply License",
    description: "Apply for broadcasting, telecommunications, or postal licenses",
    icon: FileCheck2,
    href: "#licenses",
    color: "from-bocra-green to-bocra-green/80",
    glowColor: "shadow-bocra-green/25",
    delay: 0.1,
  },
  {
    title: "Search Domain",
    description: "Check availability and register .bw domain names",
    icon: Globe2,
    href: "#domains",
    color: "from-bocra-gold to-bocra-gold/80",
    glowColor: "shadow-bocra-gold/25",
    delay: 0.2,
  },
  {
    title: "Report Cyber Incident",
    description: "Report cybersecurity threats, breaches, or suspicious activities",
    icon: ShieldAlert,
    href: "#cyber",
    color: "from-bocra-blue to-bocra-green",
    glowColor: "shadow-bocra-blue/25",
    delay: 0.3,
  },
]

export function QuickActions() {
  return (
    <section id="actions" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-bocra-green/10 text-bocra-green text-sm font-medium mb-6">
            Quick Actions
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            What can we help you with?
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Access our most popular services and get started in minutes.
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action) => (
            <motion.a
              key={action.title}
              href={action.href}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: action.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative block"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />

              {/* Card */}
              <div className="relative h-full rounded-3xl bg-card border border-border/50 p-8 overflow-hidden transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-bocra-blue/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />

                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} shadow-lg ${action.glowColor} mb-6`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-bocra-blue transition-colors">
                  {action.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {action.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-bocra-blue font-medium text-sm">
                  <span>Get started</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
