"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FileText, Clock, CheckCircle2, Send } from "lucide-react"

const steps = [
  {
    step: 1,
    title: "Submit Complaint",
    description: "File your complaint through our secure online portal with all relevant details and documentation.",
    icon: Send,
  },
  {
    step: 2,
    title: "Under Review",
    description: "Our team reviews your submission and assigns it to the appropriate regulatory department.",
    icon: FileText,
  },
  {
    step: 3,
    title: "Processing",
    description: "We work with service providers to investigate and address your concerns promptly.",
    icon: Clock,
  },
  {
    step: 4,
    title: "Resolution",
    description: "Receive a detailed resolution with clear outcomes and any necessary follow-up actions.",
    icon: CheckCircle2,
  },
]

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border border-bocra-blue/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full border border-bocra-green/10"
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
          <span className="inline-block px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-medium mb-6">
            How It Works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Resolution Made Simple
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process ensures your concerns are addressed efficiently and transparently.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/30 -translate-x-1/2 hidden lg:block rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-bocra-blue to-bocra-green"
              style={{ height: progress.get() + "%" }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-24 lg:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 === 1 ? "lg:direction-rtl" : ""
                  }`}
              >
                {/* Step Number Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-16 h-16 rounded-full bg-card border-4 border-bocra-blue flex items-center justify-center shadow-xl shadow-bocra-blue/20"
                  >
                    <span className="font-display text-xl font-bold text-bocra-blue">
                      {step.step}
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div
                  className={`${index % 2 === 0 ? "lg:pr-24 lg:text-right" : "lg:pl-24 lg:col-start-2"
                    }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 shadow-xl hover:border-bocra-blue/20 transition-colors"
                  >
                    <div
                      className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""
                        }`}
                    >
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-bocra-blue/10 flex items-center justify-center lg:hidden">
                        <span className="font-display text-lg font-bold text-bocra-blue">
                          {step.step}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bocra-blue to-bocra-green flex items-center justify-center shadow-lg">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Visual */}
                <div
                  className={`hidden lg:block ${index % 2 === 0 ? "lg:pl-24" : "lg:pr-24 lg:col-start-1 lg:row-start-1"
                    }`}
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="aspect-square max-w-xs mx-auto"
                  >
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-bocra-blue/5 to-bocra-green/5 border border-border/30 flex items-center justify-center">
                      <step.icon className="w-24 h-24 text-bocra-blue/30" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
