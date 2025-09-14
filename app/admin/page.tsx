"use client"

import { useState, useMemo, FC } from "react"
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
  Area, AreaChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Line, LineChart
} from "recharts"
import { 
  Shield, Users, AlertTriangle, TrendingUp, Flag, Brain, Heart, Search, Download,
  Eye, MessageSquare, UserCheck, Phone, Mail, CheckCircle, Zap, FileText, Calendar, Bot, BookOpen
} from "lucide-react"

// --- Interfaces & Types ---
type RiskLevel = "low" | "medium" | "high" | "critical";
interface Student {
  id: string; name: string; email: string; rollNo: string; course: string; year: number; avatar: string;
  lastActive: Date; mentalHealthScore: number; riskLevel: RiskLevel;
  sessionsCompleted: number; moodTrend: "improving" | "stable" | "declining"; emergencyAlerts: number; lastAssessment: Date;
  radarData: { subject: string; value: number; }[];
  scoreHistory: { month: string; score: number }[];
  activityLog: { time: Date; activity: string; icon: React.ElementType }[];
  adminNotes: string;
}
interface CrisisAlert {
  id: string; studentId: string; studentName: string; message: string; timestamp: Date;
  severity: "high" | "critical"; status: "new" | "reviewing" | "resolved"; assignedTo?: string;
}

