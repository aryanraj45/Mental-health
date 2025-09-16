"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Send,
  Mic,
  MicOff,
  AlertTriangle,
  Phone,
  Bot,
  User,
  Brain,
  Heart,
  BarChart,
  Smile,
  BookOpen,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Interfaces & Types ---
interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  isEmergency?: boolean;
}

// --- Chat Logic (Unchanged) ---
const criticalWords = [
  "suicide",
  "kill myself",
  "end my life",
  "want to die",
  "harm myself",
  "self harm",
  "cut myself",
  "overdose",
  "jump off",
  "hang myself",
  "end it all",
  "hurt myself",
  "no point living",
  "better off dead",
  "आत्महत्या",
  "मरना चाहता हूं",
  "जीना नहीं चाहता",
  "खुद को मारना",
];
const contextualResponses = [
  {
    keywords: ["anxious", "anxiety", "worried", "panic"],
    response:
      "I understand you're feeling anxious. That's a very common experience. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. Would you like me to guide you?",
  },
  {
    keywords: ["depressed", "sad", "hopeless", "down"],
    response:
      "I hear that you're going through a difficult time. These feelings are valid, and you're not alone. Have you been able to maintain your daily routines?",
  },
  {
    keywords: ["stressed", "overwhelmed", "pressure", "exam"],
    response:
      "Academic stress is very common. Let's break this down - what specific aspect is causing you the most stress? Sometimes organizing tasks can help.",
  },
];

// --- New & Re-styled UI Components ---

const ElegantShape = ({
  className,
  delay = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  gradient?: string;
}) => {
  const width = Math.random() * 400 + 200;
  const height = Math.random() * 100 + 50;
  const rotate = Math.random() * 360;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 15 }}
      animate={{ opacity: 1, scale: 1, rotate: rotate }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-md border border-white/[0.1]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          )}
        />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      </motion.div>
    </motion.div>
  );
};

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
      <a href="#" className="flex items-center gap-2">
        <Heart className="h-7 w-7 text-white" />
        <h1 className="text-2xl font-bold text-white">Sukoon</h1>
      </a>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-2">
          <a
            href="#"
            className="px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Resources
          </a>
          <a
            href="#"
            className="px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            Community
          </a>
        </nav>
        <Avatar>
          <AvatarFallback className="bg-white/10 text-white/80 font-semibold">
            TA
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>
);

const StatCard = ({
  icon,
  title,
  value,
  change,
  changeType,
  period,
  className,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  period: string;
  className?: string;
}) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={cn(
      "bg-white/[0.03] p-5 rounded-xl border border-white/[0.08] backdrop-blur-lg transition-all",
      className
    )}
  >
    <div className="flex items-center justify-between mb-2">
      <div className="p-2 bg-white/5 rounded-md">{icon}</div>
      {change && (
        <div
          className={cn(
            "flex items-center text-xs font-semibold px-2 py-1 rounded-full",
            changeType === "increase"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          )}
        >
          {change}
        </div>
      )}
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-white/50">
      {title} <span className="text-white/40">({period})</span>
    </p>
  </motion.div>
);

const ShimmeringMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex gap-3 justify-start items-end"
  >
    <Avatar className="h-9 w-9 border-2 border-cyan-500/30">
      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500">
        <Bot className="h-5 w-5 text-white" />
      </AvatarFallback>
    </Avatar>
    <div className="w-48 h-12 rounded-2xl rounded-bl-none p-4 bg-white/5 border border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
    </div>
  </motion.div>
);

