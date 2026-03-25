"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileText, Download, ScrollText, BarChart, BookOpen, FileSignature, Briefcase, Loader2 } from "lucide-react"
import { fetchDocuments } from "@/lib/api"
import type { Document } from "@/types"

const categoryIcons: Record<string, any> = {
    "Acts and Legislation": ScrollText,
    "Guidelines & Frameworks": BookOpen,
    "Annual Reports": BarChart,
    "Application Forms": FileSignature,
    "Consultation Papers": Briefcase,
    "Industry Reports & Surveys": FileText,
}

const defaultCategories = [
    { title: "Acts and Legislation", description: "Foundational laws governing the communications sector." },
    { title: "Guidelines & Frameworks", description: "Regulatory frameworks and compliance guidelines." },
    { title: "Annual Reports", description: "Yearly summaries of BOCRA's regulatory operations." },
    { title: "Application Forms", description: "Official forms for licensing and approvals." },
    { title: "Consultation Papers", description: "Draft policies open for public comment." },
]

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadDocs() {
            try {
                const data = await fetchDocuments()
                setDocuments(data)
            } catch (err) {
                console.error("Failed to load documents:", err)
            } finally {
                setLoading(false)
            }
        }
        loadDocs()
    }, [])

    const groupedDocs = documents.reduce((acc, doc) => {
        if (!acc[doc.category]) acc[doc.category] = []
        acc[doc.category].push(doc)
        return acc
    }, {} as Record<string, Document[]>)

    // If no docs from API, use categories from static list for layout
    const categoriesToShow = Object.keys(groupedDocs).length > 0 
        ? Object.keys(groupedDocs).map(cat => ({
            title: cat,
            description: defaultCategories.find(c => c.title === cat)?.description || "Official BOCRA documentation.",
            documents: groupedDocs[cat]
          }))
        : []

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />
                <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-bocra-blue/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bocra-blue/10 text-bocra-blue text-sm font-semibold tracking-wide uppercase mb-6">
                        <FileText className="w-4 h-4" />
                        Resources
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Documents & Publications
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Access official acts, regulatory guidelines, annual reports, industry research, and
                        licensing application forms spanning Botswana's communications sector.
                    </p>
                </div>
            </section>

            {/* Documents Grid */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-bocra-blue animate-spin mb-4" />
                            <p className="text-muted-foreground">Loading resource library...</p>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-12">
                            {categoriesToShow.length === 0 ? (
                                <div className="lg:col-span-2 text-center py-20 border-2 border-dashed border-border rounded-3xl">
                                    <p className="text-muted-foreground">No documents are available in the library yet.</p>
                                </div>
                            ) : (
                                categoriesToShow.map((category) => {
                                    const Icon = categoryIcons[category.title] || FileText
                                    return (
                                        <div key={category.title} className="bg-card/40 rounded-3xl border border-border overflow-hidden">
                                            {/* Section Header */}
                                            <div className="p-8 border-b border-border bg-muted/20">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bocra-blue to-bocra-green flex items-center justify-center shadow-md">
                                                        <Icon className="w-6 h-6 text-white" />
                                                    </div>
                                                    <h2 className="font-display text-2xl font-bold text-foreground">{category.title}</h2>
                                                </div>
                                                <p className="text-muted-foreground">{category.description}</p>
                                            </div>

                                            {/* File List */}
                                            <div className="p-4 sm:p-6 divide-y divide-border/50">
                                                {category.documents.map((doc: Document) => (
                                                    <a
                                                        key={doc.id}
                                                        href={doc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group flex items-start sm:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors"
                                                    >
                                                        <div className="flex items-start gap-4 flex-1">
                                                            <div className="mt-1 sm:mt-0 w-10 h-10 rounded-lg bg-bocra-blue/10 text-bocra-blue flex items-center justify-center flex-shrink-0 group-hover:bg-bocra-blue group-hover:text-white transition-colors">
                                                                <FileText className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-foreground group-hover:text-bocra-blue transition-colors leading-tight">
                                                                    {doc.name}
                                                                </h3>
                                                                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                                                                    <span className="font-medium px-2 py-0.5 rounded-full bg-border/50 text-foreground">
                                                                        PDF
                                                                    </span>
                                                                    <span>{doc.size}</span>
                                                                    <span>•</span>
                                                                    <span>{doc.date}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:border-bocra-blue group-hover:bg-bocra-blue/5 transition-colors text-muted-foreground group-hover:text-bocra-blue">
                                                            <Download className="w-4 h-4" />
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    )}

                </div>
            </section>

            <Footer />
        </main>
    )
}
