import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"
import { sendEmailVerification } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 })
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex")
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create new user
    const user = new User({
      name,
      email,
      password,
      isEmailVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    })

    await user.save()

    // Send verification email
    try {
      await sendEmailVerification(user, emailVerificationToken)
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError)
      // Don't fail the signup if email fails
    }

    // Remove sensitive data from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    }

    return NextResponse.json(
      {
        message: "User created successfully. Please check your email to verify your account.",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
