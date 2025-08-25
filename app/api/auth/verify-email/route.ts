import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ message: "Verification token is required" }, { status: 400 })
    }

    // Find user with valid token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    })

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or expired verification token. Please request a new verification email.",
        },
        { status: 400 },
      )
    }

    // Update user as verified
    user.isEmailVerified = true
    user.emailVerificationToken = undefined
    user.emailVerificationExpires = undefined
    await user.save()

    return NextResponse.json({
      message: "Email verified successfully! You can now log in to your account.",
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
