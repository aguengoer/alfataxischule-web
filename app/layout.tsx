import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://alfataxischule.at"),
  title: {
    default: "ALFA Taxischule Wien | Moderne Taxi-Ausbildung",
    template: "%s | ALFA Taxischule Wien",
  },
  description:
    "Professionelle Taxilenker-Ausbildung in Wien. Moderne Lehrmethoden, erfahrene Kursleiter und persönliche Betreuung für Ihren Erfolg. Taxilenkerkurs und Konzessionskurs.",
  generator: "v0.app",
  applicationName: "ALFA Taxischule",
  keywords: [
    "Taxischule Wien",
    "Taxilenkerkurs",
    "Taxi Ausbildung Wien",
    "Konzessionskurs",
    "Taxilenker Prüfung Wien",
    "Taxi-Lenker-Ausweis",
    "Taxischein Wien",
    "ALFA Taxischule",
    "Taxifahrer werden",
    "Taxiprüfung Vorbereitung",
  ],
  authors: [{ name: "ALFA Taxischule" }],
  creator: "ALFA Taxischule",
  publisher: "ALFA Taxischule",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "https://alfataxischule.at",
    siteName: "ALFA Taxischule Wien",
    title: "ALFA Taxischule Wien | Moderne Taxi-Ausbildung",
    description:
      "Professionelle Taxilenker-Ausbildung in Wien. Moderne Lehrmethoden, erfahrene Kursleiter und persönliche Betreuung für Ihren Erfolg.",
    images: [
      {
        url: "/images/logo.svg",
        width: 512,
        height: 512,
        alt: "ALFA Taxischule Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALFA Taxischule Wien | Moderne Taxi-Ausbildung",
    description:
      "Professionelle Taxilenker-Ausbildung in Wien. Moderne Lehrmethoden, erfahrene Kursleiter und persönliche Betreuung für Ihren Erfolg.",
    images: ["/images/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://alfataxischule.at",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFC107" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
