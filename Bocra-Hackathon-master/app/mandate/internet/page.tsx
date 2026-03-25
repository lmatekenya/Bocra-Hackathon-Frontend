import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Globe, Shield, Activity, Target, Zap } from "lucide-react"

export const metadata: Metadata = {
    title: "Internet & ICTs Mandate | BOCRA",
    description: "BOCRA regulates the Internet and ICTs in Botswana, managing the .bw domain and facilitating sector growth.",
}

const keyResponsibilities = [
    {
        title: ".BW Domain Management",
        description: "Managing and administering the .bw country code top-level domain (ccTLD) as a vital national resource.",
        icon: Globe,
    },
    {
        title: "Market Facilitation",
        description: "Creating an enabling environment to facilitate the growth of the Internet market and ICT adoption.",
        icon: Target,
    },
    {
        title: "Consumer Protection",
        description: "Addressing concerns regarding internet bandwidth pricing and protecting consumers in the digital landscape.",
        icon: Shield,
    },
    {
        title: "Infrastructure & Growth",
        description: "Regulating ICT infrastructure development to ensure reliable, high-speed connectivity for all Batswana.",
        icon: Zap,
    },
]

export default function InternetPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-blue-400 to-bocra-blue" />
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-bocra-blue/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bocra-blue to-blue-600 flex items-center justify-center shadow-lg shadow-bocra-blue/20">
                            <Globe className="w-8 h-8 text-white" />
                        </div>
                        <span className="px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-semibold tracking-wide uppercase">
                            Mandate Area
                        </span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Internet & ICTs
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Leading Botswana's digital transformation by regulating the Internet, managing the .bw
                        domain, and fostering a secure, innovative digital landscape.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Overview */}
                        <div className="space-y-8">
                            <h2 className="font-display text-3xl font-bold text-foreground">Sector Overview</h2>
                            <div className="prose prose-lg dark:prose-invert">
                                <p className="text-muted-foreground leading-relaxed">
                                    BOCRA is entirely responsible for the regulation of the Internet and cutting-edge
                                    Information and Communications Technologies (ICTs) in Botswana. Our goal is to
                                    nurture an environment that empowers a "Digitally Driven Society."
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    A cornerstone of this mandate is the direct management of the <strong>.bw</strong> country
                                    code top-level domain (ccTLD), a digital national asset delegated to BOCRA during its
                                    formation. The Authority actively works to facilitate the growth of the local Internet
                                    market, drive the uptake of ICT innovations, and resolve critical consumer concerns such
                                    as internet bandwidth pricing and digital security.
                                </p>
                            </div>

                            {/* Action */}
                            <div className="pt-8">
                                <a
                                    href="/about#mandate"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
                                >
                                    ← Back to Mandate
                                </a>
                            </div>
                        </div>

                        {/* Key Responsibilities */}
                        <div>
                            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Key Responsibilities</h2>
                            <div className="grid gap-6">
                                {keyResponsibilities.map((item) => (
                                    <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-card border border-border">
                                        <div className="w-12 h-12 rounded-xl bg-bocra-blue/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-6 h-6 text-bocra-blue" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
