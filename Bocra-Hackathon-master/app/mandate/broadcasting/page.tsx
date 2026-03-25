import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Radio, Mic2, Tv, FileText, Settings } from "lucide-react"

export const metadata: Metadata = {
    title: "Broadcasting Mandate | BOCRA",
    description: "BOCRA regulates commercial radio and television broadcasting services across Botswana, setting local content standards.",
}

const keyResponsibilities = [
    {
        title: "Commercial Licensing",
        description: "Issuing and renewing licenses for commercial radio and television stations across the nation.",
        icon: FileText,
    },
    {
        title: "Content Standards",
        description: "Specifying and enforcing local content percentage requirements to promote Botswana's culture and creative industry.",
        icon: Tv,
    },
    {
        title: "Subscription Services",
        description: "Regulating subscription management services and re-broadcasting activities to ensure consumer value.",
        icon: Settings,
    },
    {
        title: "Spectrum Allocation",
        description: "Allocating broadcast frequencies to prevent interference and ensure high-quality transmission.",
        icon: Mic2,
    },
]

export default function BroadcastingPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-gold via-orange-400 to-bocra-gold" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-bocra-gold/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bocra-gold to-orange-400 flex items-center justify-center shadow-lg shadow-bocra-gold/20">
                            <Radio className="w-8 h-8 text-white" />
                        </div>
                        <span className="px-4 py-2 rounded-full bg-bocra-gold/10 text-bocra-gold text-sm font-semibold tracking-wide uppercase">
                            Mandate Area
                        </span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Broadcasting
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        BOCRA regulates commercial broadcasting, subscription management services, and
                        re-broadcasting activities — championing local content and high standards.
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
                                    The Authority regulates all broadcasting activities in Botswana, with the notable
                                    exception of state broadcasting. By assuming these responsibilities (previously held
                                    by the National Broadcasting Board), BOCRA has created a converged regulatory authority
                                    that streamlines the media landscape.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    BOCRA plays a crucial role in shaping the media citizens consume. It licenses and
                                    actively regulates major commercial radio stations such as Yarona FM, Duma FM, and Gabz FM,
                                    alongside television stations like eBotswana. A key part of this mandate is explicitly
                                    specifying local content quotas to ensure that Botswana's unique voice, culture, and
                                    creative talent are amplified across the airwaves.
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
