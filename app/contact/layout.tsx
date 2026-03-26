import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us | BOCRA",
    description: "Get in touch with the Botswana Communications Regulatory Authority. Locations, phone numbers, and inquiry forms.",
}

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
