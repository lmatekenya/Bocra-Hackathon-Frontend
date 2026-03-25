"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"
import { Phone, Radio, Globe, Wifi, Shield, FileText, Satellite, Mail } from "lucide-react"

const services = [
  {
    title: "Telecommunications",
    description: "Regulating voice, data, and broadband services across Botswana",
    icon: Phone,
    stats: "12M+ subscribers",
    href: "/mandate/telecommunications",
  },
  {
    title: "Broadcasting",
    description: "Licensing and monitoring TV and radio broadcast services",
    icon: Radio,
    stats: "50+ licenses",
    href: "/mandate/broadcasting",
  },
  {
    title: "Internet Services",
    description: "Ensuring quality internet access for all citizens",
    icon: Globe,
    stats: "99.9% uptime",
    href: "/mandate/internet",
  },
  {
    title: "Spectrum Management",
    description: "Efficient allocation and monitoring of radio frequencies",
    icon: Wifi,
    stats: "500+ allocations",
    href: "/services/spectrum",
  },
  {
    title: "Cybersecurity",
    description: "Protecting national digital infrastructure and citizens",
    icon: Shield,
    stats: "24/7 monitoring",
    href: "/cybersecurity",
  },
  {
    title: "Licensing",
    description: "Streamlined licensing for operators and service providers",
    icon: FileText,
    stats: "200+ active licenses",
    href: "/services/licensing",
  },
  {
    title: "Satellite Services",
    description: "Coordinating satellite communications and services",
    icon: Satellite,
    stats: "15 providers",
    href: "/services/satellite",
  },
  {
    title: "Postal Services",
    description: "Regulating postal and courier services nationwide",
    icon: Mail,
    stats: "100% coverage",
    href: "/mandate/postal",
  },
]

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({
    container: containerRef,
  })

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bocra-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          >
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-medium mb-6">
                Our Services
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Comprehensive Regulatory<br className="hidden lg:block" /> Services
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-md">
              From telecommunications to cybersecurity, we cover all aspects of digital regulation.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide pb-8"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex gap-6 px-6 lg:px-8 w-max">
            {/* Spacer */}
            <div className="w-[calc((100vw-1280px)/2)] flex-shrink-0 hidden xl:block" />

            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 scroll-snap-align-start"
                style={{ scrollSnapAlign: "start" }}
              >
                <motion.a
                  href={service.href}
                  whileHover={{ y: -8 }}
                  className="group block h-full rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 hover:bg-card hover:border-bocra-blue/30 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bocra-blue/10 to-bocra-green/10 flex items-center justify-center mb-6 group-hover:from-bocra-blue/20 group-hover:to-bocra-green/20 transition-colors cursor-pointer">
                    <service.icon className="w-7 h-7 text-bocra-blue" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-bocra-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Stats */}
                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    <span className="text-2xl font-bold text-bocra-green">{service.stats}</span>
                    <span className="text-bocra-blue text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-x-3 group-hover:translate-x-0">View &rarr;</span>
                  </div>
                </motion.a>
              </motion.div>
            ))}

            {/* Spacer */}
            <div className="w-[calc((100vw-1280px)/2)] flex-shrink-0 hidden xl:block" />
          </div>
        </div>

        {/* Scroll Progress */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-1 bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-bocra-blue to-bocra-green rounded-full"
                style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
              />
            </div>
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  )
}
