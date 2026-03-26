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
  Calendar,
  FileText,
  AlertCircle,
} from "lucide-react"
import { createTender, fetchTenders } from "@/lib/api"
import { clearCachedAdminProfile, getAuthenticatedAdmin } from "@/lib/auth"
import { motion } from "framer-motion"
import type { Tender } from "@/types"

export default function AdminTendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Tender, "id">>({
    tenderNumber: "",
    title: "",
    type: "Open Domestic Tender",
    publishDate: new Date().toISOString().split("T")[0],
    closingDate: "",
    status: "OPEN",
    description: "",
  })
  const router = useRouter()

  useEffect(() => {
    const bootstrap = async () => {
      try {
        await getAuthenticatedAdmin()
      } catch {
        clearCachedAdminProfile()
        router.replace("/admin/login")
        return
      }
      await loadTenders()
    }

    void bootstrap()
  }, [router])

  const loadTenders = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTenders()
      setTenders(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load tenders"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await createTender(formData)
      setIsAdding(false)
      setFormData({
        tenderNumber: "",
        title: "",
        type: "Open Domestic Tender",
        publishDate: new Date().toISOString().split("T")[0],
        closingDate: "",
        status: "OPEN",
        description: "",
      })
      await loadTenders()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create tender"
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-muted/30 text-foreground">
      <Navbar />

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-bocra-blue mb-4 transition-all"
              >
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
              {isAdding ? "Cancel" : (
                <>
                  <Plus className="w-5 h-5" />
                  Issue Tender
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {isAdding && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 p-8 rounded-3xl bg-card border border-border shadow-xl"
            >
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Tender Number
                    </label>
                    <input
                      required
                      name="tenderNumber"
                      value={formData.tenderNumber}
                      onChange={handleChange}
                      placeholder="BOCRA/PT/..."
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Tender Title
                    </label>
                    <input
                      required
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all"
                    >
                      <option>Open Domestic Tender</option>
                      <option>Expression of Interest</option>
                      <option>Restricted Tender</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Closing Date
                      </label>
                      <input
                        required
                        type="date"
                        name="closingDate"
                        value={formData.closingDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-muted-foreground">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all"
                      >
                        <option>OPEN</option>
                        <option>CLOSED</option>
                        <option>AWARDED</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">
                      Description
                    </label>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-bocra-green text-white font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                    Issue Tender Notice
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-bocra-blue" />
            </div>
          ) : (
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
                  {tenders.map((tender) => (
                    <tr key={tender.id} className="hover:bg-muted/10 transition-all">
                      <td className="px-6 py-5 font-mono text-sm font-bold text-bocra-blue">
                        {tender.tenderNumber}
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold">{tender.title}</td>
                      <td className="px-6 py-5 text-xs">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {tender.closingDate}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            tender.status === "OPEN"
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : "bg-red-500/10 text-red-600 border-red-500/20"
                          }`}
                        >
                          {tender.status}
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
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
