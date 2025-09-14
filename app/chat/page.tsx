"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Send, Mic, MicOff, AlertTriangle, Phone, Bot, User, Brain, X, CheckCircle, ArrowUpRight, LifeBuoy, BookOpen, Users } from "lucide-react"
import { Header } from "@/components/header"
import Link from "next/link"
import { cn } from "@/lib/utils"

// --- Interfaces & Types ---
interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  isEmergency?: boolean
}

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onDismiss: () => void;
}

// --- Chat Logic (Unchanged) ---
const criticalWords = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'harm myself', 
  'self harm', 'cut myself', 'overdose', 'jump off', 'hang myself',
  'end it all', 'hurt myself', 'no point living', 'better off dead',
  'आत्महत्या', 'मरना चाहता हूं', 'जीना नहीं चाहता', 'खुद को मारना',
]

const contextualResponses = [
  {
    keywords: ["anxious", "anxiety", "worried", "panic"],
    response: "I understand you're feeling anxious. That's a very common experience among students. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. Would you like me to guide you through some other anxiety management strategies?"
  },
  {
    keywords: ["depressed", "sad", "hopeless", "down"],
    response: "I hear that you're going through a difficult time. These feelings are valid, and you're not alone. Many students experience similar challenges. Have you been able to maintain your daily routines like eating and sleeping?"
  },
  {
    keywords: ["stressed", "overwhelmed", "pressure", "exam"],
    response: "Academic stress is very common, especially during exam periods. Let's break this down - what specific aspect is causing you the most stress? Sometimes organizing tasks into smaller, manageable pieces can help."
  },
  {
    keywords: ["lonely", "isolated", "alone", "friends"],
    response: "Feeling lonely, especially in college, is more common than you might think. Many students struggle with social connections. Have you considered joining any clubs or study groups?"
  }
]

// --- Re-styled Components ---

