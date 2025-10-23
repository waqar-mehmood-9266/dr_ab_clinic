"use client"
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid verification link. Please check your email for the correct link.")
      return
    }

    verifyEmail(token)
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen luxury-gradient flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 luxury-shadow text-center">
          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AB</span>
              </div>
              <span className="font-playfair text-2xl font-bold text-gray-900">Dr.AB Aesthetic & Skin Laser</span>
            </Link>
          </div>

          {/* Status Display */}
          {status === "loading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-gray-900">Verifying Email</h1>
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-gray-900">Email Verified!</h1>
              <p className="text-gray-600">{message}</p>
              <div className="pt-4">
                <Link href="/auth/login">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3">
                    Sign In to Your Account
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h1 className="text-2xl font-playfair font-bold text-gray-900">Verification Failed</h1>
              <p className="text-gray-600">{message}</p>
              <div className="pt-4 space-y-3">
                <Link href="/auth/signup">
                  <Button variant="outline" className="w-full bg-transparent">
                    Create New Account
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">Back to Login</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Need help? Contact us at{" "}
              <a href="mailto:drabaestheticlaserclinic@gmail.com" className="text-amber-600 hover:text-amber-700">
                drabaestheticlaserclinic@gmail.com
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
