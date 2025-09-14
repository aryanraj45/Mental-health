import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  content: string
  sender: "user" | "ai"
  timestamp: Date
  isEmergency?: boolean
}

export function ChatMessage({ content, sender, timestamp, isEmergency }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${sender === "user" ? "justify-end" : "justify-start"}`}>
      {sender === "ai" && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          sender === "user"
            ? "bg-primary text-primary-foreground"
            : isEmergency
              ? "bg-destructive/10 border border-destructive/20"
              : "bg-muted"
        }`}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        <p className="text-xs opacity-70 mt-1">
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
      {sender === "user" && (
        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-secondary" />
        </div>
      )}
    </div>
  )
}
