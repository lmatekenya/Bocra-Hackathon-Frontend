"use client"

import Link from "next/link"
import {
  ArrowRight,
  BookOpenText,
  FileCheck2,
  Globe2,
  Radio,
  ShieldCheck,
  Users2,
  Wifi,
} from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { NewsSection } from "@/components/news-section"
import { QuickActions } from "@/components/quick-actions"
import { StatsSection } from "@/components/stats-section"

const servicePillars = [
  {
    title: "Telecommunications",
    description:
      "Licensing, quality of service oversight, and fair competition across fixed and mobile networks.",
    icon: Radio,
    href: "/mandate/telecommunications",
  },
  {
    title: "Internet & Digital Services",
    description:
      "Domain governance, internet ecosystem development, and trusted access across Botswana.",
    icon: Globe2,
    href: "/mandate/internet",
  },
  {
    title: "Spectrum & Infrastructure",
    description:
      "Efficient spectrum planning and assignment to support innovation and nationwide connectivity.",
    icon: Wifi,
    href: "/services/spectrum",
  },
  {
    title: "Consumer & Cyber Protection",
    description:
      "Dispute resolution, incident reporting, and national digital safety coordination through BwCSIRT.",
    icon: ShieldCheck,
    href: "/cybersecurity",
  },
]

const leadershipCommitments = [
  "Protect consumers through transparent complaints and enforcement workflows.",
  "Support innovation by reducing regulatory friction for compliant operators.",
  "Strengthen cyber resilience with rapid incident response and public advisories.",
]

export default function HomePage() {
  const reducedMotion = useReducedMotion()

  const fadeUp = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: reducedMotion ? 0 : 0.7, ease: "easeOut" as const },
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <motion.section
        initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.7 }}
        className="relative overflow-hidden border-b border-border bg-gradient-to-b from-bocra-blue/[0.08] via-background to-background pt-36 pb-20"
      >
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  opacity: [0.6, 1, 0.6],
                }
          }
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,91,166,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(0,166,81,0.12),transparent_42%)]"
        />
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -20, 0],
                  x: [0, 8, 0],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 right-16 h-40 w-40 rounded-full bg-bocra-blue/10 blur-3xl"
        />
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 18, 0],
                  x: [0, -12, 0],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-8 h-48 w-48 rounded-full bg-bocra-green/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.7 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-bocra-blue/20 bg-bocra-blue/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-bocra-blue">
                Botswana Communications Regulatory Authority
              </span>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Trusted regulation for a secure and connected Botswana.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                We regulate communications markets, protect consumers, and support
                resilient digital infrastructure so citizens and businesses can thrive.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ y: reducedMotion ? 0 : -2 }}>
                  <Link
                    href="/complaints"
                    className="inline-flex items-center gap-2 rounded-full bg-bocra-blue px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#004f90]"
                  >
                    Report a Complaint
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: reducedMotion ? 0 : -2 }}>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-bocra-blue/30 hover:text-bocra-blue"
                  >
                    Learn About BOCRA
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.15 }}
            >
              <div className="rounded-3xl border border-border bg-card/90 p-8 shadow-xl shadow-bocra-blue/5 backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  2026 Priorities
                </h2>
                <ul className="mt-6 space-y-4">
                  {leadershipCommitments.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.4,
                        delay: reducedMotion ? 0 : 0.2 + index * 0.08,
                      }}
                      className="flex gap-3"
                    >
                      <Users2 className="mt-0.5 h-5 w-5 flex-none text-bocra-green" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="/documents"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-bocra-blue hover:text-bocra-green"
                >
                  Explore public documents
                  <BookOpenText className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="mb-12 flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-bocra-green">
                Mandate Areas
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
                Professional digital regulation in action
              </h2>
            </div>
            <Link
              href="/services/licensing"
              className="hidden items-center gap-2 text-sm font-semibold text-bocra-blue hover:text-bocra-green sm:inline-flex"
            >
              View licensing information
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {servicePillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.08 }}
                whileHover={{ y: reducedMotion ? 0 : -4 }}
                className="group rounded-3xl border border-border bg-card p-7 transition hover:border-bocra-blue/25 hover:shadow-lg hover:shadow-bocra-blue/10"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-bocra-blue/10 text-bocra-blue">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
                <Link
                  href={pillar.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-bocra-blue transition group-hover:text-bocra-green"
                >
                  Explore service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <QuickActions />
      <StatsSection />

      <motion.section
        {...fadeUp}
        className="border-y border-border bg-muted/20 py-16"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-bocra-blue">
              Built for Accountability
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Clear processes, secure systems, measurable service outcomes.
            </h2>
          </div>
          <motion.div whileHover={{ scale: reducedMotion ? 1 : 1.02 }}>
            <Link
              href="/tenders"
              className="inline-flex items-center gap-2 rounded-full bg-bocra-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#008f45]"
            >
              View Open Tenders
              <FileCheck2 className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <NewsSection />
      <Footer />
    </main>
  )
}

