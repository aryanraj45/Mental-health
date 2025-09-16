"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/header";
import {
  Target,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  Calendar,
  Trophy,
  TrendingUp,
  ArrowLeft,
  Clock,
  Star,
  Flag,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: "wellness" | "habits" | "therapy" | "mindfulness" | "social" | "personal";
  priority: "low" | "medium" | "high";
  targetDate: string;
  createdDate: string;
  progress: number; // 0-100
  status: "active" | "completed" | "paused";
  milestones: {
    id: string;
    title: string;
    completed: boolean;
    date?: string;
  }[];
}

// Sample goals
const sampleGoals: Goal[] = [
  {
    id: "1",
    title: "Daily Meditation Practice",
    description: "Establish a consistent 10-minute daily meditation routine to improve focus and reduce stress.",
    category: "mindfulness",
    priority: "high",
    targetDate: "2025-12-31",
    createdDate: "2025-09-01",
    progress: 65,
    status: "active",
    milestones: [
      { id: "1a", title: "Meditate for 3 consecutive days", completed: true, date: "2025-09-04" },
      { id: "1b", title: "Complete first week", completed: true, date: "2025-09-08" },
      { id: "1c", title: "Reach 1 month milestone", completed: false },
      { id: "1d", title: "Complete 3 months consistently", completed: false },
    ],
  },
  {
    id: "2",
    title: "Improve Sleep Schedule",
    description: "Maintain a consistent bedtime routine and get 7-8 hours of quality sleep nightly.",
    category: "wellness",
    priority: "high",
    targetDate: "2025-11-30",
    createdDate: "2025-08-15",
    progress: 45,
    status: "active",
    milestones: [
      { id: "2a", title: "Set fixed bedtime and wake time", completed: true, date: "2025-08-20" },
      { id: "2b", title: "Follow routine for 1 week", completed: true, date: "2025-08-27" },
      { id: "2c", title: "Maintain schedule for 1 month", completed: false },
      { id: "2d", title: "Achieve consistent 7+ hours", completed: false },
    ],
  },
  {
    id: "3",
    title: "Attend Weekly Therapy Sessions",
    description: "Commit to regular therapy sessions to work through anxiety and develop coping strategies.",
    category: "therapy",
    priority: "high",
    targetDate: "2026-03-01",
    createdDate: "2025-07-01",
    progress: 80,
    status: "active",
    milestones: [
      { id: "3a", title: "Complete initial assessment", completed: true, date: "2025-07-08" },
      { id: "3b", title: "Attend 4 consecutive sessions", completed: true, date: "2025-08-01" },
      { id: "3c", title: "Complete 8 sessions", completed: true, date: "2025-09-01" },
      { id: "3d", title: "Reach 6-month milestone", completed: false },
    ],
  },
  {
    id: "4",
    title: "Build Social Connections",
    description: "Make an effort to connect with friends and family regularly to combat isolation.",
    category: "social",
    priority: "medium",
    targetDate: "2025-12-31",
    createdDate: "2025-08-01",
    progress: 30,
    status: "active",
    milestones: [
      { id: "4a", title: "Reach out to 3 old friends", completed: true, date: "2025-08-10" },
      { id: "4b", title: "Plan monthly social activity", completed: false },
      { id: "4c", title: "Join a community group", completed: false },
      { id: "4d", title: "Host a gathering", completed: false },
    ],
  },
  {
    id: "5",
    title: "Complete Mindfulness Course",
    description: "Finish the 8-week mindfulness-based stress reduction course to learn advanced techniques.",
    category: "mindfulness",
    priority: "medium",
    targetDate: "2025-11-15",
    createdDate: "2025-09-01",
    progress: 100,
    status: "completed",
    milestones: [
      { id: "5a", title: "Complete Week 1-2", completed: true, date: "2025-09-14" },
      { id: "5b", title: "Complete Week 3-4", completed: true, date: "2025-09-28" },
      { id: "5c", title: "Complete Week 5-6", completed: true, date: "2025-10-12" },
      { id: "5d", title: "Graduate from course", completed: true, date: "2025-10-26" },
    ],
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "wellness":
      return "bg-green-500/10 text-green-300 border-green-500/20";
    case "habits":
      return "bg-blue-500/10 text-blue-300 border-blue-500/20";
    case "therapy":
      return "bg-purple-500/10 text-purple-300 border-purple-500/20";
    case "mindfulness":
      return "bg-indigo-500/10 text-indigo-300 border-indigo-500/20";
    case "social":
      return "bg-pink-500/10 text-pink-300 border-pink-500/20";
    case "personal":
      return "bg-orange-500/10 text-orange-300 border-orange-500/20";
    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500/10 text-red-300 border-red-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
    case "low":
      return "bg-green-500/10 text-green-300 border-green-500/20";
    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-blue-500/10 text-blue-300 border-blue-500/20";
    case "completed":
      return "bg-green-500/10 text-green-300 border-green-500/20";
    case "paused":
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/20";
  }
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "paused">("all");
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "wellness" as const,
    priority: "medium" as const,
    targetDate: "",
  });

  const filteredGoals = goals.filter((goal) => {
    if (filter === "all") return true;
    return goal.status === filter;
  });

  const handleAddGoal = () => {
    if (newGoal.title.trim() && newGoal.description.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        priority: newGoal.priority,
        targetDate: newGoal.targetDate,
        createdDate: new Date().toISOString().split("T")[0],
        progress: 0,
        status: "active",
        milestones: [],
      };
      
      setGoals([goal, ...goals]);
      setNewGoal({ title: "", description: "", category: "wellness", priority: "medium", targetDate: "" });
      setIsAddingGoal(false);
    }
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map((goal) => {
      if (goal.id === goalId) {
        const status = newProgress === 100 ? "completed" : "active";
        return { ...goal, progress: newProgress, status };
      }
      return goal;
    }));
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map((goal) => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map((milestone) => {
          if (milestone.id === milestoneId) {
            return {
              ...milestone,
              completed: !milestone.completed,
              date: !milestone.completed ? new Date().toISOString().split("T")[0] : undefined,
            };
          }
          return milestone;
        });
        
        // Calculate new progress based on completed milestones
        const completedCount = updatedMilestones.filter((m) => m.completed).length;
        const totalCount = updatedMilestones.length;
        const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : goal.progress;
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress,
          status: newProgress === 100 ? "completed" : "active",
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
  };

  const stats = {
    total: goals.length,
    active: goals.filter((g) => g.status === "active").length,
    completed: goals.filter((g) => g.status === "completed").length,
    avgProgress: Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length),
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
                <Target className="h-8 w-8 text-blue-400" />
                My Goals
              </h1>
              <p className="text-white/60 mt-1">
                Track your mental health and wellness goals
              </p>
            </div>
          </div>
          
          <Button
            onClick={() => setIsAddingGoal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
              <div className="text-sm text-white/60">Total Goals</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-sm text-white/60">Completed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.active}</div>
              <div className="text-sm text-white/60">Active</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.avgProgress}%</div>
              <div className="text-sm text-white/60">Avg Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            onClick={() => setFilter("all")}
            size="sm"
          >
            All Goals
          </Button>
          <Button
            variant={filter === "active" ? "default" : "ghost"}
            onClick={() => setFilter("active")}
            size="sm"
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "ghost"}
            onClick={() => setFilter("completed")}
            size="sm"
          >
            Completed
          </Button>
          <Button
            variant={filter === "paused" ? "default" : "ghost"}
            onClick={() => setFilter("paused")}
            size="sm"
          >
            Paused
          </Button>
        </div>

        {/* Add New Goal Modal */}
        <AnimatePresence>
          {isAddingGoal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setIsAddingGoal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 border border-white/10 rounded-lg p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">Add New Goal</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Goal Title</label>
                    <Input
                      placeholder="Enter your goal..."
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      placeholder="Describe your goal in detail..."
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      className="bg-white/5 border-white/10 text-white min-h-[80px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={newGoal.category}
                        onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                        className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                      >
                        <option value="wellness">Wellness</option>
                        <option value="habits">Habits</option>
                        <option value="therapy">Therapy</option>
                        <option value="mindfulness">Mindfulness</option>
                        <option value="social">Social</option>
                        <option value="personal">Personal</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <select
                        value={newGoal.priority}
                        onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as any })}
                        className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Date</label>
                    <Input
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="ghost" onClick={() => setIsAddingGoal(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddGoal}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!newGoal.title.trim() || !newGoal.description.trim()}
                  >
                    Add Goal
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goals List */}
        <div className="space-y-6">
          {filteredGoals.length === 0 ? (
            <Card className="bg-white/5 border-white/10 p-8 text-center">
              <Target className="h-12 w-12 mx-auto text-white/40 mb-4" />
              <h3 className="text-lg font-medium text-white/60 mb-2">No goals found</h3>
              <p className="text-white/40">
                {filter !== "all"
                  ? `No ${filter} goals to display`
                  : "Start your journey by setting your first goal"}
              </p>
            </Card>
          ) : (
            filteredGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{goal.title}</h3>
                        {goal.status === "completed" && (
                          <Trophy className="h-5 w-5 text-yellow-400" />
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={getCategoryColor(goal.category)}>
                          {goal.category}
                        </Badge>
                        <Badge className={getPriorityColor(goal.priority)}>
                          <Flag className="h-3 w-3 mr-1" />
                          {goal.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(goal.status)}>
                          {goal.status}
                        </Badge>
                      </div>
                      
                      <p className="text-white/70 mb-4">{goal.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Target: {new Date(goal.targetDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Created: {new Date(goal.createdDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-white/60">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                    
                    {/* Milestones */}
                    {goal.milestones.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Milestones
                        </h4>
                        <div className="space-y-2">
                          {goal.milestones.map((milestone) => (
                            <div
                              key={milestone.id}
                              className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                              onClick={() => toggleMilestone(goal.id, milestone.id)}
                            >
                              {milestone.completed ? (
                                <CheckCircle className="h-4 w-4 text-green-400" />
                              ) : (
                                <Circle className="h-4 w-4 text-white/40" />
                              )}
                              <span className={milestone.completed ? "line-through text-white/60" : ""}>
                                {milestone.title}
                              </span>
                              {milestone.date && (
                                <span className="text-xs text-white/40 ml-auto">
                                  {new Date(milestone.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
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