// --- Main Chat Page Component (Rebuilt) ---
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.lang = "en-US";
      recognition.current.onresult = (event: any) => {
        setInputValue(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.current.onerror = () => setIsListening(false);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollAreaRef.current?.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    if (
      criticalWords.some((word) =>
        userMessage.toLowerCase().includes(word.toLowerCase())
      )
    ) {
      setShowCrisisAlert(true);
      return "I'm really concerned by what you've shared. It's incredibly brave of you to talk about it. Please know that your life is valuable, and immediate help is available. You can reach out to a professional for support. Help is just a conversation away.";
    }
    for (const response of contextualResponses) {
      if (
        response.keywords.some((keyword) =>
          userMessage.toLowerCase().includes(keyword)
        )
      ) {
        return response.response;
      }
    }
    return "Thank you for sharing that with me. It takes courage to open up. Could you tell me a little more about what's been happening?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };
    setMessages((prev) => {
      if (prev.length === 0) {
        return [
          {
            id: "welcome",
            content:
              "Hello! I'm your AI mental health companion. How are you feeling today?",
            sender: "ai",
          },
          userMessage,
        ];
      }
      return [...prev, userMessage];
    });
    const messageContent = inputValue;
    setInputValue("");
    setIsTyping(true);

    setTimeout(async () => {
      const aiResponseText = await generateAIResponse(messageContent);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        sender: "ai",
        isEmergency: criticalWords.some((w) =>
          userMessage.toLowerCase().includes(w)
        ),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const FADE_IN_ANIMATION = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const animatedButtonsContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const animatedButtonItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0 z-0">
        <ElegantShape
          delay={0.3}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] top-[15%]"
        />
        <ElegantShape
          delay={0.5}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] top-[70%]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      <Header />

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center mb-6">
          <Button className="bg-white/10 text-white border border-white/20 shadow-sm hover:bg-white/20">
            AI Companion
          </Button>
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            Guided Journal
          </Button>
        </div>

        <motion.div
          {...FADE_IN_ANIMATION}
          transition={{ ...FADE_IN_ANIMATION.transition, delay: 0.1 }}
        >
          <Card className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg rounded-2xl shadow-2xl shadow-black/20">
            <CardContent className="p-8">
              <h2 className="text-4xl font-bold text-white">AI Companion</h2>
              <p className="text-white/50 mt-1 mb-8">
                Your intelligent command center for mental well-being.
              </p>

              <div className="flex gap-3 bg-white/5 border border-white/10 rounded-lg p-2 focus-within:border-cyan-400 transition-colors">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Share what's on your mind..."
                  className="flex-1 bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg h-12 px-2"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={startListening}
                  className={cn(
                    "text-white/50 hover:bg-white/10 w-12 h-12",
                    isListening && "bg-red-500/20"
                  )}
                >
                  {isListening ? (
                    <MicOff className="h-5 w-5 text-red-400" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-lg px-8 h-12 text-base font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Submit
                </Button>
              </div>

              <motion.div
                variants={animatedButtonsContainer}
                initial="hidden"
                animate="show"
                className="flex items-center gap-2 mt-4 text-xs text-white/60"
              >
                <motion.div
                  variants={animatedButtonItem}
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/10 h-7 text-xs hover:bg-white/10 hover:text-white/80"
                  >
                    Model: Insight-2.5-pro
                  </Button>
                </motion.div>
                <motion.div
                  variants={animatedButtonItem}
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/10 h-7 text-xs hover:bg-white/10 hover:text-white/80"
                  >
                    EN
                  </Button>
                </motion.div>
                <motion.div
                  variants={animatedButtonItem}
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/10 h-7 text-xs flex items-center gap-1.5 hover:bg-white/10 hover:text-white/80"
                  >
                    <Brain className="w-3 h-3" /> Focus: General
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence>
          {messages.length > 0 && (
            <motion.div
              {...FADE_IN_ANIMATION}
              transition={{ ...FADE_IN_ANIMATION.transition, delay: 0.2 }}
              className="mt-8 max-h-[40vh] overflow-y-auto pr-2 space-y-6"
              ref={scrollAreaRef}
            >
              {messages.map((msg) => (
                <motion.div
                  layout
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={cn(
                    "flex gap-3 items-end",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.sender === "ai" && (
                    <Avatar className="h-9 w-9 border-2 border-cyan-500/30">
                      <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500">
                        <Bot className="h-5 w-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-br-none"
                        : "bg-white/5 border border-white/10 text-white/90 rounded-bl-none",
                      msg.isEmergency &&
                        "!bg-gradient-to-br !from-red-500/80 !to-rose-500/80 !border-red-500/50"
                    )}
                  >
                    <p>{msg.content}</p>
                  </div>
                  {msg.sender === "user" && (
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-white/10">
                        <User className="h-5 w-5 text-white/70" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              {isTyping && <ShimmeringMessage />}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
              <StatCard
                icon={<Clock className="w-5 h-5 text-blue-400" />}
                value="25 mins"
                title="Mindful Minutes"
                period="This Week"
                change="+5.2%"
                changeType="increase"
              />
              <StatCard
                icon={<Smile className="w-5 h-5 text-green-400" />}
                value="7.2 / 10"
                title="Avg. Mood Score"
                period="This Month"
                change="+18.1%"
                changeType="increase"
              />
              <StatCard
                icon={<BookOpen className="w-5 h-5 text-orange-400" />}
                value="4"
                title="Journal Entries"
                period="This Week"
              />
              <StatCard
                icon={<BarChart className="w-5 h-5 text-violet-400" />}
                value="8"
                title="Sessions Completed"
                period="Total"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showCrisisAlert && (
          <AlertDialog open onOpenChange={setShowCrisisAlert}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AlertDialogContent className="border-red-500/50 bg-black/50 backdrop-blur-2xl text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-3 text-red-400">
                    <AlertTriangle />
                    Immediate Support Recommended
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-white/70 pt-2">
                    It sounds like you are in significant distress. Your safety
                    is the top priority. Please consider reaching out to a
                    professional who can provide immediate help.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCrisisAlert(false)}
                    className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full"
                  >
                    I'm okay, close this.
                  </Button>
                  <Button
                    onClick={() => window.open("tel:080-26995000")}
                    className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-full"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Helpline Now
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </motion.div>
          </AlertDialog>
        )}
      </AnimatePresence>
    </div>
  );
}
