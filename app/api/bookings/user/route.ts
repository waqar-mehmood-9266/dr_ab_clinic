import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Booking } from "@/lib/models/booking"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"
import { User } from "@/lib/models/user"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // Get user to find their email
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Find bookings by user email (since bookings might not have userId)
    const bookings = await Booking.find({
      $or: [{ userId: decoded.userId }, { email: user.email }],
    }).sort({ createdAt: -1 })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Get user bookings error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
