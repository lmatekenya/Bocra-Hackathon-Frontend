import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Mail, Package, ShieldCheck, Map } from "lucide-react"

export const metadata: Metadata = {
    title: "Postal Services Mandate | BOCRA",
    description: "BOCRA supervises the provision of postal services in Botswana, licensing ordinary mail and courier operations nationwide.",
}

const keyResponsibilities = [
    {
        title: "Universal Postal Services",
        description: "Developing and enforcing a licensing framework for ordinary, universal mail services across the entire country.",
        icon: Mail,
    },
    {
        title: "Courier Operations",
        description: "Licensing and monitoring private courier and express delivery services to ensure reliability and safety.",
        icon: Package,
    },
    {
        title: "Service Reliability",
        description: "Ensuring the provision of safe, efficient, and affordable postal infrastructure for both rural and urban areas.",
        icon: ShieldCheck,
    },
    {
        title: "Nationwide Coverage",
        description: "Overseeing the expansion of the postal network to guarantee all Batswana have access to vital mail services.",
        icon: Map,
    },
]

export default function PostalPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-green via-emerald-400 to-bocra-green" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-bocra-green/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bocra-green to-emerald-600 flex items-center justify-center shadow-lg shadow-bocra-green/10">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <span className="px-4 py-2 rounded-full bg-bocra-green/10 text-bocra-green text-sm font-semibold tracking-wide uppercase">
                            Mandate Area
                        </span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Postal Services
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        BOCRA supervises the national postal sector, ensuring safe, reliable, and affordable
                        mail and courier services throughout Botswana.
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
                                    BOCRA supervises the comprehensive provision of postal services throughout Botswana.
                                    By law, it prohibits any person or entity from offering these commercial services
                                    without a valid licence, ensuring strict regulatory oversight.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    The Authority is committed to the provision of safe, reliable, efficient, and
                                    affordable postal services that reach every corner of the country. To achieve this,
                                    BOCRA has developed a robust licensing framework for the postal sector that categorises
                                    and governs both ordinary mail services (universal postal services) and modern,
                                    fast-paced courier services.
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
                                        <div className="w-12 h-12 rounded-xl bg-bocra-green/10 flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-6 h-6 text-bocra-green" />
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
