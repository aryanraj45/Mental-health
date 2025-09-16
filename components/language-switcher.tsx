"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage()
  const [open, setOpen] = useState(false)
  
  // Current language object
  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0]

  const handleLanguageChange = (languageCode: "en" | "hi" | "ks") => {
    console.log("Changing language to:", languageCode)
    setLanguage(languageCode)
    // Save to localStorage to persist the selection
    localStorage.setItem("preferred-language", languageCode)
    setOpen(false) // Close the dropdown after selection
  }

  // Let's create a simple manual dropdown instead of using the dropdown-menu component
  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 bg-black/40 backdrop-blur-md border-white/20 hover:bg-white/10 text-white"
        onClick={() => setOpen(prev => !prev)}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline">{currentLang.flag} {currentLang.name}</span>
        <span className="md:hidden">{currentLang.flag}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black/90 backdrop-blur-md border border-white/20 py-1 z-50">
          {availableLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code as "en" | "hi" | "ks")}
              className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              <span className="mr-2">{language.flag}</span>
              <span>{language.name}</span>
              {language.code === currentLanguage && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
