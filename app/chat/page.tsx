"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Send, Mic, MicOff, AlertTriangle, Phone, Bot, User, Brain, Heart, BarChart, Smile, BookOpen, Clock, X, Volume2, VolumeX, Languages, Wind, CheckCircle, Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
// import ElegantShape from "@/components/ElegantShape";
// FIX: Update the path below if ElegantShape exists elsewhere, or create the component at the expected path.

//================================================================================
// --- TYPE DEFINITIONS ---
//================================================================================
interface Message {
  id: string;
  sender: "user" | "ai";
  text?: string;
  component?: ReactNode; // For structured responses like breathing exercises
  isEmergency?: boolean;
}

//================================================================================
// --- CORE CHAT LOGIC (MENTAL HEALTH) ---
//================================================================================
const criticalWords = [
  // English
  "suicide", "kill myself", "end my life", "want to die", "harm myself", "self harm", "cut myself", "overdose", "jump off", "hang myself", "end it all", "hurt myself", "no point living", "better off dead",
  // Hindi
  "आत्महत्या", "मरना चाहता हूं", "जीना नहीं चाहता", "खुद को मारना",
  // Kashmiri
  "خودکشی", "مَرُن چھُس", "جیون نہ چھُس یژھان", "پان مارُن"
];

const contextualResponses = [
  { 
    keywords: ["anxious", "anxiety", "worried", "panic", "چنتا", "گھبراہٹ"], 
    response: "I understand you're feeling anxious. That's a very common experience. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. Would you like me to guide you through it?" 
  },
  { 
    keywords: ["depressed", "sad", "hopeless", "down", "اداس", "مایوس"], 
    response: "I hear that you're going through a difficult time. These feelings are valid, and you're not alone. Sometimes, just naming these feelings is a powerful first step." 
  },
  { 
    keywords: ["stressed", "overwhelmed", "pressure", "exam", "دباؤ", "تناؤ"], 
    response: "It sounds like a lot is on your plate right now. Academic stress is very real. Let's try to break it down. What's one small thing that feels most pressing?" 
  },
  { 
    keywords: ["gratitude", "thankful", "grateful", "شکریہ", "ممنون"], 
    response: "That's wonderful to hear. Practicing gratitude can have a profound impact on our well-being. What is one small thing you're grateful for today?" 
  },
];

//================================================================================
// --- ADVANCED UI COMPONENTS (INSPIRED BY INGRES) ---
//================================================================================

// --- Animated "Thinking" Indicator ---
const AIThinkingIndicator = () => {
  const thinkingPhrases = ["Listening with empathy...", "Finding helpful resources...", "Crafting a thoughtful response...", "Holding space for you..."];
  const [currentPhrase, setCurrentPhrase] = useState(thinkingPhrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase(thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-start gap-3 max-w-2xl mr-auto">
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center shadow-lg">
        <Bot className="w-5 h-5 text-white" />
      </motion.div>
      <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg space-y-2 w-full max-w-xs">
        <div className="flex space-x-1.5 items-center h-8">
          <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} />
          <motion.div className="w-2 h-2 bg-white/40 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
          <div className="text-xs text-white/60 w-full overflow-hidden ml-2">
            <AnimatePresence mode="wait">
              <motion.span key={currentPhrase} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }}>
                {currentPhrase}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Custom Hook for Voice Recognition ---
const useSpeechRecognition = ({ lang }: { lang: string }) => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === "undefined" || !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) return;
        
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.continuous = false; // Set to false to stop after user finishes speaking
        recognition.interimResults = false;
        recognition.lang = lang;
        
        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            setText(transcript);
            stopListening(); // Automatically stop after getting a final result
        };
        recognition.onend = () => setIsListening(false);

        return () => recognition?.stop();
    }, [lang]);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setText("");
            recognitionRef.current.start();
            setIsListening(true);
        }
    };
    
    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };
    
    return { text, setText, startListening, stopListening, isListening };
};

