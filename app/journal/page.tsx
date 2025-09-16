"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import {
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  Heart,
  Smile,
  Frown,
  Meh,
  ArrowLeft,
  BookOpen,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface JournalEntry {
  id: string;
  date: string;
  time: string;
  mood: "happy" | "neutral" | "sad" | "anxious" | "excited";
  title: string;
  content: string;
  tags: string[];
}

// Sample journal entries
const sampleEntries: JournalEntry[] = [
  {
    id: "1",
    date: "2025-09-16",
    time: "09:30 AM",
    mood: "happy",
    title: "Morning Meditation Success",
    content: "Had a wonderful 20-minute meditation session this morning. Felt incredibly centered and peaceful. The breathing exercises really helped clear my mind for the day ahead.",
    tags: ["meditation", "morning", "peaceful"],
  },
  {
    id: "2",
    date: "2025-09-15",
    time: "08:15 PM",
    mood: "anxious",
    title: "Work Stress",
    content: "Feeling overwhelmed with the upcoming project deadline. Need to practice some calming techniques and remind myself that I can handle this step by step.",
    tags: ["work", "stress", "overwhelmed"],
  },
  {
    id: "3",
    date: "2025-09-14",
    time: "02:45 PM",
    mood: "excited",
    title: "Great Therapy Session",
    content: "Had an amazing breakthrough in therapy today. Finally understanding some patterns in my thinking. Dr. Sharma gave me some excellent coping strategies to try.",
    tags: ["therapy", "breakthrough", "progress"],
  },
  {
    id: "4",
    date: "2025-09-13",
    time: "07:00 PM",
    mood: "neutral",
    title: "Quiet Evening",
    content: "Spent a quiet evening at home reading and reflecting. Sometimes these calm moments are exactly what I need to recharge.",
    tags: ["reading", "quiet", "reflection"],
  },
  {
    id: "5",
    date: "2025-09-12",
    time: "11:20 AM",
    mood: "sad",
    title: "Missing Family",
    content: "Feeling homesick today. Called my parents and felt a bit better after hearing their voices. Gratitude practice helped me focus on the positive connections I have.",
    tags: ["family", "homesick", "gratitude"],
  },
];

const getMoodIcon = (mood: string) => {
  switch (mood) {
    case "happy":
      return <Smile className="h-5 w-5 text-green-400" />;
    case "excited":
      return <Heart className="h-5 w-5 text-pink-400" />;
    case "neutral":
      return <Meh className="h-5 w-5 text-gray-400" />;
    case "sad":
      return <Frown className="h-5 w-5 text-blue-400" />;
    case "anxious":
      return <Frown className="h-5 w-5 text-yellow-400" />;
    default:
      return <Meh className="h-5 w-5 text-gray-400" />;
  }
};

const getMoodColor = (mood: string) => {
  switch (mood) {
    case "happy":
      return "bg-green-500/10 text-green-300 border-green-500/20";
    case "excited":
      return "bg-pink-500/10 text-pink-300 border-pink-500/20";
    case "neutral":
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
    case "sad":
      return "bg-blue-500/10 text-blue-300 border-blue-500/20";
    case "anxious":
      return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
  }
};

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState<string>("all");
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "neutral" as const,
    tags: "",
  });

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMood = selectedMood === "all" || entry.mood === selectedMood;
    
    return matchesSearch && matchesMood;
  });

  const handleAddEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        mood: newEntry.mood,
        title: newEntry.title,
        content: newEntry.content,
        tags: newEntry.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      };
      
      setEntries([entry, ...entries]);
      setNewEntry({ title: "", content: "", mood: "neutral", tags: "" });
      setIsAddingEntry(false);
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
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
                <BookOpen className="h-8 w-8 text-blue-400" />
                Journal History
              </h1>
              <p className="text-white/60 mt-1">
                Track your thoughts, moods, and mental health journey
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsAddingEntry(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search journal entries, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray/5 border border-white/10 rounded-md text-black appearance-none cursor-pointer"
            >
              <option value="all"> All moods</option>
              <option value="happy">Happy</option>
              <option value="excited">Excited</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
              <option value="anxious">Anxious</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{entries.length}</div>
              <div className="text-sm text-white/60">Total Entries</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {entries.filter((e) => e.mood === "happy").length}
              </div>
              <div className="text-sm text-white/60">Happy Days</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {entries.filter((e) => e.mood === "anxious").length}
              </div>
              <div className="text-sm text-white/60">Anxious Days</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {new Set(entries.flatMap((e) => e.tags)).size}
              </div>
              <div className="text-sm text-white/60">Unique Tags</div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Entry Modal */}
        <AnimatePresence>
          {isAddingEntry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setIsAddingEntry(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-white/10 rounded-lg p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">Add New Journal Entry</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <Input
                      placeholder="Entry title..."
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Mood</label>
                    <select
                      value={newEntry.mood}
                      onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value as any })}
                      className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                    >
                      <option value="happy">Happy</option>
                      <option value="excited">Excited</option>
                      <option value="neutral">Neutral</option>
                      <option value="sad">Sad</option>
                      <option value="anxious">Anxious</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <Textarea
                      placeholder="How are you feeling today? What's on your mind?"
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                      className="bg-white/5 border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <Input
                      placeholder="meditation, work, family..."
                      value={newEntry.tags}
                      onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="ghost" onClick={() => setIsAddingEntry(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddEntry}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                  >
                    Add Entry
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journal Entries */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <Card className="bg-white/5 border-white/10 p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-white/40 mb-4" />
              <h3 className="text-lg font-medium text-white/60 mb-2">No entries found</h3>
              <p className="text-white/40">
                {searchTerm || selectedMood !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start your journaling journey by adding your first entry"}
              </p>
            </Card>
          ) : (
            filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getMoodIcon(entry.mood)}
                        <Badge className={getMoodColor(entry.mood)}>
                          {entry.mood}
                        </Badge>
                      </div>
                      <div className="text-sm text-white/60 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        <Clock className="h-4 w-4 ml-2" />
                        {entry.time}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-3">{entry.title}</h3>
                    <p className="text-white/80 mb-4 leading-relaxed">{entry.content}</p>
                    
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="outline"
                            className="border-white/20 text-white/70 text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
