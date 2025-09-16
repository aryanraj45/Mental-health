"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  Shield,
  Settings,
  Bell,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Users,
  Activity,
  Heart,
  Brain,
  Star,
  BookOpen,
  Target,
  Zap,
  Home,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  FileText,
  Download,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Background animation component
function ElegantShape({
  className,
  delay = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  gradient?: string;
}) {
  const width = Math.random() * 400 + 200;
  const height = Math.random() * 100 + 50;
  const rotate = Math.random() * 360;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: rotate - 15 }}
      animate={{ opacity: 1, scale: 1, rotate: rotate }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute", className)}
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

// Types
interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  bio: string;
  expertise: string[];
  certifications: string[];
  avatar?: string;
}

interface AdminStats {
  studentsManaged: number;
  sessionsOverseen: number;
  criticalAlertsResolved: number;
  avgResponseTime: string;
  systemUptime: number;
  reportsGenerated: number;
}

interface RecentActivity {
  id: string;
  type: "alert" | "session" | "report" | "system";
  description: string;
  timestamp: string;
  severity?: "low" | "medium" | "high" | "critical";
}

// Mock Data
const adminProfile: AdminProfile = {
  id: "admin_001",
  name: "Dr. Sameer Khan",
  email: "sameer.khan@mindcare.edu",
  phone: "+91 98765 43210",
  role: "Senior Administrator",
  department: "Mental Health Services",
  joinDate: "2023-01-15",
  lastLogin: "2025-09-16T14:30:00",
  bio: "Experienced mental health administrator with over 8 years in student counseling services. Specialized in crisis intervention and institutional mental health program development.",
  expertise: [
    "Crisis Intervention",
    "Student Counseling",
    "Program Development",
    "Data Analytics",
    "Team Management",
    "Mental Health Policy"
  ],
  certifications: [
    "Licensed Clinical Social Worker (LCSW)",
    "Crisis Intervention Certification",
    "Mental Health First Aid Instructor",
    "Trauma-Informed Care Specialist"
  ]
};

const adminStats: AdminStats = {
  studentsManaged: 128,
  sessionsOverseen: 1247,
  criticalAlertsResolved: 89,
  avgResponseTime: "4.2 min",
  systemUptime: 99.7,
  reportsGenerated: 156
};

const recentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "alert",
    description: "Resolved critical alert for student Priya Kumari",
    timestamp: "2025-09-16T14:15:00",
    severity: "critical"
  },
  {
    id: "2",
    type: "session",
    description: "Reviewed emergency session documentation",
    timestamp: "2025-09-16T13:45:00",
    severity: "high"
  },
  {
    id: "3",
    type: "report",
    description: "Generated monthly wellness report",
    timestamp: "2025-09-16T11:30:00",
    severity: "low"
  },
  {
    id: "4",
    type: "system",
    description: "Updated system security protocols",
    timestamp: "2025-09-16T09:15:00",
    severity: "medium"
  },
  {
    id: "5",
    type: "alert",
    description: "Investigated student inactivity patterns",
    timestamp: "2025-09-15T16:20:00",
    severity: "medium"
  }
];

const performanceData = [
  { month: "Apr", alertsResolved: 12, responseTime: 5.2 },
  { month: "May", alertsResolved: 18, responseTime: 4.8 },
  { month: "Jun", alertsResolved: 15, responseTime: 4.5 },
  { month: "Jul", alertsResolved: 22, responseTime: 4.1 },
  { month: "Aug", alertsResolved: 19, responseTime: 4.3 },
  { month: "Sep", alertsResolved: 16, responseTime: 4.2 }
];

