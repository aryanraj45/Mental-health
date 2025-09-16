"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin'
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (userData: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (from localStorage or session)
    const checkAuthStatus = () => {
      try {
        // Only run on client side
        if (typeof window !== 'undefined') {
          const savedUser = localStorage.getItem('user')
          if (savedUser) {
            setUser(JSON.parse(savedUser))
          }
          
          // Check if we're in development environment and need to set up mock auth
          if (process.env.NODE_ENV === 'development' && !savedUser) {
            import('@/lib/dev-auth').then(({ setupDevAuth }) => {
              setupDevAuth()
              // Try again after setup
              const devUser = localStorage.getItem('user')
              if (devUser) {
                setUser(JSON.parse(devUser))
              }
            })
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    // Redirect to home page after logout
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
