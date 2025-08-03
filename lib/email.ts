import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendBookingNotification(booking: any) {
  const mailOptions = {
    from: process.env.SMTP_FROM || "noreply@elitelaser.com",
    to: process.env.CLINIC_EMAIL || "clinic@elitelaser.com",
    subject: "New Booking Received - Elite Laser Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706;">New Booking Received</h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Booking Details</h3>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Service:</strong> ${booking.service}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          ${booking.message ? `<p><strong>Message:</strong> ${booking.message}</p>` : ""}
        </div>
        
        <p>Please contact the client to confirm the appointment.</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          This email was sent from Elite Laser Clinic booking system.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Booking notification email sent successfully")
  } catch (error) {
    console.error("Failed to send booking notification email:", error)
    throw error
  }
}

export async function sendBookingConfirmation(booking: any) {
  const mailOptions = {
    from: process.env.SMTP_FROM || "noreply@elitelaser.com",
    to: booking.email,
    subject: "Booking Confirmation - Elite Laser Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #d97706;">Booking Confirmation</h2>
        
        <p>Dear ${booking.name},</p>
        
        <p>Thank you for booking with Elite Laser Clinic. We have received your appointment request and will contact you soon to confirm.</p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Your Booking Details</h3>
          <p><strong>Service:</strong> ${booking.service}</p>
          <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
        </div>
        
        <p>If you have any questions or need to make changes, please contact us at:</p>
        <p>📞 +1 (555) 123-4567<br>
        📧 info@elitelaser.com</p>
        
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          Elite Laser Clinic - Premium Laser Treatments<br>
          123 Beauty St, City, State
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Booking confirmation email sent successfully")
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error)
    throw error
  }
}
