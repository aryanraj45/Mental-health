"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

// Define supported languages - only English, Hindi, and Kashmiri
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ks', name: 'کٲشُر', flag: '🇮🇳' }, // Kashmiri
]

// Translation dictionary
export const translations = {
  en: {
    // Header
    'mental-wellness-platform': 'Mental Wellness Platform',
    // 'ai-support': 'AI Support',
    'resources': 'Resources',
    'community': 'Community',
    'book-session': 'Book Session',
    'emergency': 'Emergency',
    'dashboard': 'Dashboard',
    'login': 'Login',
    'logout': 'Logout',
    
    // Homepage
    'your-mental': 'Your Mental',
    'wellness-journey': 'Wellness Journey',
    'see-sukoon-action': 'See Sukoon in Action',
    'interactive-walkthrough': 'An interactive walkthrough of our platform\'s key features.',
    'our-mission-at': 'Our Mission at',
    'sukoon': 'Sukoon',
    'mission-statement': 'We believe every student deserves a confidential space to nurture their mental wellbeing. Sukoon was built to break down barriers, offering anonymous, AI-powered support and easy access to professional help. Our mission is to ensure no student feels alone on their journey.',
    // 'signup': 'Sign Up',
    
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
    
    // Homepage
    'your-mental': 'आपका मानसिक',
    'wellness-journey': 'कल्याण यात्रा',
    'see-sukoon-action': 'सुकून को कार्य करते देखें',
    'interactive-walkthrough': 'हमारे प्लेटफॉर्म की मुख्य विशेषताओं का इंटरैक्टिव वॉकथ्रू',
    'our-mission-at': 'हमारा मिशन',
    'sukoon': 'सुकून',
    'mission-statement': 'हम मानते हैं कि हर विद्यार्थी अपने मानसिक स्वास्थ्य को बढ़ावा देने के लिए एक गोपनीय स्थान का हकदार है। सुकून को बाधाओं को तोड़ने के लिए बनाया गया था, जो गुमनाम, AI-संचालित समर्थन और पेशेवर मदद तक आसान पहुंच प्रदान करता है। हमारा मिशन यह सुनिश्चित करना है कि कोई भी विद्यार्थी अपनी यात्रा में अकेला महसूस न करे।',
    
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
    'journaling': 'پت्रिका لेखन',
    'mood-check': 'مूड چیک-इन',
    'start-exercise': 'अभ्यास شुरू کریں',
    'begin-meditation': 'ध्यान شुरू کریں',
    'start-journaling': 'پत्रिका लेखन شुरू کریں',
    'check-mood': 'اپنا مूड جांچیں',
  },
  
  ks: {
    // Header
    'mental-wellness-platform': 'ذہنی فلاح و بہبود پلیٹ فارم',
    'ai-support': 'AI مدد',
    'resources': 'وسائل',
    'community': 'کمیونٹی',
    'book-session': 'سیشن بک کریں',
    'emergency': 'ہنگامی',
    'dashboard': 'ڈیش بورڈ',
    'login': 'لاگ ان',
    'logout': 'لاگ آؤٹ',
    'signup': 'سائن اپ',
    
    // Homepage
    'your-mental': 'آپ کی ذہنی',
    'wellness-journey': 'صحت کا سفر',
    'see-sukoon-action': 'سکون کو عمل میں دیکھیں',
    'interactive-walkthrough': 'ہمارے پلیٹ فارم کی اہم خصوصیات کا تعاملی جائزہ',
    'our-mission-at': 'ہمارا مقصد',
    'sukoon': 'سکون',
    'mission-statement': 'ہم مانتے ہیں کہ ہر طالب علم اپنی ذہنی صحت کی پرورش کے لیے ایک خفیہ جگہ کا حقدار ہے۔ سکون کو رکاوٹوں کو توڑنے کے لیے بنایا گیا تھا، جو گمنام، AI طاقت سے چلنے والی مدد اور پیشہ ورانہ مدد تک آسان رسائی فراہم کرتا ہے۔ ہمارا مقصد یہ یقینی بنانا ہے کہ کوئی بھی طالب علم اپنے سفر میں اکیلا محسوس نہ کرے۔',
    
    // Common
    'loading': 'لوڈ ہو رہا ہے...',
    'save': 'محفوظ کریں',
    'cancel': 'منسوخ کریں',
    'continue': 'جاری رکھیں',
    'back': 'واپس',
    'next': 'اگلا',
    'submit': 'جمع کریں',
    'close': 'بند کریں',
    
    // Booking Page
    'book-counseling-session': 'کاؤنسلنگ سیشن بک کریں',
    'connect-with-professionals': 'ذاتی مدد کے لیے تصدیق شدہ ذہنی صحت کے پیشہ ور افراد سے رابطہ کریں',
    'choose-date-time': 'تاریخ اور وقت منتخب کریں',
    'select-counselor': 'کاؤنسلر منتخب کریں',
    'session-details': 'سیشن کی تفصیلات',
    'confirmation': 'تصدیق',
    'select-preferred-date': 'اپنی پسندیدہ تاریخ اور وقت کا سلاٹ منتخب کریں',
    'choose-counselor-matches': 'ایک کاؤنسلر منتخب کریں جو آپ کی ضروریات سے میل کھاتا ہو',
    'provide-session-details': 'سیشن کی تفصیلات اور ترجیحات فراہم کریں',
    'review-confirm-booking': 'اپنی بکنگ کا جائزہ لیں اور تصدیق کریں',
    'select-date': 'تاریخ منتخب کریں',
    'select-time': 'وقت منتخب کریں',
    'next-choose-counselor': 'اگلا: کاؤنسلر منتخب کریں',
    'next-session-details': 'اگلا: سیشن کی تفصیلات',
    'review-booking': 'بکنگ کا جائزہ',
    'confirm-booking': 'بکنگ کی تصدیق کریں',
    'session-type': 'سیشن کی قسم',
    'video-call': 'ویڈیو کال',
    'voice-call': 'وائس کال',
    'in-person': 'ذاتی طور پر',
    'book-anonymously': 'گمنام طور پر بک کریں (کاؤنسلر سیشن تک آپ کا نام نہیں دیکھے گا)',
    'what-discuss': 'آپ کیا بحث کرنا چاہیں گے؟ (اختیاری)',
    
    // Chat Page
    'ai-mental-health-chat': 'AI ذہنی صحت چیٹ',
    'confidential-supportive': 'خفیہ اور معاون AI کے ساتھ',
    'type-message': 'پیغام ٹائپ کریں...',
    'send': 'بھیجیں',
    'thinking': 'سوچ رہا ہے...',
    'hello-support': 'ہیلو! میں آپ کی مدد کے لیے یہاں ہوں۔ آج آپ کیسے محسوس کر رہے ہیں؟',
    
    // Emergency Page  
    'crisis-support': 'بحران کی مدد',
    'immediate-help': 'فوری مدد دستیاب ہے',
    'call-emergency': 'ہنگامی خدمات کو کال کریں',
    'crisis-helplines': 'بحران ہیلپ لائنز',
    'campus-resources': 'کیمپس کے وسائل',
    'safety-plan': 'حفاظتی منصوبہ',
    
    // Dashboard
    'welcome-back': 'واپسی پر خوش آمدید',
    'my-appointments': 'میری اپائنٹمنٹس',
    'session-history': 'سیشن کی تاریخ',
    'quick-actions': 'فوری اقدامات',
    'start-ai-chat': 'AI چیٹ شروع کریں',
    'book-a-session': 'سیشن بک کریں',
    'browse-resources': 'وسائل براؤز کریں',
    'emergency-support': 'ہنگامی مدد',
    'crisis-support-24-7': '24/7 بحران کی مدد',
    'upcoming-sessions': 'آنے والے سیشنز',
    'recent-activities': 'حالیہ سرگرمیاں',
    'wellness-badges': 'فلاحی بیجز',
    
    // Community
    'peer-support': 'ہم مرتبہ سپورٹ کمیونٹی',
    'connect-share-support': 'جڑیں، شیئر کریں، اور ایک دوسرے کی مدد کریں',
    'create-post': 'پوسٹ بنائیں',
    'anonymous-post': 'گمنام طور پر پوسٹ کریں',
    'share-thoughts': 'اپنے خیالات، تجربات شیئر کریں یا مدد طلب کریں...',
    'post': 'پوسٹ',
    'reply': 'جواب',
    'helpful': 'مددگار',
    'support': 'سپورٹ',
    
    // Resources
    'mental-health-resources': 'ذہنی صحت کے وسائل',
    'tools-support-journey': 'آپ کے ذہنی فلاح و بہبود کے سفر میں مددگار ٹولز اور مواد',
    'articles-guides': 'مضامین اور گائیڈز',
    'video-content': 'ویڈیو مواد',
    'audio-resources': 'آڈیو وسائل',
    'interactive-tools': 'انٹرایکٹو ٹولز',
    'read-more': 'مزید پڑھیں',
    'watch-now': 'اب دیکھیں',
    'listen-now': 'اب سنیں',
    'try-now': 'اب آزمائیں',
    
    // Wellness
    'wellness-center': 'فلاحی مرکز',
    'personalized-activities': 'آپ کی ذہنی صحت کے لیے ذاتی سرگرمیاں',
    'breathing-exercises': 'سانس کی مشقیں',
    'meditation': 'مراقبہ',
    'journaling': 'ڈائری لکھنا',
    'mood-check': 'موڈ چیک-ان',
    'start-exercise': 'مشق شروع کریں',
    'begin-meditation': 'مراقبہ شروع کریں',
    'start-journaling': 'ڈائری لکھنا شروع کریں',
    'check-mood': 'اپنا موڈ چیک کریں',
  }
}

