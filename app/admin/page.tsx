"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
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
} from "recharts"
import { 
  Shield, Users, AlertTriangle, TrendingUp, Flag, Brain, Heart, Activity,
  Search, Download, Filter, Calendar, Clock, MessageCircle, Phone,
  FileText, AlertCircle, CheckCircle, Eye, Settings, Mail, Bell,
  BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon,
  UserCheck, UserX, Zap, MessageSquare
} from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  rollNo: string
  course: string
  year: number
  avatar: string
  lastActive: Date
  mentalHealthScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  sessionsCompleted: number
  moodTrend: "improving" | "stable" | "declining"
  emergencyAlerts: number
  lastAssessment: Date
}

interface CrisisAlert {
  id: string
  studentId: string
  studentName: string
  message: string
  timestamp: Date
  severity: "high" | "critical"
  status: "new" | "reviewing" | "resolved"
  assignedTo?: string
}

interface Analytics {
  totalStudents: number
  activeStudents: number
  crisisAlerts: number
  sessionsToday: number
  averageMentalHealthScore: number
  riskDistribution: {
    low: number
    medium: number
    high: number
    critical: number
  }
}

// Mock data
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav.sharma@college.edu",
    rollNo: "CS2021001",
    course: "Computer Science",
    year: 3,
    avatar: "/placeholder-user.jpg",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    mentalHealthScore: 75,
    riskLevel: "medium",
    sessionsCompleted: 12,
    moodTrend: "improving",
    emergencyAlerts: 0,
    lastAssessment: new Date(Date.now() - 24 * 60 * 60 * 1000)
  },
  {
    id: "2", 
    name: "Priya Patel",
    email: "priya.patel@college.edu",
    rollNo: "EE2020045",
    course: "Electrical Engineering",
    year: 4,
    avatar: "/placeholder-user.jpg",
    lastActive: new Date(Date.now() - 5 * 60 * 1000),
    mentalHealthScore: 45,
    riskLevel: "high",
    sessionsCompleted: 8,
    moodTrend: "declining",
    emergencyAlerts: 1,
    lastAssessment: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    id: "3",
    name: "Rahul Kumar",
    email: "rahul.kumar@college.edu", 
    rollNo: "ME2019023",
    course: "Mechanical Engineering",
    year: 5,
    avatar: "/placeholder-user.jpg",
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    mentalHealthScore: 85,
    riskLevel: "low",
    sessionsCompleted: 15,
    moodTrend: "stable",
    emergencyAlerts: 0,
    lastAssessment: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    id: "4",
    name: "Ananya Singh",
    email: "ananya.singh@college.edu",
    rollNo: "BT2021007",
    course: "Biotechnology", 
    year: 3,
    avatar: "/placeholder-user.jpg",
    lastActive: new Date(Date.now() - 15 * 60 * 1000),
    mentalHealthScore: 25,
    riskLevel: "critical",
    sessionsCompleted: 3,
    moodTrend: "declining",
    emergencyAlerts: 3,
    lastAssessment: new Date(Date.now() - 1 * 60 * 60 * 1000)
  }
]

const mockCrisisAlerts: CrisisAlert[] = [
  {
    id: "1",
    studentId: "4",
    studentName: "Ananya Singh",
    message: "Student mentioned thoughts of self-harm during AI chat session",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    severity: "critical",
    status: "new",
  },
  {
    id: "2", 
    studentId: "2",
    studentName: "Priya Patel",
    message: "Multiple crisis keywords detected in chat messages",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    severity: "high",
    status: "reviewing",
    assignedTo: "Dr. Sharma"
  }
]

const weeklyEngagement = [
  { day: "Mon", chatSessions: 45, bookings: 12, resourceViews: 89 },
  { day: "Tue", chatSessions: 52, bookings: 15, resourceViews: 76 },
  { day: "Wed", chatSessions: 38, bookings: 8, resourceViews: 94 },
  { day: "Thu", chatSessions: 61, bookings: 18, resourceViews: 102 },
  { day: "Fri", chatSessions: 73, bookings: 22, resourceViews: 118 },
  { day: "Sat", chatSessions: 29, bookings: 6, resourceViews: 67 },
  { day: "Sun", chatSessions: 34, bookings: 9, resourceViews: 71 },
]

