import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt } from "./lib/auth"

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/admin", "/chat", "/book", "/community"]
const adminRoutes = ["/admin"]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => path.startsWith(route))

  if (isProtectedRoute) {
    const session = request.cookies.get("session")?.value

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

    try {
      const payload = await decrypt(session)
      const user = payload.user

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
      return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
