"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import {
  Users, MessageCircle, Heart, Reply, Flag, Shield, Plus, Search, Clock, Eye, Lock, Globe,
  AlertTriangle, ThumbsUp, ThumbsDown, Send, MoreHorizontal, UserX, Bookmark, Share2
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

interface Comment {
  id: string
  content: string
  author: {
    name: string
    avatar: string
    isAnonymous: boolean
  }
  timestamp: Date
  likes: number
  replies: Comment[]
  isLiked: boolean
}

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    isAnonymous: boolean
  }
  category: string
  timestamp: Date
  likes: number
  comments: Comment[]
  views: number
  isLiked: boolean
  isBookmarked: boolean
  tags: string[]
}

interface CommunityGroup {
  id: string
  name: string
  description: string
  memberCount: number
  isPrivate: boolean
  category: string
  moderators: string[]
  recentActivity: Date
}

const samplePosts: Post[] = [
  {
    id: "1",
    title: "Dealing with exam stress - anyone else feeling overwhelmed?",
    content: "Hey everyone, I'm in my final year and the pressure is getting to me. Between job interviews and exams, I feel like I'm drowning. How do you all manage during stressful times? Any tips would be appreciated. 💙",
    author: {
      name: "Anonymous Student",
      avatar: "",
      isAnonymous: true
    },
    category: "Academic Stress",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 23,
    comments: [
      {
        id: "c1",
        content: "I totally understand! What helped me was breaking everything into smaller tasks. Also, the campus counseling center has some great stress management workshops.",
        author: {
          name: "Sarah M.",
          avatar: "",
          isAnonymous: false
        },
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 8,
        replies: [],
        isLiked: false
      },
      {
        id: "c2",
        content: "Same here! The breathing exercises from the wellness app have been helping me a lot. You're not alone in this 💪",
        author: {
          name: "Anonymous",
          avatar: "",
          isAnonymous: true
        },
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        likes: 5,
        replies: [],
        isLiked: true
      }
    ],
    views: 127,
    isLiked: false,
    isBookmarked: false,
    tags: ["stress", "exams", "support"]
  },
  {
    id: "2",
    title: "Gratitude practice - what made you smile today?",
    content: "Let's spread some positivity! Share something small or big that made you happy today. I'll start: my professor extended the deadline for our project and it felt like a huge weight off my shoulders! ✨",
    author: {
      name: "Maya K.",
      avatar: "/professional-counselor-woman.jpg",
      isAnonymous: false
    },
    category: "Positivity",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 45,
    comments: [
      {
        id: "c3",
        content: "A friend brought me coffee without me asking. Small gestures mean so much! ☕",
        author: {
          name: "Alex R.",
          avatar: "",
          isAnonymous: false
        },
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 12,
        replies: [
          {
            id: "r1",
            content: "That's so sweet! Friends like that are precious 💕",
            author: {
              name: "Maya K.",
              avatar: "/professional-counselor-woman.jpg",
              isAnonymous: false
            },
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            likes: 3,
            replies: [],
            isLiked: false
          }
        ],
        isLiked: true
      }
    ],
    views: 203,
    isLiked: true,
    isBookmarked: true,
    tags: ["gratitude", "positivity", "sharing"]
  }
]

