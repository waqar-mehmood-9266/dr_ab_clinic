import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { User } from "@/lib/models/user"
import { Booking } from "@/lib/models/booking"
import { getTokenFromRequest, verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params
    const { feedback, treatmentNotes, followUpRequired, followUpDate } = await request.json()

    console.log("Received feedback data:", { feedback, treatmentNotes, followUpRequired, followUpDate })

    // Find the booking
    const booking = await Booking.findById(id)
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    console.log("Found booking:", booking._id)

    // Create feedback object
    const feedbackData = {
      feedback: feedback || "",
      treatmentNotes: treatmentNotes || "",
      followUpRequired: followUpRequired || false,
      followUpDate: followUpDate ? new Date(followUpDate) : null,
      doctorName: user.name,
      feedbackDate: new Date(),
    }

    console.log("Creating feedback data:", feedbackData)

    // Add doctor feedback
    booking.doctorFeedback = feedbackData

    // Save the booking
    const savedBooking = await booking.save()

    console.log("Saved booking with feedback:", savedBooking.doctorFeedback)

    return NextResponse.json({
      message: "Feedback added successfully",
      booking: savedBooking,
    })
  } catch (error: any) {
    console.error("Add feedback error:", error)
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params
    const { feedback, treatmentNotes, followUpRequired, followUpDate } = await request.json()

    // Find the booking
    const booking = await Booking.findById(id)
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    // Update feedback object
    const feedbackData = {
      feedback: feedback || "",
      treatmentNotes: treatmentNotes || "",
      followUpRequired: followUpRequired || false,
      followUpDate: followUpDate ? new Date(followUpDate) : null,
      doctorName: user.name,
      feedbackDate: new Date(),
    }

    // Update doctor feedback
    booking.doctorFeedback = feedbackData

    // Save the booking
    const savedBooking = await booking.save()

    return NextResponse.json({
      message: "Feedback updated successfully",
      booking: savedBooking,
    })
  } catch (error: any) {
    console.error("Update feedback error:", error)
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params

    console.log("Attempting to delete feedback for booking:", id)

    // Find the booking
    const booking = await Booking.findById(id)
    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 })
    }

    // Check if feedback exists
    if (!booking.doctorFeedback) {
      return NextResponse.json({ message: "No feedback found to delete" }, { status: 404 })
    }

    console.log("Found existing feedback:", booking.doctorFeedback)

    // Remove doctor feedback by setting it to null
    booking.doctorFeedback = null

    // Save the booking
    const savedBooking = await booking.save()

    console.log("Feedback deleted successfully for booking:", savedBooking._id)

    return NextResponse.json({
      message: "Feedback deleted successfully",
      booking: savedBooking,
    })
  } catch (error: any) {
    console.error("Delete feedback error:", error)
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
  }
}
