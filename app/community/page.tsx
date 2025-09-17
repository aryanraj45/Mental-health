"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Header } from "@/components/header";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  easeOut,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ThumbsUp,
  ThumbsDown,
  Send,
  MoreHorizontal,
  UserX,
  Bookmark,
  Share2,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

// --- Reusable UI Components & Hooks ---

const useMouseParallax = (
  ref: React.RefObject<HTMLDivElement>,
  strength: number
) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const moveX = (clientX - innerWidth / 2) / (innerWidth / 2);
      const moveY = (clientY - innerHeight / 2) / (innerHeight / 2);
      x.set(moveX * strength);
      y.set(moveY * strength);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ref, strength, x, y]);
  const springX = useSpring(x, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  const springY = useSpring(y, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  return { x: springX, y: springY };
};

function ElegantShape({
  className,
  delay = 0,
  gradient = "from-white/[0.08]",
  parallaxStrength = 50,
}: {
  className?: string;
  delay?: number;
  gradient?: string;
  parallaxStrength?: number;
}) {
  const ref = useRef(null);
  const { x, y } = useMouseParallax(ref, parallaxStrength);
  const width = Math.random() * 400 + 200;
  const height = Math.random() * 100 + 50;
  const rotate = Math.random() * 360;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 15 }}
      animate={{ opacity: 1, scale: 1, rotate: rotate }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute", className)}
      style={{ x, y }}
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
            "backdrop-blur-md border-2 border-white/[0.1]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          )}
        />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      </motion.div>
    </motion.div>
  );
}

const InteractiveGlassCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg rounded-xl relative",
        className
      )}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

// --- Original Page Data & Logic ---
interface Comment {
  id: string;
  content: string;
  author: { name: string; avatar: string; isAnonymous: boolean };
  timestamp: Date;
  likes: number;
  replies: Comment[];
  isLiked: boolean;
}
interface Post {
  id: string;
  title: string;
  content: string;
  author: { name: string; avatar: string; isAnonymous: boolean };
  category: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
}
interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPrivate: boolean;
  category: string;
  moderators: string[];
  recentActivity: Date;
}

const samplePosts: Post[] = [
  {
    id: "1",
    title: "Dealing with exam stress - anyone else feeling overwhelmed?",
    content:
      "Hey everyone, I'm in my final year and the pressure is getting to me. Between job interviews and exams, I feel like I'm drowning. How do you all manage during stressful times? Any tips would be appreciated. 💙",
    author: { name: "Anonymous Student", avatar: "", isAnonymous: true },
    category: "Academic Stress",
    timestamp: new Date(Date.now() - 2 * 3600000),
    likes: 23,
    comments: [
      {
        id: "c1",
        content:
          "I totally understand! What helped me was breaking everything into smaller tasks. Also, the campus counseling center has some great stress management workshops.",
        author: {
          name: "Sarah M.",
          avatar: "https://placehold.co/40x40/facc15/1e293b?text=SM",
          isAnonymous: false,
        },
        timestamp: new Date(Date.now() - 1 * 3600000),
        likes: 8,
        replies: [],
        isLiked: false,
      },
      {
        id: "c2",
        content:
          "Same here! The breathing exercises from the wellness app have been helping me a lot. You're not alone in this 💪",
        author: { name: "Anonymous", avatar: "", isAnonymous: true },
        timestamp: new Date(Date.now() - 30 * 60000),
        likes: 5,
        replies: [],
        isLiked: true,
      },
    ],
    views: 127,
    isLiked: false,
    isBookmarked: false,
    tags: ["stress", "exams", "support"],
  },
  {
    id: "2",
    title: "Gratitude practice - what made you smile today?",
    content:
      "Let's spread some positivity! Share something small or big that made you happy today. I'll start: my professor extended the deadline for our project and it felt like a huge weight off my shoulders! ✨",
    author: {
      name: "Maya K.",
      avatar: "https://placehold.co/40x40/a78bfa/ffffff?text=MK",
      isAnonymous: false,
    },
    category: "Positivity",
    timestamp: new Date(Date.now() - 5 * 3600000),
    likes: 45,
    comments: [
      {
        id: "c3",
        content:
          "A friend brought me coffee without me asking. Small gestures mean so much! ☕",
        author: {
          name: "Alex R.",
          avatar: "https://placehold.co/40x40/7dd3fc/1e293b?text=AR",
          isAnonymous: false,
        },
        timestamp: new Date(Date.now() - 4 * 3600000),
        likes: 12,
        replies: [
          {
            id: "r1",
            content: "That's so sweet! Friends like that are precious 💕",
            author: {
              name: "Maya K.",
              avatar: "https://placehold.co/40x40/a78bfa/ffffff?text=MK",
              isAnonymous: false,
            },
            timestamp: new Date(Date.now() - 3 * 3600000),
            likes: 3,
            replies: [],
            isLiked: false,
          },
        ],
        isLiked: true,
      },
    ],
    views: 203,
    isLiked: true,
    isBookmarked: true,
    tags: ["gratitude", "positivity", "sharing"],
  },
];

