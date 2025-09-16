import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt } from "./lib/auth"

// Protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/chat",
  "/book",
  "/community",
  "/administrator",
  "/admin-profile",
  "/journal",
];
const adminRoutes = ["/administrator", "/admin-profile"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route))

  // Skip middleware in development for now to make authentication work
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  if (isProtectedRoute) {
    const session = request.cookies.get("session")?.value

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

    try {
      const payload = await decrypt(session)
      const user = payload?.user

      // If no valid user data found, redirect to login
      if (!user) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
      }

      // Check admin access
      if (isAdminRoute && user.role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
      }

      // Add user info to headers for use in components
      const response = NextResponse.next()
      response.headers.set("x-user-role", user.role)
      response.headers.set("x-user-id", user.id)
      return response
    } catch (error) {
      console.error("Authentication error:", error)
      return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
