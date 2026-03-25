import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Phone, CheckCircle2, Shield, RadioTower, Key } from "lucide-react"

export const metadata: Metadata = {
    title: "Telecommunications Mandate | BOCRA",
    description: "BOCRA regulates all aspects of telecommunications in Botswana, including wire, cellular, satellite, and cable services.",
}

const keyResponsibilities = [
    {
        title: "Application & Licensing",
        description: "Processing applications and issuing operating licenses for telecommunications services nationwide.",
        icon: Key,
    },
    {
        title: "Spectrum Management",
        description: "Managing and allocating radio frequency spectrum for wireless communications efficiently.",
        icon: RadioTower,
    },
    {
        title: "Consumer Protection",
        description: "Ensuring fair pricing, quality of service, and protection for all telecommunications users.",
        icon: Shield,
    },
    {
        title: "Equipment Type-Approval",
        description: "Type-approving communication equipment to ensure compliance with international safety and technical standards.",
        icon: CheckCircle2,
    },
]

export default function TelecommunicationsPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-bocra-blue/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bocra-blue to-bocra-green flex items-center justify-center shadow-lg shadow-bocra-blue/20">
                            <Phone className="w-8 h-8 text-white" />
                        </div>
                        <span className="px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-semibold tracking-wide uppercase">
                            Mandate Area
                        </span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Telecommunications
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        BOCRA regulates all aspects of telecommunications in Botswana, including wire,
                        cellular, satellite, and cable services — ensuring a competitive, innovative,
                        and accessible telecoms market for all.
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
                                    Under the Communications Regulatory Authority Act 2012, BOCRA has authority to regulate telecommunications. The telecommunications sector, spurred by mobile technology, continues to experience significant growth in terms of the total number of consumers and variety of services.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    The Telecommunications/ICT sector has undergone numerous reforms since the introduction of competition in 1998. Currently three Public Telecommunication Operators (PTOs) provide local, international, national and mobile services: <strong>Botswana Telecommunications Limited (BTCL)</strong>, <strong>Mascom Wireless Botswana</strong>, and <strong>Orange Botswana</strong>.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    The other major player in the market is <strong>Botswana Fibre Networks (BoFiNet)</strong>, created as a wholesale provider of national and international telecommunication infrastructure. The market for Internet telephony is fully liberalised, and Value Added Network Services (VANS) are allowed to provide voice over internet protocol (VoIP) services using any technology including VSAT.
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