const communityGroups: CommunityGroup[] = [
  {
    id: "1",
    name: "Anxiety Support Circle",
    description:
      "A safe space for sharing experiences and coping strategies for anxiety",
    memberCount: 234,
    isPrivate: false,
    category: "Mental Health",
    moderators: ["Dr. Sarah Johnson", "Maya K."],
    recentActivity: new Date(Date.now() - 1 * 3600000),
  },
  {
    id: "2",
    name: "Study Stress Relief",
    description:
      "Tips and support for managing academic pressure and study-related stress",
    memberCount: 456,
    isPrivate: false,
    category: "Academic",
    moderators: ["Prof. Mike Chen"],
    recentActivity: new Date(Date.now() - 30 * 60000),
  },
  {
    id: "3",
    name: "Mindfulness & Meditation",
    description:
      "Daily mindfulness practices and meditation techniques for better mental health",
    memberCount: 189,
    isPrivate: false,
    category: "Wellness",
    moderators: ["Mindful Moments Team"],
    recentActivity: new Date(Date.now() - 2 * 3600000),
  },
  {
    id: "4",
    name: "Crisis Support Network",
    description:
      "Immediate peer support for mental health crises and emergencies",
    memberCount: 89,
    isPrivate: true,
    category: "Emergency",
    moderators: ["Crisis Response Team"],
    recentActivity: new Date(Date.now() - 15 * 60000),
  },
];

