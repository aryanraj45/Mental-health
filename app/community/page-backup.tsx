"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  MessageCircle,
  Heart,
  Reply,
  Flag,
  Shield,
  Plus,
  Search,
  Clock,
  Eye,
  Lock,
  Globe,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    isAnonymous: boolean;
  };
  category: string;
  timestamp: Date;
  replies: number;
  likes: number;
  views: number;
  isLiked: boolean;
  isPinned: boolean;
  tags: string[];
}

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPrivate: boolean;
  category: string;
  moderators: string[];
  recentActivity: Date;
}

const supportGroups: SupportGroup[] = [
  {
    id: "1",
    name: "Anxiety Support Circle",
    description:
      "A safe space to share experiences and coping strategies for anxiety",
    memberCount: 234,
    isPrivate: false,
    category: "Anxiety",
    moderators: ["Dr. Priya", "Student Volunteer"],
    recentActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    name: "Academic Stress Relief",
    description:
      "Support for students dealing with academic pressure and exam stress",
    memberCount: 189,
    isPrivate: false,
    category: "Academic",
    moderators: ["Academic Counselor", "Peer Leader"],
    recentActivity: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "3",
    name: "Depression Support Network",
    description: "Peer support for those experiencing depression and low mood",
    memberCount: 156,
    isPrivate: true,
    category: "Depression",
    moderators: ["Mental Health Professional", "Trained Volunteer"],
    recentActivity: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "4",
    name: "Social Connection Hub",
    description:
      "For students looking to build friendships and overcome social anxiety",
    memberCount: 298,
    isPrivate: false,
    category: "Social",
    moderators: ["Social Worker", "Student Leader"],
    recentActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
];

const recentPosts: Post[] = [
  {
    id: "1",
    title: "Feeling overwhelmed with final exams approaching",
    content:
      "I'm in my third year and finals are in two weeks. I can't seem to focus and I'm constantly worried about failing. Has anyone else felt this way?",
    author: {
      name: "Anonymous Student",
      avatar: "",
      isAnonymous: true,
    },
    category: "Academic Stress",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    replies: 12,
    likes: 8,
    views: 45,
    isLiked: false,
    isPinned: false,
    tags: ["exams", "stress", "focus"],
  },
  {
    id: "2",
    title: "Small wins in managing anxiety",
    content:
      "I wanted to share that I successfully attended a social event yesterday without having a panic attack. The breathing techniques from our group really helped!",
    author: {
      name: "Sarah M.",
      avatar: "/student-avatar-1.jpg",
      isAnonymous: false,
    },
    category: "Anxiety Support",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    replies: 18,
    likes: 24,
    views: 67,
    isLiked: true,
    isPinned: true,
    tags: ["success", "anxiety", "social"],
  },
  {
    id: "3",
    title: "Looking for study buddies for motivation",
    content:
      "I find it hard to stay motivated when studying alone. Would anyone be interested in forming a virtual study group?",
    author: {
      name: "Alex K.",
      avatar: "/student-avatar-2.jpg",
      isAnonymous: false,
    },
    category: "Academic Support",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    replies: 7,
    likes: 5,
    views: 32,
    isLiked: false,
    isPinned: false,
    tags: ["study", "motivation", "group"],
  },
];

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isAnonymousPost, setIsAnonymousPost] = useState(false);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleNewPost = () => {
    // Here you would submit the new post
    console.log({
      title: newPostTitle,
      content: newPostContent,
      isAnonymous: isAnonymousPost,
      timestamp: new Date(),
    });
    setShowNewPostDialog(false);
    setNewPostTitle("");
    setNewPostContent("");
    setIsAnonymousPost(false);
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
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            Community
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Community Guidelines Alert */}
        <Alert className="mb-6 border-primary/50 bg-primary/10">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Community Guidelines:</strong> This is a safe space for peer
            support. Be respectful, maintain confidentiality, and report any
            concerning content. All posts are moderated by trained volunteers
            and mental health professionals.
          </AlertDescription>
        </Alert>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Peer Support Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow students, share experiences, and find support in
            a safe, moderated environment. You're not alone in your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="posts" className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="posts">Recent Posts</TabsTrigger>
                  <TabsTrigger value="groups">Support Groups</TabsTrigger>
                </TabsList>

                <Dialog
                  open={showNewPostDialog}
                  onOpenChange={setShowNewPostDialog}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Share with the Community</DialogTitle>
                      <DialogDescription>
                        Share your thoughts, ask for support, or offer
                        encouragement to fellow students.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Post Title</Label>
                        <Input
                          id="title"
                          placeholder="What would you like to share?"
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content">Your Message</Label>
                        <Textarea
                          id="content"
                          placeholder="Share your thoughts, experiences, or questions..."
                          rows={6}
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={isAnonymousPost}
                          onCheckedChange={setIsAnonymousPost}
                        />
                        <Label htmlFor="anonymous" className="text-sm">
                          Post anonymously (your identity will be hidden)
                        </Label>
                      </div>
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          If you're experiencing a mental health crisis, please
                          contact emergency services or call a crisis helpline
                          immediately.
                        </AlertDescription>
                      </Alert>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowNewPostDialog(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleNewPost}
                          disabled={
                            !newPostTitle.trim() || !newPostContent.trim()
                          }
                        >
                          Share Post
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <TabsContent value="posts" className="space-y-4">
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Posts List */}
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={post.author.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {post.author.isAnonymous
                                ? "?"
                                : post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-lg">
                                    {post.title}
                                  </h3>
                                  {post.isPinned && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      Pinned
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{post.author.name}</span>
                                  <span>•</span>
                                  <span>{formatTimeAgo(post.timestamp)}</span>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {post.category}
                                  </Badge>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Flag className="h-4 w-4" />
                              </Button>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                              {post.content}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {post.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`flex items-center gap-1 ${
                                    post.isLiked ? "text-red-500" : ""
                                  }`}
                                >
                                  <Heart
                                    className={`h-4 w-4 ${
                                      post.isLiked ? "fill-current" : ""
                                    }`}
                                  />
                                  {post.likes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center gap-1"
                                >
                                  <MessageCircle className="h-4 w-4" />
                                  {post.replies}
                                </Button>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Eye className="h-4 w-4" />
                                  {post.views}
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Reply className="h-4 w-4 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="groups" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {supportGroups.map((group) => (
                    <Card
                      key={group.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">
                              {group.name}
                            </CardTitle>
                            {group.isPrivate ? (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Globe className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <Badge variant="outline">{group.category}</Badge>
                        </div>
                        <CardDescription>{group.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{group.memberCount} members</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>
                                Active {formatTimeAgo(group.recentActivity)}
                              </span>
                            </div>
                          </div>

                          <div className="text-sm">
                            <span className="text-muted-foreground">
                              Moderated by:{" "}
                            </span>
                            <span>{group.moderators.join(", ")}</span>
                          </div>

                          <Button
                            className="w-full"
                            variant={group.isPrivate ? "outline" : "default"}
                          >
                            {group.isPrivate ? "Request to Join" : "Join Group"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active Members
                  </span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Posts This Week
                  </span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Support Groups
                  </span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Online Now
                  </span>
                  <span className="font-medium text-green-600">156</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need More Support?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/chat">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    AI Chat Support
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/book">
                    <Users className="h-4 w-4 mr-2" />
                    Book Counselor
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  asChild
                >
                  <Link href="/resources">
                    <Heart className="h-4 w-4 mr-2" />
                    Browse Resources
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Be respectful and supportive</p>
                <p>• Maintain confidentiality</p>
                <p>• No medical advice</p>
                <p>• Report concerning content</p>
                <p>• Use content warnings when needed</p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary"
                  asChild
                >
                  <Link href="/guidelines">Read Full Guidelines</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Crisis Resources */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">
                  Crisis Support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="font-medium">
                  If you're in crisis, get help now:
                </p>
                <div className="space-y-1">
                  <p>NIMHANS: 080-26995000</p>
                  <p>Vandrevala: 9999666555</p>
                  <p>iCall: 9152987821</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