// --- Enhanced Mock Data ---
const mockStudents: Student[] = [
  { id: "1", name: "Aarav Sharma", email: "aarav.sharma@college.edu", rollNo: "CS2021001", course: "Computer Science", year: 3, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aarav", lastActive: new Date(Date.now() - 2 * 36e5), mentalHealthScore: 75, riskLevel: "medium", sessionsCompleted: 12, moodTrend: "improving", emergencyAlerts: 0, lastAssessment: new Date(Date.now() - 24 * 36e5), radarData: [{ subject: 'Academic', value: 80 }, { subject: 'Social', value: 70 }, { subject: 'Emotional', value: 65 }, { subject: 'Coping', value: 75 }, { subject: 'Sleep', value: 85 }], scoreHistory: [{ month: 'Jan', score: 60 }, { month: 'Feb', score: 65 }, { month: 'Mar', score: 72 }, { month: 'Apr', score: 75 }], activityLog: [{ time: new Date(Date.now() - 2 * 36e5), activity: "Completed a session with Dr. Sharma", icon: UserCheck }, { time: new Date(Date.now() - 48 * 36e5), activity: "Viewed resource: 'Stress Management'", icon: BookOpen }], adminNotes: "Shows consistent improvement after weekly sessions. Responds well to CBT techniques." },
  { id: "2", name: "Priya Patel", email: "priya.patel@college.edu", rollNo: "EE2020045", course: "Electrical Engineering", year: 4, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Priya", lastActive: new Date(Date.now() - 5 * 6e4), mentalHealthScore: 45, riskLevel: "high", sessionsCompleted: 8, moodTrend: "declining", emergencyAlerts: 1, lastAssessment: new Date(Date.now() - 3 * 36e5), radarData: [{ subject: 'Academic', value: 40 }, { subject: 'Social', value: 55 }, { subject: 'Emotional', value: 30 }, { subject: 'Coping', value: 50 }, { subject: 'Sleep', value: 60 }], scoreHistory: [{ month: 'Jan', score: 55 }, { month: 'Feb', score: 50 }, { month: 'Mar', score: 48 }, { month: 'Apr', score: 45 }], activityLog: [{ time: new Date(Date.now() - 5 * 6e4), activity: "Started AI Chat session", icon: Bot }, { time: new Date(Date.now() - 72 * 36e5), activity: "Crisis keyword detected in chat", icon: AlertTriangle }], adminNotes: "High academic pressure reported. Declining scores correlate with exam periods. Recommend proactive outreach before mid-terms." },
  { id: "3", name: "Rohan Mehra", email: "rohan.mehra@college.edu", rollNo: "CE2022015", course: "Civil Engineering", year: 2, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rohan", lastActive: new Date(Date.now() - 26 * 36e5), mentalHealthScore: 92, riskLevel: "low", sessionsCompleted: 20, moodTrend: "stable", emergencyAlerts: 0, lastAssessment: new Date(Date.now() - 10 * 24 * 36e5), radarData: [{ subject: 'Academic', value: 95 }, { subject: 'Social', value: 88 }, { subject: 'Emotional', value: 90 }, { subject: 'Coping', value: 92 }, { subject: 'Sleep', value: 85 }], scoreHistory: [{ month: 'Jan', score: 80 }, { month: 'Feb', score: 85 }, { month: 'Mar', score: 88 }, { month: 'Apr', score: 92 }], activityLog: [{ time: new Date(Date.now() - 26 * 36e5), activity: "Joined 'Exam Stress' community group", icon: Users }], adminNotes: "Highly engaged student. Utilizes community features effectively. No concerns at present." },
  { id: "4", name: "Ananya Singh", email: "ananya.singh@college.edu", rollNo: "BT2021007", course: "Biotechnology", year: 3, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ananya", lastActive: new Date(Date.now() - 15 * 6e4), mentalHealthScore: 25, riskLevel: "critical", sessionsCompleted: 3, moodTrend: "declining", emergencyAlerts: 3, lastAssessment: new Date(Date.now() - 1 * 36e5), radarData: [{ subject: 'Academic', value: 30 }, { subject: 'Social', value: 25 }, { subject: 'Emotional', value: 15 }, { subject: 'Coping', value: 20 }, { subject: 'Sleep', value: 40 }], scoreHistory: [{ month: 'Jan', score: 40 }, { month: 'Feb', score: 35 }, { month: 'Mar', score: 30 }, { month: 'Apr', score: 25 }], activityLog: [{ time: new Date(Date.now() - 15 * 6e4), activity: "Flagged community post", icon: Flag }, { time: new Date(Date.now() - 25 * 36e5), activity: "Emergency alert triggered", icon: AlertTriangle }], adminNotes: "CRITICAL: Multiple alerts triggered. Assigned to Dr. Sharma for immediate intervention on 14/09/2025. Followed up via WhatsApp." },
  { id: "5", name: "Vikram Reddy", email: "vikram.reddy@college.edu", rollNo: "ME2021050", course: "Mechanical Engineering", year: 3, avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Vikram", lastActive: new Date(Date.now() - 3 * 24 * 36e5), mentalHealthScore: 68, riskLevel: "medium", sessionsCompleted: 5, moodTrend: "stable", emergencyAlerts: 0, lastAssessment: new Date(Date.now() - 5 * 24 * 36e5), radarData: [{ subject: 'Academic', value: 60 }, { subject: 'Social', value: 75 }, { subject: 'Emotional', value: 65 }, { subject: 'Coping', value: 70 }, { subject: 'Sleep', value: 72 }], scoreHistory: [{ month: 'Jan', score: 65 }, { month: 'Feb', score: 68 }, { month: 'Mar', score: 67 }, { month: 'Apr', score: 68 }], activityLog: [{ time: new Date(Date.now() - 3 * 24 * 36e5), activity: "Accessed 'Dealing with Social Anxiety' article", icon: BookOpen }], adminNotes: "Student is making slow but steady progress. Social anxiety seems to be the primary concern." },
];
const mockCrisisAlerts: CrisisAlert[] = [
  { id: "1", studentId: "4", studentName: "Ananya Singh", message: "Student mentioned thoughts of self-harm during AI chat session.", timestamp: new Date(Date.now() - 30 * 6e4), severity: "critical", status: "new" },
  { id: "2", studentId: "2", studentName: "Priya Patel", message: "Multiple crisis keywords detected in chat messages.", timestamp: new Date(Date.now() - 2 * 36e5), severity: "high", status: "reviewing", assignedTo: "Dr. Sharma" },
  { id: "3", studentId: "1", studentName: "Aarav Sharma", message: "User expressed feelings of hopelessness in journal entry.", timestamp: new Date(Date.now() - 5 * 36e5), severity: "high", status: "resolved", assignedTo: "Dr. Kumar" }
];
const moderationQueue = [
    { id: "1", type: "Community Post", content: "I don't think I can handle this anymore...", author: "Anonymous", timestamp: new Date(Date.now() - 15 * 6e4), flagReason: "Concerning content", priority: "high" },
    { id: "2", type: "Chat Message", content: "This platform is useless and no one cares.", author: "Anonymous", timestamp: new Date(Date.now() - 2 * 36e5), flagReason: "Negative Sentiment", priority: "medium" }
];
const mentalHealthTrends = [{ month: "Jan", anxiety: 65, depression: 45 }, { month: "Feb", anxiety: 72, depression: 48 }, { month: "Mar", anxiety: 68, depression: 52 }, { month: "Apr", anxiety: 75, depression: 49 }, { month: "May", anxiety: 71, depression: 46 }, { month: "Jun", anxiety: 69, depression: 44 }];
const riskDistributionData = [{ name: 'Low Risk', value: 750, fill: '#22c55e' }, { name: 'Medium Risk', value: 342, fill: '#f59e0b' }, { name: 'High Risk', value: 125, fill: '#ef4444' }, { name: 'Critical Risk', value: 30, fill: '#b91c1c' }];
const interventionSuccessData = [{ name: 'AI Chat', successRate: 82 }, { name: 'Counseling', successRate: 94 }, { name: 'Peer Support', successRate: 78 }, { name: 'Resources', successRate: 65 }];

// --- Custom Tooltip Component for Charts ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background/90 p-2 text-sm shadow-lg backdrop-blur-sm">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color || entry.stroke }}>
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
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [crisisAlerts, setCrisisAlerts] = useState<CrisisAlert[]>(mockCrisisAlerts);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [adminNote, setAdminNote] = useState("");

  const filteredStudents = useMemo(() => students.filter(student => (student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())) && (riskFilter === "all" || student.riskLevel === riskFilter)), [students, searchQuery, riskFilter]);
  
  const handleAlertStatusChange = (alertId: string, newStatus: "new" | "reviewing" | "resolved") => setCrisisAlerts(p => p.map(a => a.id === alertId ? { ...a, status: newStatus } : a));
  const formatTimeAgo = (date: Date) => { const min = Math.floor((new Date().getTime() - date.getTime()) / 6e4); if (min < 60) return `${min}m ago`; if (min < 1440) return `${Math.floor(min / 60)}h ago`; return `${Math.floor(min / 1440)}d ago`; };
  const getPriorityColor = (p: string) => p === "high" ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
  const riskBadgeColors: Record<RiskLevel, string> = { low: "bg-green-500/10 text-green-400 border-green-500/20", medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", high: "bg-orange-500/10 text-orange-400 border-orange-500/20", critical: "bg-red-500/10 text-red-400 border-red-500/20" };
  const riskColors: Record<RiskLevel, string> = { low: "text-green-500", medium: "text-yellow-500", high: "text-orange-500", critical: "text-red-500" };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setAdminNote(student.adminNotes || "");
  };

  const handleSaveNote = () => {
    if (!selectedStudent) return;
    setStudents(students.map(s => s.id === selectedStudent.id ? { ...s, adminNotes: adminNote } : s));
    alert("Note saved!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2"><Shield className="h-8 w-8 text-primary" /><h1 className="text-2xl font-bold">MindCare Admin</h1></div>
          <Badge variant="secondary">Admin Dashboard</Badge>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4"><TabsTrigger value="overview">Dashboard</TabsTrigger><TabsTrigger value="students">Student Management</TabsTrigger><TabsTrigger value="crisis">Crisis & Moderation</TabsTrigger><TabsTrigger value="reports">Reporting</TabsTrigger></TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Students</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">1247</div></CardContent></Card><Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Active This Week</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">892</div></CardContent></Card><Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">New Crisis Alerts</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-red-500">{mockCrisisAlerts.filter(a => a.status === 'new').length}</div></CardContent></Card><Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Avg. Health Score</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">68</div><Progress value={68} className="mt-2" /></CardContent></Card></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2"><CardHeader><CardTitle>Mental Health Trends</CardTitle></CardHeader>
                <CardContent><ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mentalHealthTrends} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs><linearGradient id="colorAnxiety" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient><linearGradient id="colorDepression" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" /><XAxis dataKey="month" /><YAxis /><Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="anxiety" stroke="#f59e0b" name="Anxiety" fill="url(#colorAnxiety)" isAnimationActive={true} />
                    <Area type="monotone" dataKey="depression" stroke="#ef4444" name="Depression" fill="url(#colorDepression)" isAnimationActive={true} />
                  </AreaChart></ResponsiveContainer>
                </CardContent>
              </Card>
              <Card><CardHeader><CardTitle>Risk Distribution</CardTitle></CardHeader>
                <CardContent><ResponsiveContainer width="100%" height={300}>
                  <PieChart><Pie data={riskDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} isAnimationActive={true} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => { const RADIAN = Math.PI / 180; const radius = innerRadius + (outerRadius - innerRadius) * 0.5; const x = cx + radius * Math.cos(-midAngle * RADIAN); const y = cy + radius * Math.sin(-midAngle * RADIAN); return (<text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">{`${(percent * 100).toFixed(0)}%`}</text>);}}><Tooltip content={<CustomTooltip />} /></Pie></PieChart>
                </ResponsiveContainer></CardContent>
              </Card>
            </div>
             <div className="grid md:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle className="flex items-center gap-2"><Brain className="text-primary" />AI-Powered Insights</CardTitle></CardHeader><CardContent className="space-y-3"><Alert><Heart className="h-4 w-4" /><AlertDescription><strong>Positive Insight:</strong> Students using audio resources show a 15% higher mood score.</AlertDescription></Alert><Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertDescription><strong>High-Priority:</strong> Ananya Singh's risk score has increased by 30% in 24h. Manual review advised.</AlertDescription></Alert><Alert><TrendingUp className="h-4 w-4" /><AlertDescription><strong>Trend Alert:</strong> 25% increase in stress-related keywords from final-year Engineering students.</AlertDescription></Alert></CardContent></Card>
                <Card><CardHeader><CardTitle>Intervention Success Rate</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={interventionSuccessData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" /><XAxis type="number" domain={[0, 100]} /><YAxis type="category" dataKey="name" width={80} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="successRate" name="Success Rate" fill="#8884d8" isAnimationActive={true} /></BarChart></ResponsiveContainer></CardContent></Card>
             </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Search students by name or roll number..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div><Select value={riskFilter} onValueChange={setRiskFilter}><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All Risk</SelectItem><SelectItem value="critical">Critical</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="low">Low</SelectItem></SelectContent></Select></div>
            <Card><Table><TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Risk Level</TableHead><TableHead>Health Score</TableHead><TableHead>Last Active</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader><TableBody>{filteredStudents.map((student) => (<TableRow key={student.id}><TableCell><div className="flex items-center gap-3"><Avatar><AvatarImage src={student.avatar} /><AvatarFallback>{student.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback></Avatar><div><div className="font-medium">{student.name}</div><div className="text-sm text-muted-foreground">{student.rollNo}</div></div></div></TableCell><TableCell><Badge variant="outline" className={riskBadgeColors[student.riskLevel]}>{student.riskLevel}</Badge></TableCell><TableCell><span className={riskColors[student.riskLevel]}>{student.mentalHealthScore}</span></TableCell><TableCell>{formatTimeAgo(student.lastActive)}</TableCell><TableCell className="text-right"><Dialog onOpenChange={(open) => !open && setSelectedStudent(null)}><DialogTrigger asChild><Button variant="ghost" size="icon" onClick={() => handleSelectStudent(student)}><Eye className="h-4 w-4" /></Button></DialogTrigger>
                {selectedStudent && <DialogContent className="max-w-5xl"><DialogHeader><DialogTitle>{selectedStudent.name}'s Profile</DialogTitle><DialogDescription>{selectedStudent.course} - Year {selectedStudent.year} | {selectedStudent.email}</DialogDescription></DialogHeader>
                  <div className="grid md:grid-cols-3 gap-6 mt-4"><div className="md:col-span-2 grid grid-cols-2 gap-6">
                      <Card><CardHeader><CardTitle>Wellbeing Analysis</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><RadarChart data={selectedStudent.radarData}><PolarGrid /><PolarAngleAxis dataKey="subject" /><PolarRadiusAxis angle={30} domain={[0, 100]} /><Radar name={selectedStudent.name} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} isAnimationActive={true} /><Tooltip content={<CustomTooltip />} /></RadarChart></ResponsiveContainer></CardContent></Card>
                      <Card><CardHeader><CardTitle>Score History</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><LineChart data={selectedStudent.scoreHistory}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)"/><XAxis dataKey="month" /><YAxis domain={[0, 100]} /><Tooltip content={<CustomTooltip />} /><Line type="monotone" dataKey="score" name="Score" stroke="#8884d8" isAnimationActive={true} /></LineChart></ResponsiveContainer></CardContent></Card>
                      <Card className="col-span-2"><CardHeader><CardTitle>Admin Notes</CardTitle></CardHeader><CardContent className="space-y-2"><Textarea placeholder="Add a new note..." value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={4} /><Button onClick={handleSaveNote}>Save Note</Button></CardContent></Card>
                    </div>
                    <div><Card><CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader><CardContent className="space-y-4 max-h-[500px] overflow-y-auto">{selectedStudent.activityLog.map((log, i) => (<div key={i} className="flex items-start gap-3"><log.icon className="h-4 w-4 text-muted-foreground mt-1 shrink-0" /><div className="flex-1"><p className="text-sm">{log.activity}</p><p className="text-xs text-muted-foreground">{formatTimeAgo(log.time)}</p></div></div>))}</CardContent></Card></div>
                  </div>
                </DialogContent>}
              </Dialog></TableCell></TableRow>))}</TableBody>
            </Table></Card>
          </TabsContent>

          <TabsContent value="crisis">
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div><h3 className="text-xl font-semibold mb-4">Crisis Alerts Queue</h3><div className="space-y-4">{crisisAlerts.map((alert) => (<Card key={alert.id} className={alert.severity === 'critical' ? 'border-red-500/50' : 'border-orange-500/50'}><CardHeader><div className="flex justify-between items-start"><div className="flex items-center gap-3"><AlertTriangle className={alert.severity === 'critical' ? 'text-red-500' : 'text-orange-500'} /><CardTitle>{alert.studentName}</CardTitle><Badge variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}>{alert.severity}</Badge></div><Badge variant="outline">{alert.status}</Badge></div><CardDescription className="pt-2 pl-8">{alert.message}</CardDescription></CardHeader><CardContent className="flex items-center justify-between"><div className="text-sm text-muted-foreground">{formatTimeAgo(alert.timestamp)}</div><div className="flex gap-2"><Select value={alert.status} onValueChange={(v: "new" | "reviewing" | "resolved") => handleAlertStatusChange(alert.id, v)}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="new">New</SelectItem><SelectItem value="reviewing">Reviewing</SelectItem><SelectItem value="resolved">Resolved</SelectItem></SelectContent></Select><Button variant="outline" size="sm"><MessageSquare className="h-4 w-4" /></Button></div></CardContent></Card>))}</div></div>
              <div><h3 className="text-xl font-semibold mb-4">Content Moderation Queue</h3><div className="space-y-4">{moderationQueue.map((item) => (<Card key={item.id}><CardContent className="p-4"><div className="flex items-center gap-2 mb-2"><Badge variant="outline">{item.type}</Badge><Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge><span className="text-sm text-muted-foreground">{formatTimeAgo(item.timestamp)}</span></div><p className="p-3 bg-muted/50 rounded text-sm">"{item.content}"</p><div className="flex justify-end gap-2 mt-2"><Button size="sm" variant="destructive">Remove</Button><Button size="sm" variant="outline">Approve</Button></div></CardContent></Card>))}</div></div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card><CardHeader><CardTitle>Generate Reports</CardTitle><CardDescription>Select report type and date range to download.</CardDescription></CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 w-full"><label className="text-sm font-medium mb-2 block">Report Type</label><Select><SelectTrigger><SelectValue placeholder="Select report type..." /></SelectTrigger><SelectContent><SelectItem value="analytics">Student Analytics</SelectItem><SelectItem value="crisis">Crisis Response</SelectItem><SelectItem value="engagement">User Engagement</SelectItem></SelectContent></Select></div>
                <div className="flex-1 w-full"><label className="text-sm font-medium mb-2 block">Date Range</label><Select><SelectTrigger><SelectValue placeholder="Select date range..." /></SelectTrigger><SelectContent><SelectItem value="7d">Last 7 Days</SelectItem><SelectItem value="30d">Last 30 Days</SelectItem><SelectItem value="90d">Last 90 Days</SelectItem></SelectContent></Select></div>
                <Button className="w-full sm:w-auto"><Download className="mr-2 h-4 w-4" />Download Report</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
