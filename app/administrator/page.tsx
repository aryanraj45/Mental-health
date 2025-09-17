"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Heart,
  Brain,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  Eye,
  Shield,
  Clock,
  Phone,
  Video,
  FileText,
  Activity,
  UserCheck,
  UserX,
  Zap,
  Star,
  Home,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "@/contexts/auth-context";

// Types
interface Student {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  status: "active" | "inactive" | "at-risk";
  sessionsCompleted: number;
  moodScore: number;
  riskLevel: "low" | "medium" | "high";
  avatar?: string;
  currentIssues: string[];
  counselor?: string;
}

interface Session {
  id: string;
  studentName: string;
  counselor: string;
  date: string;
  time: string;
  type: "video" | "phone" | "in-person";
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  duration?: string;
}

interface Alert {
  id: string;
  type: "crisis" | "risk" | "inactive" | "milestone";
  studentName: string;
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  resolved: boolean;
}

// Mock Data
const studentsData: Student[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    joinDate: "2025-08-15",
    lastActive: "2025-09-16",
    status: "active",
    sessionsCompleted: 8,
    moodScore: 7.2,
    riskLevel: "low",
    currentIssues: ["Academic Stress", "Time Management"],
    counselor: "Dr. Priya Sharma",
  },
  {
    id: "2",
    name: "Priya Kumari",
    email: "priya.kumari@college.edu",
    joinDate: "2025-07-20",
    lastActive: "2025-09-15",
    status: "at-risk",
    sessionsCompleted: 12,
    moodScore: 4.1,
    riskLevel: "high",
    currentIssues: ["Depression", "Social Anxiety", "Family Issues"],
    counselor: "Dr. Rajesh Kumar",
  },
  {
    id: "3",
    name: "Arjun Patel",
    email: "arjun.patel@college.edu",
    joinDate: "2025-09-01",
    lastActive: "2025-09-16",
    status: "active",
    sessionsCompleted: 3,
    moodScore: 6.8,
    riskLevel: "medium",
    currentIssues: ["Exam Anxiety"],
    counselor: "Dr. Meera Joshi",
  },
  {
    id: "4",
    name: "Kavya Singh",
    email: "kavya.singh@college.edu",
    joinDate: "2025-06-10",
    lastActive: "2025-09-10",
    status: "inactive",
    sessionsCompleted: 15,
    moodScore: 5.5,
    riskLevel: "medium",
    currentIssues: ["Sleep Issues", "Academic Pressure"],
    counselor: "Dr. Anita Menon",
  },
  {
    id: "5",
    name: "Rohit Verma",
    email: "rohit.verma@college.edu",
    joinDate: "2025-08-25",
    lastActive: "2025-09-16",
    status: "active",
    sessionsCompleted: 5,
    moodScore: 8.1,
    riskLevel: "low",
    currentIssues: ["Social Skills"],
    counselor: "Dr. Sanjay Gupta",
  },
];

const alertsData: Alert[] = [
  {
    id: "1",
    type: "crisis",
    studentName: "Priya Kumari",
    message: "Student expressed suicidal ideation during AI chat session",
    timestamp: "2025-09-16T14:30:00",
    severity: "critical",
    resolved: false,
  },
  {
    id: "2",
    type: "risk",
    studentName: "Kavya Singh",
    message: "Student has been inactive for 6 days, last mood score was concerning",
    timestamp: "2025-09-16T10:15:00",
    severity: "high",
    resolved: false,
  },
  {
    id: "3",
    type: "milestone",
    studentName: "Rohit Verma",
    message: "Student completed 5 sessions and mood score improved by 40%",
    timestamp: "2025-09-16T09:00:00",
    severity: "low",
    resolved: true,
  },
  {
    id: "4",
    type: "inactive",
    studentName: "Arjun Patel",
    message: "Student missed scheduled session yesterday",
    timestamp: "2025-09-15T16:00:00",
    severity: "medium",
    resolved: false,
  },
];

