"use client";

import { useState, useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Shield,
  Users,
  AlertTriangle,
  TrendingUp,
  Flag,
  Brain,
  Heart,
  Activity,
} from "lucide-react";

// Mock data for analytics
const weeklyEngagement = [
  { day: "Mon", chatSessions: 45, bookings: 12, resourceViews: 89 },
  { day: "Tue", chatSessions: 52, bookings: 15, resourceViews: 76 },
  { day: "Wed", chatSessions: 38, bookings: 8, resourceViews: 94 },
  { day: "Thu", chatSessions: 61, bookings: 18, resourceViews: 102 },
  { day: "Fri", chatSessions: 73, bookings: 22, resourceViews: 118 },
  { day: "Sat", chatSessions: 29, bookings: 6, resourceViews: 67 },
  { day: "Sun", chatSessions: 34, bookings: 9, resourceViews: 71 },
];

const mentalHealthTrends = [
  { month: "Jan", anxiety: 65, depression: 45, stress: 78, social: 32 },
  { month: "Feb", anxiety: 72, depression: 48, stress: 82, social: 35 },
  { month: "Mar", anxiety: 68, depression: 52, stress: 89, social: 41 },
  { month: "Apr", anxiety: 75, depression: 49, stress: 95, social: 38 },
  { month: "May", anxiety: 71, depression: 46, stress: 87, social: 42 },
  { month: "Jun", anxiety: 69, depression: 44, stress: 83, social: 39 },
];

const resourceUsage = [
  { name: "Articles", value: 342, color: "#0891b2" },
  { name: "Videos", value: 198, color: "#f97316" },
  { name: "Audio", value: 156, color: "#10b981" },
  { name: "Tools", value: 234, color: "#8b5cf6" },
];

const crisisAlerts = [
  {
    id: "1",
    type: "high-risk",
    message: "User reported suicidal ideation in chat session",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    status: "active",
    userId: "anonymous-user-123",
  },
  {
    id: "2",
    type: "moderate-risk",
    message: "Multiple users reporting increased anxiety in Exam Stress group",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "monitoring",
    userId: "group-exam-stress",
  },
  {
    id: "3",
    type: "resolved",
    message: "User connected with emergency services successfully",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    status: "resolved",
    userId: "anonymous-user-456",
  },
];

