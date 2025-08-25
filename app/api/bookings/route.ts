import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db"
import { Booking } from "@/lib/models/booking"
import { sendAdminBookingNotification } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const bookingData = await request.json()

    // Validate required fields
    const requiredFields = [
      "name",
      "email",
      "phone",
      "service",
      "date",
      "time",
      "age",
      "weight",
      "occupation",
      "address",
      "previousTreatment",
      "pregnant",
      "diabetic",
      "useSunblock",
      "understandTreatment",
      "understandRisks",
      "informationAccurate",
      "consentToTreatment",
    ]

    for (const field of requiredFields) {
      if (bookingData[field] === undefined || bookingData[field] === null || bookingData[field] === "") {
        return NextResponse.json({ message: `${field} is required` }, { status: 400 })
      }
    }

    // Validate consent checkboxes are true
    const consentFields = ["understandTreatment", "understandRisks", "informationAccurate", "consentToTreatment"]
    for (const field of consentFields) {
      if (bookingData[field] !== true) {
        return NextResponse.json({ message: `${field} must be acknowledged` }, { status: 400 })
      }
    }

    // Validate enum fields
    const yesNoFields = ["previousTreatment", "pregnant", "diabetic", "useSunblock"]

    for (const field of yesNoFields) {
      if (bookingData[field] && !["yes", "no"].includes(bookingData[field])) {
        return NextResponse.json({ message: `${field} must be 'yes' or 'no'` }, { status: 400 })
      }
    }

    // Validate optional enum fields
    const optionalYesNoFields = [
      "bleedingDisorder",
      "allergies",
      "takingSupplements",
      "useTanningLotion",
      "treatedAreaBefore",
      "consentPhotos",
    ]

    for (const field of optionalYesNoFields) {
      if (bookingData[field] && !["yes", "no", ""].includes(bookingData[field])) {
        return NextResponse.json({ message: `${field} must be 'yes', 'no', or empty` }, { status: 400 })
      }
    }

    // Validate date is not in the past
    const bookingDate = new Date(bookingData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (bookingDate < today) {
      return NextResponse.json({ message: "Booking date cannot be in the past" }, { status: 400 })
    }

    // Create booking with all fields
    const booking = new Booking({
      // Basic booking info
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      message: bookingData.message || "",

      // Personal Information
      age: bookingData.age,
      weight: bookingData.weight,
      occupation: bookingData.occupation,
      address: bookingData.address,

      // Medical History
      previousTreatment: bookingData.previousTreatment,
      previousTreatmentDetails: bookingData.previousTreatmentDetails || "",
      bleedingDisorder: bookingData.bleedingDisorder || "",
      pregnant: bookingData.pregnant,
      allergies: bookingData.allergies || "",
      diabetic: bookingData.diabetic,
      takingSupplements: bookingData.takingSupplements || "",
      supplementDetails: bookingData.supplementDetails || "",
      otherConditions: bookingData.otherConditions || "",

      // Additional Information
      useSunblock: bookingData.useSunblock,
      useTanningLotion: bookingData.useTanningLotion || "",
      treatedAreaBefore: bookingData.treatedAreaBefore || "",
      treatmentName: bookingData.treatmentName || "",
      planningHoliday: bookingData.planningHoliday || "",
      consentPhotos: bookingData.consentPhotos || "",

      // Consent acknowledgments
      understandTreatment: bookingData.understandTreatment,
      understandRisks: bookingData.understandRisks,
      informationAccurate: bookingData.informationAccurate,
      consentToTreatment: bookingData.consentToTreatment,

      // Optional user ID if authenticated
      userId: bookingData.userId || null,
    })

    await booking.save()

    // ONLY send notification to admin - NO email to user yet
    try {
      await sendAdminBookingNotification(booking)
    } catch (emailError) {
      console.error("Admin notification email failed:", emailError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json(
      {
        message: "Booking request submitted successfully. We will contact you soon to confirm your appointment.",
        booking: {
          _id: booking._id,
          name: booking.name,
          email: booking.email,
          service: booking.service,
          date: booking.date,
          time: booking.time,
          status: booking.status,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Booking creation error:", error)

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationErrors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