const sessionsData: Session[] = [
  {
    id: "1",
    studentName: "Aarav Sharma",
    counselor: "Dr. Priya Sharma",
    date: "2025-09-17",
    time: "10:00 AM",
    type: "video",
    status: "scheduled",
    duration: "50 minutes",
  },
  {
    id: "2",
    studentName: "Priya Kumari",
    counselor: "Dr. Rajesh Kumar",
    date: "2025-09-16",
    time: "2:00 PM",
    type: "video",
    status: "completed",
    duration: "60 minutes",
    notes: "Emergency session - immediate follow-up scheduled",
  },
  {
    id: "3",
    studentName: "Arjun Patel",
    counselor: "Dr. Meera Joshi",
    date: "2025-09-18",
    time: "11:30 AM",
    type: "in-person",
    status: "scheduled",
    duration: "45 minutes",
  },
];

const dashboardStats = {
  totalStudents: 128,
  activeStudents: 95,
  atRiskStudents: 8,
  totalSessions: 1247,
  avgMoodScore: 6.4,
  criticalAlerts: 2,
};

const moodTrendData = [
  { month: "Apr", score: 5.8 },
  { month: "May", score: 6.1 },
  { month: "Jun", score: 6.0 },
  { month: "Jul", score: 6.3 },
  { month: "Aug", score: 6.5 },
  { month: "Sep", score: 6.4 },
];

const sessionTypeData = [
  { name: "Video", value: 65, color: "#8B5CF6" },
  { name: "Phone", value: 25, color: "#06B6D4" },
  { name: "In-Person", value: 10, color: "#10B981" },
];

const issueDistribution = [
  { issue: "Academic Stress", count: 45 },
  { issue: "Anxiety", count: 38 },
  { issue: "Depression", count: 22 },
  { issue: "Social Issues", count: 18 },
  { issue: "Family Problems", count: 15 },
  { issue: "Sleep Issues", count: 12 },
];

// Background animation component
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

const AdministratorDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const moodChartRef = useRef<HTMLDivElement>(null);
  const sessionChartRef = useRef<HTMLDivElement>(null);
  const issueChartRef = useRef<HTMLDivElement>(null);

  const handleDownloadChart = (chartRef: React.RefObject<HTMLDivElement>, fileName: string) => {
    if (chartRef.current) {
      html2canvas(chartRef.current, {
        backgroundColor: "#030303",
        scale: 2,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "px", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;
        pdf.addImage(imgData, "PNG", 0, (pdfHeight - height) / 2, width, height);
        pdf.save(fileName);
      });
    }
  };

  const handleExportStudents = () => {
    const headers = ["ID", "Name", "Email", "Join Date", "Last Active", "Status", "Sessions Completed", "Mood Score", "Risk Level", "Counselor", "Current Issues"];
    const csvContent = [
      headers.join(','),
      ...studentsData.map(student => [
        student.id,
        `"${student.name}"`,
        student.email,
        student.joinDate,
        student.lastActive,
        student.status,
        student.sessionsCompleted,
        student.moodScore,
        student.riskLevel,
        `"${student.counselor || "N/A"}"`,
        `"${student.currentIssues.join(', ')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'students.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResolveAlert = (alertId: string) => {
    // In a real app, you'd update this on the server
    alert(`Resolving alert ${alertId}`);
  };

  const handleRescheduleSession = (sessionId: string) => {
    alert(`Rescheduling session ${sessionId}`);
  };

  const handleCancelSession = (sessionId: string) => {
    if (confirm("Are you sure you want to cancel this session?")) {
      alert(`Cancelling session ${sessionId}`);
    }
  };

  const handleSendMessage = (studentId: string) => {
    alert(`Sending message to student ${studentId}`);
  };

  const handleScheduleSession = (studentId: string) => {
    alert(`Scheduling session for student ${studentId}`);
  };

  const handleViewRecords = (studentId: string) => {
    alert(`Viewing records for student ${studentId}`);
  };

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/10 text-green-300 border-green-500/20";
      case "inactive": return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
      case "at-risk": return "bg-red-500/10 text-red-300 border-red-500/20";
      default: return "bg-white/10 text-white/70 border-white/20";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-red-400";
      default: return "text-white/60";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/20 border-red-500/30 text-red-300";
      case "high": return "bg-orange-500/20 border-orange-500/30 text-orange-300";
      case "medium": return "bg-yellow-500/20 border-yellow-500/30 text-yellow-300";
      case "low": return "bg-blue-500/20 border-blue-500/30 text-blue-300";
      default: return "bg-white/10 border-white/20 text-white/70";
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
            <Badge className="bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Administrator Dashboard
            </Badge>
            <Button asChild variant="outline" className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full">
              <Link href="/"><Home className="mr-2 h-4 w-4" /> Home</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full">
              <Link href="/admin-profile"><User className="mr-2 h-4 w-4" /> Profile</Link>
            </Button>
            <Button variant="outline" className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Administrator Dashboard
          </h1>
          <p className="text-white/50 text-lg">
            Monitor student wellbeing, manage sessions, and oversee mental health support services.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{dashboardStats.totalStudents}</p>
              <p className="text-white/60 text-sm">Total Students</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{dashboardStats.activeStudents}</p>
              <p className="text-white/60 text-sm">Active</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{dashboardStats.atRiskStudents}</p>
              <p className="text-white/60 text-sm">At Risk</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{dashboardStats.totalSessions}</p>
              <p className="text-white/60 text-sm">Sessions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{dashboardStats.avgMoodScore}</p>
              <p className="text-white/60 text-sm">Avg Mood</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-4 text-center">
              <Bell className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{dashboardStats.criticalAlerts}</p>
              <p className="text-white/60 text-sm">Critical Alerts</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/[0.03] border border-white/[0.08] p-1 h-auto rounded-lg">
            <TabsTrigger value="overview" className="relative data-[state=active]:text-white data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
              <Brain className="h-4 w-4 mr-2" />
              Student Monitoring
            </TabsTrigger>
            <TabsTrigger value="sessions" className="relative data-[state=active]:text-white data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
              <Calendar className="h-4 w-4 mr-2" />
              Session Management
            </TabsTrigger>
            <TabsTrigger value="analytics" className="relative data-[state=active]:text-white data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics & Reports
            </TabsTrigger>
          </TabsList>

          {/* Student Monitoring Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Student List */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Student Overview</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={handleExportStudents}>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                        <Input
                          placeholder="Search students..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        />
                      </div>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900/95 backdrop-blur-xl border-white/20">
                          <SelectItem value="all" className="text-white hover:bg-white/10">All Status</SelectItem>
                          <SelectItem value="active" className="text-white hover:bg-white/10">Active</SelectItem>
                          <SelectItem value="inactive" className="text-white hover:bg-white/10">Inactive</SelectItem>
                          <SelectItem value="at-risk" className="text-white hover:bg-white/10">At Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {filteredStudents.map((student) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-purple-500/20 text-purple-300">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-white">{student.name}</h4>
                              <p className="text-white/60 text-sm">{student.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                            <div className="text-right">
                              <p className="text-white/80 text-sm">Mood: {student.moodScore}/10</p>
                              <p className={`text-sm font-medium ${getRiskColor(student.riskLevel)}`}>
                                {student.riskLevel} risk
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Alerts & Activity */}
              <div className="space-y-4">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      Critical Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {alertsData.filter(alert => !alert.resolved).slice(0, 5).map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h5 className="font-medium text-sm">{alert.studentName}</h5>
                          <Badge variant="outline" className="text-xs capitalize">
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="text-xs opacity-90 mb-2">{alert.message}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs opacity-70">
                            {new Date(alert.timestamp).toLocaleString()}
                          </p>
                          {!alert.resolved && (
                            <Button size="sm" variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10 text-xs h-6 px-2" onClick={() => handleResolveAlert(alert.id)}>
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-400" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 bg-white/5 rounded">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-white/80 text-sm">Aarav completed session</p>
                          <p className="text-white/50 text-xs">5 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-white/5 rounded">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-white/80 text-sm">New student registered</p>
                          <p className="text-white/50 text-xs">1 hour ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-white/5 rounded">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-white/80 text-sm">Crisis alert resolved</p>
                          <p className="text-white/50 text-xs">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Session Management Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Session Management</CardTitle>
                <CardDescription className="text-white/70">
                  Monitor and manage counseling sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessionsData.map((session) => (
                  <div key={session.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                          {session.type === 'video' ? <Video className="h-5 w-5 text-purple-400" /> :
                           session.type === 'phone' ? <Phone className="h-5 w-5 text-blue-400" /> :
                           <Users className="h-5 w-5 text-green-400" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{session.studentName}</h4>
                          <p className="text-white/60 text-sm">with {session.counselor}</p>
                        </div>
                      </div>
                      <Badge className={
                        session.status === 'completed' ? 'bg-green-500/10 text-green-300 border-green-500/20' :
                        session.status === 'scheduled' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' :
                        'bg-red-500/10 text-red-300 border-red-500/20'
                      }>
                        {session.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <div className="flex items-center gap-4">
                        <span>{session.date} at {session.time}</span>
                        <span>{session.duration}</span>
                        <span className="capitalize">{session.type} session</span>
                      </div>
                      {session.status === 'scheduled' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => handleRescheduleSession(session.id)}>
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/10" onClick={() => handleCancelSession(session.id)}>
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                    {session.notes && (
                      <div className="mt-3 p-3 bg-white/5 rounded border border-white/10">
                        <p className="text-white/80 text-sm">{session.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Mood Trend Chart */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl" ref={moodChartRef}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Average Mood Trends</CardTitle>
                  <div className="flex gap-2">
                    {/* <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => handleDownloadChart(moodChartRef, "mood-trends.pdf")}> */}
                      {/* <Download className="h-4 w-4 mr-2" /> */}
                      {/* Download */}
                    {/* </Button> */}
                    <Button size="sm" asChild className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Link href="/resources">View Resources</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300} ref={moodChartRef}>
                    <LineChart data={moodTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Line type="monotone" dataKey="score" stroke="#8B5CF6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Session Type Distribution */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl" ref={sessionChartRef}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Session Types</CardTitle>
                  {/* <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => handleDownloadChart(sessionChartRef, "session-types.pdf")}>
                    {/* <Download className="h-4 w-4 mr-2" />
                    Download */}
                  {/* </Button */}
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300} ref={sessionChartRef}>
                    <PieChart>
                      <Pie
                        data={sessionTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {sessionTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Issue Distribution */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl lg:col-span-2" ref={issueChartRef}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Common Issues Distribution</CardTitle>
                  {/* <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => handleDownloadChart(issueChartRef, "issue-distribution.pdf")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button> */}
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300} ref={issueChartRef}>
                    <BarChart data={issueDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="issue" stroke="rgba(255,255,255,0.6)" />
                      <YAxis stroke="rgba(255,255,255,0.6)" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Bar dataKey="count" fill="#06B6D4" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedStudent.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedStudent(null)}
                  className="text-white/70 hover:text-white"
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Join Date</p>
                    <p className="text-white">{new Date(selectedStudent.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Last Active</p>
                    <p className="text-white">{new Date(selectedStudent.lastActive).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Sessions Completed</p>
                    <p className="text-white">{selectedStudent.sessionsCompleted}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Current Mood Score</p>
                    <p className="text-white">{selectedStudent.moodScore}/10</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Risk Level</p>
                    <p className={getRiskColor(selectedStudent.riskLevel)}>
                      {selectedStudent.riskLevel.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-white/60 text-sm mb-2">Current Issues</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.currentIssues.map((issue, index) => (
                      <Badge key={index} variant="outline" className="border-white/30 text-white/80">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white/60 text-sm mb-2">Assigned Counselor</p>
                  <p className="text-white">{selectedStudent.counselor}</p>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => selectedStudent && handleSendMessage(selectedStudent.id)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => selectedStudent && handleScheduleSession(selectedStudent.id)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Session
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => selectedStudent && handleViewRecords(selectedStudent.id)}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Records
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdministratorDashboard;
