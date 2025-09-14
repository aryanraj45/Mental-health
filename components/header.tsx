"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu, MessageCircle, Calendar, BookOpen, Users, Shield, User, Settings } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground">Sukoon</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Mental Wellness Platform</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            AI Support
          </Link>
          <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </Link>
          <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community
          </Link>
          <Link href="/book" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Book Session
          </Link>
          <Link href="/emergency" className="text-red-600 hover:text-red-700 transition-colors font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Emergency
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center gap-2 pb-4 border-b">
                  <Heart className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="font-semibold">Sukoon</h2>
                    <p className="text-xs text-muted-foreground">Mental Wellness Platform</p>
                  </div>
                </div>

                <nav className="flex flex-col space-y-4">
                  <Link 
                    href="/chat" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>AI Support</span>
                  </Link>
                  <Link 
                    href="/resources" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>Resources</span>
                  </Link>
                  <Link 
                    href="/community" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="h-5 w-5 text-primary" />
                    <span>Community</span>
                  </Link>
                  <Link 
                    href="/book" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Book Session</span>
                  </Link>
                  <Link 
                    href="/emergency" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-red-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Emergency</span>
                  </Link>
                </nav>

                <div className="border-t pt-4 space-y-3">
                  <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
