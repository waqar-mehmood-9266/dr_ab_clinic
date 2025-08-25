import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    })

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or expired reset token. Please request a new password reset.",
        },
        { status: 400 },
      )
    }

    // Update password
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    return NextResponse.json({
      message: "Password reset successfully! You can now log in with your new password.",
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
