"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'

export function useRoleRedirect() {
  const { isAdmin, isStudent, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect after auth state is loaded
    if (isLoading) return

    const currentPath = window.location.pathname

    // Handle dashboard access
    if (currentPath.startsWith('/dashboard') && !isStudent) {
      // Redirect non-students away from student dashboard
      window.location.href = '/'
    }

    // Handle admin access
    if (currentPath.startsWith('/administrator') || currentPath.startsWith('/admin')) {
      if (!isAdmin) {
        // Redirect non-admins away from admin pages
        window.location.href = '/'
      }
    }
  }, [isAdmin, isStudent, isLoading, router])
}

// Component wrapper for role-based access
export function withRoleProtection(Component: React.ComponentType, adminOnly = false, studentOnly = false) {
  return function ProtectedComponent(props: any) {
    const { isAdmin, isStudent, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (isLoading) return
      
      if (adminOnly && !isAdmin) {
        router.replace('/')
      } else if (studentOnly && !isStudent) {
        router.replace('/')
      }
    }, [isAdmin, isStudent, isLoading, router])

    // Show nothing while checking auth
    if (isLoading) {
      return <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }

    // Show component only to authorized users
    if ((adminOnly && isAdmin) || (studentOnly && isStudent) || (!adminOnly && !studentOnly)) {
      return <Component {...props} />
    }

    return null
  }
}