// --- Structured Response Example: Breathing Exercise ---
const BreathingExerciseCard = () => {
    const [step, setStep] = useState('Ready?');
    const [count, setCount] = useState(0);

    const cycle = [
        { name: 'Inhale', duration: 4, next: 'Hold' },
        { name: 'Hold', duration: 7, next: 'Exhale' },
        { name: 'Exhale', duration: 8, next: 'Inhale' },
    ];

    useEffect(() => {
        if (step === 'Ready?' || step === 'Done!') return;
        
        const currentStep = cycle.find(s => s.name === step)!;
        setCount(currentStep.duration);
        
        const countdownInterval = setInterval(() => setCount(prev => prev - 1), 1000);
        const stepTimeout = setTimeout(() => setStep(currentStep.next), currentStep.duration * 1000);

        return () => {
            clearInterval(countdownInterval);
            clearTimeout(stepTimeout);
        };
    }, [step]);
    
    return (
        <Card className="bg-white/10 border border-white/20 backdrop-blur-lg text-white max-w-sm mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wind /> 4-7-8 Breathing Exercise</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <motion.div key={step} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1 }} className="text-6xl font-bold my-4">
                    {step !== 'Ready?' && step !== 'Done!' ? count : '🧘'}
                </motion.div>
                <p className="text-2xl font-semibold mb-6">{step}</p>
                {step === 'Ready?' && (
                    <Button onClick={() => setStep('Inhale')} className="bg-white text-black rounded-full">Begin</Button>
                )}
            </CardContent>
        </Card>
    );
};

