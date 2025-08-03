import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Booking } from "@/lib/models/booking"
import { User } from "@/lib/models/user"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { status } = await request.json()

    // Validate status
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    // Update booking
    const booking = await Booking.findByIdAndUpdate(params.id, { status }, { new: true })

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Update booking error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
