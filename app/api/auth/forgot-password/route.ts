import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message: "If an account with that email exists, we've sent a password reset link.",
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Save reset token
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = resetExpires
    await user.save()

    // Send reset email
    try {
      await sendPasswordResetEmail(user, resetToken)
    } catch (emailError) {
      console.error("Failed to send password reset email:", emailError)
      return NextResponse.json(
        {
          message: "Failed to send password reset email. Please try again.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      message: "If an account with that email exists, we've sent a password reset link.",
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
