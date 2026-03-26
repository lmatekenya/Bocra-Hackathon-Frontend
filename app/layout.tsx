import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { GlobalAnimation } from "@/components/global-animation"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bocra-web.web.app"),
  title: {
    default: "BOCRA | Botswana Communications Regulatory Authority",
    template: "%s | BOCRA",
  },
  description:
    "Official BOCRA digital portal for consumer protection, licensing, spectrum, cybersecurity, and public notices.",
  applicationName: "BOCRA Digital Portal",
  keywords: [
    "BOCRA",
    "Botswana communications regulator",
    "consumer complaints",
    "cybersecurity Botswana",
    "licensing",
    "spectrum",
  ],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: "website",
    title: "BOCRA Digital Portal",
    description:
      "Regulating Botswana's digital future with secure public services and transparent governance.",
    url: "https://bocra-web.web.app",
    siteName: "BOCRA",
  },
}

export const viewport: Viewport = {
  themeColor: '#005BA6',
  width: 'device-width',
  initialScale: 1,
  colorScheme: "light dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased relative bg-background">
        <GlobalAnimation />
        <div className="relative z-10">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
