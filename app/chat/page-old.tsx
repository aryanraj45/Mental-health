"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  AlertTriangle,
  Phone,
  Bot,
  User,
} from "lucide-react";
import { Header } from "@/components/header";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  language?: string;
  isEmergency?: boolean;
}

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
  // Hindi critical words
  "आत्महत्या",
  "मरना चाहता हूं",
  "जीना नहीं चाहता",
  "खुद को मारना",
  // Add more languages as needed
];

const supportiveResponses = {
  en: {
    crisis:
      "I'm really concerned about what you're sharing. Your life has value and there are people who want to help. Please reach out to a crisis helpline immediately: NIMHANS: 080-26995000 or Vandrevala Foundation: 9999666555. Would you like me to connect you with emergency support?",
    general:
      "I understand you're going through a difficult time. I'm here to listen and provide support. How are you feeling right now?",
    greeting:
      "Hello! I'm your AI mental health companion. I'm here to provide support, resources, and a safe space to talk. How can I help you today?",
  },
  hi: {
    crisis:
      "मुझे चिंता है कि आप क्या साझा कर रहे हैं। आपके जीवन की कीमत है और ऐसे लोग हैं जो आपकी मदद करना चाहते हैं। कृपया तुरंत क्राइसिस हेल्पलाइन से संपर्क करें: NIMHANS: 080-26995000 या वंदे रेवाला फाउंडेशन: 9999666555।",
    general:
      "मैं समझता हूं कि आप एक कठिन समय से गुजर रहे हैं। मैं यहां सुनने और सहायता प्रदान करने के लिए हूं। आप अभी कैसा महसूस कर रहे हैं?",
    greeting:
      "नमस्ते! मैं आपका AI मानसिक स्वास्थ्य साथी हूं। मैं सहायता, संसाधन और बात करने के लिए एक सुरक्षित स्थान प्रदान करने के लिए यहां हूं।",
  },
};

const contextualResponses = [
  {
    keywords: ["anxious", "anxiety", "worried", "panic"],
    response:
      "I understand you're feeling anxious. That's a very common experience among students. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. Would you like me to guide you through some other anxiety management strategies?",
  },
  {
    keywords: ["depressed", "sad", "hopeless", "down"],
    response:
      "I hear that you're going through a difficult time. These feelings are valid, and you're not alone. Many students experience similar challenges. Have you been able to maintain your daily routines like eating and sleeping?",
  },
  {
    keywords: ["stressed", "overwhelmed", "pressure", "exam"],
    response:
      "Academic stress is very common, especially during exam periods. Let's break this down - what specific aspect is causing you the most stress? Sometimes organizing tasks into smaller, manageable pieces can help.",
  },
  {
    keywords: ["lonely", "isolated", "alone", "friends"],
    response:
      "Feeling lonely, especially in college, is more common than you might think. Many students struggle with social connections. Have you considered joining any clubs or study groups?",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI mental health companion. I'm here to listen and provide support. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectEmergency = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return emergencyKeywords.some((keyword) => lowerMessage.includes(keyword));
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for emergency keywords
    if (detectEmergency(userMessage)) {
      return "I'm very concerned about what you've shared. Your life has value and there are people who want to help. Please reach out to a crisis helpline immediately: NIMHANS: 080-26995000, Vandrevala Foundation: 9999666555. Would you like me to help you connect with a counselor right away?";
    }

    // Find matching supportive response
    for (const response of supportiveResponses) {
      if (response.keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return response.response;
      }
    }

    // Default supportive responses
    const defaultResponses = [
      "Thank you for sharing that with me. Can you tell me more about what you're experiencing?",
      "I appreciate you opening up. What would be most helpful for you right now?",
      "It sounds like you're going through something challenging. How long have you been feeling this way?",
      "Your feelings are valid. What kind of support do you think would help you most?",
      "I'm here to listen. Would you like to talk about what's been on your mind lately?",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
        isEmergency: detectEmergency(inputValue),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Sukoon</h1>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Bot className="h-4 w-4" />
              {/* AI Support */}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Emergency Alert */}
        <Alert className="mb-6 border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Crisis Support:</strong> If you're in immediate danger,
            please call emergency services or contact: NIMHANS (080-26995000),
            Vandrevala Foundation (9999666555), or iCall (9152987821)
          </AlertDescription>
        </Alert>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              AI Mental Health Support
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              This is a safe space to share your thoughts and feelings. I'm here
              to listen and provide support.
            </p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.isEmergency
                          ? "bg-destructive/10 border border-destructive/20"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-secondary" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send. This conversation is confidential and not
                stored permanently.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">Need Professional Help?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Connect with a licensed counselor
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/book">Book Session</Link>
            </Button>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Explore Resources</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Self-help guides and wellness tools
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/resources">View Resources</Link>
            </Button>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Join Community</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Connect with peer support groups
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/community">Join Now</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
