import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

// Force dynamic behavior for this API route
export const dynamic = 'force-dynamic'

// Mock student data - in real app, this would come from database
const mockStudentData = {
  totalStudents: 1247,
  activeStudents: 892,
  studentsAtRisk: 23,
  studentsImproved: 156,
  mentalHealthScores: [
    { studentId: "S001", anxiety: 7, depression: 5, stress: 8, wellbeing: 4, lastAssessment: "2024-01-15" },
    { studentId: "S002", anxiety: 4, depression: 3, stress: 6, wellbeing: 7, lastAssessment: "2024-01-14" },
    { studentId: "S003", anxiety: 9, depression: 8, stress: 9, wellbeing: 2, lastAssessment: "2024-01-15" },
    { studentId: "S004", anxiety: 3, depression: 2, stress: 4, wellbeing: 8, lastAssessment: "2024-01-13" },
    { studentId: "S005", anxiety: 6, depression: 4, stress: 7, wellbeing: 5, lastAssessment: "2024-01-15" },
  ],
  weeklyTrends: [
    { week: "Week 1", avgAnxiety: 5.2, avgDepression: 4.1, avgStress: 6.8, avgWellbeing: 6.2 },
    { week: "Week 2", avgAnxiety: 5.8, avgDepression: 4.3, avgStress: 7.2, avgWellbeing: 5.9 },
    { week: "Week 3", avgAnxiety: 6.1, avgDepression: 4.7, avgStress: 7.5, avgWellbeing: 5.6 },
    { week: "Week 4", avgAnxiety: 5.9, avgDepression: 4.2, avgStress: 7.1, avgWellbeing: 6.1 },
  ],
  riskDistribution: [
    { level: "Low Risk", count: 856, percentage: 68.6 },
    { level: "Moderate Risk", count: 368, percentage: 29.5 },
    { level: "High Risk", count: 23, percentage: 1.9 },
  ],
  interventionOutcomes: [
    { type: "AI Chat Support", successful: 234, total: 267, successRate: 87.6 },
    { type: "Peer Support", successful: 156, total: 178, successRate: 87.6 },
    { type: "Professional Counseling", successful: 89, total: 97, successRate: 91.8 },
    { type: "Crisis Intervention", successful: 19, total: 23, successRate: 82.6 },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = await verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get("timeRange") || "7d"
    const metric = searchParams.get("metric") || "all"

    // Filter data based on parameters (simplified for demo)
    const filteredData = { ...mockStudentData }

    if (metric !== "all") {
      // Filter specific metrics if needed
    }

    return NextResponse.json(filteredData)
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
