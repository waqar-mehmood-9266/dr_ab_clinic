// "use client"

// import type React from "react"
// import { createContext, useContext, useEffect, useState } from "react"

// interface User {
//   _id: string
//   name: string
//   email: string
//   role: "user" | "admin"
// }

// interface AuthContextType {
//   user: User | null
//   login: (email: string, password: string) => Promise<void>
//   logout: () => void
//   loading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Check for stored user data on mount
//     const storedUser = localStorage.getItem("user")
//     const storedToken = localStorage.getItem("token")

//     if (storedUser && storedToken) {
//       try {
//         setUser(JSON.parse(storedUser))
//       } catch (error) {
//         console.error("Error parsing stored user:", error)
//         localStorage.removeItem("user")
//         localStorage.removeItem("token")
//         localStorage.removeItem("refreshToken")
//       }
//     }

//     setLoading(false)
//   }, [])

//   const login = async (email: string, password: string) => {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })

//     if (!response.ok) {
//       const error = await response.json()
//       throw new Error(error.message || "Login failed")
//     }

//     const data = await response.json()

//     // Store user data and token
//     localStorage.setItem("user", JSON.stringify(data.user))
//     localStorage.setItem("token", data.accessToken)
//     localStorage.setItem("refreshToken", data.refreshToken)

//     setUser(data.user)
//   }

//   const logout = () => {
//     localStorage.removeItem("user")
//     localStorage.removeItem("token")
//     localStorage.removeItem("refreshToken")
//     setUser(null)
//   }

//   return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }









"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  _id: string
  name: string
  email: string
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
      }
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Handle specific verification error
      if (response.status === 403 && data.requiresVerification) {
        throw new Error(
          "Please verify your email address before logging in. Check your inbox for the verification link.",
        )
      }
      throw new Error(data.message || "Login failed")
    }

    // Store user data and token
    localStorage.setItem("user", JSON.stringify(data.user))
    localStorage.setItem("token", data.accessToken)
    localStorage.setItem("refreshToken", data.refreshToken)

    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
