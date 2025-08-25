import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"
import { sendEmailVerification } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return NextResponse.json({ message: "Email is already verified" }, { status: 400 })
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex")
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Update user with new token
    user.emailVerificationToken = emailVerificationToken
    user.emailVerificationExpires = emailVerificationExpires
    await user.save()

    // Send verification email
    try {
      await sendEmailVerification(user, emailVerificationToken)
      return NextResponse.json({
        message: "Verification email sent successfully. Please check your inbox.",
      })
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError)
      return NextResponse.json(
        { message: "Failed to send verification email. Please try again later." },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