const skillsData = [
  { skill: "Crisis Management", level: 95 },
  { skill: "Data Analysis", level: 88 },
  { skill: "Team Leadership", level: 92 },
  { skill: "Student Relations", level: 90 },
  { skill: "System Administration", level: 85 },
  { skill: "Report Generation", level: 87 }
];

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(adminProfile);

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(adminProfile);
    setIsEditing(false);
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "critical": return "text-red-400";
      case "high": return "text-orange-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-blue-400";
      default: return "text-white/60";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="h-4 w-4" />;
      case "session": return <MessageSquare className="h-4 w-4" />;
      case "report": return <FileText className="h-4 w-4" />;
      case "system": return <Settings className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <ElegantShape delay={0.3} gradient="from-purple-500/[0.15]" className="left-[-10%] top-[15%]" />
        <ElegantShape delay={0.5} gradient="from-blue-500/[0.15]" className="right-[-5%] top-[70%]" />
        <ElegantShape delay={0.4} gradient="from-indigo-500/[0.15]" className="left-[5%] bottom-[5%]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logoo.png"
              alt="MindCare Logo"
              width={150}
              height={200}
            />
          </Link>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/10 text-green-300 border border-green-500/20">
              Administrator Profile
            </Badge>
            <Button asChild variant="outline" className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full">
              <Link href="/"><Home className="mr-2 h-4 w-4" /> Home</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full">
              <Link href="/administrator"><Shield className="mr-2 h-4 w-4" /> Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-purple-500/20 text-purple-300 text-2xl">
                        {adminProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{adminProfile.name}</h1>
                    <p className="text-purple-300 text-lg font-medium mb-1">{adminProfile.role}</p>
                    <p className="text-white/60">{adminProfile.department}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-white/70">
                      <span>Joined: {new Date(adminProfile.joinDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Last login: {new Date(adminProfile.lastLogin).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{adminStats.studentsManaged}</p>
                  <p className="text-white/60 text-sm">Students</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <Calendar className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{adminStats.sessionsOverseen}</p>
                  <p className="text-white/60 text-sm">Sessions</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <AlertTriangle className="h-6 w-6 text-red-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{adminStats.criticalAlertsResolved}</p>
                  <p className="text-white/60 text-sm">Alerts</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <Clock className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{adminStats.avgResponseTime}</p>
                  <p className="text-white/60 text-sm">Avg Response</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <Activity className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{adminStats.systemUptime}%</p>
                  <p className="text-white/60 text-sm">Uptime</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <FileText className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{adminStats.reportsGenerated}</p>
                  <p className="text-white/60 text-sm">Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/[0.03] border border-white/[0.08] p-1 h-auto rounded-lg">
            <TabsTrigger value="overview" className="relative data-[state=active]:text-white data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
              <User className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="performance" className="relative data-[state=active]:text-white data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
              <TrendingUp className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="settings" className="relative data-[state=active]:text-white data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Full Name</label>
                        {isEditing ? (
                          <Input
                            value={editedProfile.name}
                            onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        ) : (
                          <p className="text-white">{adminProfile.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Email</label>
                        {isEditing ? (
                          <Input
                            value={editedProfile.email}
                            onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        ) : (
                          <p className="text-white">{adminProfile.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Phone</label>
                        {isEditing ? (
                          <Input
                            value={editedProfile.phone}
                            onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        ) : (
                          <p className="text-white">{adminProfile.phone}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-white/70 text-sm mb-2 block">Department</label>
                        {isEditing ? (
                          <Input
                            value={editedProfile.department}
                            onChange={(e) => setEditedProfile({...editedProfile, department: e.target.value})}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        ) : (
                          <p className="text-white">{adminProfile.department}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm mb-2 block">Bio</label>
                      {isEditing ? (
                        <Textarea
                          value={editedProfile.bio}
                          onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                          className="bg-white/10 border-white/20 text-white"
                          rows={4}
                        />
                      ) : (
                        <p className="text-white/80">{adminProfile.bio}</p>
                      )}
                    </div>
                    {isEditing && (
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button onClick={handleCancel} variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Expertise & Certifications */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Expertise & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-white/80 font-medium mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {adminProfile.expertise.map((skill, index) => (
                          <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white/80 font-medium mb-3">Certifications</h4>
                      <div className="space-y-2">
                        {adminProfile.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                            <span className="text-white/80">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentActivities.slice(0, 8).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <div className={`p-2 rounded-full bg-white/10 ${getSeverityColor(activity.severity)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white/80 text-sm">{activity.description}</p>
                          <p className="text-white/50 text-xs mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Skills Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skillsData.map((skill) => (
                      <div key={skill.skill}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/80">{skill.skill}</span>
                          <span className="text-white/60">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Chart */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Monthly Performance</CardTitle>
                  <CardDescription className="text-white/70">
                    Alerts resolved and response time trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                      <YAxis yAxisId="left" stroke="rgba(255,255,255,0.6)" />
                      <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.6)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Bar yAxisId="left" dataKey="alertsResolved" fill="#8B5CF6" />
                      <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#06B6D4" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">96%</p>
                      <p className="text-white/60 text-sm">Alert Resolution Rate</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-white">4.8</p>
                      <p className="text-white/60 text-sm">Performance Score</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Crisis Response</span>
                        <span className="text-white/60">Excellent</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Data Analysis</span>
                        <span className="text-white/60">Very Good</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">Team Collaboration</span>
                        <span className="text-white/60">Excellent</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/80">System Management</span>
                        <span className="text-white/60">Good</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Account Settings */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Two-Factor Authentication</p>
                      <p className="text-white/60 text-sm">Enhanced security for your account</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-500/30 text-green-300 hover:bg-green-500/10">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-white/60 text-sm">Receive alerts and updates</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Privacy Settings</p>
                      <p className="text-white/60 text-sm">Manage data visibility</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Session Timeout</p>
                      <p className="text-white/60 text-sm">Auto-logout after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-24 bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                        <SelectItem value="15" className="text-white hover:bg-white/10">15m</SelectItem>
                        <SelectItem value="30" className="text-white hover:bg-white/10">30m</SelectItem>
                        <SelectItem value="60" className="text-white hover:bg-white/10">1h</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">Critical Alerts</span>
                      <Button variant="outline" size="sm" className="border-red-500/30 text-red-300 hover:bg-red-500/10">
                        Instant
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">Student Updates</span>
                      <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10">
                        Daily
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">System Maintenance</span>
                      <Button variant="outline" size="sm" className="border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/10">
                        Weekly
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white">Performance Reports</span>
                      <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
                        Monthly
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Management */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 h-20 flex-col">
                      <Download className="h-6 w-6 mb-2" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10 h-20 flex-col">
                      <Shield className="h-6 w-6 mb-2" />
                      Backup Settings
                    </Button>
                    <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 h-20 flex-col">
                      <Activity className="h-6 w-6 mb-2" />
                      System Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminProfile;
