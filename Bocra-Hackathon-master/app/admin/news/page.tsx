"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
    Newspaper, 
    Plus, 
    Edit2, 
    Trash2, 
    ArrowLeft, 
    Loader2,
    CheckCircle,
    Image as ImageIcon
} from "lucide-react"
import { getAuth } from "@/lib/auth"
import { fetchNews } from "@/lib/api"
import { motion } from "framer-motion"
import type { NewsArticle } from "@/types"

export default function AdminNewsPage() {
    const [auth] = useState(getAuth())
    const [news, setNews] = useState<NewsArticle[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        summary: "",
        content: "",
        category: "Press Release",
        imageUrl: "",
        slug: ""
    })
    const router = useRouter()

    useEffect(() => {
        if (!auth.token) {
            router.push("/admin/login")
            return
        }
        loadNews()
    }, [auth, router])

    const loadNews = async () => {
        setLoading(true)
        try {
            const data = await fetchNews()
            setNews(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch("http://localhost:8083/api/v1/news", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setIsAdding(false)
                setFormData({ title: "", summary: "", content: "", category: "Press Release", imageUrl: "", slug: "" })
                loadNews()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (!auth.token) return null

    return (
        <main className="min-h-screen bg-muted/30 text-foreground">
            <Navbar />

            <div className="pt-32 pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <button onClick={() => router.push("/admin/dashboard")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-bocra-blue mb-4 transition-all">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Dashboard
                            </button>
                            <h1 className="text-3xl font-bold font-display flex items-center gap-3">
                                <Newspaper className="w-8 h-8 text-bocra-blue" />
                                Manage News & Press
                            </h1>
                        </div>
                        <button 
                            onClick={() => setIsAdding(!isAdding)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-bocra-blue text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-bocra-blue/20"
                        >
                            {isAdding ? "Cancel" : <><Plus className="w-5 h-5" /> Post News</>}
                        </button>
                    </div>

                    {isAdding && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 p-8 rounded-3xl bg-card border border-border shadow-xl">
                            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Article Title</label>
                                        <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Slug (URL friendly)</label>
                                        <input required name="slug" value={formData.slug} onChange={handleChange} placeholder="e.g. cybersecurity-update-2024" className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Category</label>
                                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all">
                                            <option>Press Release</option>
                                            <option>Regulation Update</option>
                                            <option>Public Notice</option>
                                            <option>Cyber Advisory</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Summary</label>
                                        <textarea required name="summary" value={formData.summary} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all resize-none" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Full Content (Markdown supported)</label>
                                        <textarea required name="content" value={formData.content} onChange={handleChange} rows={7} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Header Image URL</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all" />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-bocra-green text-white font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                                        Publish Article
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item) => (
                            <div key={item.id} className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all">
                                <div className="aspect-video relative overflow-hidden bg-muted">
                                    {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-bocra-blue shadow-sm">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold mb-2 line-clamp-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                                        {item.summary}
                                    </p>
                                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-muted hover:bg-bocra-blue/10 hover:text-bocra-blue transition-all text-sm font-semibold">
                                            <Edit2 className="w-4 h-4" /> Edit
                                        </button>
                                        <button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    )
}
