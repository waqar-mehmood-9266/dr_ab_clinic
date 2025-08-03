import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Booking } from "@/lib/models/booking"
import { sendBookingNotification, sendBookingConfirmation } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const bookingData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "service", "date", "time"]
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 })
      }
    }

    // Create booking
    const booking = new Booking(bookingData)
    await booking.save()

    // Send notification emails
    try {
      await Promise.all([sendBookingNotification(booking), sendBookingConfirmation(booking)])
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json({ message: "Booking created successfully", booking }, { status: 201 })
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
