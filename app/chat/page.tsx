"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/header";
import { SuggestedPrompts } from "@/components/suggestedPrompts";
// import { MentalHealthReportChart } from "@/components/mental-health-report-chart";
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
  X,
  Volume2,
  VolumeX,
  Languages,
  Wind,
  CheckCircle,
  Lightbulb,
  MessageSquareQuote,
  Eye,
  Ear,
  Hand,
  Utensils,
  Flower,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

//================================================================================
// --- TYPE DEFINITIONS ---
//================================================================================
interface Message {
  id: string;
  sender: "user" | "ai";
  text?: string;
  component?: ReactNode;
  isEmergency?: boolean;
}

//================================================================================
// --- CORE CHAT LOGIC (MENTAL HEALTH) ---
//================================================================================
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
      "I understand you're feeling anxious. That's a very common experience. We can try a grounding exercise or a calming breathing technique. Which sounds better right now?",
  },
  {
    keywords: ["depressed", "sad", "hopeless", "down"],
    response:
      "I hear that you're going through a difficult time. These feelings are valid, and you're not alone. Sometimes, just naming these feelings is a powerful first step.",
  },
  {
    keywords: ["stressed", "overwhelmed", "pressure", "exam"],
    response:
      "It sounds like a lot is on your plate right now. Academic stress is very real. Let's try to break it down. What's one small thing that feels most pressing?",
  },
  // Simple Kashmiri greeting response to demonstrate functionality
  {
    keywords: ["as-salamu alaykum", "salam", "آس-سلامو علیکم"],
    response: "Wa alaikum assalam! Tuhī chiv wuzul pǎṭhī?",
  },
  {
    keywords: ["report", "progress", "how am i doing", "گزارش", "رپورٹ"],
    response: "Of course, I can generate a summary of your recent activity. Here is your weekly wellness report:",
    // component: MentalHealthReportChart,
  },
  {
    keywords: ["feel better", "improve mood", "what can i do", "کیاہ کرِ"],
    response: "I'm sorry to hear you're feeling this way. Sometimes a small, structured activity can help. Would you like to try a quick breathing exercise or a simple grounding technique?",
  },
];

//================================================================================
// --- NEW & ENHANCED MULTI-STEP ACTIVITIES ---
//================================================================================

