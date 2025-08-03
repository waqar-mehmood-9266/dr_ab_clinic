import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Booking } from "@/lib/models/booking"
import { User } from "@/lib/models/user"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

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

    // Check if user is admin
    const user = await User.findById(decoded.userId)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    // Get all bookings
    const bookings = await Booking.find({}).sort({ createdAt: -1 })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Get admin bookings error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
