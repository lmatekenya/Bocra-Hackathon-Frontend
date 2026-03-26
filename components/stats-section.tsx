"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { fetchStats } from "@/lib/api"
import type { Stat } from "@/types"
import { Loader2 } from "lucide-react"

const defaultStats: Stat[] = [
  {
    id: "stats-1",
    value: 15420,
    suffix: "+",
    label: "Complaints Resolved",
    description: "Successfully processed consumer complaints",
  },
  {
    id: "stats-2",
    value: 847,
    suffix: "",
    label: "Active Licenses",
    description: "Licensed operators and service providers",
  },
  {
    id: "stats-3",
    value: 125000,
    suffix: "+",
    label: "Domains Registered",
    description: ".bw domains registered and managed",
  },
  {
    id: "stats-4",
    value: 99.8,
    suffix: "%",
    label: "Uptime Achieved",
    description: "Network infrastructure reliability",
  },
]

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number
  suffix: string
  inView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  const formattedValue =
    value % 1 === 0
      ? count.toLocaleString()
      : count.toFixed(1)

  return (
    <span className="tabular-nums">
      {formattedValue}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [stats, setStats] = useState<Stat[]>(defaultStats)

  // Backend integration for Stats
  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchStats()
        if (data && data.length > 0) {
          setStats(data)
        }
      } catch (err) {
        console.error("Failed to load backend stats:", err)
      }
    }
    loadStats()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bocra-blue/5 via-background to-bocra-green/5" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-bocra-blue/10"
          style={{ transformOrigin: "center" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-bocra-green/10"
          style={{ transformOrigin: "center" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-bocra-green/10 text-bocra-green text-sm font-medium mb-6">
            Our Impact
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Numbers That Matter
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            See the real impact of our regulatory work across Botswana.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative h-full rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 text-center overflow-hidden group hover:border-bocra-blue/30 transition-colors"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-bocra-blue/5 to-bocra-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="relative">
                  <div className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-3">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      inView={isInView}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
