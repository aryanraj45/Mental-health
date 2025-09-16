"use client";

import { useState, useMemo, useEffect, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Line,
  LineChart,
} from "recharts";
import {
  Shield,
  Users,
  AlertTriangle,
  TrendingUp,
  Flag,
  Brain,
  Heart,
  Search,
  Download,
  Eye,
  MessageSquare,
  UserCheck,
  Phone,
  Mail,
  CheckCircle,
  Zap,
  FileText,
  Calendar,
  Bot,
  BookOpen,
  ArrowRight,
  Home,
} from "lucide-react";

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
        "bg-white/[0.03] border border-white/[0.08] backdrop-blur-lg p-6 rounded-xl relative",
        className
      )}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
};

// --- Interfaces, Types, and Mock Data ---
type RiskLevel = "low" | "medium" | "high" | "critical";
interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  course: string;
  year: number;
  avatar: string;
  lastActive: Date;
  mentalHealthScore: number;
  riskLevel: RiskLevel;
  sessionsCompleted: number;
  moodTrend: "improving" | "stable" | "declining";
  emergencyAlerts: number;
  lastAssessment: Date;
  radarData: { subject: string; value: number }[];
  scoreHistory: { month: string; score: number }[];
  activityLog: { time: Date; activity: string; icon: React.ElementType }[];
  adminNotes: string;
}
interface CrisisAlert {
  id: string;
  studentId: string;
  studentName: string;
  message: string;
  timestamp: Date;
  severity: "high" | "critical";
  status: "new" | "reviewing" | "resolved";
  assignedTo?: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    rollNo: "CS2021001",
    course: "Computer Science",
    year: 3,
    avatar: "https://placehold.co/128x128/e2e8f0/64748b?text=AS",
    lastActive: new Date(Date.now() - 2 * 36e5),
    mentalHealthScore: 75,
    riskLevel: "medium",
    sessionsCompleted: 12,
    moodTrend: "improving",
    emergencyAlerts: 0,
    lastAssessment: new Date(Date.now() - 24 * 36e5),
    radarData: [
      { subject: "Academic", value: 80 },
      { subject: "Social", value: 70 },
      { subject: "Emotional", value: 65 },
      { subject: "Coping", value: 75 },
      { subject: "Sleep", value: 85 },
    ],
    scoreHistory: [
      { month: "Jan", score: 60 },
      { month: "Feb", score: 65 },
      { month: "Mar", score: 72 },
      { month: "Apr", score: 75 },
    ],
    activityLog: [
      {
        time: new Date(Date.now() - 2 * 36e5),
        activity: "Completed a session with Dr. Sharma",
        icon: UserCheck,
      },
      {
        time: new Date(Date.now() - 48 * 36e5),
        activity: "Viewed resource: 'Stress Management'",
        icon: BookOpen,
      },
    ],
    adminNotes:
      "Shows consistent improvement after weekly sessions. Responds well to CBT techniques.",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya.patel@college.edu",
    rollNo: "EE2020045",
    course: "Electrical Engineering",
    year: 4,
    avatar: "https://placehold.co/128x128/e2e8f0/64748b?text=PP",
    lastActive: new Date(Date.now() - 5 * 6e4),
    mentalHealthScore: 45,
    riskLevel: "high",
    sessionsCompleted: 8,
    moodTrend: "declining",
    emergencyAlerts: 1,
    lastAssessment: new Date(Date.now() - 3 * 36e5),
    radarData: [
      { subject: "Academic", value: 40 },
      { subject: "Social", value: 55 },
      { subject: "Emotional", value: 30 },
      { subject: "Coping", value: 50 },
      { subject: "Sleep", value: 60 },
    ],
    scoreHistory: [
      { month: "Jan", score: 55 },
      { month: "Feb", score: 50 },
      { month: "Mar", score: 48 },
      { month: "Apr", score: 45 },
    ],
    activityLog: [
      {
        time: new Date(Date.now() - 5 * 6e4),
        activity: "Started AI Chat session",
        icon: Bot,
      },
      {
        time: new Date(Date.now() - 72 * 36e5),
        activity: "Crisis keyword detected in chat",
        icon: AlertTriangle,
      },
    ],
    adminNotes:
      "High academic pressure reported. Declining scores correlate with exam periods. Recommend proactive outreach before mid-terms.",
  },
];
const mockCrisisAlerts: CrisisAlert[] = [
  {
    id: "1",
    studentId: "4",
    studentName: "Ananya Singh",
    message: "Student mentioned thoughts of self-harm during AI chat session.",
    timestamp: new Date(Date.now() - 30 * 6e4),
    severity: "critical",
    status: "new",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Priya Patel",
    message: "Multiple crisis keywords detected in chat messages.",
    timestamp: new Date(Date.now() - 2 * 36e5),
    severity: "high",
    status: "reviewing",
    assignedTo: "Dr. Sharma",
  },
];
const riskDistributionData = [
  { name: "Low Risk", value: 750, fill: "#22c55e" },
  { name: "Medium Risk", value: 342, fill: "#f59e0b" },
  { name: "High Risk", value: 125, fill: "#ef4444" },
  { name: "Critical Risk", value: 30, fill: "#b91c1c" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-white/20 bg-black/50 p-2 text-sm shadow-lg backdrop-blur-lg">
        <p className="font-bold text-white">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`item-${index}`}
            style={{ color: entry.color || entry.stroke || entry.fill }}
          >
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- Main Admin Dashboard Component ---
export default function AdminDashboard() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [crisisAlerts, setCrisisAlerts] =
    useState<CrisisAlert[]>(mockCrisisAlerts);
  const [activeTab, setActiveTab] = useState("overview");

  // Authentication check
  useEffect(() => {
    if (!isLoading && (!isLoggedIn || user?.role !== "admin")) {
      router.push("/login");
    }
  }, [isLoggedIn, user, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render admin content if not authenticated as admin
  if (!isLoggedIn || user?.role !== "admin") {
    return null;
  }

  const riskBadgeColors: Record<RiskLevel, string> = {
    low: "bg-green-500/10 text-green-300 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
    high: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    critical: "bg-red-500/10 text-red-300 border-red-500/20",
  };
  const formatTimeAgo = (date: Date) => {
    const min = Math.floor((new Date().getTime() - date.getTime()) / 6e4);
    if (min < 60) return `${min}m ago`;
    if (min < 1440) return `${Math.floor(min / 60)}h ago`;
    return `${Math.floor(min / 1440)}d ago`;
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0">
        <ElegantShape
          delay={0.3}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] top-[15%]"
          parallaxStrength={60}
        />
        <ElegantShape
          delay={0.5}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] top-[70%]"
          parallaxStrength={40}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      <Header />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white/50 text-lg">
            Oversee, analyze, and act on student wellbeing data.
          </p>
        </motion.div>

        <Tabs defaultValue="overview" onValueChange={setActiveTab}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={1}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/[0.03] border border-white/[0.08] p-1 h-auto rounded-lg mb-8">
              <TabsTrigger
                value="overview"
                className="relative data-[state=active]:text-gray-900 data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300"
              >
                {activeTab === "overview" && (
                  <motion.div
                    layoutId="admin-active-tab"
                    className="absolute inset-0 bg-white rounded-md shadow-lg"
                  />
                )}
                <span className="relative z-10">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="students"
                className="relative data-[state=active]:text-gray-900 data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300"
              >
                {activeTab === "students" && (
                  <motion.div
                    layoutId="admin-active-tab"
                    className="absolute inset-0 bg-white rounded-md shadow-lg"
                  />
                )}
                <span className="relative z-10">Students</span>
              </TabsTrigger>
              <TabsTrigger
                value="crisis"
                className="relative data-[state=active]:text-gray-900 data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300"
              >
                {activeTab === "crisis" && (
                  <motion.div
                    layoutId="admin-active-tab"
                    className="absolute inset-0 bg-white rounded-md shadow-lg"
                  />
                )}
                <span className="relative z-10">Crisis Alerts</span>
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="relative data-[state=active]:text-gray-900 data-[state=active]:font-bold text-white/70 h-10 transition-colors duration-300"
              >
                {activeTab === "reports" && (
                  <motion.div
                    layoutId="admin-active-tab"
                    className="absolute inset-0 bg-white rounded-md shadow-lg"
                  />
                )}
                <span className="relative z-10">Reporting</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <InteractiveGlassCard>
                  <CardTitle className="text-sm font-medium text-white/70">
                    Total Students
                  </CardTitle>
                  <div className="text-4xl font-bold mt-2">1,247</div>
                </InteractiveGlassCard>
              </motion.div>
              <motion.div
                custom={3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <InteractiveGlassCard>
                  <CardTitle className="text-sm font-medium text-white/70">
                    Active This Week
                  </CardTitle>
                  <div className="text-4xl font-bold mt-2">892</div>
                </InteractiveGlassCard>
              </motion.div>
              <motion.div
                custom={4}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <InteractiveGlassCard>
                  <CardTitle className="text-sm font-medium text-white/70">
                    New Crisis Alerts
                  </CardTitle>
                  <div className="text-4xl font-bold mt-2 text-red-400">
                    {mockCrisisAlerts.filter((a) => a.status === "new").length}
                  </div>
                </InteractiveGlassCard>
              </motion.div>
              <motion.div
                custom={5}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <InteractiveGlassCard>
                  <CardTitle className="text-sm font-medium text-white/70">
                    Avg. Health Score
                  </CardTitle>
                  <div className="text-4xl font-bold mt-2">68</div>
                  <Progress
                    value={68}
                    className="mt-2 h-2 bg-white/10 [&>*]:bg-cyan-400"
                  />
                </InteractiveGlassCard>
              </motion.div>
            </div>
            <motion.div
              custom={6}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <InteractiveGlassCard className="!p-8">
                <CardTitle>Risk Distribution</CardTitle>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                      data={riskDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      labelLine={false}
                      isAnimationActive={true}
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                      }) => {
                        const RADIAN = Math.PI / 180;
                        const radius =
                          innerRadius + (outerRadius - innerRadius) * 0.6;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="white"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="font-bold"
                          >{`${(percent * 100).toFixed(0)}%`}</text>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </InteractiveGlassCard>
            </motion.div>
          </TabsContent>

          <TabsContent value="students">
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <InteractiveGlassCard>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-white/10">
                      <TableHead className="text-white">Student</TableHead>
                      <TableHead className="text-white">Risk Level</TableHead>
                      <TableHead className="text-white">Health Score</TableHead>
                      <TableHead className="text-white">Last Active</TableHead>
                      <TableHead className="text-right text-white">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents.map((student) => (
                      <TableRow key={student.id} className="border-b-white/10">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">
                                {student.name}
                              </div>
                              <div className="text-sm text-white/50">
                                {student.rollNo}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "capitalize",
                              riskBadgeColors[student.riskLevel]
                            )}
                          >
                            {student.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold">
                            {student.mentalHealthScore}
                          </span>
                        </TableCell>
                        <TableCell>
                          {formatTimeAgo(student.lastActive)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </InteractiveGlassCard>
            </motion.div>
          </TabsContent>

          <TabsContent value="crisis">
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <InteractiveGlassCard>
                <CardTitle>Crisis Alerts Queue</CardTitle>
                <div className="mt-4 space-y-4">
                  {crisisAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={cn(
                        "p-4 rounded-lg border flex justify-between items-center",
                        alert.severity === "critical"
                          ? "bg-red-500/10 border-red-500/20"
                          : "bg-orange-500/10 border-orange-500/20"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className={cn(
                              alert.severity === "critical"
                                ? "text-red-400"
                                : "text-orange-400"
                            )}
                          />
                          <span className="font-bold">{alert.studentName}</span>
                          <Badge
                            variant={
                              alert.severity === "critical"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/70 mt-1 ml-8">
                          {alert.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/50">
                          {formatTimeAgo(alert.timestamp)}
                        </span>
                        <Button
                          variant="outline"
                          className="bg-transparent text-white/70 border-white/20 hover:bg-white/10 hover:text-white rounded-full"
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </InteractiveGlassCard>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
