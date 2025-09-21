import { cookies } from "next/headers"

const secretKey = process.env.JWT_SECRET || "your-secret-key-for-mental-health-platform"

export type UserRole = "student" | "admin" | "counselor" | "moderator"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  college?: string
  academicYear?: string
  department?: string
}

// Simple hash function for browser compatibility
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36)
}

export async function encrypt(payload: any) {
  const data = JSON.stringify(payload)
  const timestamp = Date.now()
  const expires = timestamp + 24 * 60 * 60 * 1000 // 24 hours

  const tokenData = {
    data: btoa(data), // Use browser's btoa instead of Buffer
    expires,
    timestamp,
  }

  const tokenString = JSON.stringify(tokenData)
  const hash = simpleHash(tokenString + secretKey)

  return btoa(JSON.stringify({ ...tokenData, hash }))
}

export async function decrypt(input: string): Promise<any> {
  try {
    // First try the standard decryption
    try {
      const tokenData = JSON.parse(atob(input)) // Use browser's atob instead of Buffer
      const { data, expires, timestamp, hash } = tokenData

      // Check expiration
      if (Date.now() > expires) {
        return null
      }

      // Verify hash
      const expectedHash = simpleHash(JSON.stringify({ data, expires, timestamp }) + secretKey)

      if (hash !== expectedHash) {
        return null
      }

      return JSON.parse(atob(data))
    } catch (error) {
      // If standard decryption fails, try to parse as direct JSON
      // This allows localStorage data to work as a fallback
      return JSON.parse(input)
    }
  } catch (error) {
    console.error("Decryption failed:", error)
    return null
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

export async function createSession(user: User) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  const session = await encrypt({ user, expires })

  cookies().set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  cookies().delete("session")
}

export async function verifyToken(token: string): Promise<any> {
  return await decrypt(token)
}

// Mock user database - replace with real database
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@university.edu",
    name: "Dr. Sarah Admin",
    role: "admin",
  },
  {
    id: "2",
    email: "student@university.edu",
    name: "John Student",
    role: "student",
    college: "Engineering College",
    academicYear: "3rd Year",
    department: "Computer Science",
  },
]

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Mock authentication - replace with real database query
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password123") {
    // Mock password check
    return user
  }
  return null
}
