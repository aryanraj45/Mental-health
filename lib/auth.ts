import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-for-mental-health-platform";
const JWT_EXPIRES_IN = "24h"; // Token expiry

export type UserRole = "student" | "admin" | "counselor" | "moderator";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  college?: string;
  academicYear?: string;
  department?: string;
}

// --- SESSION FUNCTIONS ---

export async function createSession(user: UserSession) {
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  cookies().set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60, // 24 hours
  });
}

export async function getSession(): Promise<UserSession | null> {
  const token = cookies().get("session")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { user: UserSession };
    return decoded.user;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  cookies().delete("session");
}

// --- AUTHENTICATION ---

export async function authenticateUser(email: string, password: string): Promise<UserSession | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return {
    id: user.id.toString(),
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    role: user.role.toLowerCase() as UserRole,
    college: user.college || undefined,
    academicYear: user.academicYear || undefined,
    department: user.department || undefined,
  };
}
