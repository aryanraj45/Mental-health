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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/header";
import { useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Palette, RotateCcw } from "lucide-react";
import {
  BookOpen,
  Video,
  Headphones,
  Heart,
  Search,
  Clock,
  User,
  Play,
  Star,
  Filter,
  Brain,
  Zap,
  Moon,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "audio" | "tool";
  category: string;
  duration: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
  thumbnail: string;
  author: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Understanding Anxiety: A Student's Guide",
    description:
      "Learn about anxiety symptoms, triggers, and coping strategies specifically for college students.",
    type: "article",
    category: "Anxiety",
    duration: "8 min read",
    language: "English",
    difficulty: "beginner",
    rating: 4.8,
    thumbnail: "/anxiety-guide-thumbnail.jpg",
    author: "Dr. Priya Sharma",
    tags: ["anxiety", "coping", "students", "mental health"],
  },
  {
    id: "2",
    title: "Guided Meditation for Exam Stress",
    description:
      "A 15-minute guided meditation to help you relax and focus before exams.",
    type: "audio",
    category: "Stress Management",
    duration: "15 min",
    language: "Hindi",
    difficulty: "beginner",
    rating: 4.9,
    thumbnail: "/meditation-audio-thumbnail.jpg",
    author: "Meditation Coach Anita",
    tags: ["meditation", "stress", "exams", "relaxation"],
  },
  {
    id: "3",
    title: "Building Healthy Sleep Habits",
    description:
      "Video guide on creating a sleep routine that supports your mental health and academic performance.",
    type: "video",
    category: "Sleep & Wellness",
    duration: "12 min",
    language: "English",
    difficulty: "beginner",
    rating: 4.7,
    thumbnail: "/sleep-habits-video-thumbnail.jpg",
    author: "Dr. Sleep Specialist",
    tags: ["sleep", "wellness", "habits", "health"],
  },
  {
    id: "4",
    title: "Mood Tracker & Journal",
    description:
      "Interactive tool to track your daily mood, identify patterns, and reflect on your mental health journey.",
    type: "tool",
    category: "Self-Assessment",
    duration: "5-10 min daily",
    language: "English",
    difficulty: "beginner",
    rating: 4.6,
    thumbnail: "/mood-tracker-tool-thumbnail.jpg",
    author: "Sukoon Team",
    tags: ["mood", "tracking", "journal", "self-care"],
  },
  {
    id: "5",
    title: "Dealing with Social Anxiety in College",
    description:
      "Practical strategies for managing social anxiety in campus settings and building meaningful connections.",
    type: "article",
    category: "Social Anxiety",
    duration: "10 min read",
    language: "Tamil",
    difficulty: "intermediate",
    rating: 4.5,
    thumbnail: "/social-anxiety-article-thumbnail.jpg",
    author: "Dr. Social Psychology",
    tags: ["social anxiety", "college", "relationships", "confidence"],
  },
  {
    id: "6",
    title: "Breathing Exercises for Panic Attacks",
    description:
      "Learn effective breathing techniques to manage panic attacks and acute anxiety episodes.",
    type: "video",
    category: "Crisis Management",
    duration: "8 min",
    language: "English",
    difficulty: "beginner",
    rating: 4.9,
    thumbnail: "/breathing-exercises-video-thumbnail.jpg",
    author: "Anxiety Specialist",
    tags: ["panic", "breathing", "crisis", "techniques"],
  },
];

const categories = [
  "All",
  "Anxiety",
  "Depression",
  "Stress Management",
  "Sleep & Wellness",
  "Social Anxiety",
  "Crisis Management",
  "Self-Assessment",
];
const languages = ["All", "English", "Hindi", "Kashmiri","Tamil", "Bengali", "Telugu"];
const resourceTypes = ["All", "article", "video", "audio", "tool"];