const Toast = ({ message, type, onDismiss }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  const bgColor = type === 'success' 
    ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
    : type === 'error' 
    ? 'bg-gradient-to-r from-red-600 to-rose-600' 
    : 'bg-gradient-to-r from-slate-800 to-slate-700';
  
  const Icon = type === 'success' ? CheckCircle : type === 'error' ? AlertTriangle : Bot;
  
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0, scale: 0.3 }} 
      animate={{ y: 0, opacity: 1, scale: 1 }} 
      exit={{ y: 100, opacity: 0, scale: 0.3 }} 
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-4 rounded-xl shadow-2xl text-white backdrop-blur-sm border border-white/10 ${bgColor}`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{message}</span>
      <Button variant="ghost" size="sm" onClick={onDismiss} className="h-auto p-1 text-white hover:bg-white/20">
        <X className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

const QuickActionCard = ({ icon: Icon, title, description, href }: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5), rgba(30, 41, 59, 0.5))',
        backdropFilter: 'blur(8px)'
      }}
    >
      <Link href={href} className="absolute inset-0 z-10" aria-label={title} />
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800">
          <Icon className="h-6 w-6 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">{title}</h3>
          <p className="text-slate-400 text-sm">{description}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-slate-500 group-hover:text-cyan-400 transition-colors duration-300" />
      </div>
    </motion.div>
  );
};

// --- Main Chat Page Component ---
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI mental health companion, here to provide a safe space to talk. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = 'en-US';
      recognition.current.onresult = (event: any) => {
        setInputValue(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.current.onerror = () => setIsListening(false);
    }
  }, []);
  
  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const checkForCriticalWords = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return criticalWords.some(word => lowerText.includes(word.toLowerCase()));
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (checkForCriticalWords(userMessage)) {
      setShowCrisisAlert(true);
      return "I'm really concerned by what you've shared. It's incredibly brave of you to talk about it. Please know that your life is valuable, and immediate help is available. You can reach the National Institute of Mental Health and Neuro-Sciences at 080-26995000. Help is just a call away.";
    }
    for (const response of contextualResponses) {
      if (response.keywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
        return response.response;
      }
    }
    const defaultResponses = [
      "Thank you for sharing that with me. Can you tell me more about what's on your mind?",
      "I hear you. It sounds like a lot to handle. What has this experience been like for you?",
      "That sounds really challenging. I'm here to listen without judgment.",
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), content: inputValue, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const messageContent = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      const aiResponseText = await generateAIResponse(messageContent);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
        isEmergency: checkForCriticalWords(messageContent)
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    } else {
      setToast({ message: "Voice input not supported on this browser.", type: 'error', onDismiss: () => setToast(null) });
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#0f172a' }}>
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card 
          className="h-[650px] flex flex-col border border-slate-700 backdrop-blur-sm"
          style={{ 
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.5), rgba(30, 41, 59, 0.5))',
            backdropFilter: 'blur(8px)'
          }}
        >
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ background: 'linear-gradient(135deg, #06b6d4, #2563eb)' }}>
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">AI Mental Health Companion</CardTitle>
                  <p className="text-sm text-slate-400">A safe and confidential space</p>
                </div>
              </div>
              <div className="px-3 py-1 text-xs font-medium text-green-300 bg-green-900/50 border border-green-700/50 rounded-full">
                Online
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollAreaRef}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-3", msg.sender === 'user' ? "justify-end" : "justify-start")}
                >
                  {msg.sender === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #2563eb)' }}>
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={cn("max-w-[80%] rounded-2xl px-4 py-3", 
                    msg.sender === 'user' ? "text-white" : "text-slate-100 border border-slate-700/50",
                    msg.isEmergency && "bg-gradient-to-r from-red-600/50 to-rose-600/50 border-red-500/50"
                  )}
                    style={ msg.sender === 'user' ? { background: 'linear-gradient(90deg, #0891b2, #2563eb)' } : 
                           !msg.isEmergency ? { backgroundColor: 'rgba(30, 41, 59, 0.5)' } : {}
                  }>
                    <p className="text-sm">{msg.content}</p>
                    <p className={cn("text-xs mt-1 opacity-70", msg.sender === 'user' ? "text-cyan-100" : "text-slate-400")}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #2563eb)' }}>
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 border border-slate-700/50" style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
                    <div className="flex gap-1.5 items-center h-5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="border-t border-slate-700 p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={startListening} className={cn("border-slate-600 bg-slate-800 hover:bg-slate-700", isListening && "border-red-500 bg-red-900/50")}>
                  {isListening ? <MicOff className="h-4 w-4 text-red-400" /> : <Mic className="h-4 w-4 text-slate-400" />}
                </Button>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim() || isTyping} style={{ background: 'linear-gradient(90deg, #0891b2, #2563eb)' }}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="mt-8">
            <h3 className="text-center text-slate-400 mb-6 font-medium">Find More Support</h3>
            <div className="grid md:grid-cols-3 gap-6">
                <QuickActionCard icon={LifeBuoy} title="Professional Help" description="Connect with a licensed counselor" href="/book" />
                <QuickActionCard icon={BookOpen} title="Explore Resources" description="Self-help guides and wellness tools" href="/resources" />
                <QuickActionCard icon={Users} title="Join Community" description="Connect with peer support groups" href="/community" />
            </div>
        </div>
      </main>

      {/* Crisis Alert Dialog */}
      <AnimatePresence>
      {showCrisisAlert && (
        <AlertDialog open onOpenChange={setShowCrisisAlert}>
          <AlertDialogContent 
            className="border-red-500/50"
            style={{ 
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
              backdropFilter: 'blur(12px)'
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-3 text-red-400">
                <AlertTriangle />
                Immediate Support Recommended
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-300 pt-2">
                It sounds like you are in significant distress. Your safety is the top priority. 
                Please consider reaching out to a professional who can provide immediate help.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowCrisisAlert(false)} className="border-slate-600 text-slate-300 hover:text-white" style={{ backgroundColor: 'transparent' }}>
                No, I'm okay
              </Button>
              <Button onClick={() => window.open('tel:080-26995000')} className="bg-gradient-to-r from-red-600 to-rose-600 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Call Helpline Now
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast {...toast} />}
      </AnimatePresence>
    </div>
  )
}