//================================================================================
// --- MAIN SUKOON CHAT ASSISTANT COMPONENT ---
//================================================================================
export default function SukoonChatAssistant() {
    const [view, setView] = useState("dashboard"); // 'dashboard' or 'chat'
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showCrisisAlert, setShowCrisisAlert] = useState(false);
    const [isCoPilotMode, setIsCoPilotMode] = useState(false);
    const [language, setLanguage] = useState("en-US");
    
    const chatContainerRef = useRef<HTMLDivElement>(null);
    
    const { text: voiceText, setText: setVoiceText, startListening, stopListening, isListening } = useSpeechRecognition({ lang: language });
    
    // Auto-fill input with voice text and submit
    useEffect(() => {
        if (voiceText) {
            setInputValue(voiceText);
            handleSendMessage(voiceText); // Submit automatically after speech is recognized
            setVoiceText(""); // Clear voice text after submission
        }
    }, [voiceText]);

    // Scroll to bottom of chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Text-to-speech function for Co-Pilot Mode
    const speakText = (text: string) => {
        if (!isCoPilotMode || typeof window === 'undefined' || !window.speechSynthesis) return;
        
        window.speechSynthesis.cancel(); // Stop any previous speech
        const utterance = new SpeechSynthesisUtterance(text);
        
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('en'));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    };

    // Main message handling logic
    const handleSendMessage = async (text: string) => {
        const query = text.trim();
        if (!query) return;

        setView("chat");
        const userMessage: Message = { id: Date.now().toString(), sender: "user", text: query };
        setMessages(prev => prev.length === 0 
            ? [{ id: "welcome", sender: "ai", text: "Hello! I'm your AI mental health companion. How are you feeling today?" }, userMessage] 
            : [...prev, userMessage]
        );
        setInputValue("");
        setIsTyping(true);

        // --- AI Response Generation ---
        setTimeout(async () => {
            let aiMessage: Message;
            const lowerCaseQuery = query.toLowerCase();

            // 1. Crisis Detection
            if (criticalWords.some(word => lowerCaseQuery.includes(word))) {
                setShowCrisisAlert(true);
                aiMessage = { id: (Date.now() + 1).toString(), sender: 'ai', isEmergency: true, text: "I'm really concerned by what you've shared. It's incredibly brave of you to talk about it. Please know that your life is valuable, and immediate help is available." };
            } 
            // 2. Structured Component Response
            else if (lowerCaseQuery.includes("breathing exercise") || lowerCaseQuery.includes("breathe")) {
                aiMessage = { id: (Date.now() + 1).toString(), sender: 'ai', component: <BreathingExerciseCard />, text: "Of course. Here is a guided breathing exercise to help you find a moment of calm." };
            }
            // 3. Keyword-based Text Response
            else {
                let responseText = "Thank you for sharing. It's helpful to talk about these things. Could you tell me a little more about what's on your mind?"; // Default response
                for (const item of contextualResponses) {
                    if (item.keywords.some(keyword => lowerCaseQuery.includes(keyword))) {
                        responseText = item.response;
                        break;
                    }
                }
                aiMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: responseText };
            }
            
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
            if (aiMessage.text) speakText(aiMessage.text); // Speak the text part of the message if it exists
        }, 1500);
    };

    const commonCommandBarProps = {
        inputValue,
        onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value),
        onSubmit: () => handleSendMessage(inputValue),
        isListening,
        onMicClick: isListening ? stopListening : startListening,
        language,
        onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => setLanguage(e.target.value),
        isCoPilotMode,
        onCoPilotModeChange: () => {
            const newMode = !isCoPilotMode;
            setIsCoPilotMode(newMode);
            if (newMode) {
                speakText("Voice companion activated. I'm here to listen.");
            } else {
                window.speechSynthesis.cancel();
            }
        },
    };

    // -- RENDER FUNCTIONS for Dashboard and Chat Views --

    const renderDashboard = () => (
        <div className="container mx-auto px-6 pt-12 pb-24 mt-16 modern-spacing">
            <div className="text-center max-w-5xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold text-gradient text-6xl md:text-8xl mb-6 text-glow"
                >
                    Sukoon AI Companion
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl text-muted-foreground max-w-3xl mt-6 mx-auto leading-relaxed"
                >
                    Your intelligent, confidential space for mental well-being.
                </motion.p>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-16"
            >
                <SukoonCommandBar {...commonCommandBarProps} />
            </motion.div>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={{ 
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } 
                }} 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 max-w-7xl mx-auto"
            >
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                    <StatCard icon={<Clock className="w-6 h-6 text-primary" />} value="25 mins" title="Mindful Minutes" period="This Week" change="+5.2%" changeType="increase" />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                    <StatCard icon={<Smile className="w-6 h-6 text-accent" />} value="7.2 / 10" title="Avg. Mood Score" period="This Month" change="+18.1%" changeType="increase" />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                    <StatCard icon={<BookOpen className="w-6 h-6 text-secondary" />} value="4" title="Journal Entries" period="This Week" />
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                    <StatCard icon={<BarChart className="w-6 h-6 text-primary" />} value="8" title="Sessions Completed" period="Total" />
                </motion.div>
            </motion.div>
        </div>
    );

    // StatCard component definition
    interface StatCardProps {
        icon: ReactNode;
        value: string;
        title: string;
        period?: string;
        change?: string;
        changeType?: "increase" | "decrease";
    }

    const StatCard = ({ icon, value, title, period, change, changeType }: StatCardProps) => (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="glass-effect border-border/50 backdrop-blur-xl text-foreground shadow-2xl neon-glow-accent modern-spacing-sm">
                <CardHeader className="flex flex-row items-center gap-4 pb-3">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 border border-primary/20">
                        {icon}
                    </div>
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="text-4xl font-bold text-gradient mb-2">{value}</div>
                    {period && <div className="text-sm text-muted-foreground mb-3">{period}</div>}
                    {change && (
                        <div className={`text-sm font-semibold flex items-center gap-1 ${
                            changeType === "increase" ? "text-accent" : "text-destructive"
                        }`}>
                            {changeType === "increase" ? 
                                <CheckCircle className="h-4 w-4" /> : 
                                <AlertTriangle className="h-4 w-4" />
                            }
                            {change}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderChatView = () => (
        <div className="flex items-center justify-center min-h-screen p-2 md:p-4">
            <Card className="w-full h-[calc(100vh-2rem)] max-w-3xl flex flex-col bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg rounded-2xl shadow-2xl shadow-black/30">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <Bot className="h-6 w-6 text-indigo-300" />
                        <CardTitle className="text-xl text-white">AI Companion</CardTitle>
                    </div>
                    <Button variant="ghost" className="text-white/70 hover:text-white" onClick={() => { setView("dashboard"); setMessages([]); }}>
                        <X className="h-4 w-4 mr-2" /> End Chat
                    </Button>
                </CardHeader>
                <CardContent ref={chatContainerRef} className="flex-grow overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <motion.div key={msg.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 max-w-lg ${msg.sender === 'user' ? 'ml-auto justify-end' : 'mr-auto'}`}>
                            {msg.sender === 'ai' && (
                                <Avatar className="h-9 w-9 border-2 border-indigo-500/30"><AvatarFallback className="bg-gradient-to-br from-indigo-500 to-rose-500"><Bot className="h-5 w-5 text-white" /></AvatarFallback></Avatar>
                            )}
                            <div className="max-w-full">
                                {msg.sender === 'user' ? (
                                    <div className="bg-gradient-to-br from-indigo-500 to-rose-500 text-white p-3 rounded-2xl rounded-br-none shadow-md">
                                        <p>{msg.text}</p>
                                    </div>
                                ) : (
                                    <div className={cn("p-3 rounded-2xl rounded-bl-none prose prose-invert prose-p:my-0", msg.isEmergency ? "!bg-gradient-to-br from-red-500/80 to-rose-500/80 border-red-500/50" : "bg-white/5 border border-white/10")}>
                                        {msg.text && <p>{msg.text}</p>}
                                        {msg.component}
                                    </div>
                                )}
                            </div>
                            {msg.sender === 'user' && (
                                <Avatar className="h-9 w-9"><AvatarFallback className="bg-white/10"><User className="h-5 w-5 text-white/70" /></AvatarFallback></Avatar>
                            )}
                        </motion.div>
                    ))}
                    {isTyping && <AIThinkingIndicator />}
                </CardContent>
                <div className="p-4 border-t border-white/10 mt-auto">
                    <SukoonCommandBar {...commonCommandBarProps} inChatView={true} />
                </div>
            </Card>
        </div>
    );
    
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/90 pointer-events-none" />
            
            <AnimatePresence mode="wait">
                <motion.div 
                    key={view} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                >
                    {view === "dashboard" ? renderDashboard() : renderChatView()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// --- SUKOON COMMAND BAR COMPONENT ---
const SukoonCommandBar = ({ inputValue, onInputChange, onSubmit, isListening, onMicClick, language, onLanguageChange, isCoPilotMode, onCoPilotModeChange, inChatView = false }: any) => {
    const placeholders = [ "I'm feeling anxious about my exams...", "How can I practice gratitude?", "Suggest a calming activity for me...", "I want to do a breathing exercise..."];
    const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  
    useEffect(() => {
        const interval = setInterval(() => setCurrentPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]), 4000);
        return () => clearInterval(interval);
    }, []);

    const suggestedPrompts = [
        { label: "Feeling Anxious", query: "I've been feeling anxious lately" },
        { label: "Practice Gratitude", query: "Help me practice gratitude" },
        { label: "Calming Activity", query: "Suggest a calming activity" },
        { label: "Breathing Exercise", query: "I want to do a breathing exercise" },
    ];
  
    return (
      <motion.div className={cn("w-full mx-auto", !inChatView && "max-w-3xl")}>
        <div className="relative">
          {!inChatView && <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-3xl blur-lg opacity-20"></div>}
          <div className={cn("relative p-2 space-y-3 rounded-2xl", !inChatView && "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg")}>
            <div className="flex items-center space-x-2">
              <div className="relative w-full flex items-center">
                {!inChatView && <Lightbulb className="h-5 w-5 text-white/50 absolute left-4" />}
                <AnimatePresence mode="wait">
                  {!inputValue && !isListening && (
                    <motion.p key={currentPlaceholder} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute left-12 text-base text-white/50 pointer-events-none">
                      {currentPlaceholder}
                    </motion.p>
                  )}
                </AnimatePresence>
                <Input value={inputValue} onChange={onInputChange} className="w-full bg-white/5 border-none text-base h-auto py-4 pl-12 pr-12 text-white placeholder:text-transparent focus-visible:ring-1 focus-visible:ring-indigo-400 rounded-lg" onKeyDown={(e) => e.key === "Enter" && onSubmit()} />
                <button onClick={onMicClick} className={cn("absolute right-3 p-2 rounded-full transition-colors duration-200", isListening ? "bg-red-500/20" : "hover:bg-white/10")}>
                    <Mic className={cn("h-5 w-5", isListening ? "text-red-400 animate-pulse" : "text-white/60")} />
                </button>
              </div>
              <Button onClick={onSubmit} className="px-6 py-4 rounded-lg text-white font-semibold bg-white text-black h-full hover:bg-white/90">
                <Send className="h-5 w-5" />
              </Button>
            </div>
  
            {!inChatView && (
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {suggestedPrompts.map(prompt => (
                     <Button key={prompt.label} variant="outline" size="sm" className="bg-white/5 text-white/70 border-white/20 hover:bg-white/10 hover:text-white" onClick={() => { onInputChange({ target: { value: prompt.query } }); onSubmit(); }}>
                        {prompt.label}
                    </Button>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pl-2 pr-1">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="h-auto px-3 py-1.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white" onClick={onCoPilotModeChange}>
                        <div className="flex items-center gap-2 text-xs">
                            {isCoPilotMode ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                            <span>Co-Pilot {isCoPilotMode ? "On" : "Off"}</span>
                        </div>
                    </Button>
                </div>
                 <div className="flex items-center gap-2">
                    <Languages className="h-4 w-4 text-white/50" />
                    <select value={language} onChange={onLanguageChange} className="rounded-lg bg-white/10 px-2 py-1 text-xs font-medium text-white/80 border-none focus:ring-1 focus:ring-indigo-400 appearance-none">
                        <option value="en-US" className="bg-slate-800">English</option>
                        <option value="hi-IN" className="bg-slate-800">Hindi</option>
                        <option value="es-ES" className="bg-slate-800">Spanish</option>
                        <option value="fr-FR" className="bg-slate-800">French</option>
                    </select>
                </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
};