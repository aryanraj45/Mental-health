"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import {
  Heart,
  Search,
  Play,
  Clock,
  Star,
  BookOpen,
  Headphones,
  Video,
  ArrowLeft,
  Music,
  Download,
  Share2,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface FavoriteItem {
  id: string;
  title: string;
  type: "meditation" | "article" | "video" | "audio" | "exercise";
  duration?: string;
  description: string;
  thumbnail: string;
  category: string;
  rating: number;
  dateAdded: string;
  author?: string;
  isPremium?: boolean;
}

// Sample favorite items
const sampleFavorites: FavoriteItem[] = [
  {
    id: "1",
    title: "5-Minute Morning Meditation",
    type: "meditation",
    duration: "5 min",
    description: "Start your day with clarity and intention through this gentle morning meditation practice.",
    thumbnail: "/meditation-audio-thumbnail.jpg",
    category: "Morning Routine",
    rating: 4.8,
    dateAdded: "2025-09-10",
    author: "Dr. Sarah Chen",
  },
  {
    id: "2",
    title: "Understanding Anxiety: A Complete Guide",
    type: "article",
    description: "Comprehensive guide to understanding anxiety symptoms, triggers, and effective coping strategies.",
    thumbnail: "/anxiety-guide-thumbnail.jpg",
    category: "Mental Health Education",
    rating: 4.9,
    dateAdded: "2025-09-08",
    author: "Dr. Michael Rodriguez",
  },
  {
    id: "3",
    title: "Breathing Exercises for Stress Relief",
    type: "video",
    duration: "12 min",
    description: "Learn powerful breathing techniques to manage stress and anxiety in daily life.",
    thumbnail: "/breathing-exercises-video-thumbnail.jpg",
    category: "Stress Management",
    rating: 4.7,
    dateAdded: "2025-09-05",
    author: "Yoga with Priya",
  },
  {
    id: "4",
    title: "Sleep Meditation - Deep Rest",
    type: "audio",
    duration: "30 min",
    description: "Guided meditation to help you relax deeply and achieve restful sleep.",
    thumbnail: "/meditation-audio-thumbnail.jpg",
    category: "Sleep",
    rating: 4.6,
    dateAdded: "2025-09-03",
    author: "Calm Voices",
    isPremium: true,
  },
  {
    id: "5",
    title: "Progressive Muscle Relaxation",
    type: "exercise",
    duration: "15 min",
    description: "Step-by-step guide to progressive muscle relaxation for physical and mental tension relief.",
    thumbnail: "/meditation-audio-thumbnail.jpg",
    category: "Relaxation",
    rating: 4.5,
    dateAdded: "2025-08-28",
    author: "Wellness Institute",
  },
  {
    id: "6",
    title: "Building Better Sleep Habits",
    type: "video",
    duration: "18 min",
    description: "Expert tips and strategies for improving your sleep quality and establishing healthy sleep routines.",
    thumbnail: "/sleep-habits-video-thumbnail.jpg",
    category: "Sleep Hygiene",
    rating: 4.8,
    dateAdded: "2025-08-25",
    author: "Dr. Sleep Expert",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "meditation":
      return <Headphones className="h-5 w-5" />;
    case "article":
      return <BookOpen className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    case "audio":
      return <Music className="h-5 w-5" />;
    case "exercise":
      return <Play className="h-5 w-5" />;
    default:
      return <Heart className="h-5 w-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "meditation":
      return "bg-purple-500/10 text-purple-300 border-purple-500/20";
    case "article":
      return "bg-blue-500/10 text-blue-300 border-blue-500/20";
    case "video":
      return "bg-red-500/10 text-red-300 border-red-500/20";
    case "audio":
      return "bg-green-500/10 text-green-300 border-green-500/20";
    case "exercise":
      return "bg-orange-500/10 text-orange-300 border-orange-500/20";
    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
  }
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(sampleFavorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredFavorites = favorites.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = activeTab === "all" || item.type === activeTab;
    
    return matchesSearch && matchesType;
  });

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const categories = Array.from(new Set(favorites.map((item) => item.category)));
  const typeCount = {
    all: favorites.length,
    meditation: favorites.filter((item) => item.type === "meditation").length,
    article: favorites.filter((item) => item.type === "article").length,
    video: favorites.filter((item) => item.type === "video").length,
    audio: favorites.filter((item) => item.type === "audio").length,
    exercise: favorites.filter((item) => item.type === "exercise").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-400" />
                My Favorites
              </h1>
              <p className="text-white/60 mt-1">
                Your saved meditations, articles, and wellness content
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search your favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{typeCount.all}</div>
              <div className="text-sm text-white/60">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{typeCount.meditation}</div>
              <div className="text-sm text-white/60">Meditations</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{typeCount.article}</div>
              <div className="text-sm text-white/60">Articles</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{typeCount.video}</div>
              <div className="text-sm text-white/60">Videos</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{typeCount.audio}</div>
              <div className="text-sm text-white/60">Audio</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{typeCount.exercise}</div>
              <div className="text-sm text-white/60">Exercises</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for filtering */}
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white/5 border border-white/10 p-1 h-auto rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">
              All ({typeCount.all})
            </TabsTrigger>
            <TabsTrigger value="meditation" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">
              Meditations
            </TabsTrigger>
            <TabsTrigger value="article" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">
              Articles
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">
              Videos
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">
              Audio
            </TabsTrigger>
            <TabsTrigger value="exercise" className="data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white">
              Exercises
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Favorites Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.length === 0 ? (
            <div className="col-span-full">
              <Card className="bg-white/5 border-white/10 p-8 text-center">
                <Heart className="h-12 w-12 mx-auto text-white/40 mb-4" />
                <h3 className="text-lg font-medium text-white/60 mb-2">No favorites found</h3>
                <p className="text-white/40">
                  {searchTerm
                    ? "Try adjusting your search criteria"
                    : "Start exploring content and save your favorites"}
                </p>
              </Card>
            </div>
          ) : (
            filteredFavorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <div className="relative">
                    <div className="aspect-video relative rounded-t-lg overflow-hidden">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                      
                      {/* Remove from favorites button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFavorite(item.id)}
                        className="absolute top-2 right-2 bg-black/50 text-white hover:bg-red-600 hover:text-white rounded-full p-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      {/* Duration overlay */}
                      {item.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {item.duration}
                        </div>
                      )}
                      
                      {/* Premium badge */}
                      {item.isPremium && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-2 py-1 rounded-full font-semibold">
                          PREMIUM
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(item.type)}>
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <Star className="h-4 w-4 fill-current" />
                        {item.rating}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                      <span>{item.category}</span>
                      <span>Added {new Date(item.dateAdded).toLocaleDateString()}</span>
                    </div>
                    
                    {item.author && (
                      <p className="text-white/50 text-sm mb-4">
                        by {item.author}
                      </p>
                    )}
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {item.type === "article" ? "Read" : "Play"}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/60 hover:text-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="border-white/20 text-white/70 hover:bg-white/10 cursor-pointer transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
