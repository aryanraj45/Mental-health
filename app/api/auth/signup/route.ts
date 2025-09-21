import { type NextRequest, NextResponse } from "next/server"
import type { User } from "@/lib/auth"

// Mock user storage - replace with real database
const mockUsers: User[] = []

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, role, college, department, academicYear } = await request.json()

    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: `${firstName} ${lastName}`,
      role: role as "student" | "admin",
      ...(role === "student" && { college, department, academicYear }),
    }

    mockUsers.push(newUser)

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
