"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, ArrowRight, Rss, Loader2 } from "lucide-react"
import { fetchNews } from "@/lib/api"
import type { NewsArticle } from "@/types"

const fallbackNews: NewsArticle[] = [
    {
        id: "demo-news-1",
        title: "BOCRA Strengthens National Cyber Resilience Framework",
        summary: "A coordinated cyber preparedness program has been launched across public institutions and operators.",
        category: "Cyber Advisory",
        publishedAt: "2026-03-24",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
        slug: "bocra-cyber-resilience-framework",
    },
    {
        id: "demo-news-2",
        title: "Rural Broadband Expansion Milestone Reached",
        summary: "Regulatory incentives and infrastructure coordination have improved broadband access in underserved districts.",
        category: "Press Release",
        publishedAt: "2026-03-20",
        imageUrl: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=1200&q=80",
        slug: "rural-broadband-expansion-milestone",
    },
    {
        id: "demo-news-3",
        title: "Updated Type Approval Compliance Notice Issued",
        summary: "Vendors and importers are advised on updated compliance requirements for communications equipment.",
        category: "Regulation Update",
        publishedAt: "2026-03-18",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
        slug: "type-approval-compliance-notice-2026",
    },
]

export default function NewsPage() {
    const [news, setNews] = useState<NewsArticle[]>(fallbackNews)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadNews = async () => {
            try {
                const articles = await fetchNews()
                if (articles.length > 0) {
                    setNews(articles)
                }
            } catch (err) {
                console.error("Failed to load news:", err)
            } finally {
                setLoading(false)
            }
        }
        loadNews()
    }, [])

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-bocra-green/10 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bocra-green/10 text-bocra-green text-sm font-semibold tracking-wide uppercase mb-6">
                        <Rss className="w-4 h-4" />
                        Media Centre
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        News & Press Releases
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Stay updated with the latest regulatory announcements, industry developments,
                        and official press statements from the Botswana Communications Regulatory Authority.
                    </p>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-bocra-blue animate-spin mb-4" />
                            <p className="text-muted-foreground">Loading latest news...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative flex flex-col items-start justify-between rounded-3xl bg-card border border-border/50 hover:border-bocra-blue/30 hover:shadow-xl hover:shadow-bocra-blue/5 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <img
                                            src={item.imageUrl || `https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80`}
                                            alt={item.title}
                                            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                                        <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center rounded-full bg-bocra-blue/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white shadow-sm">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 sm:p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-x-2 text-xs text-muted-foreground mb-4">
                                            <Calendar className="w-4 h-4" />
                                            {item.publishedAt ? (
                                                <time dateTime={item.publishedAt}>
                                                    {new Date(item.publishedAt).toLocaleDateString("en-BW", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </time>
                                            ) : (
                                                <span>Recent</span>
                                            )}
                                        </div>

                                        <h3 className="font-display text-xl font-bold text-foreground group-hover:text-bocra-blue transition-colors mb-4 line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-muted-foreground line-clamp-3 mb-6 text-sm leading-relaxed flex-1">
                                            {item.summary}
                                        </p>

                                        <div className="flex items-center text-sm font-semibold text-bocra-blue group-hover:text-bocra-green transition-colors mt-auto">
                                            Read full article
                                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    )
}
