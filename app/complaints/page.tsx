"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShieldAlert, Phone, HelpCircle, FileText, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { submitComplaint } from "@/lib/api"
import { CaptchaField } from "@/components/captcha-field"

const steps = [
    {
        icon: Phone,
        title: "Step 1: Address Service Provider",
        description: "Consumers must first explore and exhaust all possible channels of remedy available within the operator before referring to BOCRA.",
    },
    {
        icon: HelpCircle,
        title: "Step 2: Request Resolution Time",
        description: "Ask the operator to state the required resolution period. Any deviations must be accompanied by a written explanation.",
    },
    {
        icon: FileText,
        title: "Step 3: Keep Correspondence",
        description: "Keep records of all correspondence between yourself and the operator. Request stamped copies where possible.",
    },
    {
        icon: AlertTriangle,
        title: "Step 4: Internal Escalation",
        description: "If unresolved, request for the complaint to be escalated to the highest level within the Service Provider.",
    },
    {
        icon: ShieldAlert,
        title: "Step 5: Escalate to BOCRA",
        description: "If the operator fails to resolve it, refer the complaint to BOCRA using the electronic form below.",
    },
]

export default function ComplaintsPage() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [ticketId, setTicketId] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [captchaToken, setCaptchaToken] = useState("")
    const [captchaRefreshKey, setCaptchaRefreshKey] = useState(0)

    const [formData, setFormData] = useState({
        fullName: "",
        contactNumber: "",
        serviceProvider: "",
        providerReference: "",
        email: "",
        complaintDetails: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const detailsLength = formData.complaintDetails.trim().length
        if (detailsLength < 20) {
            setError("Please provide at least 20 characters in complaint details.")
            return
        }
        if (!captchaToken) {
            setError("Please complete the security check before submitting.")
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await submitComplaint({
                ...formData,
                fullName: formData.fullName.trim(),
                contactNumber: formData.contactNumber.trim(),
                serviceProvider: formData.serviceProvider.trim(),
                providerReference: formData.providerReference.trim(),
                email: formData.email.trim(),
                complaintDetails: formData.complaintDetails.trim(),
                captchaToken,
            })
            if (res.success) {
                setTicketId(res.ticketId || "")
                setSuccess(true)
                setFormData({
                    fullName: "",
                    contactNumber: "",
                    serviceProvider: "",
                    providerReference: "",
                    email: "",
                    complaintDetails: ""
                })
            } else {
                setError(res.message || "Failed to submit complaint")
            }
        } catch (err: any) {
            setError(err.message || "A connection error occurred")
        } finally {
            setCaptchaRefreshKey((prev) => prev + 1)
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-muted/20 to-background border-b border-border">
                <div className="absolute inset-0 top-0 h-1 bg-gradient-to-r from-bocra-blue via-bocra-green to-bocra-blue" />
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold tracking-wide uppercase mb-6">
                        <ShieldAlert className="w-4 h-4" />
                        Consumer Protection
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                        File a Complaint
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        As a consumer of communications services in Botswana, you have the right to quality service.
                        If your provider fails to resolve an issue, BOCRA is here to help.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* Steps & Info (Left col) */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h2 className="font-display text-3xl font-bold text-foreground mb-8">Before you escalate</h2>
                                <div className="space-y-6">
                                    {steps.map((step) => (
                                        <div key={step.title} className="flex gap-4 p-6 rounded-3xl bg-card border border-border">
                                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                                                <step.icon className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-bocra-blue/5 border border-bocra-blue/10">
                                <FileText className="w-8 h-8 text-bocra-blue mb-4" />
                                <h3 className="font-bold text-foreground mb-2">Required Accompanying Info</h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                    When escalating to BOCRA, your notification must include:
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                                    <li>Names and addresses of the parties involved</li>
                                    <li>A brief statement of facts on the complaint</li>
                                    <li>Copies of any relevant supporting documents / stamped letters</li>
                                    <li>The relief or remedy sought</li>
                                </ul>
                            </div>
                        </div>

                        {/* Complaint Form (Right col) */}
                        <div className="lg:col-span-7">
                            <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border shadow-xl shadow-bocra-blue/5">

                                {success ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-bocra-green/10 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-bocra-green" />
                                        </div>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Complaint Submitted</h2>
                                        <p className="text-muted-foreground mb-8">
                                            Your complaint has been successfully forwarded to our Consumer Affairs division.
                                            An agent will contact you within 48 hours. Ticket ID: <span className="font-bold text-bocra-blue">{ticketId}</span>
                                        </p>
                                        <button
                                            onClick={() => setSuccess(false)}
                                            className="px-6 py-3 rounded-full bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
                                        >
                                            Submit Another
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-2">Escalation Form</h2>
                                        <p className="text-muted-foreground mb-8">
                                            Please ensure you have tried to resolve the issue with your service provider first.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {error && (
                                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {error}
                                                </div>
                                            )}
                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">Full Name</label>
                                                    <input 
                                                        required 
                                                        name="fullName"
                                                        value={formData.fullName}
                                                        onChange={handleChange}
                                                        type="text" 
                                                        maxLength={160}
                                                        placeholder="e.g. Thabo Motswana"
                                                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all" 
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">Contact Number</label>
                                                    <input 
                                                        required 
                                                        name="contactNumber"
                                                        value={formData.contactNumber}
                                                        onChange={handleChange}
                                                        type="tel" 
                                                        pattern="^[+0-9 ()-]{7,30}$"
                                                        maxLength={30}
                                                        placeholder="e.g. +267 71 000 000"
                                                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all" 
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">Service Provider</label>
                                                    <select 
                                                        required 
                                                        name="serviceProvider"
                                                        value={formData.serviceProvider}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all cursor-pointer"
                                                    >
                                                        <option value="">Select a provider...</option>
                                                        <option value="Mascom">Mascom</option>
                                                        <option value="Orange">Orange</option>
                                                        <option value="BTC">BTC</option>
                                                        <option value="BotswanaPost">BotswanaPost</option>
                                                        <option value="MultiChoice">MultiChoice (DStv)</option>
                                                        <option value="Other">Other ISP</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-foreground">Provider Ref/Ticket No.</label>
                                                    <input 
                                                        required 
                                                        name="providerReference"
                                                        value={formData.providerReference}
                                                        onChange={handleChange}
                                                        type="text" 
                                                        maxLength={120}
                                                        placeholder="e.g. INC12345" 
                                                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all" 
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Email Address</label>
                                                <input 
                                                    required 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    type="email" 
                                                    maxLength={255}
                                                    placeholder="yourname@domain.bw"
                                                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all" 
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-foreground">Complaint Details</label>
                                                <textarea 
                                                    required 
                                                    name="complaintDetails"
                                                    value={formData.complaintDetails}
                                                    onChange={handleChange}
                                                    rows={5} 
                                                    minLength={20}
                                                    maxLength={5000}
                                                    placeholder="Describe the issue in detail..." 
                                                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue outline-none transition-all resize-none"
                                                ></textarea>
                                            </div>

                                            <CaptchaField
                                                value={captchaToken}
                                                onChange={setCaptchaToken}
                                                refreshKey={captchaRefreshKey}
                                            />

                                            <button
                                                disabled={loading}
                                                type="submit"
                                                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-bocra-blue text-white font-bold hover:bg-bocra-blue/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loading ? "Submitting..." : "Submit Complaint"}
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
