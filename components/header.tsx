"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu, MessageCircle, Calendar, BookOpen, Users, Shield, User, LogOut, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"


//=================================================================
// 3. MAIN HEADER COMPONENT
//=================================================================
const navItemVariants = { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } };
const mobileLinkVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };

function HeaderComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define interface for navigation links
  interface NavLink {
    href: string;
    icon: React.FC<any>; // Icon component type
    label: string;
    urgent?: boolean;
    special?: boolean;
  }
  
  // Base navigation links - available to all users
  const baseNavLinks: NavLink[] = [
    { href: "/chat", icon: MessageCircle, label: "AI Support" },
    { href: "/resources", icon: BookOpen, label: "Resources" },
    { href: "/community", icon: Users, label: "Community" },
    { href: "/urgent", icon: AlertTriangle, label: "Emergency", urgent: true },
  ];
  
  // Student-specific links
  const studentLinks: NavLink[] = [
    { href: "/book", icon: Calendar, label: "Book Session" },
    ...baseNavLinks
  ];
  
  // Admin-specific links
  const adminLinks: NavLink[] = [
    { href: "/administrator", icon: Shield, label: "Admin", special: true },
    ...baseNavLinks
  ];
  
  // Choose which links to show based on user role
  const navLinks = user?.role === 'admin' 
    ? adminLinks 
    : user?.role === 'student' 
      ? studentLinks
      : baseNavLinks;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b bg-background/80 backdrop-blur-lg' : 'border-transparent bg-transparent backdrop-blur-sm'}`}
    >
      <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        {/* Logo and Brand */}
        <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}>
              <Heart className="h-8 w-8 text-primary" />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground">Sukoon</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Mental Wellness Platform</p>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav className="hidden lg:flex items-center gap-1" initial="hidden" animate="visible" transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}>
          {navLinks.map((item) => (
            <motion.div key={item.href} variants={navItemVariants}>
              <Link
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  item.urgent 
                    ? 'text-orange-500 hover:bg-orange-500/10 hover:text-orange-400 animate-pulse' 
                    : item.special 
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
        <motion.div className="flex items-center gap-3" initial="hidden" animate="visible" transition={{ staggerChildren: 0.1, delayChildren: 0.8 }}>
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
                    Logout
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div variants={navItemVariants}>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </motion.div>
                <motion.div variants={navItemVariants}>
                  <Button size="sm" asChild>
                    {/* <Link href="/signup">Sign Up</Link> */}
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
                  <Heart className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="font-semibold">Sukoon</h2>
                    <p className="text-xs text-muted-foreground">Mental Wellness Platform</p>
                  </div>
                </div>
                <motion.nav className="flex flex-col space-y-2" initial="hidden" animate={isOpen ? "visible" : "hidden"} transition={{ staggerChildren: 0.1 }}>
                  {navLinks.map((item) => (
                    <motion.div key={item.href} variants={mobileLinkVariants}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                          item.urgent 
                            ? 'text-orange-500 hover:bg-orange-500/10' 
                            : item.special 
                              ? 'text-red-500 hover:bg-red-500/10' 
                              : 'hover:bg-muted'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className={`h-5 w-5 ${item.special || item.urgent ? '' : 'text-primary'}`} />
                        <span className={item.special || item.urgent ? 'font-medium' : ''}>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
                
                {/* Mobile Auth Actions */}
                <div className="pt-4 border-t space-y-2">
                  {isLoggedIn ? (
                    <>
                      <motion.div variants={mobileLinkVariants}>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-5 w-5 text-primary" />
                          <span>{user?.name || 'Dashboard'}</span>
                        </Link>
                      </motion.div>
                      <motion.div variants={mobileLinkVariants}>
                        <button
                          onClick={() => {
                            logout();
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors w-full text-left"
                        >
                          <LogOut className="h-5 w-5 text-red-500" />
                          <span className="text-red-500">Logout</span>
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div variants={mobileLinkVariants}>
                        <Link
                          href="/login"
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-5 w-5 text-primary" />
                          <span>Login</span>
                        </Link>
                      </motion.div>
                      <motion.div variants={mobileLinkVariants}>
                        <Link
                          href="/signup"
                          className="flex items-center gap-4 p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-5 w-5" />
                          {/* <span>Sign Up</span> */}
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </motion.header>
  );
}


//=================================================================
// 5. FINAL EXPORTED COMPONENT WITH PROVIDER
//=================================================================

export function Header() {
  return (

      <HeaderComponent />

  )
}