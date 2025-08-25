import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"
import { generateTokens } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return NextResponse.json(
        {
          message: "Please verify your email address before logging in. Check your inbox for the verification link.",
          requiresVerification: true,
        },
        { status: 403 },
      )
    }

    // Validate password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.role, user.name);

    // Remove sensitive data from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
    }

    return NextResponse.json({
      message: "Login successful",
      user: userResponse,
      accessToken,
      refreshToken,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
