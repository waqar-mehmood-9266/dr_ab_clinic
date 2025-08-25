import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"
import { Booking } from "@/lib/models/booking"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = getTokenFromRequest(request)
    if (!token) {
      console.log("No token provided")
      return NextResponse.json({ message: "Authentication required" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      console.log("Invalid token")
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    console.log("Decoded token:", decoded)

    // Check if user is admin
    const user = await User.findById(decoded.userId)
    if (!user) {
      console.log("User not found:", decoded.userId)
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    console.log("User found:", { id: user._id, role: user.role, name: user.name })

    if (user.role !== "admin") {
      console.log("User is not admin:", user.role)
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    // Fetch all bookings
    const bookings = await Booking.find({}).sort({ createdAt: -1 })

    console.log(`Found ${bookings.length} bookings`)

    return NextResponse.json(bookings)
  } catch (error: any) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
