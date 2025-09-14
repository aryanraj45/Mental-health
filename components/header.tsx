"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu, MessageCircle, Calendar, BookOpen, Users, Shield, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const { user, isLoggedIn, logout } = useAuth()

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground">Sukoon</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{t('mental-wellness-platform')}</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            {t('ai-support')}
          </Link>
          <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {t('resources')}
          </Link>
          <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t('community')}
          </Link>
          <Link href="/book" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {t('book-session')}
          </Link>
          <Link href="/emergency" className="text-red-600 hover:text-red-700 transition-colors font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            {t('emergency')}
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user?.name || 'Dashboard'}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {t('logout')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">{t('login')}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">{t('signup')}</Link>
                </Button>
              </>
            )}
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
                    <p className="text-xs text-muted-foreground">{t('mental-wellness-platform')}</p>
                  </div>
                </div>

                <nav className="flex flex-col space-y-4">
                  <Link 
                    href="/chat" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>{t('ai-support')}</span>
                  </Link>
                  <Link 
                    href="/resources" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>{t('resources')}</span>
                  </Link>
                  <Link 
                    href="/community" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="h-5 w-5 text-primary" />
                    <span>{t('community')}</span>
                  </Link>
                  <Link 
                    href="/book" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>{t('book-session')}</span>
                  </Link>
                  <Link 
                    href="/emergency" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-red-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">{t('emergency')}</span>
                  </Link>
                </nav>

                <div className="border-t pt-4 space-y-3">
                  {isLoggedIn ? (
                    <>
                      <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {user?.name || 'Dashboard'}
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => {
                          setIsOpen(false)
                          logout()
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        {t('logout')}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/signup">{t('signup')}</Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/login">{t('login')}</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
