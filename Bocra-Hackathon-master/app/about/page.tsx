import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutMission } from "@/components/about/about-mission"
import { AboutMandate } from "@/components/about/about-mandate"
import { AboutBoard } from "@/components/about/about-board"
import { AboutLeadership } from "@/components/about/about-leadership"
import { AboutHistory } from "@/components/about/about-history"

export const metadata: Metadata = {
    title: "About BOCRA | Botswana Communications Regulatory Authority",
    description:
        "Learn about BOCRA — established in 2013 under the CRA Act to regulate Botswana's communications sector including telecommunications, broadcasting, internet, and postal services.",
}

export default function AboutPage() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <AboutHero />
            <AboutMission />
            <AboutHistory />
            <AboutMandate />
            <AboutBoard />
            <AboutLeadership />
            <Footer />
        </main>
    )
}