type Language = 'en' | 'hi' | 'ks'
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
  const [isInitialized, setIsInitialized] = useState(false)

  // Load saved language preference on initial render only
  useEffect(() => {
    console.log("LanguageProvider mounted - checking localStorage")
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('preferred-language')
        console.log("Found saved language:", savedLanguage)
        
        // Check if it's one of our supported languages
        if (savedLanguage && ['en', 'hi', 'ks'].includes(savedLanguage)) {
          console.log("Setting language from localStorage:", savedLanguage)
          setCurrentLanguage(savedLanguage as Language)
        }
      } catch (error) {
        console.error("Error loading language preference:", error)
      } finally {
        setIsInitialized(true)
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    console.log("Setting language to:", language)
    // Update the state
    setCurrentLanguage(language)
    
    // Save to localStorage
    try {
      localStorage.setItem('preferred-language', language)
      console.log("Language saved to localStorage:", language)
    } catch (error) {
      console.error("Error saving language preference:", error)
    }
  }

  const t = (key: TranslationKey): string => {
    try {
      // First check if we have the key in the current language
      if (currentLanguage in translations) {
        const translatedValue = (translations[currentLanguage] as any)[key]
        if (translatedValue) {
          return translatedValue
        }
      }
      
      // Fall back to English if translation not found
      if (key in translations.en) {
        return translations.en[key]
      }
      
      // Return the key itself as a last resort
      return key as string
    } catch (error) {
      console.error("Translation error for key:", key, error)
      return key as string
    }
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
