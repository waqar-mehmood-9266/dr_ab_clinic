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
    const adminUser = await User.findById(decoded.userId)
    if (!adminUser) {
      console.log("User not found:", decoded.userId)
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    console.log("User found:", { id: adminUser._id, role: adminUser.role, name: adminUser.name })

    if (adminUser.role !== "admin") {
      console.log("User is not admin:", adminUser.role)
      return NextResponse.json({ message: "Admin access required" }, { status: 403 })
    }

    // Get all users (excluding sensitive fields)
    const users = await User.find({})
      .select("-password -resetPasswordToken -emailVerificationToken")
      .sort({ createdAt: -1 })

    // For each user, get their booking statistics
    const usersWithBookings = await Promise.all(
      users.map(async (user) => {
        // Count total bookings for this user (by userId or email)
        const bookingCount = await Booking.countDocuments({
          $or: [{ userId: user._id.toString() }, { email: user.email }],
        })

        // Get recent bookings (last 3)
        const recentBookings = await Booking.find({
          $or: [{ userId: user._id.toString() }, { email: user.email }],
        })
          .select("service date status createdAt")
          .sort({ createdAt: -1 })
          .limit(3)

        console.log(`User ${user.name} (${user._id}): ${bookingCount} bookings`)

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified || false,
          createdAt: user.createdAt,
          bookingCount,
          recentBookings,
        }
      }),
    )

    console.log(`Found ${users.length} users with booking data`)

    return NextResponse.json(usersWithBookings)
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
