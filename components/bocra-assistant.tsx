"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  BotMessageSquare,
  ExternalLink,
  Loader2,
  SendHorizonal,
  ShieldCheck,
  X,
} from "lucide-react"
import type { SearchResult } from "@/types"
import { searchSite } from "@/lib/api"

type ChatRole = "assistant" | "user"

interface ChatLink {
  href: string
  label: string
}

interface ChatMessage {
  id: string
  role: ChatRole
  text: string
  links?: ChatLink[]
}

const QUICK_PROMPTS = [
  "How do I file a complaint?",
  "Where can I find licensing information?",
  "How can I report a cyber incident?",
  "Where are BOCRA contact details?",
]

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_MESSAGES = 6
const SEARCH_TIMEOUT_MS = 8_000
const MAX_INPUT_CHARS = 320
const ALLOWED_EXTERNAL_HOSTS = new Set(["bocra-web.web.app", "www.bocra.org.bw", "bocra.org.bw"])

const GREETING_MESSAGE: ChatMessage = {
  id: "assistant-greeting",
  role: "assistant",
  text: "Hello. I am the BOCRA Assistant. Ask about complaints, licensing, tenders, cybersecurity, or contact details.",
  links: [{ href: "/about", label: "About BOCRA" }],
}

function makeId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function sanitizeQuery(raw: string): string {
  return raw.replace(/\s+/g, " ").trim()
}

function sanitizeResultUrl(url: string): string | null {
  if (!url) return null
  if (url.startsWith("/")) return url

  try {
    const parsed = new URL(url)
    if (parsed.protocol !== "https:") return null
    if (!ALLOWED_EXTERNAL_HOSTS.has(parsed.hostname)) return null
    return parsed.toString()
  } catch {
    return null
  }
}

function buildFallbackReply(query: string): ChatMessage {
  const q = query.toLowerCase()

  if (q.includes("complaint") || q.includes("consumer")) {
    return {
      id: makeId("assistant"),
      role: "assistant",
      text: "You can submit a consumer complaint through BOCRA's secure complaint form. Keep your provider reference and full incident details ready.",
      links: [{ href: "/complaints", label: "Open Complaint Form" }],
    }
  }

  if (q.includes("license") || q.includes("licensing")) {
    return {
      id: makeId("assistant"),
      role: "assistant",
      text: "BOCRA licensing information is available under services. Start there for requirements and next steps.",
      links: [{ href: "/services/licensing", label: "Licensing Services" }],
    }
  }

  if (q.includes("cyber") || q.includes("incident") || q.includes("security")) {
    return {
      id: makeId("assistant"),
      role: "assistant",
      text: "For cybersecurity matters, you can view advisories and submit an incident report on the cybersecurity page.",
      links: [{ href: "/cybersecurity", label: "Cybersecurity Hub" }],
    }
  }

  if (q.includes("tender") || q.includes("procurement")) {
    return {
      id: makeId("assistant"),
      role: "assistant",
      text: "Current procurement opportunities are published under BOCRA tenders.",
      links: [{ href: "/tenders", label: "View Tenders" }],
    }
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
    return {
      id: makeId("assistant"),
      role: "assistant",
      text: "You can find BOCRA office addresses, phone numbers, and inquiry channels on the contact page.",
      links: [{ href: "/contact", label: "Contact BOCRA" }],
    }
  }

  if (q.includes("document") || q.includes("regulation") || q.includes("policy")) {
    return {
      id: makeId("assistant"),
      role: "assistant",
      text: "Public BOCRA documents and references are available in the document library.",
      links: [{ href: "/documents", label: "Open Document Library" }],
    }
  }

  return {
    id: makeId("assistant"),
    role: "assistant",
    text: "I can help with complaints, licensing, tenders, cybersecurity, documents, and contact details. Please ask a specific BOCRA-related question.",
    links: [
      { href: "/about", label: "About BOCRA" },
      { href: "/contact", label: "Contact BOCRA" },
    ],
  }
}

function buildSearchReply(query: string, results: SearchResult[]): ChatMessage {
  const links: ChatLink[] = []

  for (const result of results) {
    if (links.length >= 3) break

    const safeUrl = sanitizeResultUrl(result.url)
    if (!safeUrl) continue

    const label = result.title.trim().slice(0, 80)
    if (!label) continue

    links.push({ href: safeUrl, label })
  }

  if (links.length === 0) {
    return buildFallbackReply(query)
  }

  return {
    id: makeId("assistant"),
    role: "assistant",
    text: `I found helpful BOCRA resources for "${query}".`,
    links,
  }
}

