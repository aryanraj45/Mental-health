"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu, MessageCircle, Calendar, BookOpen, Users, Shield, User, LogOut } from "lucide-react"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"

// Framer Motion Variants for animations
const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()
  const { user, isLoggedIn, logout } = useAuth()

  // Effect to track scroll position for header animation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 
        ${scrolled 
          ? 'border-b bg-background/80 backdrop-blur-lg' 
          : 'border-transparent bg-transparent backdrop-blur-sm'
        }`}
    >
      <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        {/* Logo and Brand */}
        <motion.div 
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}>
              <Heart className="h-8 w-8 text-primary drop-shadow-glow-primary-sm group-hover:animate-heartbeat" />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground">Sukoon</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">{t('mental-wellness-platform')}</p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav 
          className="hidden lg:flex items-center gap-1"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {[
            { href: "/chat", icon: MessageCircle, label: t('ai-support') },
            { href: "/resources", icon: BookOpen, label: t('resources') },
            { href: "/community", icon: Users, label: t('community') },
            { href: "/book", icon: Calendar, label: t('book-session') },
            { href: "/emergency", icon: Shield, label: t('emergency'), special: true },
          ].map((item) => (
            <motion.div key={item.href} variants={navItemVariants}>
              <Link 
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                  ${item.special 
                    ? 'text-red-500 hover:bg-red-500/10 hover:text-red-400' 
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Right Side Actions */}
        <motion.div 
          className="flex items-center gap-3"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.8 }}
        >
          <motion.div variants={navItemVariants}><LanguageSwitcher /></motion.div>
          
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <motion.div variants={navItemVariants}>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user?.name || 'Dashboard'}
                    </Link>
                  </Button>
                </motion.div>
                <motion.div variants={navItemVariants}>
                  <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    {t('logout')}
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={navItemVariants}>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">{t('login')}</Link>
                  </Button>
                </motion.div>
                <motion.div variants={navItemVariants}>
                  <Button size="sm" asChild className="bg-primary/90 text-primary-foreground hover:bg-primary drop-shadow-glow-primary">
                    <Link href="/signup">{t('signup')}</Link>
                  </Button>
                </motion.div>
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
            <SheetContent side="right" className="w-80 bg-background/80 backdrop-blur-xl border-l">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex items-center gap-2 pb-4 border-b">
                  <Heart className="h-6 w-6 text-primary drop-shadow-glow-primary-sm" />
                  <div>
                    <h2 className="font-semibold">Sukoon</h2>
                    <p className="text-xs text-muted-foreground">{t('mental-wellness-platform')}</p>
                  </div>
                </div>

                <motion.nav 
                  className="flex flex-col space-y-2"
                  initial="hidden"
                  animate={isOpen ? "visible" : "hidden"}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {[
                    { href: "/chat", icon: MessageCircle, label: t('ai-support') },
                    { href: "/resources", icon: BookOpen, label: t('resources') },
                    { href: "/community", icon: Users, label: t('community') },
                    { href: "/book", icon: Calendar, label: t('book-session') },
                    { href: "/emergency", icon: Shield, label: t('emergency'), special: true },
                  ].map((item) => (
                    <motion.div key={item.href} variants={mobileLinkVariants}>
                      <Link 
                        href={item.href} 
                        className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${item.special ? 'text-red-500 hover:bg-red-500/10' : 'hover:bg-muted'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className={`h-5 w-5 ${item.special ? '' : 'text-primary'}`} />
                        <span className={item.special ? 'font-medium' : ''}>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                <div className="border-t pt-4 space-y-3">
                  {isLoggedIn ? (
                    <>
                      <Button className="w-full" asChild onClick={() => setIsOpen(false)}>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {user?.name || 'Dashboard'}
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => { setIsOpen(false); logout(); }}>
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
        </motion.div>
      </div>
    </motion.header>
  )
}