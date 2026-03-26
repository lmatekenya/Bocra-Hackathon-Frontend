"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Users, Building2, ShieldCheck } from "lucide-react"

const stories = [
  {
    title: "Empowering Consumers",
    description:
      "We ensure fair access to communication services, protect consumer rights, and resolve disputes efficiently. Every citizen deserves reliable connectivity.",
    icon: Users,
    gradient: "from-bocra-blue/20 to-transparent",
    iconBg: "from-bocra-blue to-bocra-green",
    iconColor: "text-bocra-blue",
    href: "/complaints",
  },
  {
    title: "Supporting Businesses",
    description:
      "We create a competitive environment where businesses can thrive, innovate, and contribute to Botswana's growing digital economy.",
    icon: Building2,
    gradient: "from-bocra-green/20 to-transparent",
    iconBg: "from-bocra-green to-bocra-blue",
    iconColor: "text-bocra-green",
    href: "/services/licensing",
  },
  {
    title: "Securing Infrastructure",
    description:
      "We safeguard Botswana's digital infrastructure against cyber threats and ensure the integrity of our national communications network.",
    icon: ShieldCheck,
    gradient: "from-bocra-gold/20 to-transparent",
    iconBg: "from-bocra-gold to-bocra-blue",
    iconColor: "text-bocra-gold",
    href: "/cybersecurity",
  },
]

function StoryPanel({
  story,
  index,
}: {
  story: (typeof stories)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  const Icon = story.icon

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center py-32"
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${story.gradient} opacity-50`}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            style={{ y }}
            className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
          >
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${story.iconBg} bg-opacity-10 border border-white/10`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                {story.title}
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                {story.description}
              </p>

              <motion.a
                href={story.href}
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-bocra-blue font-semibold"
              >
                Learn more
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-bocra-blue/20 via-bocra-green/10 to-transparent rounded-3xl blur-3xl" />

              {/* Card */}
              <div className="relative h-full rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 p-8 flex items-center justify-center overflow-hidden">
                {/* Animated Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 1,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute w-32 h-32 rounded-full border-2 border-bocra-blue/30"
                  />
                ))}

                {/* Center Icon */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${story.iconBg} flex items-center justify-center shadow-2xl shadow-bocra-blue/25`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                {/* Floating Elements */}
                {[
                  "bg-bocra-blue",
                  "bg-bocra-green",
                  "bg-bocra-gold",
                  "bg-gradient-to-r from-bocra-blue to-bocra-green",
                  "bg-bocra-blue/80",
                  "bg-bocra-green/80"
                ].map((colorClass, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.sin(i) * 10, 0],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute w-3 h-3 rounded-full ${colorClass} opacity-80`}
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                      boxShadow: `0 0 10px 2px ${colorClass.includes('blue') ? '#005BA6' : colorClass.includes('gold') ? '#D4A843' : '#00A651'}40`
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function StorySection() {
  return (
    <section id="story" className="relative">
      {/* Progress Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30 hidden lg:block">
        <motion.div
          className="w-full bg-gradient-to-b from-bocra-blue to-bocra-green"
          style={{ height: "100%" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />
      </div>

      {stories.map((story, index) => (
        <StoryPanel key={story.title} story={story} index={index} />
      ))}
    </section>
  )
}