// --- 1. ENHANCED BREATHING EXERCISE (Now Quicker) ---
const EnhancedBreathingExercise = () => {
  const [step, setStep] = useState<
    "Ready" | "Inhale" | "Hold" | "Exhale" | "Reflect"
  >("Ready");
  // QUICKER CYCLE: 3s Inhale, 2s Hold, 5s Exhale
  const cycle = { Inhale: 3, Hold: 2, Exhale: 5 };

  return (
    <Card className="bg-white/10 border border-white/20 backdrop-blur-lg text-white max-w-sm mx-auto overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind /> Calming Breath Cycle
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center p-6 flex flex-col items-center justify-center min-h-[250px]">
        <AnimatePresence mode="wait">
          {step === "Ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="mb-4">
                Find a comfortable position. We'll start a quick calming breath
                cycle.
              </p>
              <Button
                onClick={() => setStep("Inhale")}
                className="bg-white text-black rounded-full"
              >
                I'm Ready
              </Button>
            </motion.div>
          )}
          {(step === "Inhale" || step === "Hold" || step === "Exhale") && (
            <motion.div
              key="breathing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{
                  scale: step === "Inhale" ? 1.2 : 1,
                  opacity: step === "Hold" ? 0.8 : 1,
                }}
                transition={{
                  duration: step === "Inhale" ? cycle.Inhale : cycle.Exhale,
                  ease: "easeInOut",
                }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center mb-4"
              />
              <p className="text-3xl font-semibold">{step}...</p>
              <motion.div
                key={step}
                className="w-full h-1 bg-white/20 rounded-full mt-4"
              >
                <motion.div
                  className="h-1 bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: cycle[step], ease: "linear" }}
                  onAnimationComplete={() =>
                    setStep(
                      step === "Inhale"
                        ? "Hold"
                        : step === "Hold"
                        ? "Exhale"
                        : "Reflect"
                    )
                  }
                />
              </motion.div>
            </motion.div>
          )}
          {step === "Reflect" && (
            <motion.div
              key="reflect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="font-semibold text-xl mb-4">Well done.</p>
              <p className="text-white/70 mb-4">
                Notice how you feel. Take this calmness with you.
              </p>
              <Button
                onClick={() => setStep("Inhale")}
                className="bg-white/20 text-white rounded-full"
              >
                Repeat Cycle
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// --- (Other interactive activities remain the same) ---
const CrisisInterventionScreen = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex flex-col items-center justify-center p-4 text-center"
    >
      <div className="absolute inset-0 bg-gradient-radial from-red-500/20 via-transparent to-transparent animate-pulse-bg -z-10"></div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.2, ease: "easeOut" },
        }}
      >
        <AlertTriangle className="h-20 w-20 text-red-400 mx-auto" />
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-6">
          Your safety is most important.
        </h1>
        <p className="text-lg text-white/70 mt-4 max-w-2xl mx-auto">
          It sounds like you are in significant distress. Please don't go
          through this alone. Immediate, free, and confidential help is
          available for you right now.
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.4, ease: "easeOut" },
        }}
        className="flex flex-col sm:flex-row gap-4 mt-12"
      >
        <Button
          onClick={() => window.open("tel:988")}
          className="bg-red-600 text-white font-bold text-lg rounded-full h-16 px-8 hover:bg-red-700 transform hover:scale-105 transition-all"
        >
          <Phone className="h-6 w-6 mr-3" />
          Call a Helpline (India)
        </Button>
        <Button
          onClick={() => window.open("https://icallhelpline.org/", "_blank")}
          className="bg-white text-black font-bold text-lg rounded-full h-16 px-8 hover:bg-gray-200 transform hover:scale-105 transition-all"
        >
          <MessageSquareQuote className="h-6 w-6 mr-3" />
          Chat with a Counselor
        </Button>
      </motion.div>
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.6, ease: "easeOut" },
        }}
        onClick={onClose}
        className="mt-12 text-white/60 hover:text-white hover:underline transition-colors"
      >
        I am safe for now. Close this.
      </motion.button>
    </motion.div>
  );
};
const InteractiveGroundingExercise = () => {
  const steps = [
    {
      icon: Eye,
      title: "5 Things You See",
      prompt: "Look around and type one thing you can see.",
    },
    {
      icon: Hand,
      title: "4 Things You Feel",
      prompt: "Now, type one thing you can physically feel.",
    },
    {
      icon: Ear,
      title: "3 Things You Hear",
      prompt: "Listen closely. What is one sound you can hear?",
    },
    {
      icon: Flower,
      title: "2 Things You Smell",
      prompt: "What is one scent you can smell right now?",
    },
    {
      icon: Utensils,
      title: "1 Thing You Taste",
      prompt: "Finally, what is one thing you can taste?",
    },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [inputs, setInputs] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const handleNext = () => {
    setInputs((prev) => [...prev, currentInput]);
    setCurrentInput("");
    setCurrentStep((s) => s + 1);
  };
  return (
    <Card className="bg-white/10 border border-white/20 backdrop-blur-lg text-white max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="text-indigo-300" /> Interactive Grounding
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {currentStep < steps.length ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="text-center mb-4">
                {React.createElement(steps[currentStep].icon, {
                  className: "h-10 w-10 text-white mx-auto mb-2",
                })}
                <h3 className="text-lg font-bold">
                  {steps[currentStep].title}
                </h3>
                <p className="text-sm text-white/70">
                  {steps[currentStep].prompt}
                </p>
              </div>
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 text-center"
              />
              <Button
                onClick={handleNext}
                disabled={!currentInput.trim()}
                className="bg-white text-black rounded-full w-full mt-4 disabled:opacity-50"
              >
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-center mb-4">
                You are grounded.
              </h3>
              <p className="text-sm text-white/70 mb-2">
                You connected with your senses:
              </p>
              <ul className="text-sm text-left list-disc list-inside bg-white/5 p-3 rounded-lg">
                {inputs.map(
                  (input, index) =>
                    input && (
                      <li key={index}>
                        {steps[index].title.split(" ")[2]}:{" "}
                        <span className="font-semibold">{input}</span>
                      </li>
                    )
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
const MultiStepGratitudeJournal = () => {
  const [step, setStep] = useState(1);
  const [entry, setEntry] = useState("");
  const [reason, setReason] = useState("");
  return (
    <Card className="bg-white/10 border border-white/20 backdrop-blur-lg text-white max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="text-rose-300" /> Gratitude Journal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-white/70 mb-4 text-center">
                What's one thing you're grateful for today, big or small?
              </p>
              <Textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="e.g., The warm sun, a kind word..."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[80px]"
              />
              <Button
                onClick={() => setStep(2)}
                disabled={!entry.trim()}
                className="bg-white text-black rounded-full w-full mt-4 disabled:opacity-50"
              >
                Next
              </Button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key={2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-white/70 mb-4 text-center">
                That's wonderful. Why are you grateful for that?
              </p>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., It made me feel calm..."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[80px]"
              />
              <Button
                onClick={() => setStep(3)}
                disabled={!reason.trim()}
                className="bg-white text-black rounded-full w-full mt-4 disabled:opacity-50"
              >
                Save to Journal
              </Button>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key={3}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Saved.</h3>
              <p className="text-white/70">
                Thank you for sharing. Holding onto this feeling can make a real
                difference.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
const EngagingAffirmation = () => {
  const affirmations = [
    "I am worthy of peace.",
    "My feelings are valid.",
    "I am resilient.",
    "I choose to be kind to myself.",
    "It is enough to just be.",
  ];
  const [step, setStep] = useState(1);
  const [affirmation, setAffirmation] = useState(affirmations[0]);
  const showNew = () => {
    let newAffirmation;
    do {
      newAffirmation =
        affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (newAffirmation === affirmation);
    setAffirmation(newAffirmation);
    setStep(1);
  };
  return (
    <Card className="bg-white/10 border border-white/20 backdrop-blur-lg text-white max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-yellow-300" /> Affirmation Practice
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center min-h-[220px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-xl italic text-white/90">"{affirmation}"</p>
              <p className="text-sm text-white/60 mt-4">
                Take a deep breath and repeat this to yourself. Click when you
                feel it.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="font-semibold">
                Well done. Let that feeling sink in.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {step === 1 ? (
          <Button
            onClick={() => setStep(2)}
            className="bg-white text-black rounded-full w-full mt-4"
          >
            I accept this
          </Button>
        ) : (
          <Button
            onClick={showNew}
            className="bg-white/20 text-white rounded-full w-full mt-4"
          >
            Show Another
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
const AIThinkingIndicator = () => {
  const thinkingPhrases = [
    "Listening with empathy...",
    "Finding helpful resources...",
    "Crafting a thoughtful response...",
  ];
  const [currentPhrase, setCurrentPhrase] = useState(thinkingPhrases[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase(
        thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)]
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-3"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center shadow-lg"
      >
        <Bot className="w-5 h-5 text-white" />
      </motion.div>
      <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg w-full max-w-xs">
        <div className="flex space-x-1.5 items-center h-8">
          <motion.div
            className="w-2 h-2 bg-white/40 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-2 h-2 bg-white/40 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
          />
          <motion.div
            className="w-2 h-2 bg-white/40 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <div className="text-xs text-white/60 w-full overflow-hidden ml-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentPhrase}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {currentPhrase}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const useSpeechRecognition = ({ lang }: { lang: string }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    )
      return;
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang;
    recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      setText(transcript);
      stopListening();
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
const StatCard = ({
  icon,
  title,
  value,
  change,
  changeType,
  period,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  change?: string;
  changeType?: "increase" | "decrease";
  period: string;
}) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white/[0.03] p-5 rounded-xl border border-white/[0.08] backdrop-blur-lg transition-all"
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

//================================================================================
// --- MAIN SUKOON CHAT ASSISTANT COMPONENT ---
//================================================================================
export default function SukoonChatAssistant() {
  const [view, setView] = useState("dashboard");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [isCoPilotMode, setIsCoPilotMode] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const {
    text: voiceText,
    setText: setVoiceText,
    startListening,
    stopListening,
    isListening,
  } = useSpeechRecognition({ lang: language });

  useEffect(() => {
    if (voiceText) {
      setInputValue(voiceText);
      handleSendMessage(voiceText);
      setVoiceText("");
    }
  }, [voiceText, setVoiceText]); // Added dependencies

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const speakText = (text: string) => {
    if (
      !isCoPilotMode ||
      typeof window === "undefined" ||
      !window.speechSynthesis
    )
      return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    let preferredVoice =
      voices.find(
        (v) =>
          v.lang.startsWith(language.split("-")[0]) && v.name.includes("Google")
      ) || voices.find((v) => v.lang.startsWith(language.split("-")[0]));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const getAIResponse = (
    query: string
  ): { text: string; component?: React.ReactNode } => {
    const lowerCaseQuery = query.toLowerCase();

    // Check for specific interactive components first
    if (
      lowerCaseQuery.includes("breathing") ||
      lowerCaseQuery.includes("breathe")
    ) {
      return {
        text: "Of course. Here is a guided breathing exercise to help you find a moment of calm.",
        component: <EnhancedBreathingExercise />,
      };
    }
    if (
      lowerCaseQuery.includes("grounding") ||
      lowerCaseQuery.includes("54321") ||
      lowerCaseQuery.includes("disconnected")
    ) {
      return {
        text: "A grounding exercise can be very helpful. Let's walk through it together.",
        component: <InteractiveGroundingExercise />,
      };
    }
    if (
      lowerCaseQuery.includes("gratitude") ||
      lowerCaseQuery.includes("thankful") ||
      lowerCaseQuery.includes("journal")
    ) {
      return {
        text: "Focusing on gratitude is a wonderful idea. Let's try it.",
        component: <MultiStepGratitudeJournal />,
      };
    }
    if (
      lowerCaseQuery.includes("affirmation") ||
      lowerCaseQuery.includes("positive thought")
    ) {
      return {
        text: "Let's focus on some positive thoughts. Here is an affirmation for you.",
        component: <EngagingAffirmation />,
      };
    }

    // Check for contextual keyword responses (including the report)
    for (const item of contextualResponses) {
      for (const keyword of item.keywords) {
        if (lowerCaseQuery.includes(keyword)) {
          const response: { text: string; component?: React.ReactNode } = {
            text: item.response,
          };
          if (item.component) {
            // Pass the required onFollowUp prop
            response.component = React.createElement(item.component, {
              onFollowUp: handleSendMessage,
            });
          }
          return response;
        }
      }
    }

    // Fallback response
    return {
      text: "I'm not sure how to respond to that. Could you try rephrasing? Or we could try a different activity like 'breathing' or 'grounding'.",
    };
  };

  const handleSendMessage = async (text: string) => {
    const query = text.trim();
    if (!query) return;

    setView("chat");

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
    };

    // Add welcome message if it's the first message
    setMessages((prev) =>
      prev.length === 0
        ? [
            {
              id: "welcome",
              sender: "ai",
              text: "Hello! I'm your AI mental health companion. How are you feeling today?",
            },
            userMessage,
          ]
        : [...prev, userMessage]
    );

    setInputValue("");
    setIsTyping(true);

    // --- REFACTORED AND SIMPLIFIED RESPONSE LOGIC ---
    setTimeout(() => {
      const lowerCaseQuery = query.toLowerCase();

      // 1. Check for critical words
      if (criticalWords.some((word) => lowerCaseQuery.includes(word))) {
        setIsTyping(false);
        setShowCrisisAlert(true);
        return; // Stop further processing
      }

      // 2. Get the AI response using the new, robust function
      const response = getAIResponse(lowerCaseQuery);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: response.text,
        component: response.component,
      };

      // 3. Update state and speak
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      if (aiMessage.text) {
        speakText(aiMessage.text);
      }
    }, 1500);
  };

  const commonCommandBarProps = {
    inputValue,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setInputValue(e.target.value),
    onSubmit: () => handleSendMessage(inputValue),
    isListening,
    onMicClick: isListening ? stopListening : startListening,
    language,
    onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
      setLanguage(e.target.value),
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

  const renderDashboard = () => (
    <div className="container mx-auto px-4 pt-8 pb-24 mt-10">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="font-bold text-white text-5xl md:text-7xl">
          Sukoon AI Companion
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mt-4 mx-auto">
          Your intelligent, confidential space for mental well-being.
        </p>
      </div>
      <div className="mt-12">
        <SukoonCommandBar {...commonCommandBarProps} />
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-6xl mx-auto"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <StatCard
            icon={<Clock className="w-5 h-5 text-blue-400" />}
            value="25 mins"
            title="Mindful Minutes"
            period="This Week"
            change="+5.2%"
            changeType="increase"
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <StatCard
            icon={<Smile className="w-5 h-5 text-green-400" />}
            value="7.2 / 10"
            title="Avg. Mood Score"
            period="This Month"
            change="+18.1%"
            changeType="increase"
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <StatCard
            icon={<BookOpen className="w-5 h-5 text-orange-400" />}
            value="4"
            title="Journal Entries"
            period="This Week"
          />
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <StatCard
            icon={<BarChart className="w-5 h-5 text-violet-400" />}
            value="8"
            title="Sessions Completed"
            period="Total"
          />
        </motion.div>
      </motion.div>
    </div>
  );

  const renderChatView = () => (
    <div className="flex items-center justify-center min-h-screen p-2 md:p-4">
      <Card className="w-full h-[calc(100vh-2rem)] max-w-3xl flex flex-col bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg rounded-2xl shadow-2xl shadow-black/30">
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-indigo-300" />
            <CardTitle className="text-xl text-white">AI Companion</CardTitle>
          </div>
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white"
            onClick={() => {
              setView("dashboard");
              setMessages([]);
            }}
          >
            <X className="h-4 w-4 mr-2" /> End Chat
          </Button>
        </CardHeader>
        <CardContent
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto p-6 space-y-6"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 max-w-lg ${
                msg.sender === "user" ? "ml-auto justify-end" : "mr-auto"
              }`}
            >
              {msg.sender === "ai" && (
                <Avatar className="h-9 w-9 border-2 border-indigo-500/30">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-rose-500">
                    <Bot className="h-5 w-5 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="max-w-full">
                {msg.sender === "user" ? (
                  <div className="bg-gradient-to-br from-indigo-500 to-rose-500 text-white p-3 rounded-2xl rounded-br-none shadow-md">
                    <p>{msg.text}</p>
                  </div>
                ) : (
                  <div
                    className={cn(
                      "p-1 rounded-2xl rounded-bl-none",
                      msg.isEmergency
                        ? "bg-transparent"
                        : "bg-white/5 border border-white/10"
                    )}
                  >
                    <div className="prose prose-invert prose-p:my-2 px-3 py-1">
                      {msg.text && <p>{msg.text}</p>}
                      {msg.component}
                    </div>
                  </div>
                )}
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
          {isTyping && <AIThinkingIndicator />}
        </CardContent>
        <div className="p-4 border-t border-white/10 mt-auto">
          <SukoonCommandBar {...commonCommandBarProps} inChatView={true} />
        </div>
      </Card>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      <AnimatePresence>
        {showCrisisAlert && (
          <CrisisInterventionScreen onClose={() => setShowCrisisAlert(false)} />
        )}
      </AnimatePresence>
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
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {view === "dashboard" ? renderDashboard() : renderChatView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const SukoonCommandBar = ({
  inputValue,
  onInputChange,
  onSubmit,
  isListening,
  onMicClick,
  language,
  onLanguageChange,
  isCoPilotMode,
  onCoPilotModeChange,
  inChatView = false,
}: any) => {
  const placeholders = [
    "I'm feeling anxious...",
    "Help me with a grounding exercise...",
    "I want to practice gratitude...",
    "Show me a positive affirmation...",
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentPlaceholder(
          placeholders[Math.floor(Math.random() * placeholders.length)]
        ),
      4000
    );
    return () => clearInterval(interval);
  }, []);
  const suggestedPrompts = [
    { label: "Grounding Exercise", query: "Start a grounding exercise" },
    { label: "Gratitude Journal", query: "I want to try a gratitude journal" },
    {
      label: "Breathing Guide",
      query: "Guide me through a breathing exercise",
    },
    { label: "Positive Affirmation", query: "Show me a positive affirmation" },
    { label: "how am i doing", query: "how am i doing" },
  ];
  return (
    <motion.div className={cn("w-full mx-auto", !inChatView && "max-w-3xl")}>
      <div className="relative">
        {!inChatView && (
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-3xl blur-lg opacity-20"></div>
        )}
        <div
          className={cn(
            "relative p-2 space-y-3 rounded-2xl",
            !inChatView &&
              "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
          )}
        >
          <div className="flex items-center space-x-2">
            <div className="relative w-full flex items-center">
              <AnimatePresence mode="wait">
                {!inputValue && !isListening && (
                  <motion.p
                    key={currentPlaceholder}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-4 text-base text-white/50 pointer-events-none"
                  >
                    {currentPlaceholder}
                  </motion.p>
                )}
              </AnimatePresence>
              <Input
                value={inputValue}
                onChange={onInputChange}
                className="w-full bg-white/5 border-none text-base h-auto py-4 pl-4 pr-12 text-white placeholder:text-transparent focus-visible:ring-1 focus-visible:ring-indigo-400 rounded-lg"
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
              <button
                onClick={onMicClick}
                className={cn(
                  "absolute right-3 p-2 rounded-full transition-colors duration-200",
                  isListening ? "bg-red-500/20" : "hover:bg-white/10"
                )}
              >
                <Mic
                  className={cn(
                    "h-5 w-5",
                    isListening ? "text-red-400 animate-pulse" : "text-white/60"
                  )}
                />
              </button>
            </div>
            <Button
              onClick={onSubmit}
              className="px-6 py-4 rounded-lg text-black font-semibold bg-white h-full hover:bg-white/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          {!inChatView && (
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt.label}
                  variant="outline"
                  size="sm"
                  className="bg-white/5 text-white/70 border-white/20 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    onInputChange({ target: { value: prompt.query } });
                    onSubmit();
                  }}
                >
                  {prompt.label}
                </Button>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between pl-2 pr-1">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="h-auto px-3 py-1.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                onClick={onCoPilotModeChange}
              >
                <div className="flex items-center gap-2 text-xs">
                  {isCoPilotMode ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                  <span>Co-Pilot {isCoPilotMode ? "On" : "Off"}</span>
                </div>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-white/50" />
              <select
                value={language}
                onChange={onLanguageChange}
                className="rounded-lg bg-white/10 px-2 py-1 text-xs font-medium text-white/80 border-none focus:ring-1 focus:ring-indigo-400 appearance-none"
              >
                <option value="en-US" className="bg-slate-800">
                  English
                </option>
                <option value="hi-IN" className="bg-slate-800">
                  Hindi
                </option>
                <option value="ks-IN" className="bg-slate-800">
                  Kashmiri (کٲشُر)
                </option>
                {/* Add other languages here */}
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

