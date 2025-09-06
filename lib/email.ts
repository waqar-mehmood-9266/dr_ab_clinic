import nodemailer from "nodemailer"

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Email verification function for user account creation
export async function sendEmailVerification(user: any, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://dr-ab-clinic.vercel.app"}/auth/verify-email?token=${token}`

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "Verify Your Email - Laser Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Laser Clinic</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Dear ${user.name},</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Thank you for creating an account with us! To complete your registration, please verify your email address.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #f59e0b;">${verificationUrl}</a>
          </p>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            This verification link will expire in 24 hours. If you didn't create this account, please ignore this email.
          </p>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            Laser Clinic | Professional Aesthetic Treatments<br>
            Email: info@laserclinic.com | Phone: (555) 123-4567
          </p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

// Password reset email
export async function sendPasswordResetEmail(user: any, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://dr-ab-clinic.vercel.app"}/auth/reset-password?token=${token}`

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: user.email,
    subject: "Reset Your Password - Laser Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset</h1>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Dear ${user.name},</h2>
          
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #f59e0b;">${resetUrl}</a>
          </p>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            This reset link will expire in 1 hour. If you didn't request this reset, please ignore this email.
          </p>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            Laser Clinic | Professional Aesthetic Treatments<br>
            Email: info@laserclinic.com | Phone: (555) 123-4567
          </p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Password reset email sent successfully")
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    throw error
  }
}


// Admin notification email (sent when user books)
export async function sendAdminBookingNotification(booking: any) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.CLINIC_EMAIL,
    subject: `🔔 New Booking Request - ${booking.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🔔 New Booking Request</h1>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">New Appointment Request</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            A new booking request has been submitted and requires your review.
          </p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1f2937; margin-top: 0;">Customer Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${booking.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">${booking.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; color: #1f2937;">${booking.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Service:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${booking.service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Date:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${new Date(booking.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Time:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${booking.time}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Age:</td>
                <td style="padding: 8px 0; color: #1f2937;">${booking.age}</td>
              </tr>
            </table>
          </div>

          ${booking.message
        ? `
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Additional Message</h3>
            <p style="color: #92400e; margin: 0; line-height: 1.6;">${booking.message}</p>
          </div>
          `
        : ""
      }

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Medical Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Previous Treatment:</td>
                <td style="padding: 4px 0; color: #1f2937;">${booking.previousTreatment}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Pregnant:</td>
                <td style="padding: 4px 0; color: #1f2937;">${booking.pregnant}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Diabetic:</td>
                <td style="padding: 4px 0; color: #1f2937;">${booking.diabetic}</td>
              </tr>
              <tr>
                <td style="padding: 4px 0; color: #6b7280;">Use Sunblock:</td>
                <td style="padding: 4px 0; color: #1f2937;">${booking.useSunblock}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              <strong>Action Required:</strong> Please log into the admin portal to review and confirm this booking.
            </p>
          </div>
        </div>
        <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>Dr. AB Aesthetic Clinic - Admin Notification</p>
          <p>Booking ID: ${booking._id}</p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Admin booking notification sent successfully")
  } catch (error) {
    console.error("Failed to send admin booking notification:", error)
    throw error
  }
}

// Booking confirmation email (ONLY sent when admin confirms)
export async function sendBookingConfirmationEmail(booking: any) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: booking.email,
    subject: "✅ Appointment Confirmed - Dr. AB Aesthetic Clinic",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">✅ Appointment Confirmed</h1>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Great News ${booking.name}!</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Your appointment has been <strong style="color: #10b981;">CONFIRMED</strong>! We're excited to see you soon.
          </p>
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #1f2937; margin-top: 0;">Confirmed Appointment Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Service:</td>
                <td style="padding: 8px 0; color: #1f2937;">${booking.service}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Date:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${new Date(booking.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Time:</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">${booking.time}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Status:</td>
                <td style="padding: 8px 0; color: #10b981; font-weight: bold;">CONFIRMED ✅</td>
              </tr>
            </table>
          </div>
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Pre-Appointment Instructions</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li>Please arrive 15 minutes early for check-in</li>
              <li>Avoid sun exposure 2 weeks before treatment</li>
              <li>Do not use tanning products or self-tanners</li>
              <li>Shave the treatment area 24 hours before your appointment</li>
              <li>Avoid caffeine on the day of treatment</li>
              <li>Bring a valid ID and insurance card if applicable</li>
            </ul>
          </div>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            If you need to reschedule or cancel, please contact us at least 24 hours in advance.
          </p>
        </div>
        <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>Dr. AB Aesthetic Clinic - Your Beauty, Our Expertise</p>
          <p>Email: ${process.env.CLINIC_EMAIL} | Phone: +1 (555) 123-4567</p>
        </div>
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

// Contact form email
export async function sendContactEmail(contactData: {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.CLINIC_EMAIL,
    subject: `New Contact Form Submission - ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Contact Details</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0; color: #1f2937;">${contactData.email}</td>
              </tr>
              ${contactData.phone
        ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0; color: #1f2937;">${contactData.phone}</td>
              </tr>`
        : ""
      }
              ${contactData.service
        ? `<tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Service:</td>
                <td style="padding: 8px 0; color: #1f2937;">${contactData.service}</td>
              </tr>`
        : ""
      }
            </table>
          </div>
          <h3 style="color: #1f2937; margin-bottom: 10px;">Message:</h3>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; color: #1f2937; line-height: 1.6;">
            ${contactData.message}
          </div>
        </div>
        <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 12px;">
          <p>Dr. AB Aesthetic Clinic - Contact Form Notification</p>
        </div>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Contact email sent successfully")
  } catch (error) {
    console.error("Failed to send contact email:", error)
    throw error
  }
}
