"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Language = "en-US" | "hi-IN" | "ks-IN" | "es-ES" | "fr-FR";

const promptsByLanguage: Record<Language, { label: string; query: string }[]> = {
  "en-US": [
    { label: "My Weekly Report", query: "Show my weekly wellness report" },
    { label: "Grounding Exercise", query: "Start a grounding exercise" },
    { label: "Gratitude Journal", query: "I want to try a gratitude journal" },
    { label: "Breathing Guide", query: "Guide me through a breathing exercise" },
    { label: "Positive Affirmation", query: "Show me a positive affirmation" },
    { label: "Feeling Lonely", query: "I feel lonely and disconnected" },
    { label: "Need to Focus", query: "How can I improve my focus?" },
    { label: "Better Sleep", query: "Any tips for better sleep?" },
  ],
  "hi-IN": [
    { label: "मेरी साप्ताहिक रिपोर्ट", query: "मेरी साप्ताहिक रिपोर्ट दिखाओ" },
    { label: "ग्राउंडिंग व्यायाम", query: "एक ग्राउंडिंग व्यायाम शुरू करें" },
    { label: "आभार पत्रिका", query: "मैं एक आभार पत्रिका आज़माना चाहता हूँ" },
    { label: "श्वास मार्गदर्शिका", query: "मुझे एक श्वास व्यायाम में मार्गदर्शन करें" },
    { label: "सकारात्मक पुष्टि", query: "मुझे एक सकारात्मक पुष्टि दिखाओ" },
    { label: "अकेला महसूस कर रहा हूँ", query: "मैं अकेला महसूस कर रहा हूँ" },
  ],
  "ks-IN": [
    { label: "مؠنِہ ہفتہ وار رَپورٹ", query: "مؠنِہ ہفتہ وار رَپورٹ ہاوِو" },
    { label: "گراؤنڈِنٛگ وَرزِش", query: "اَکھ گراؤنڈِنٛگ وَرزِش شروٗع کٔرِو" },
    { label: "شُکرٕچ ڈٲیری", query: "بہٕ چھُس اَکھ شُکرٕچ ڈٲیری آزماوُن یژھان" },
    { label: "ساہٕچ رَہنُمٲیی", query: "مےٚ کٔرِو ساہٕچ وَرزِشَس منٛز رَہنُمٲیی" },
    { label: "مثبت خیال", query: "مےٚ ہاوِو اَکھ مثبت خیال" },
    { label: "اکیلی محسٗوس کران", query: "بہٕ چھُس اکیلی محسٗوس کران" },
    { label: "بہتر نِندر", query: "بہتر نِندرِ خٲطرٕ کیا مَشورہ؟" },
    { label: "پریشان گَژھان", query: "بہٕ چھُس پریشان گَژھان" },
  ],
  "es-ES": [], 
  "fr-FR": [],
};

interface SuggestedPromptsProps {
  language: Language;
  onPromptClick: (query: string) => void;
}

export const SuggestedPrompts = ({ language, onPromptClick }: SuggestedPromptsProps) => {
  const prompts = promptsByLanguage[language]?.length > 0 ? promptsByLanguage[language] : promptsByLanguage["en-US"];
  return (
    <div className="flex flex-wrap gap-2 justify-center pt-2">
      {prompts.map((prompt) => (
        <Button key={prompt.label} variant="outline" size="sm" className="bg-white/5 text-white/70 border-white/20 hover:bg-white/10 hover:text-white" onClick={() => onPromptClick(prompt.query)}>
          {prompt.label}
        </Button>
      ))}
    </div>
  );
};