import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StorySection } from "@/components/story-section"
import { ProcessSection } from "@/components/process-section"
import { QuickActions } from "@/components/quick-actions"
import { ServicesSection } from "@/components/services-section"
import { NewsSection } from "@/components/news-section"
import { StatsSection } from "@/components/stats-section"
import { SearchSection } from "@/components/search-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StorySection />
      <QuickActions />
      <ProcessSection />
      <ServicesSection />
      <StatsSection />
      <NewsSection />
      <SearchSection />
      <Footer />
    </main>
  )
}
