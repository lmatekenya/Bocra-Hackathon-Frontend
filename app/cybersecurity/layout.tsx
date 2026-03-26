import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Cybersecurity Center | BOCRA",
    description: "Botswana's Computer Security Incident Response Team (BwCSIRT). Report incidents and monitor threats.",
}

export default function CybersecurityLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
