"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

// Define supported languages
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
]

// Translation dictionary
export const translations = {
  en: {
    // Header
    'mental-wellness-platform': 'Mental Wellness Platform',
    'ai-support': 'AI Support',
    'resources': 'Resources',
    'community': 'Community',
    'book-session': 'Book Session',
    'emergency': 'Emergency',
    'dashboard': 'Dashboard',
    'login': 'Login',
    'logout': 'Logout',
    'signup': 'Sign Up',
    
    // Common
    'loading': 'Loading...',
    'save': 'Save',
    'cancel': 'Cancel',
    'continue': 'Continue',
    'back': 'Back',
    'next': 'Next',
    'submit': 'Submit',
    'close': 'Close',
    
    // Booking Page
    'book-counseling-session': 'Book a Counseling Session',
    'connect-with-professionals': 'Connect with certified mental health professionals for personalized support',
    'choose-date-time': 'Choose Date & Time',
    'select-counselor': 'Select Counselor',
    'session-details': 'Session Details',
    'confirmation': 'Confirmation',
    'select-preferred-date': 'Select your preferred date and time slot',
    'choose-counselor-matches': 'Choose a counselor that matches your needs',
    'provide-session-details': 'Provide session details and preferences',
    'review-confirm-booking': 'Review and confirm your booking',
    'select-date': 'Select Date',
    'select-time': 'Select Time',
    'next-choose-counselor': 'Next: Choose Counselor',
    'next-session-details': 'Next: Session Details',
    'review-booking': 'Review Booking',
    'confirm-booking': 'Confirm Booking',
    'session-type': 'Session Type',
    'video-call': 'Video Call',
    'voice-call': 'Voice Call',
    'in-person': 'In-Person',
    'book-anonymously': 'Book anonymously (counselor won\'t see your name until the session)',
    'what-discuss': 'What would you like to discuss? (Optional)',
    'share-concerns': 'Share what\'s on your mind or any specific concerns you\'d like to address...',
    'helps-counselor-prepare': 'This helps your counselor prepare for the session',
    'urgent-support': 'This is urgent - I need support as soon as possible',
    'booking-summary': 'Booking Summary',
    'date': 'Date',
    'time': 'Time',
    'counselor': 'Counselor',
    'duration': 'Duration',
    'total-cost': 'Total Cost',
    'whats-next': 'What\'s Next:',
    'confirmation-email': 'You\'ll receive a confirmation email with session details',
    'reminder-24h': 'A reminder will be sent 24 hours before your appointment',
    'video-meeting-link': 'For video calls, you\'ll receive a secure meeting link',
    'reschedule-cancel': 'You can reschedule or cancel up to 4 hours before the session',
    
    // Emergency
    'crisis-support': 'Crisis Support',
    'immediate-help': 'Immediate Help Available 24/7',
    'emergency-contacts': 'Emergency Contacts',
    'ngos-organizations': 'NGOs & Organizations',
    'call-now': 'Call Now',
    'chat-whatsapp': 'Chat on WhatsApp',
    'visit-website': 'Visit Website',
    'location': 'Location',
    'available': 'Available',
    'filter-by-location': 'Filter by Location',
    'all-locations': 'All Locations',
    
    // Dashboard
    'welcome-back': 'Welcome back',
    'your-mental-wellness': 'Your Mental Wellness Journey',
    'mood-tracker': 'Mood Tracker',
    'upcoming-sessions': 'Upcoming Sessions',
    'recent-activities': 'Recent Activities',
    'wellness-badges': 'Wellness Badges',
    
    // Admin
    'admin-dashboard': 'Admin Dashboard',
    'student-analytics': 'Student Analytics & Crisis Management',
    'crisis-alerts': 'Crisis Alerts',
    'reports': 'Reports',
    'ai-insights': 'AI Insights',
    'student-search': 'Search students...',
    'search': 'Search',
    'export-data': 'Export Data',
    'download-report': 'Download Monthly Report',
    'new-crisis-alerts': 'New Crisis Alerts',
    'requiring-attention': 'requiring immediate attention',
    'mental-health-trends': 'Mental Health Trends',
    'average-score': 'Average Mental Health Score',
    
    // Community
    'peer-support': 'Peer Support Community',
    'connect-share-support': 'Connect, Share, and Support Each Other',
    'create-post': 'Create Post',
    'anonymous-post': 'Post Anonymously',
    'share-thoughts': 'Share your thoughts, experiences, or ask for support...',
    'post': 'Post',
    'reply': 'Reply',
    'helpful': 'Helpful',
    'support': 'Support',
    
    // Resources
    'mental-health-resources': 'Mental Health Resources',
    'tools-support-journey': 'Tools and content to support your mental wellness journey',
    'articles-guides': 'Articles & Guides',
    'video-content': 'Video Content',
    'audio-resources': 'Audio Resources',
    'interactive-tools': 'Interactive Tools',
    'read-more': 'Read More',
    'watch-now': 'Watch Now',
    'listen-now': 'Listen Now',
    'try-now': 'Try Now',
    
    // Wellness
    'wellness-center': 'Wellness Center',
    'personalized-activities': 'Personalized activities for your mental health',
    'breathing-exercises': 'Breathing Exercises',
    'meditation': 'Meditation',
    'journaling': 'Journaling',
    'mood-check': 'Mood Check-in',
    'start-exercise': 'Start Exercise',
    'begin-meditation': 'Begin Meditation',
    'start-journaling': 'Start Journaling',
    'check-mood': 'Check Your Mood',
  },
  
  hi: {
    // Header
    'mental-wellness-platform': 'मानसिक कल्याण मंच',
    'ai-support': 'AI सहायता',
    'resources': 'संसाधन',
    'community': 'समुदाय',
    'book-session': 'सत्र बुक करें',
    'emergency': 'आपातकाल',
    'dashboard': 'डैशबोर्ड',
    'login': 'लॉग इन',
    'logout': 'लॉगआउट',
    'signup': 'साइन अप',
    
    // Common
    'loading': 'लोड हो रहा है...',
    'save': 'सहेजें',
    'cancel': 'रद्द करें',
    'continue': 'जारी रखें',
    'back': 'वापस',
    'next': 'अगला',
    'submit': 'जमा करें',
    'close': 'बंद करें',
    
    // Booking Page
    'book-counseling-session': 'परामर्श सत्र बुक करें',
    'connect-with-professionals': 'व्यक्तिगत सहायता के लिए प्रमाणित मानसिक स्वास्थ्य पेशेवरों से जुड़ें',
    'choose-date-time': 'दिनांक और समय चुनें',
    'select-counselor': 'परामर्शदाता चुनें',
    'session-details': 'सत्र विवरण',
    'confirmation': 'पुष्टि',
    'select-preferred-date': 'अपनी पसंदीदा तारीख और समय स्लॉट चुनें',
    'choose-counselor-matches': 'एक परामर्शदाता चुनें जो आपकी आवश्यकताओं से मेल खाता हो',
    'provide-session-details': 'सत्र विवरण और प्राथमिकताएं प्रदान करें',
    'review-confirm-booking': 'अपनी बुकिंग की समीक्षा करें और पुष्टि करें',
    'select-date': 'दिनांक चुनें',
    'select-time': 'समय चुनें',
    'next-choose-counselor': 'अगला: परामर्शदाता चुनें',
    'next-session-details': 'अगला: सत्र विवरण',
    'review-booking': 'बुकिंग समीक्षा',
    'confirm-booking': 'बुकिंग पुष्टि करें',
    'session-type': 'सत्र प्रकार',
    'video-call': 'वीडियो कॉल',
    'voice-call': 'वॉयस कॉल',
    'in-person': 'व्यक्तिगत',
    'book-anonymously': 'गुमनाम रूप से बुक करें (परामर्शदाता सत्र तक आपका नाम नहीं देखेगा)',
    'what-discuss': 'आप क्या चर्चा करना चाहेंगे? (वैकल्पिक)',
    'share-concerns': 'अपने मन की बात साझा करें या किसी विशिष्ट चिंता के बारे में बताएं...',
    'helps-counselor-prepare': 'इससे आपके परामर्शदाता को सत्र की तैयारी में मदद मिलती है',
    'urgent-support': 'यह जरूरी है - मुझे जल्द से जल्द सहायता चाहिए',
    'booking-summary': 'बुकिंग सारांश',
    'date': 'दिनांक',
    'time': 'समय',
    'counselor': 'परामर्शदाता',
    'duration': 'अवधि',
    'total-cost': 'कुल लागत',
    'whats-next': 'आगे क्या:',
    'confirmation-email': 'आपको सत्र विवरण के साथ एक पुष्टिकरण ईमेल प्राप्त होगा',
    'reminder-24h': 'आपकी नियुक्ति से 24 घंटे पहले एक रिमाइंडर भेजा जाएगा',
    'video-meeting-link': 'वीडियो कॉल के लिए, आपको एक सुरक्षित मीटिंग लिंक प्राप्त होगा',
    'reschedule-cancel': 'आप सत्र से 4 घंटे पहले तक पुनर्निर्धारण या रद्द कर सकते हैं',
    
    // Emergency
    'crisis-support': 'संकट सहायता',
    'immediate-help': 'तत्काल सहायता 24/7 उपलब्ध',
    'emergency-contacts': 'आपातकालीन संपर्क',
    'ngos-organizations': 'एनजीओ और संगठन',
    'call-now': 'अभी कॉल करें',
    'chat-whatsapp': 'व्हाट्सऐप पर चैट करें',
    'visit-website': 'वेबसाइट पर जाएं',
    'location': 'स्थान',
    'available': 'उपलब्ध',
    'filter-by-location': 'स्थान के अनुसार फिल्टर करें',
    'all-locations': 'सभी स्थान',
    
    // Dashboard
    'welcome-back': 'वापस स्वागत है',
    'your-mental-wellness': 'आपकी मानसिक कल्याण यात्रा',
    'mood-tracker': 'मूड ट्रैकर',
    'upcoming-sessions': 'आगामी सत्र',
    'recent-activities': 'हाल की गतिविधियां',
    'wellness-badges': 'कल्याण बैज',
    
    // Admin
    'admin-dashboard': 'एडमिन डैशबोर्ड',
    'student-analytics': 'छात्र विश्लेषण और संकट प्रबंधन',
    'crisis-alerts': 'संकट अलर्ट',
    'reports': 'रिपोर्ट',
    'ai-insights': 'AI अंतर्दृष्टि',
    'student-search': 'छात्रों को खोजें...',
    'search': 'खोजें',
    'export-data': 'डेटा निर्यात करें',
    'download-report': 'मासिक रिपोर्ट डाउनलोड करें',
    'new-crisis-alerts': 'नए संकट अलर्ट',
    'requiring-attention': 'तत्काल ध्यान देने की आवश्यकता',
    'mental-health-trends': 'मानसिक स्वास्थ्य रुझान',
    'average-score': 'औसत मानसिक स्वास्थ्य स्कोर',
    
    // Community
    'peer-support': 'साथी सहायता समुदाय',
    'connect-share-support': 'जुड़ें, साझा करें, और एक-दूसरे का समर्थन करें',
    'create-post': 'पोस्ट बनाएं',
    'anonymous-post': 'गुमनाम पोस्ट',
    'share-thoughts': 'अपने विचार, अनुभव साझा करें या सहायता मांगें...',
    'post': 'पोस्ट',
    'reply': 'उत्तर',
    'helpful': 'उपयोगी',
    'support': 'सहायता',
    
    // Resources
    'mental-health-resources': 'मानसिक स्वास्थ्य संसाधन',
    'tools-support-journey': 'आपकी मानसिक कल्याण यात्रा का समर्थन करने वाले उपकरण और सामग्री',
    'articles-guides': 'लेख और गाइड',
    'video-content': 'वीडियो सामग्री',
    'audio-resources': 'ऑडियो संसाधन',
    'interactive-tools': 'इंटरैक्टिव टूल्स',
    'read-more': 'और पढ़ें',
    'watch-now': 'अभी देखें',
    'listen-now': 'अभी सुनें',
    'try-now': 'अभी कोशिश करें',
    
    // Wellness
    'wellness-center': 'कल्याण केंद्र',
    'personalized-activities': 'आपके मानसिक स्वास्थ्य के लिए व्यक्तिगत गतिविधियां',
    'breathing-exercises': 'श्वास अभ्यास',
    'meditation': 'ध्यान',
    'journaling': 'पत्रिका लेखन',
    'mood-check': 'मूड चेक-इन',
    'start-exercise': 'अभ्यास शुरू करें',
    'begin-meditation': 'ध्यान शुरू करें',
    'start-journaling': 'पत्रिका लेखन शुरू करें',
    'check-mood': 'अपना मूड जांचें',
  }
}

type Language = keyof typeof translations
type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
  availableLanguages: typeof languages
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')

  useEffect(() => {
    // Load saved language from localStorage
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language
      if (savedLanguage && translations[savedLanguage]) {
        setCurrentLanguage(savedLanguage)
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language)
    }
  }

  const t = (key: TranslationKey): string => {
    const languageTranslations = translations[currentLanguage]
    const fallbackTranslations = translations.en
    
    if (languageTranslations && key in languageTranslations) {
      return languageTranslations[key]
    }
    
    if (key in fallbackTranslations) {
      return fallbackTranslations[key]
    }
    
    return key
  }

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      availableLanguages: languages
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