function DrawingPad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState([5]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.offsetWidth;
      canvas.height = 400;
    }

    context.lineCap = "round";
    context.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.strokeStyle = currentColor;
    context.lineWidth = brushSize[0];
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
              <Palette className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-white">Creative Drawing Pad</CardTitle>
              <CardDescription className="text-white/70">
                A space to express your feelings visually. Don't worry about making it perfect.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 p-4 mb-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2">
              <label htmlFor="color-picker" className="text-sm font-medium text-white/80">
                Color:
              </label>
              <input
                id="color-picker"
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
              />
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-[150px]">
              <label className="text-sm font-medium text-white/80">Size:</label>
              <Slider
                value={brushSize}
                onValueChange={setBrushSize}
                max={50}
                min={1}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-semibold w-8 text-center text-white/80">
                {brushSize[0]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={clearCanvas}
                title="Clear Canvas"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="border border-white/20 rounded-lg overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="cursor-crosshair w-full h-[400px]"
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-white/60">
              Use this space to draw, doodle, or express your emotions visually. 
              Art therapy can help process feelings and reduce stress.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [filteredResources, setFilteredResources] = useState(resources);
  const [favorites, setFavorites] = useState<string[]>([]);
  const isFavorite = (id: string) => favorites.includes(id);
  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filterResources = () => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          resource.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (resource) => resource.category === selectedCategory
      );
    }

    if (selectedLanguage !== "All") {
      filtered = filtered.filter(
        (resource) => resource.language === selectedLanguage
      );
    }

    if (selectedType !== "All") {
      filtered = filtered.filter((resource) => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "audio":
        return <Headphones className="h-5 w-5" />;
      case "tool":
        return <Zap className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-3/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      <Header />

      <main className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen className="h-12 w-12 text-purple-400" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Resource Hub
            </h1>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 text-blue-400" />
            </motion.div>
          </div>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover evidence-based resources, tools, and content to support your mental health journey. 
            Available in multiple languages and designed specifically for students.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-6"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    placeholder="Search resources, topics, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-400"
                  />
                </div>
                <Button 
                  onClick={filterResources} 
                  className="md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                    {languages.map((language) => (
                      <SelectItem key={language} value={language} className="text-white hover:bg-white/10">
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Resource Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                    {resourceTypes.map((type) => (
                      <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                        {type === "All"
                          ? "All Types"
                          : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-xl border-white/10">
            <TabsTrigger value="browse" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Browse Resources
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Wellness Tools
            </TabsTrigger>
            <TabsTrigger value="music" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Calming Music
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              My Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img
                        src={
                          resource.thumbnail ||
                          "/placeholder.svg?height=200&width=400"
                        }
                        alt={resource.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-20">
                        <Badge
                          className={`${getDifficultyColor(resource.difficulty)} backdrop-blur-sm`}
                        >
                          {resource.difficulty}
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 z-20">
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white border-white/20"
                        >
                          {getResourceIcon(resource.type)}
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg leading-tight text-white group-hover:text-purple-300 transition-colors">
                          {resource.title}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-white/80">{resource.rating}</span>
                        </div>
                      </div>
                      <CardDescription className="text-sm text-white/70">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {resource.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {resource.author}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs border-white/30 text-white/70 hover:bg-white/10"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            {resource.type === "tool"
                              ? "Use Tool"
                              : resource.type === "video"
                              ? "Watch"
                              : "Read"}
                          </Button>
                          <Button 
                            size="sm" 
                            variant={isFavorite(resource.id) ? "default" : "outline"}
                            className={`border-white/30 text-white hover:bg-white/10 ${isFavorite(resource.id) ? 'bg-pink-600 text-white' : ''}`}
                            onClick={() => toggleFavorite(resource.id)}
                            aria-label={isFavorite(resource.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            <Heart className={`h-4 w-4 ${isFavorite(resource.id) ? 'fill-pink-400 text-pink-400' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          <TabsContent value="music">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                      <Headphones className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Peaceful Piano</CardTitle>
                      <CardDescription className="text-white/70">
                        Relaxing piano music to help you focus, study, or unwind.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl overflow-hidden bg-black/20 backdrop-blur-sm">
                    <iframe
                      title="Spotify Embed: Peaceful Piano"
                      style={{ borderRadius: "12px" }}
                      src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator"
                      width="100%"
                      height="800"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="tools">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <DrawingPad />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Brain,
                    title: "Mood Tracker",
                    description: "Track your daily emotions and identify patterns over time",
                    color: "from-purple-500/20 to-pink-500/20",
                    iconColor: "text-purple-400",
                    buttonColor: "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  },
                  {
                    icon: Target,
                    title: "Anxiety Assessment",
                    description: "Quick self-assessment to understand your anxiety levels",
                    color: "from-blue-500/20 to-indigo-500/20",
                    iconColor: "text-blue-400",
                    buttonColor: "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  },
                  {
                    icon: Moon,
                    title: "Sleep Tracker",
                    description: "Monitor your sleep patterns and get personalized recommendations",
                    color: "from-indigo-500/20 to-purple-500/20",
                    iconColor: "text-indigo-400",
                    buttonColor: "from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  },
                  {
                    icon: Zap,
                    title: "Stress Buster",
                    description: "Quick 5-minute exercises to reduce stress and anxiety",
                    color: "from-yellow-500/20 to-orange-500/20",
                    iconColor: "text-yellow-400",
                    buttonColor: "from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  },
                  {
                    icon: Heart,
                    title: "Gratitude Journal",
                    description: "Daily gratitude practice to improve your mental wellbeing",
                    color: "from-red-500/20 to-pink-500/20",
                    iconColor: "text-red-400",
                    buttonColor: "from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                  },
                  {
                    icon: Play,
                    title: "Guided Meditation",
                    description: "Collection of meditation sessions for different needs",
                    color: "from-green-500/20 to-teal-500/20",
                    iconColor: "text-green-400",
                    buttonColor: "from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  }
                ].map((tool, index) => (
                  <motion.div
                    key={tool.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                      <CardHeader>
                        <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm`}>
                          <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                        </div>
                        <CardTitle className="text-white group-hover:text-purple-300 transition-colors">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-white/70">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className={`w-full bg-gradient-to-r ${tool.buttonColor} text-white`}>
                          {tool.title === "Mood Tracker" ? "Start Tracking" :
                           tool.title === "Anxiety Assessment" ? "Take Assessment" :
                           tool.title === "Sleep Tracker" ? "Track Sleep" :
                           tool.title === "Stress Buster" ? "Start Exercise" :
                           tool.title === "Gratitude Journal" ? "Write Entry" :
                           "Start Session"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="favorites">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardContent className="p-12 text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="h-16 w-16 text-pink-400 mx-auto mb-6" />
                  </motion.div>
                  <p className="mb-6 text-white/80 text-lg">
                    Start exploring resources and save your favorites for quick access. 
                    Build your personalized mental health toolkit.
                  </p>
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                  >
                    <Link href="#browse">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Browse Resources
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}