const mentalHealthTrends = [
  { month: "Jan", anxiety: 65, depression: 45, stress: 78 },
  { month: "Feb", anxiety: 72, depression: 48, stress: 82 },
  { month: "Mar", anxiety: 68, depression: 52, stress: 89 },
  { month: "Apr", anxiety: 75, depression: 49, stress: 95 },
  { month: "May", anxiety: 71, depression: 46, stress: 87 },
  { month: "Jun", anxiety: 69, depression: 44, stress: 91 },
]

export default function AdminPanel() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [crisisAlerts, setCrisisAlerts] = useState<CrisisAlert[]>(mockCrisisAlerts)
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState<string>("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [analytics, setAnalytics] = useState<Analytics>({
    totalStudents: 1247,
    activeStudents: 892,
    crisisAlerts: 5,
    sessionsToday: 156,
    averageMentalHealthScore: 68,
    riskDistribution: {
      low: 750,
      medium: 342,
      high: 125,
      critical: 30
    }
  })

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRisk = riskFilter === "all" || student.riskLevel === riskFilter
    return matchesSearch && matchesRisk
  })

  const handleAlertStatusChange = (alertId: string, newStatus: "new" | "reviewing" | "resolved") => {
    setCrisisAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, status: newStatus } : alert
      )
    )
  }

  const sendWhatsAppAlert = (phoneNumber: string, studentName: string) => {
    const message = `URGENT: Crisis alert for student ${studentName}. Immediate intervention required. Please contact the student immediately.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  const downloadReport = (type: "student" | "monthly" | "crisis") => {
    // In a real implementation, this would generate and download actual reports
    const reportData = {
      student: selectedStudent,
      monthly: { analytics, trends: mentalHealthTrends },
      crisis: crisisAlerts
    }
    
    const dataStr = JSON.stringify(reportData[type], null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${type}-report-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const riskColors = {
    low: "text-green-600 bg-green-50 border-green-200",
    medium: "text-yellow-600 bg-yellow-50 border-yellow-200", 
    high: "text-orange-600 bg-orange-50 border-orange-200",
    critical: "text-red-600 bg-red-50 border-red-200"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Mental Health Analytics & Student Management</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => downloadReport("monthly")}>
              <Download className="h-4 w-4 mr-2" />
              Download Monthly Report
            </Button>
            <Badge variant="destructive" className="text-sm">
              {crisisAlerts.filter(a => a.status === 'new').length} New Crisis Alerts
            </Badge>
          </div>
        </div>

        {/* Crisis Alerts Banner */}
        {crisisAlerts.filter(a => a.status === 'new').length > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-900">
              <strong>URGENT:</strong> {crisisAlerts.filter(a => a.status === 'new').length} new crisis alerts require immediate attention.
              <Button 
                variant="link" 
                className="p-0 ml-2 text-red-900 underline"
                onClick={() => document.getElementById('crisis-tab')?.click()}
              >
                Review Now
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Student Analytics</TabsTrigger>
            <TabsTrigger value="crisis" id="crisis-tab">Crisis Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.totalStudents}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.activeStudents}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.round((analytics.activeStudents / analytics.totalStudents) * 100)}% engagement rate
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Crisis Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{analytics.crisisAlerts}</div>
                  <div className="text-xs text-red-600">
                    {crisisAlerts.filter(a => a.status === 'new').length} requiring immediate attention
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Mental Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.averageMentalHealthScore}</div>
                  <Progress value={analytics.averageMentalHealthScore} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyEngagement}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="chatSessions" fill="#3b82f6" />
                      <Bar dataKey="bookings" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mental Health Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mentalHealthTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="anxiety" stroke="#f59e0b" />
                      <Line type="monotone" dataKey="depression" stroke="#ef4444" />
                      <Line type="monotone" dataKey="stress" stroke="#8b5cf6" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="text-2xl font-bold text-green-600">{analytics.riskDistribution.low}</div>
                    <div className="text-sm text-green-600">Low Risk</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{analytics.riskDistribution.medium}</div>
                    <div className="text-sm text-yellow-600">Medium Risk</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-orange-50 border-orange-200">
                    <div className="text-2xl font-bold text-orange-600">{analytics.riskDistribution.high}</div>
                    <div className="text-sm text-orange-600">High Risk</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-red-50 border-red-200">
                    <div className="text-2xl font-bold text-red-600">{analytics.riskDistribution.critical}</div>
                    <div className="text-sm text-red-600">Critical Risk</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Analytics Tab */}
          <TabsContent value="students" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, roll number, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="critical">Critical Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Students Table */}
            <Card>
              <CardHeader>
                <CardTitle>Student Overview ({filteredStudents.length} students)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Mental Health Score</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">{student.rollNo}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.course}</div>
                            <div className="text-sm text-muted-foreground">Year {student.year}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="font-medium">{student.mentalHealthScore}</div>
                            <Progress value={student.mentalHealthScore} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={riskColors[student.riskLevel]}>
                            {student.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {student.lastActive.toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedStudent(student)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Student Details: {student.name}</DialogTitle>
                                  <DialogDescription>
                                    Complete mental health summary and analytics
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Mental Health Score</label>
                                      <div className="flex items-center gap-2 mt-1">
                                        <div className="text-2xl font-bold">{student.mentalHealthScore}</div>
                                        <Progress value={student.mentalHealthScore} className="flex-1" />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Risk Level</label>
                                      <div className="mt-1">
                                        <Badge className={riskColors[student.riskLevel]}>
                                          {student.riskLevel}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-3 border rounded-lg">
                                      <div className="text-xl font-bold">{student.sessionsCompleted}</div>
                                      <div className="text-sm text-muted-foreground">Sessions</div>
                                    </div>
                                    <div className="p-3 border rounded-lg">
                                      <div className="text-xl font-bold">{student.emergencyAlerts}</div>
                                      <div className="text-sm text-muted-foreground">Alerts</div>
                                    </div>
                                    <div className="p-3 border rounded-lg">
                                      <div className="text-xl font-bold capitalize">{student.moodTrend}</div>
                                      <div className="text-sm text-muted-foreground">Trend</div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button onClick={() => downloadReport("student")} className="flex-1">
                                      <Download className="h-4 w-4 mr-2" />
                                      Download Report
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      onClick={() => sendWhatsAppAlert("1234567890", student.name)}
                                      className="flex-1"
                                    >
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      WhatsApp Alert
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            {student.riskLevel === 'critical' || student.riskLevel === 'high' ? (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => sendWhatsAppAlert("1234567890", student.name)}
                              >
                                <AlertTriangle className="h-4 w-4" />
                              </Button>
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crisis Alerts Tab */}
          <TabsContent value="crisis" className="space-y-6">
            <div className="grid gap-4">
              {crisisAlerts.map((alert) => (
                <Card key={alert.id} className={`${alert.severity === 'critical' ? 'border-red-300 bg-red-50' : 'border-orange-300 bg-orange-50'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className={`h-5 w-5 ${alert.severity === 'critical' ? 'text-red-600' : 'text-orange-600'}`} />
                          <CardTitle className="text-lg">{alert.studentName}</CardTitle>
                          <Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline">
                            {alert.status}
                          </Badge>
                        </div>
                        <CardDescription>{alert.message}</CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {alert.timestamp.toLocaleString()}
                          </div>
                          {alert.assignedTo && (
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-4 w-4" />
                              Assigned to: {alert.assignedTo}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Select
                        value={alert.status}
                        onValueChange={(value: "new" | "reviewing" | "resolved") => handleAlertStatusChange(alert.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewing">Reviewing</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        variant="outline"
                        onClick={() => sendWhatsAppAlert("1234567890", alert.studentName)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        WhatsApp Alert
                      </Button>
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Student
                      </Button>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Student Analytics Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive analytics on all students including mental health scores, risk levels, and engagement metrics.
                  </p>
                  <Button onClick={() => downloadReport("monthly")} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Crisis Alerts Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed report on all crisis alerts, response times, and resolution status.
                  </p>
                  <Button onClick={() => downloadReport("crisis")} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5" />
                    Monthly Trends Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Monthly trends in mental health indicators, platform usage, and intervention effectiveness.
                  </p>
                  <Button onClick={() => downloadReport("monthly")} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="ai-insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    <strong>High-Priority Recommendation:</strong> Student Ananya Singh shows critical risk patterns similar to previous intervention cases. Immediate follow-up recommended.
                  </AlertDescription>
                </Alert>
                
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Trend Alert:</strong> Stress levels in Engineering students have increased by 23% over the past month. Consider targeted intervention programs.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Heart className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Positive Insight:</strong> Students who completed 10+ counseling sessions show 85% improvement in mental health scores.
                  </AlertDescription>
                </Alert>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">AI Recommendations for Platform Improvement:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Implement proactive outreach for students with declining mood trends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Add specialized resources for high-stress academic periods</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Develop peer support programs for engineering students</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