async function searchWithTimeout(query: string): Promise<SearchResult[]> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error("Search timeout"))
    }, SEARCH_TIMEOUT_MS)
  })

  try {
    return await Promise.race([searchSite(query), timeout])
  } finally {
    if (timer) {
      clearTimeout(timer)
    }
  }
}

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}

export function BocraAssistant() {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [sentMessageTimes, setSentMessageTimes] = useState<number[]>([])
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!scrollContainerRef.current) return
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
  }, [messages, isLoading, isOpen])

  const canSend = useMemo(() => !isLoading && input.trim().length > 0, [isLoading, input])

  const appendAssistantMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const handleSend = async (rawText: string) => {
    const query = sanitizeQuery(rawText)
    if (!query || isLoading) return

    if (query.length < 2) {
      appendAssistantMessage({
        id: makeId("assistant"),
        role: "assistant",
        text: "Please enter a slightly longer question so I can help accurately.",
      })
      return
    }

    if (query.length > MAX_INPUT_CHARS) {
      appendAssistantMessage({
        id: makeId("assistant"),
        role: "assistant",
        text: `Please keep your question under ${MAX_INPUT_CHARS} characters.`,
      })
      return
    }

    const now = Date.now()
    const recent = sentMessageTimes.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)
    if (recent.length >= RATE_LIMIT_MAX_MESSAGES) {
      appendAssistantMessage({
        id: makeId("assistant"),
        role: "assistant",
        text: "You have reached the message rate limit. Please wait a moment and try again.",
      })
      setSentMessageTimes(recent)
      return
    }

    setSentMessageTimes([...recent, now])
    setInput("")
    setMessages((prev) => [...prev, { id: makeId("user"), role: "user", text: query }])
    setIsLoading(true)

    try {
      const results = await searchWithTimeout(query)
      appendAssistantMessage(buildSearchReply(query, results))
    } catch {
      appendAssistantMessage({
        ...buildFallbackReply(query),
        text: "I could not reach live search right now. Here is the best BOCRA guidance I can provide immediately.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSend(input)
  }

  const handleQuickPrompt = async (prompt: string) => {
    if (isLoading) return
    await handleSend(prompt)
  }

  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12, scale: reducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 12, scale: reducedMotion ? 1 : 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            className="mb-3 w-[calc(100vw-2.5rem)] max-w-[390px] rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur"
            aria-label="BOCRA assistant chat"
          >
            <header className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bocra-blue/15 text-bocra-blue">
                  <BotMessageSquare className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">BOCRA Assistant</h2>
                  <p className="text-xs text-muted-foreground">General guidance and navigation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-bocra-green" />
                <span>No personal data is required for general questions.</span>
              </div>
            </div>

            <div ref={scrollContainerRef} className="max-h-[360px] space-y-3 overflow-y-auto p-4">
              {messages.map((message) => {
                const isAssistant = message.role === "assistant"
                return (
                  <article
                    key={message.id}
                    className={`rounded-xl p-3 text-sm ${
                      isAssistant
                        ? "border border-border bg-muted/40 text-foreground"
                        : "ml-auto max-w-[90%] bg-bocra-blue text-white"
                    }`}
                  >
                    <p className="leading-relaxed">{message.text}</p>
                    {message.links && message.links.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1.5">
                        {message.links.map((link) => (
                          isExternalUrl(link.href) ? (
                            <a
                              key={`${message.id}-${link.href}`}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1 text-xs font-medium text-bocra-blue hover:text-bocra-green"
                            >
                              {link.label}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <Link
                              key={`${message.id}-${link.href}`}
                              href={link.href}
                              className="inline-flex items-center gap-1 text-xs font-medium text-bocra-blue hover:text-bocra-green"
                            >
                              {link.label}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}

              {isLoading && (
                <div className="rounded-xl border border-border bg-muted/40 p-3 text-sm text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-bocra-blue" />
                    Looking up BOCRA resources...
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-border px-4 py-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleQuickPrompt(prompt)}
                    disabled={isLoading}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition hover:border-bocra-blue/30 hover:text-bocra-blue disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about BOCRA..."
                  maxLength={MAX_INPUT_CHARS}
                  className="h-10 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-bocra-blue"
                  aria-label="Ask BOCRA assistant"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-bocra-blue text-white transition hover:bg-[#004f90] disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Send message"
                >
                  <SendHorizonal className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bocra-blue text-white shadow-lg shadow-bocra-blue/35 transition hover:bg-[#004f90]"
        aria-label={isOpen ? "Close BOCRA assistant" : "Open BOCRA assistant"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <BotMessageSquare className="h-6 w-6" />}
      </button>
    </div>
  )
}
