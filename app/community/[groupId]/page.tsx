"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Users, Heart, Reply, Send, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

interface GroupMessage {
  id: string
  content: string
  author: {
    name: string
    avatar: string
    isAnonymous: boolean
    isModerator: boolean
  }
  timestamp: Date
  replies: GroupMessage[]
  likes: number
  isLiked: boolean
}

const groupMessages: GroupMessage[] = [
  {
    id: "1",
    content:
      "Welcome everyone! This is a safe space to share your experiences with anxiety. Remember, we're all here to support each other. What's one coping strategy that has helped you recently?",
    author: {
      name: "Dr. Priya",
      avatar: "/moderator-avatar.jpg",
      isAnonymous: false,
      isModerator: true,
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    replies: [],
    likes: 15,
    isLiked: false,
  },
  {
    id: "2",
    content:
      "I've been using the 4-7-8 breathing technique before bed and it's really helping with my nighttime anxiety. Has anyone else tried breathing exercises?",
    author: {
      name: "Anonymous",
      avatar: "",
      isAnonymous: true,
      isModerator: false,
    },
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    replies: [
      {
        id: "2-1",
        content: "Yes! I use box breathing during the day when I feel overwhelmed. It's amazing how much it helps.",
        author: {
          name: "Sarah M.",
          avatar: "/student-avatar-1.jpg",
          isAnonymous: false,
          isModerator: false,
        },
        timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
        replies: [],
        likes: 8,
        isLiked: true,
      },
    ],
    likes: 12,
    isLiked: true,
  },
  {
    id: "3",
    content:
      "I had my first panic attack yesterday and I'm scared it will happen again. Any advice on how to cope with this fear?",
    author: {
      name: "Anonymous",
      avatar: "",
      isAnonymous: true,
      isModerator: false,
    },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    replies: [],
    likes: 3,
    isLiked: false,
  },
]

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const [newMessage, setNewMessage] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Here you would send the message to your backend
    console.log("New message:", newMessage)
    setNewMessage("")
  }

  const handleSendReply = (messageId: string) => {
    if (!replyContent.trim()) return

    // Here you would send the reply to your backend
    console.log("Reply to:", messageId, "Content:", replyContent)
    setReplyContent("")
    setReplyingTo(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Group-specific header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/community">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Community
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Anxiety Support Circle</h1>
              <p className="text-sm text-muted-foreground">234 members • Moderated by Dr. Priya</p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Safe Space
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Group Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Anxiety Support Circle</h2>
                <p className="text-muted-foreground mb-3">
                  A safe space to share experiences and coping strategies for anxiety. All members are encouraged to be
                  supportive and respectful.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>234 members</span>
                  <span>•</span>
                  <span>Active daily</span>
                  <span>•</span>
                  <span>Moderated 24/7</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <div className="space-y-6">
          {groupMessages.map((message) => (
            <Card key={message.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={message.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{message.author.isAnonymous ? "?" : message.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.author.name}</span>
                      {message.author.isModerator && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Moderator
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">{formatTimeAgo(message.timestamp)}</span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{message.content}</p>

                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 ${message.isLiked ? "text-red-500" : ""}`}
                      >
                        <Heart className={`h-4 w-4 ${message.isLiked ? "fill-current" : ""}`} />
                        {message.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => setReplyingTo(replyingTo === message.id ? null : message.id)}
                      >
                        <Reply className="h-4 w-4" />
                        Reply
                      </Button>
                    </div>

                    {/* Replies */}
                    {message.replies.length > 0 && (
                      <div className="ml-6 space-y-4 border-l-2 border-muted pl-4">
                        {message.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {reply.author.isAnonymous ? "?" : reply.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{reply.author.name}</span>
                                <span className="text-xs text-muted-foreground">{formatTimeAgo(reply.timestamp)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{reply.content}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`mt-2 flex items-center gap-1 ${reply.isLiked ? "text-red-500" : ""}`}
                              >
                                <Heart className={`h-3 w-3 ${reply.isLiked ? "fill-current" : ""}`} />
                                {reply.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form */}
                    {replyingTo === message.id && (
                      <div className="ml-6 border-l-2 border-primary pl-4">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Write a supportive reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            rows={3}
                            className="flex-1"
                          />
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSendReply(message.id)}
                              disabled={!replyContent.trim()}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Message Form */}
        <Card className="mt-6 sticky bottom-4">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="Share your thoughts, ask for support, or offer encouragement..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    Remember to be supportive and respectful. Your message will be reviewed by moderators.
                  </p>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
