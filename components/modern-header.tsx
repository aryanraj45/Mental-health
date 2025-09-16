"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

interface ModernHeaderProps {
  className?: string;
}

export function ModernHeader({ className }: ModernHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className={cn("fixed top-0 left-0 w-full p-6 sm:p-8 z-50", className)}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Heart className="h-10 w-10 text-primary transition-all duration-300 group-hover:scale-110 neon-glow" />
          <h1 className="text-3xl font-bold text-gradient">Sukoon</h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">
            {t("ai-support")}
          </Link>
          <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
            {t("resources")}
          </Link>
          <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
            {t("community")}
          </Link>
          <Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">
            {t("book-session")}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            asChild
            className="glass-effect border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 px-6 py-3"
          >
            <Link href="/login">{t("login")}</Link>
          </Button>
          <Button asChild className="btn-neon px-6 py-3">
            <Link href="/signup">{t("signup")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
