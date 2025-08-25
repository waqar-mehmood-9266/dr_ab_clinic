import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"
import { Booking } from "@/lib/models/booking"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"
import { sendBookingConfirmationEmail } from "@/lib/email"

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
    const user = await User.findById(decoded.userId)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    const { id } = params

    // Find the booking
    const booking = await Booking.findById(id)
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("Error fetching booking:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params
    const { status } = await request.json()

    // Validate status
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    // Find the current booking to check previous status
    const currentBooking = await Booking.findById(id)
    if (!currentBooking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    // Update the booking status
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true })

    // ONLY send confirmation email when admin changes status to "confirmed"
    try {
      if (status === "confirmed" && currentBooking.status !== "confirmed") {
        await sendBookingConfirmationEmail(booking)
      }
      // No other emails - keep it simple
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the status update if email fails
    }

    return NextResponse.json({
      message: "Booking status updated successfully",
      booking,
    })
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

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

    const { id } = params
    const { status } = await request.json()

    // Validate status
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    // Find the current booking to check previous status
    const currentBooking = await Booking.findById(id)
    if (!currentBooking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    // Update the booking status
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true })

    // ONLY send confirmation email when admin changes status to "confirmed"
    try {
      if (status === "confirmed" && currentBooking.status !== "confirmed") {
        await sendBookingConfirmationEmail(booking)
      }
      // No other emails - keep it simple
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the status update if email fails
    }

    return NextResponse.json({
      message: "Booking status updated successfully",
      booking,
    })
  } catch (error) {
    console.error("Error updating booking:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