// --- Main Page Component ---
export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");
  const [isAnonymousPost, setIsAnonymousPost] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>(
    {}
  );
  const [showComments, setShowComments] = useState<{
    [postId: string]: boolean;
  }>({});

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    const post: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: {
        name: isAnonymousPost ? "Anonymous Student" : "Current User",
        avatar: isAnonymousPost
          ? ""
          : "https://placehold.co/40x40/38bdf8/ffffff?text=CU",
        isAnonymous: isAnonymousPost,
      },
      category: newPostCategory || "General",
      timestamp: new Date(),
      likes: 0,
      comments: [],
      views: 0,
      isLiked: false,
      isBookmarked: false,
      tags: [],
    };
    setPosts([post, ...posts]);
    setShowNewPostDialog(false);
    // Reset form
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostCategory("");
    setIsAnonymousPost(false);
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };
  const handleBookmarkPost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  const handleAddComment = (postId: string) => {
    const text = commentText[postId]?.trim();
    if (!text) return;

    const newComment = {
      id: Date.now().toString(),
      content: text,
      author: {
        name: "Current User",
        avatar: "https://placehold.co/32x32/38bdf8/ffffff?text=CU",
        isAnonymous: false,
      },
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    setCommentText({ ...commentText, [postId]: "" });
  };

  const handleChangeComment = (postId: string, text: string) => {
    setCommentText({ ...commentText, [postId]: text });
  };

  const toggleComments = (postId: string) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: easeOut,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0">
        <ElegantShape
          delay={0.3}
          gradient="from-teal-500/[0.15]"
          className="left-[-5%] top-[10%]"
          parallaxStrength={70}
        />
        <ElegantShape
          delay={0.5}
          gradient="from-purple-500/[0.15]"
          className="right-[5%] top-[60%]"
          parallaxStrength={50}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      <Header />

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
            Community Hub
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Connect, share, and find support in a safe, moderated environment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={1}
            >
              <InteractiveGlassCard className="!p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                    <Input
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-full"
                    />
                  </div>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 rounded-full h-12">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "all",
                        "Academic Stress",
                        "Positivity",
                        "General",
                        "Support",
                      ].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog
                    open={showNewPostDialog}
                    onOpenChange={setShowNewPostDialog}
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="bg-white text-black hover:bg-white/90 rounded-full font-semibold h-12"
                      >
                        <Plus className="h-4 w-4 mr-2" /> New Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/50 backdrop-blur-2xl border-white/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Create New Post</DialogTitle>
                        <DialogDescription className="text-white/60">
                          Share your thoughts, ask for support, or start a
                          discussion.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <Input
                          placeholder="Title"
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          className="bg-white/5 border-white/10"
                        />
                        <Textarea
                          placeholder="Share what's on your mind..."
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          className="bg-white/5 border-white/10 min-h-[120px]"
                        />
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="anonymous"
                            checked={isAnonymousPost}
                            onCheckedChange={(c) =>
                              setIsAnonymousPost(c === true)
                            }
                            className="border-white/30 data-[state=checked]:bg-cyan-500"
                          />
                          <Label htmlFor="anonymous">Post anonymously</Label>
                        </div>
                        <Button
                          onClick={handleCreatePost}
                          className="w-full bg-white text-black hover:bg-white/90 rounded-full font-semibold"
                        >
                          Create Post
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </InteractiveGlassCard>
            </motion.div>
            <div className="space-y-8">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  custom={i + 2}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <PostCard
                    post={post}
                    onLike={handleLikePost}
                    onBookmark={handleBookmarkPost}
                    onToggleComments={toggleComments}
                    onAddComment={handleAddComment}
                    onChangeComment={handleChangeComment}
                    commentText={commentText[post.id] || ""}
                    showComments={showComments[post.id] || false}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={3}
            className="space-y-8 lg:sticky lg:top-24"
          >
            <InteractiveGlassCard>
              <CardTitle className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-cyan-400" /> Support Groups
              </CardTitle>
              <div className="space-y-3">
                {communityGroups.map((group) => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            </InteractiveGlassCard>
            <InteractiveGlassCard>
              <CardTitle className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-cyan-400" /> Guidelines
              </CardTitle>
              <ul className="space-y-2 text-sm text-white/60 list-disc list-inside">
                <li>Be respectful and supportive</li>
                <li>Respect privacy and anonymity</li>
                <li>No medical or professional advice</li>
                <li>No harmful or triggering content</li>
              </ul>
            </InteractiveGlassCard>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// --- Reusable Sub-Components for Community Page ---

const PostCard = ({
  post,
  onLike,
  onBookmark,
  onToggleComments,
  onAddComment,
  onChangeComment,
  commentText,
  showComments,
}: {
  post: Post;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  onToggleComments: (id: string) => void;
  onAddComment: (id: string) => void;
  onChangeComment: (id: string, text: string) => void;
  commentText: string;
  showComments: boolean;
}) => (
  <InteractiveGlassCard className="!p-0 overflow-hidden">
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white/20">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback className="bg-white/10">
              {post.author.isAnonymous
                ? "?"
                : post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                {post.author.isAnonymous ? "Anonymous" : post.author.name}
              </span>
              {post.author.isAnonymous && (
                <UserX className="h-4 w-4 text-white/50" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span>
                {formatDistanceToNow(post.timestamp, { addSuffix: true })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {post.views}
              </span>
            </div>
          </div>
        </div>
        <Badge className="bg-white/10 border-none text-white/80">
          {post.category}
        </Badge>
      </div>
      <CardTitle className="text-xl my-4 text-white">{post.title}</CardTitle>
      <p className="text-white/70 mb-4">{post.content}</p>
    </div>
    <div className="border-t border-white/10 bg-black/20">
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            className={cn(
              "text-white/60 hover:text-white",
              post.isLiked && "text-red-400 hover:text-red-400"
            )}
          >
            <Heart
              className={cn("h-4 w-4 mr-2", post.isLiked && "fill-current")}
            />{" "}
            {post.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleComments(post.id)}
            className="text-white/60 hover:text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" /> {post.comments.length}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBookmark(post.id)}
            className={cn(
              "text-white/60 hover:text-white",
              post.isBookmarked && "text-cyan-400 hover:text-cyan-400"
            )}
          >
            <Bookmark
              className={cn("h-4 w-4", post.isBookmarked && "fill-current")}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white/60 hover:text-white"
          >
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-white/10 p-6 space-y-4">
          {/* Add Comment */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8 border border-white/20">
              <AvatarFallback className="bg-white/10 text-xs">
                CU
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => {
                  const updatedCommentText = e.target.value;
                  onChangeComment(post.id, updatedCommentText);
                }}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-[80px] resize-none"
              />
              <Button
                size="sm"
                onClick={() => onAddComment(post.id)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white"
                disabled={!commentText.trim()}
              >
                <Reply className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8 border border-white/20">
                  <AvatarImage src={comment.author.avatar} />
                  <AvatarFallback className="bg-white/10 text-xs">
                    {comment.author.isAnonymous
                      ? "?"
                      : comment.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-white/90">
                      {comment.author.isAnonymous
                        ? "Anonymous"
                        : comment.author.name}
                    </span>
                    <span className="text-white/40 text-xs">
                      {formatDistanceToNow(comment.timestamp, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/40 hover:text-white h-6 text-xs px-2"
                    >
                      <Heart className="h-3 w-3 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/40 hover:text-white h-6 text-xs px-2"
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </InteractiveGlassCard>
);

const GroupCard = ({ group }: { group: CommunityGroup }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="p-3 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer"
  >
    <div className="flex items-center justify-between mb-1">
      <h4 className="font-bold text-sm text-white">{group.name}</h4>
      {group.isPrivate ? (
        <Lock className="h-3 w-3 text-white/50" />
      ) : (
        <Globe className="h-3 w-3 text-white/50" />
      )}
    </div>
    <p className="text-xs text-white/50 mb-2">{group.description}</p>
    <div className="flex items-center justify-between text-xs text-white/40">
      <span>{group.memberCount} members</span>
      <span>
        Active {formatDistanceToNow(group.recentActivity, { addSuffix: true })}
      </span>
    </div>
  </motion.div>
);
