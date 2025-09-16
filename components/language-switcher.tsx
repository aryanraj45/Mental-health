"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { usePathname } from "next/navigation"

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage()
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  
  // Current language object
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0]

  const handleLanguageChange = (languageCode: "en" | "hi" | "ks") => {
    setLanguage(languageCode)
    // Save to localStorage to persist the selection
    localStorage.setItem("preferred-language", languageCode)
  }

  // Don't render the language switcher on non-homepage routes
  if (!isHomePage) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent backdrop-blur-sm border-white/20 hover:bg-white/10 text-white">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{currentLang.flag} {currentLang.name}</span>
          <span className="md:hidden">{currentLang.flag}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-black/80 backdrop-blur-md border-white/20">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code as "en" | "hi" | "ks")}
            className="flex items-center gap-2 cursor-pointer text-white hover:bg-white/10"
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {language.code === currentLanguage && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
