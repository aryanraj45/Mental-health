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
} from "lucide-react";
import Link from "next/link";

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
const languages = ["All", "English", "Hindi", "Tamil", "Bengali", "Telugu"];
const resourceTypes = ["All", "article", "video", "audio", "tool"];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [filteredResources, setFilteredResources] = useState(resources);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Sukoon</h1>
          </Link>
          <Badge variant="secondary" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Resource Hub
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Mental Health Resource Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover evidence-based resources, tools, and content to support
            your mental health journey. Available in multiple languages and
            designed specifically for students.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={filterResources} className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "All"
                      ? "All Types"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Resources</TabsTrigger>
            <TabsTrigger value="tools">Wellness Tools</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={
                        resource.thumbnail ||
                        "/placeholder.svg?height=200&width=400"
                      }
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge
                        className={`${getDifficultyColor(resource.difficulty)}`}
                      >
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {getResourceIcon(resource.type)}
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight">
                        {resource.title}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {resource.rating}
                      </div>
                    </div>
                    <CardDescription className="text-sm">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
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
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          {resource.type === "tool"
                            ? "Use Tool"
                            : resource.type === "video"
                            ? "Watch"
                            : "Read"}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Mood Tracker</CardTitle>
                  <CardDescription>
                    Track your daily emotions and identify patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Tracking</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Anxiety Assessment</CardTitle>
                  <CardDescription>
                    Quick self-assessment to understand your anxiety levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Take Assessment</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Moon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Sleep Tracker</CardTitle>
                  <CardDescription>
                    Monitor your sleep patterns and get personalized
                    recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Track Sleep</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Stress Buster</CardTitle>
                  <CardDescription>
                    Quick 5-minute exercises to reduce stress and anxiety
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Exercise</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Gratitude Journal</CardTitle>
                  <CardDescription>
                    Daily gratitude practice to improve your mental wellbeing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Write Entry</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Play className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Guided Meditation</CardTitle>
                  <CardDescription>
                    Collection of meditation sessions for different needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Session</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No Favorites Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start exploring resources and save your favorites for quick
                  access
                </p>
                <Button asChild>
                  <Link href="#browse">Browse Resources</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
