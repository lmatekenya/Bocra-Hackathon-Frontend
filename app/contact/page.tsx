"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { submitInquiry } from "@/lib/api"
import { motion } from "framer-motion"
import { CaptchaField } from "@/components/captcha-field"

const offices = [
    {
        city: "Gaborone (Head Office)",
        address: "Plot 50671, Independence Avenue",
        poBox: "Private Bag 00495, Gaborone",
        phone: "+267 368 5500",
        fax: "+267 395 7976",
        email: "info@bocra.org.bw",
    },
    {
        city: "Francistown (Regional Office)",
        address: "Plot 322, St. Patrick Street",
        poBox: "Private Bag F192, Francistown",
        phone: "+267 241 8299",
        fax: "+267 241 8298",
        email: "ftown@bocra.org.bw",
    },
]

export default function ContactPage() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [captchaToken, setCaptchaToken] = useState("")
    const [captchaRefreshKey, setCaptchaRefreshKey] = useState(0)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        inquiryType: "General Inquiry",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.message.trim().length < 15) {
            setError("Please provide a message with at least 15 characters.")
            return
        }
        if (!captchaToken) {
            setError("Please complete the security check before submitting.")
            return
        }

        setLoading(true)
        setError(null)
        try {
            const res = await submitInquiry({
                ...formData,
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                inquiryType: formData.inquiryType.trim(),
                message: formData.message.trim(),
                captchaToken,
            })
            if (res.success) {
                setSuccess(true)
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    inquiryType: "General Inquiry",
                    message: ""
                })
            } else {
                setError(res.message || "Failed to send message")
            }
        } catch (err: any) {
            setError(err.message || "Connection error")
        } finally {
            setCaptchaRefreshKey((prev) => prev + 1)
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Have a question, regulatory inquiry, or consumer complaint? Our team is available
                        and ready to assist you.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                        {/* Contact Info */}
                        <div>
                            <h2 className="font-display text-3xl font-bold text-foreground mb-8">Our Offices</h2>
                            <div className="space-y-8">
                                {offices.map((office) => (
                                    <div key={office.city} className="p-8 rounded-3xl bg-card border border-border hover:border-bocra-blue/30 transition-colors">
                                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-bocra-blue/10 flex items-center justify-center">
                                                <MapPin className="w-5 h-5 text-bocra-blue" />
                                            </div>
                                            {office.city}
                                        </h3>

                                        <div className="space-y-4 text-muted-foreground">
                                            <div className="flex gap-4">
                                                <MapPin className="w-5 h-5 flex-shrink-0 text-bocra-green" />
                                                <div>
                                                    <p>{office.address}</p>
                                                    <p>{office.poBox}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                                <Phone className="w-5 h-5 flex-shrink-0 text-bocra-green" />
                                                <p>{office.phone}</p>
                                            </div>

                                            <div className="flex gap-4 items-center">
                                                <Mail className="w-5 h-5 flex-shrink-0 text-bocra-green" />
                                                <a href={`mailto:${office.email}`} className="text-bocra-blue hover:underline">
                                                    {office.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Working Hours */}
                                <div className="p-8 rounded-3xl bg-gradient-to-br from-bocra-blue/5 to-bocra-green/5 border border-bocra-blue/10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Clock className="w-6 h-6 text-bocra-blue" />
                                        <h3 className="font-bold text-foreground">Operating Hours</h3>
                                    </div>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li className="flex justify-between">
                                            <span>Monday - Friday</span>
                                            <span className="font-medium text-foreground">08:00 hrs - 17:00 hrs</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Weekends & Public Holidays</span>
                                            <span className="font-medium text-foreground">Closed</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl shadow-bocra-blue/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-bocra-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

                                {success ? (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                                        <CheckCircle2 className="w-16 h-16 text-bocra-green mx-auto mb-6" />
                                        <h2 className="text-3xl font-bold mb-4">Message Sent</h2>
                                        <p className="text-muted-foreground mb-8">Thank you for contacting BOCRA. We will respond to your inquiry shortly.</p>
                                        <button onClick={() => setSuccess(false)} className="px-6 py-2 rounded-full bg-muted text-foreground font-semibold">Send Another</button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-2 relative z-10">Send a Message</h2>
                                        <p className="text-muted-foreground mb-8 relative z-10">
                                            Fill out the form below and we'll get back to you as soon as possible.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                            {error && (
                                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4" /> {error}
                                                </div>
                                            )}
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                                                    <input required id="firstName" value={formData.firstName} onChange={handleChange} type="text" maxLength={120} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                                                    <input required id="lastName" value={formData.lastName} onChange={handleChange} type="text" maxLength={120} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                                                <input required id="email" value={formData.email} onChange={handleChange} type="email" maxLength={255} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all" />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="inquiryType" className="text-sm font-medium text-foreground">Inquiry Type</label>
                                                <select id="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all cursor-pointer">
                                                    <option>General Inquiry</option>
                                                    <option>Licensing Support</option>
                                                    <option>Consumer Complaint</option>
                                                    <option>Media Query</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                                                <textarea required id="message" value={formData.message} onChange={handleChange} rows={5} minLength={15} maxLength={4000} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all resize-none"></textarea>
                                            </div>

                                            <CaptchaField
                                                value={captchaToken}
                                                onChange={setCaptchaToken}
                                                refreshKey={captchaRefreshKey}
                                            />

                                            <button 
                                                disabled={loading}
                                                type="submit" 
                                                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-bocra-blue to-bocra-green text-white font-bold hover:shadow-lg hover:shadow-bocra-blue/20 transition-all active:scale-[0.98] disabled:opacity-70"
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                                {loading ? "Sending..." : "Send Message"}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
