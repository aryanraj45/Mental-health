"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, X, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function EmergencyWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Emergency Button - Fixed Position */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white rounded-full h-14 w-14 shadow-lg"
          size="icon"
        >
          <AlertTriangle className="h-6 w-6" />
        </Button>
      </div>

      {/* Emergency Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-900">Emergency Support</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-gray-600 mb-6">
                If you're in crisis or need immediate support, help is available right now.
              </p>

              <div className="space-y-3">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    window.open("tel:9152987821")
                    setIsOpen(false)
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Crisis Helpline
                </Button>

                <Button variant="outline" className="w-full bg-transparent" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/emergency">View All Emergency Resources</Link>
                </Button>

                <Button variant="outline" className="w-full bg-transparent" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/chat">Chat with AI Support</Link>
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">You're not alone. Help is available 24/7.</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