const moderationQueue = [
  {
    id: "1",
    type: "community-post",
    content: "I don't think I can handle this anymore...",
    author: "Anonymous User",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    flagReason: "Concerning content",
    priority: "high",
  },
  {
    id: "2",
    type: "chat-message",
    content: "This platform is useless, nothing helps",
    author: "Anonymous User",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    flagReason: "Negative sentiment",
    priority: "medium",
  },
];

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("all");
  type InterventionOutcome = {
    type: string;
    successful: number;
    total: number;
    successRate: number;
  };

  type AnalyticsData = {
    totalStudents?: number;
    activeStudents?: number;
    studentsAtRisk?: number;
    studentsImproved?: number;
    riskDistribution?: Array<{
      level: string;
      count: number;
      percentage: number;
    }>;
    weeklyTrends?: Array<{
      week: string;
      avgAnxiety: number;
      avgDepression: number;
      avgStress: number;
      avgWellbeing: number;
    }>;
    mentalHealthScores?: Array<{
      studentId: string;
      anxiety: number;
      depression: number;
      stress: number;
      wellbeing: number;
      lastAssessment: string;
    }>;
    interventionOutcomes?: InterventionOutcome[];
  };

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          `/api/admin/analytics?timeRange=${timeRange}&metric=${selectedMetric}`
        );
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange, selectedMetric]);

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

  const getAlertColor = (type: string) => {
    switch (type) {
      case "high-risk":
        return "border-red-500 bg-red-50";
      case "moderate-risk":
        return "border-yellow-500 bg-yellow-50";
      case "resolved":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-500 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Sukoon Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary">Admin Dashboard</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Crisis Alerts */}
        {crisisAlerts.filter((alert) => alert.status === "active").length >
          0 && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Active Crisis Alerts:</strong>{" "}
              {crisisAlerts.filter((alert) => alert.status === "active").length}{" "}
              users require immediate attention. Review crisis management queue.
            </AlertDescription>
          </Alert>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analyticsData?.totalStudents || 1247}
              </div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                {analyticsData?.activeStudents || 892} active this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Students at Risk
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {analyticsData?.studentsAtRisk || 23}
              </div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Students Improved
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {analyticsData?.studentsImproved || 156}
              </div>
              <p className="text-xs text-muted-foreground">
                Showing positive progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Wellbeing Score
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.2</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +0.3 from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="student-analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="student-analytics">
              Student Analytics
            </TabsTrigger>
            <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
            <TabsTrigger value="analytics">Platform Analytics</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Management</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Student Analytics Tab */}
          <TabsContent value="student-analytics" className="space-y-6">
            {/* Risk Distribution */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Risk Distribution</CardTitle>
                  <CardDescription>
                    Current mental health risk levels across student population
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData?.riskDistribution || []}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ level, percentage }) =>
                          `${level}: ${percentage}%`
                        }
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Mental Health Trends</CardTitle>
                  <CardDescription>
                    Average scores across all students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData?.weeklyTrends || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="avgAnxiety"
                        stroke="#ef4444"
                        name="Anxiety"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="avgDepression"
                        stroke="#3b82f6"
                        name="Depression"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="avgStress"
                        stroke="#f59e0b"
                        name="Stress"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="avgWellbeing"
                        stroke="#10b981"
                        name="Wellbeing"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Individual Student Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Individual Student Mental Health Scores</CardTitle>
                <CardDescription>
                  Anonymous tracking of student mental health metrics (1-10
                  scale)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={analyticsData?.mentalHealthScores || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="anxiety" name="Anxiety" domain={[0, 10]} />
                    <YAxis
                      dataKey="wellbeing"
                      name="Wellbeing"
                      domain={[0, 10]}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded shadow">
                              <p className="font-medium">
                                Student: {data.studentId}
                              </p>
                              <p>Anxiety: {data.anxiety}/10</p>
                              <p>Depression: {data.depression}/10</p>
                              <p>Stress: {data.stress}/10</p>
                              <p>Wellbeing: {data.wellbeing}/10</p>
                              <p className="text-sm text-gray-500">
                                Last Assessment: {data.lastAssessment}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter dataKey="wellbeing" fill="#0891b2" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Intervention Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle>Intervention Success Rates</CardTitle>
                <CardDescription>
                  Effectiveness of different support interventions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.interventionOutcomes?.map(
                    (intervention, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{intervention.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {intervention.successful}/{intervention.total}{" "}
                            successful interventions
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={intervention.successRate}
                            className="w-24 h-2"
                          />
                          <span className="font-medium text-sm">
                            {intervention.successRate}%
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mental Health Tab */}
          <TabsContent value="mental-health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mental Health Radar Analysis</CardTitle>
                <CardDescription>
                  Comprehensive view of mental health dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart
                    data={[
                      {
                        dimension: "Anxiety Management",
                        current: 6.2,
                        target: 8.0,
                      },
                      {
                        dimension: "Depression Support",
                        current: 7.1,
                        target: 8.5,
                      },
                      {
                        dimension: "Stress Reduction",
                        current: 5.8,
                        target: 7.5,
                      },
                      {
                        dimension: "Social Connection",
                        current: 6.9,
                        target: 8.0,
                      },
                      {
                        dimension: "Academic Support",
                        current: 7.3,
                        target: 8.2,
                      },
                      {
                        dimension: "Crisis Prevention",
                        current: 8.1,
                        target: 9.0,
                      },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="dimension" />
                    <PolarRadiusAxis angle={90} domain={[0, 10]} />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#0891b2"
                      fill="#0891b2"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.1}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    Anxiety Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">High Anxiety</span>
                      <span className="font-medium text-red-600">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Moderate Anxiety</span>
                      <span className="font-medium text-yellow-600">34%</span>
                    </div>
                    <Progress value={34} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Low Anxiety</span>
                      <span className="font-medium text-green-600">48%</span>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Depression Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Severe</span>
                      <span className="font-medium text-red-600">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Moderate</span>
                      <span className="font-medium text-yellow-600">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Mild/None</span>
                      <span className="font-medium text-green-600">69%</span>
                    </div>
                    <Progress value={69} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-500" />
                    Stress Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">High Stress</span>
                      <span className="font-medium text-red-600">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Moderate Stress</span>
                      <span className="font-medium text-yellow-600">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Low Stress</span>
                      <span className="font-medium text-green-600">27%</span>
                    </div>
                    <Progress value={27} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Platform Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Platform Engagement</CardTitle>
                  <CardDescription>
                    User activity across different platform features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyEngagement}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="chatSessions"
                        fill="#0891b2"
                        name="Chat Sessions"
                      />
                      <Bar dataKey="bookings" fill="#f97316" name="Bookings" />
                      <Bar
                        dataKey="resourceViews"
                        fill="#10b981"
                        name="Resource Views"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Resource Usage */}
              <Card>
                <CardHeader>
                  <CardTitle>Resource Usage Distribution</CardTitle>
                  <CardDescription>Most accessed content types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={resourceUsage}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {resourceUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Platform Health Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Overall Rating</span>
                      <span className="font-medium">4.7/5</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Based on 234 user reviews
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. Chat Response</span>
                      <span className="font-medium">2.3s</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Target: &lt;3s response time
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Crisis Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Users connected to help
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Crisis Management Tab */}
          <TabsContent value="crisis" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Crisis Management Queue</h3>
              <Badge variant="destructive">
                {
                  crisisAlerts.filter((alert) => alert.status === "active")
                    .length
                }{" "}
                Active Alerts
              </Badge>
            </div>

            <div className="space-y-4">
              {crisisAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 ${getAlertColor(alert.type)}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              alert.type === "high-risk"
                                ? "destructive"
                                : alert.type === "resolved"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {alert.type.replace("-", " ").toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatTimeAgo(alert.timestamp)}
                          </span>
                        </div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">
                          User ID: {alert.userId}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {alert.status === "active" && (
                          <>
                            <Button size="sm" variant="destructive">
                              Escalate
                            </Button>
                            <Button size="sm" variant="outline">
                              Contact User
                            </Button>
                          </>
                        )}
                        {alert.status === "monitoring" && (
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Content Moderation Queue</h3>
              <Badge variant="outline">
                {moderationQueue.length} Items Pending
              </Badge>
            </div>

            <div className="space-y-4">
              {moderationQueue.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {item.type.replace("-", " ")}
                          </Badge>
                          <Badge className={getPriorityColor(item.priority)}>
                            {item.priority} priority
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatTimeAgo(item.timestamp)}
                          </span>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm">{item.content}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Author: {item.author}</span>
                          <span>Reason: {item.flagReason}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="destructive">
                          Remove
                        </Button>
                        <Button size="sm" variant="outline">
                          Approve
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-3">Generate Report</Button>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive weekly analytics and insights for
                    institutional review.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Crisis Response Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-3">Generate Report</Button>
                  <p className="text-sm text-muted-foreground">
                    Detailed analysis of crisis interventions and outcomes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Usage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-3">Generate Report</Button>
                  <p className="text-sm text-muted-foreground">
                    Platform usage patterns and user engagement metrics.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Mental Health Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-3">Generate Report</Button>
                  <p className="text-sm text-muted-foreground">
                    Anonymous aggregated mental health trend analysis.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Resource Effectiveness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-3">Generate Report</Button>
                  <p className="text-sm text-muted-foreground">
                    Analysis of which resources are most helpful to students.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Custom Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full mb-3 bg-transparent"
                    variant="outline"
                  >
                    Configure
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Create custom reports with specific metrics and timeframes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
