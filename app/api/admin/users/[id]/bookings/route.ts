import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"
import { Booking } from "@/lib/models/booking"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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
    const adminUser = await User.findById(decoded.userId)
    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const { id } = params

    // Find the user
    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    console.log(`Fetching bookings for user: ${user.name} (${user._id})`)

    // Get all bookings for this user (by userId or email)
    const bookings = await Booking.find({
      $or: [{ userId: user._id.toString() }, { email: user.email }],
    }).sort({ createdAt: -1 })

    console.log(`Found ${bookings.length} bookings for user ${user.name}`)

    return NextResponse.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      bookings,
    })
  } catch (error) {
    console.error("Get user bookings error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
