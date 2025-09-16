"use client"

import React, { Suspense } from "react"
import { ThemeProvider } from "next-themes"
import { EmergencyWidget } from "@/components/emergency-widget"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/contexts/auth-context"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Suspense fallback={null}>
            {children}
            <EmergencyWidget />
          </Suspense>
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  )
}
