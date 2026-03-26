"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Loader2 } from "lucide-react"
import type { NewsArticle } from "@/types"
import { fetchNews } from "@/lib/api"

const fallbackNews: NewsArticle[] = [
  {
    id: "1",
    title: "New Cybersecurity Regulations Coming in 2026",
    summary: "BOCRA announces comprehensive cybersecurity framework to protect national digital infrastructure.",
    publishedAt: "2026-03-20",
    category: "Policy",
    slug: "cybersecurity-regulations-2026",
  },
  {
    id: "2",
    title: "5G Network Expansion Reaches Rural Areas",
    summary: "Major milestone achieved as 5G coverage extends to remote communities across Botswana.",
    publishedAt: "2026-03-18",
    category: "Infrastructure",
    slug: "5g-rural-expansion",
  },
  {
    id: "3",
    title: "Consumer Protection Guidelines Updated",
    summary: "Enhanced guidelines ensure fair pricing and quality service delivery for all telecommunications users.",
    publishedAt: "2026-03-15",
    category: "Consumer",
    slug: "consumer-protection-update",
  },
]

export function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>(fallbackNews)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNews() {
      try {
        const articles = await fetchNews(3)
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

  function formatDate(dateStr?: string) {
    if (!dateStr) return "Recent"
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return "Recent"
    }
  }

  return (
    <section id="news" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-bocra-green/10 text-bocra-green text-sm font-medium mb-6">
              Latest News
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Stay Informed
            </h2>
          </div>
          <motion.a
            href="/news"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-bocra-blue font-semibold"
          >
            View all news
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-bocra-blue animate-spin" />
          </div>
        )}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
                <motion.a
                  href="/news"
                  whileHover={{ y: -8 }}
                  className="block"
                >
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-bocra-blue/20 to-bocra-green/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="font-display text-2xl font-bold text-bocra-blue">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-bocra-blue/80 to-bocra-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold flex items-center gap-2">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-bocra-blue/10 text-bocra-blue text-xs font-medium">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-bocra-blue transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                </div>
              </motion.a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
