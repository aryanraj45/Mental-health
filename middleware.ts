import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This file is kept for reference but all authentication checks are disabled
// The app now relies on client-side role checking for simplicity

export async function middleware(request: NextRequest) {
  // Always allow access to all routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
