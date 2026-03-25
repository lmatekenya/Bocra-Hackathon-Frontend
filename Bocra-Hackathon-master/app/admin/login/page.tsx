"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Lock, User, Loader2, AlertCircle, ShieldCheck } from "lucide-react"
import { saveAuth } from "@/lib/auth"
import { motion } from "framer-motion"

export default function AdminLoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("http://localhost:8083/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            if (res.ok) {
                const data = await res.json()
                saveAuth({
                    token: data.token,
                    username: data.username,
                    role: data.role
                })
                router.push("/admin/dashboard")
            } else {
                setError("Invalid credentials. Please try again.")
            }
        } catch (err) {
            setError("Connection failed. Ensure backend is running.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-40 pb-24 flex items-center justify-center px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-2xl shadow-bocra-blue/5"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-bocra-blue/10 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-bocra-blue" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold font-display">Staff Portal</h1>
                            <p className="text-sm text-muted-foreground">Authorize to manage BOCRA assets</p>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Username</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    required
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Employee ID or username"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-bocra-blue hover:bg-blue-600 text-white font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-xs text-muted-foreground mt-8">
                        Authorized access only. All activities are logged under the CRA Act.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    )
}