const communityGroups: CommunityGroup[] = [
  {
    id: "1",
    name: "Anxiety Support Circle",
    description: "A safe space for sharing experiences and coping strategies for anxiety",
    memberCount: 234,
    isPrivate: false,
    category: "Mental Health",
    moderators: ["Dr. Sarah Johnson", "Maya K."],
    recentActivity: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: "2",
    name: "Study Stress Relief",
    description: "Tips and support for managing academic pressure and study-related stress",
    memberCount: 456,
    isPrivate: false,
    category: "Academic",
    moderators: ["Prof. Mike Chen"],
    recentActivity: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: "3",
    name: "Mindfulness & Meditation",
    description: "Daily mindfulness practices and meditation techniques for better mental health",
    memberCount: 189,
    isPrivate: false,
    category: "Wellness",
    moderators: ["Mindful Moments Team"],
    recentActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: "4",
    name: "Crisis Support Network",
    description: "Immediate peer support for mental health crises and emergencies",
    memberCount: 89,
    isPrivate: true,
    category: "Emergency",
    moderators: ["Crisis Response Team"],
    recentActivity: new Date(Date.now() - 15 * 60 * 1000)
  }
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newComment, setNewComment] = useState<{[key: string]: string}>({})
  const [replyingTo, setReplyingTo] = useState<{postId: string, commentId?: string} | null>(null)

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: {
        name: isAnonymous ? "Anonymous Student" : "Current User",
        avatar: isAnonymous ? "" : "/placeholder-user.jpg",
        isAnonymous
      },
      category: newPostCategory || "General",
      timestamp: new Date(),
      likes: 0,
      comments: [],
      views: 0,
      isLiked: false,
      isBookmarked: false,
      tags: []
    }

    setPosts([post, ...posts])
    setNewPostTitle("")
    setNewPostContent("")
    setNewPostCategory("")
    setIsAnonymous(false)
    setShowNewPostDialog(false)
  }

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleBookmarkPost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ))
  }

  const handleAddComment = (postId: string, commentId?: string) => {
    const commentText = newComment[`${postId}-${commentId || 'main'}`]
    if (!commentText?.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      content: commentText,
      author: {
        name: "Current User",
        avatar: "/placeholder-user.jpg",
        isAnonymous: false
      },
      timestamp: new Date(),
      likes: 0,
      replies: [],
      isLiked: false
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (commentId) {
          // Adding a reply to a comment
          const updateComments = (comments: Comment[]): Comment[] => {
            return comments.map(c => 
              c.id === commentId 
                ? { ...c, replies: [...c.replies, comment] }
                : { ...c, replies: updateComments(c.replies) }
            )
          }
          return { ...post, comments: updateComments(post.comments) }
        } else {
          // Adding a new comment
          return { ...post, comments: [...post.comments, comment] }
        }
      }
      return post
    }))

    setNewComment({ ...newComment, [`${postId}-${commentId || 'main'}`]: "" })
    setReplyingTo(null)
  }

  const handleLikeComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updateComments = (comments: Comment[]): Comment[] => {
          return comments.map(c => {
            if (c.id === commentId) {
              return { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 }
            }
            return { ...c, replies: updateComments(c.replies) }
          })
        }
        return { ...post, comments: updateComments(post.comments) }
      }
      return post
    }))
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const renderComment = (comment: Comment, postId: string, depth: number = 0) => (
    <div key={comment.id} className={`${depth > 0 ? 'ml-8 mt-3' : 'mt-4'} border-l-2 border-gray-100 pl-4`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>
            {comment.author.isAnonymous ? "?" : comment.author.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">
              {comment.author.isAnonymous ? "Anonymous" : comment.author.name}
            </span>
            {comment.author.isAnonymous && <UserX className="h-3 w-3 text-muted-foreground" />}
            <span className="text-xs text-muted-foreground">
              {format(comment.timestamp, 'MMM d, h:mm a')}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikeComment(postId, comment.id)}
              className={`h-8 px-2 ${comment.isLiked ? 'text-red-600' : ''}`}
            >
              <Heart className={`h-4 w-4 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
              {comment.likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyingTo({ postId, commentId: comment.id })}
              className="h-8 px-2"
            >
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </Button>
          </div>
          
          {/* Reply input */}
          {replyingTo?.postId === postId && replyingTo?.commentId === comment.id && (
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="Write a reply..."
                value={newComment[`${postId}-${comment.id}`] || ""}
                onChange={(e) => setNewComment({ ...newComment, [`${postId}-${comment.id}`]: e.target.value })}
                className="flex-1"
              />
              <Button size="sm" onClick={() => handleAddComment(postId, comment.id)}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Render replies */}
          {comment.replies.map(reply => renderComment(reply, postId, depth + 1))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Support</h1>
          <p className="text-muted-foreground">
            Connect with peers, share experiences, and find support in a safe, moderated environment.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post & Search */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Academic Stress">Academic Stress</SelectItem>
                  <SelectItem value="Positivity">Positivity</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                      Share your thoughts, ask for support, or start a discussion.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="What would you like to discuss?"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Academic Stress">Academic Stress</SelectItem>
                          <SelectItem value="Positivity">Positivity</SelectItem>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={4}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Post anonymously
                      </Label>
                    </div>
                    <Button onClick={handleCreatePost} className="w-full">
                      Create Post
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.isAnonymous ? "?" : post.author.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {post.author.isAnonymous ? "Anonymous" : post.author.name}
                            </span>
                            {post.author.isAnonymous && <UserX className="h-4 w-4 text-muted-foreground" />}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{format(post.timestamp, 'MMM d, h:mm a')}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.views}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikePost(post.id)}
                          className={post.isLiked ? 'text-red-600' : ''}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments.length}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmarkPost(post.id)}
                          className={post.isBookmarked ? 'text-blue-600' : ''}
                        >
                          <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-4">
                      {/* Add Comment */}
                      <div className="flex gap-2 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Input
                            placeholder="Write a comment..."
                            value={newComment[`${post.id}-main`] || ""}
                            onChange={(e) => setNewComment({ ...newComment, [`${post.id}-main`]: e.target.value })}
                            className="flex-1"
                          />
                          <Button size="sm" onClick={() => handleAddComment(post.id)}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Comments */}
                      {post.comments.map(comment => renderComment(comment, post.id))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Support Groups
                </CardTitle>
                <CardDescription>
                  Join focused communities for specific topics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {communityGroups.map((group) => (
                  <div key={group.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      {group.isPrivate ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{group.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{group.memberCount} members</span>
                      <span>{format(group.recentActivity, 'MMM d')}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  View All Groups
                </Button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span>🤝</span>
                  <span>Be respectful and supportive</span>
                </div>
                <div className="flex gap-2">
                  <span>🔒</span>
                  <span>Respect privacy and anonymity</span>
                </div>
                <div className="flex gap-2">
                  <span>⚠️</span>
                  <span>No medical or professional advice</span>
                </div>
                <div className="flex gap-2">
                  <span>🚫</span>
                  <span>No harmful or triggering content</span>
                </div>
                <div className="flex gap-2">
                  <span>📞</span>
                  <span>Report urgent concerns to moderators</span>
                </div>
              </CardContent>
            </Card>

            {/* Crisis Support */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Crisis Support:</strong> If you're experiencing a mental health emergency, 
                please contact NIMHANS: 080-26995000 or your local emergency services immediately.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}
