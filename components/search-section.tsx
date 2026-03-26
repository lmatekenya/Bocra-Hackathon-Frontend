"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Loader2, ExternalLink } from "lucide-react"
import type { SearchResult } from "@/types"
import { searchSite } from "@/lib/api"

const filters = [
  "All",
  "Services",
  "Licenses",
  "Complaints",
  "Domains",
  "News",
  "Regulations",
]

export function SearchSection() {
  const [focused, setFocused] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const performSearch = useCallback(async (searchQuery: string, filter: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)
    try {
      const results = await searchSite(searchQuery, filter)
      setResults(results)
    } catch {
      // Silently fail and show no results
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      performSearch(query, activeFilter)
    }
  }

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    if (query.trim()) {
      performSearch(query, filter)
    }
  }

  const handlePopularSearch = (term: string) => {
    setQuery(term)
    performSearch(term, activeFilter)
  }

  const typeIcons: Record<string, string> = {
    service: "🔧",
    news: "📰",
    license: "📋",
    regulation: "⚖️",
    complaint: "📝",
    domain: "🌐",
  }

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />

      {/* Decorative Lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            className="absolute h-px bg-gradient-to-r from-transparent via-bocra-blue to-transparent"
            style={{ top: `${10 + i * 10}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            How can we help?
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Search our database for services, regulations, forms, and more.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-8"
        >
          <motion.div
            animate={{
              scale: focused ? 1.02 : 1,
              boxShadow: focused
                ? "0 25px 50px -12px rgba(0, 91, 166, 0.25)"
                : "0 10px 40px -15px rgba(0, 0, 0, 0.1)",
            }}
            className="relative"
          >
            {/* Glow Effect */}
            <AnimatePresence>
              {focused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -inset-px rounded-2xl bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue opacity-50 blur-sm"
                />
              )}
            </AnimatePresence>

            <div className="relative flex items-center">
              <Search className="absolute left-6 w-6 h-6 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for services, licenses, regulations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={handleKeyDown}
                className="w-full h-16 sm:h-20 pl-16 pr-16 rounded-2xl bg-card border border-border text-lg sm:text-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-bocra-blue/50 transition-colors"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => { setQuery(""); setResults([]); setHasSearched(false) }}
                    className="absolute right-6 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                  ? "bg-gradient-to-r from-bocra-blue to-bocra-green text-white shadow-lg shadow-bocra-blue/25"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <Loader2 className="w-8 h-8 text-bocra-blue animate-spin" />
            </motion.div>
          )}

          {!loading && hasSearched && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-3"
            >
              <p className="text-sm text-muted-foreground mb-4">
                {results.length} result{results.length !== 1 ? "s" : ""} found
              </p>
              {results.map((result, i) => (
                <motion.a
                  key={i}
                  href={result.url}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-bocra-blue/30 hover:bg-card transition-all"
                >
                  <span className="text-xl mt-0.5">{typeIcons[result.type] || "📄"}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground group-hover:text-bocra-blue transition-colors truncate">
                      {result.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {result.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                </motion.a>
              ))}
            </motion.div>
          )}

          {!loading && hasSearched && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-muted-foreground"
            >
              No results found for &ldquo;{query}&rdquo;. Try a different search term.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popular Searches */}
        {!hasSearched && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["License application", "File complaint", "Domain registration", "Regulations"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => handlePopularSearch(term)}
                    className="px-4 py-2 rounded-lg bg-border/30 text-sm text-muted-foreground hover:text-foreground hover:bg-border/50 transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
