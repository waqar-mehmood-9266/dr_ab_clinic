import { type NextRequest, NextResponse } from "next/server"
import { sendContactEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, service, message } = await request.json()

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ""))) {
      return NextResponse.json({ message: "Invalid phone number format" }, { status: 400 })
    }

    // Send contact email to admin
    await sendContactEmail({ name, email, phone, service, message })

    return NextResponse.json({
      message: "Thank you for contacting us! We'll get back to you within 24 hours.",
      success: true,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        message: "Failed to send message. Please try again or call us directly.",
        success: false,
      },
      { status: 500 },
    )
  }
}
