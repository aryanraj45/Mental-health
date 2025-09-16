import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sukoon - Mental Wellness Platform",
  description: "Your mental health and wellness companion",
  generator: "v0.app",
}

// Separate layout component that uses client components
import ClientLayout from "../components/client-layout"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased dark`}>
      <body className="dark:bg-black dark:text-white">
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
      </body>
    </html>
  )
}
