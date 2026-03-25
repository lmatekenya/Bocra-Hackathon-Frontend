"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
    Briefcase, 
    Plus, 
    Edit2, 
    Trash2, 
    ArrowLeft, 
    Loader2,
    CheckCircle,
    Calendar,
    FileText
} from "lucide-react"
import { getAuth } from "@/lib/auth"
import { fetchTenders } from "@/lib/api"
import { motion } from "framer-motion"

export default function AdminTendersPage() {
    const [auth] = useState(getAuth())
    const [tenders, setTenders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [formData, setFormData] = useState({
        tenderNumber: "",
        title: "",
        type: "Open Domestic Tender",
        publishDate: new Date().toISOString().split('T')[0],
        closingDate: "",
        status: "OPEN",
        description: ""
    })
    const router = useRouter()

    useEffect(() => {
        if (!auth.token) {
            router.push("/admin/login")
            return
        }
        loadTenders()
    }, [auth, router])

    const loadTenders = async () => {
        setLoading(true)
        try {
            const data = await fetchTenders()
            setTenders(data)
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
            const res = await fetch("http://localhost:8083/api/v1/tenders", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                setIsAdding(false)
                setFormData({ tenderNumber: "", title: "", type: "Open Domestic Tender", publishDate: new Date().toISOString().split('T')[0], closingDate: "", status: "OPEN", description: "" })
                loadTenders()
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
                                <Briefcase className="w-8 h-8 text-bocra-blue" />
                                Procurement & Tenders
                            </h1>
                        </div>
                        <button 
                            onClick={() => setIsAdding(!isAdding)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-bocra-blue text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-bocra-blue/20"
                        >
                            {isAdding ? "Cancel" : <><Plus className="w-5 h-5" /> Issue Tender</>}
                        </button>
                    </div>

                    {isAdding && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 p-8 rounded-3xl bg-card border border-border shadow-xl">
                            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Tender Number</label>
                                        <input required name="tenderNumber" value={formData.tenderNumber} onChange={handleChange} placeholder="BOCRA/PT/..." className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Tender Title</label>
                                        <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Type</label>
                                        <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all">
                                            <option>Open Domestic Tender</option>
                                            <option>Expression of Interest</option>
                                            <option>Restricted Tender</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase text-muted-foreground">Closing Date</label>
                                            <input required type="date" name="closingDate" value={formData.closingDate} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase text-muted-foreground">Status</label>
                                            <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all">
                                                <option>OPEN</option>
                                                <option>CLOSED</option>
                                                <option>AWARDED</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase text-muted-foreground">Description</label>
                                        <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all resize-none" />
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full py-4 rounded-xl bg-bocra-green text-white font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                                        Issue Tender Notice
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    <th className="px-6 py-4">Tender #</th>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Closing</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {tenders.map((t) => (
                                    <tr key={t.id} className="hover:bg-muted/10 transition-all">
                                        <td className="px-6 py-5 font-mono text-sm font-bold text-bocra-blue">{t.tenderNumber}</td>
                                        <td className="px-6 py-5 text-sm font-semibold">{t.title}</td>
                                        <td className="px-6 py-5 text-xs">
                                            <span className="flex items-center gap-1.5 text-muted-foreground">
                                                <Calendar className="w-3 h-3" />
                                                {t.closingDate}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.status === 'OPEN' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-red-500/10 text-red-600 border-red-500/20'}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-muted rounded-lg transition-all">
                                                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                                                </button>
                                                <button className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all">
                                                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-white" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    )
}
