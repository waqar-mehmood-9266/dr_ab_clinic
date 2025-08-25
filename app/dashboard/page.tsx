"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  MessageCircle,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface Booking {
  _id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
  doctorFeedback?: {
    feedback: string
    treatmentNotes: string
    followUpRequired: boolean
    followUpDate?: string
    doctorName: string
    feedbackDate: string
  }
}

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, loading } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && user) {
      fetchUserBookings()
    } else if (!loading && !user) {
      setError("Please log in to view your dashboard")
      setIsLoading(false)
    }
  }, [user, loading])

  const fetchUserBookings = async () => {
    try {
      setError(null)
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch bookings")
      }

      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
      setError(error instanceof Error ? error.message : "Failed to load bookings")
      toast({
        title: "Error",
        description: "Failed to load your bookings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Loading state
  if (loading || isLoading) {
    return (
      <div className="min-h-screen luxury-gradient">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your dashboard...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen luxury-gradient">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button onClick={fetchUserBookings} className="bg-amber-600 hover:bg-amber-700">
                Try Again
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen luxury-gradient">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h1>
              <p className="text-gray-600 mb-6">You need to be logged in to view your dashboard.</p>
              <Button
                onClick={() => (window.location.href = "/auth/login")}
                className="bg-amber-600 hover:bg-amber-700"
              >
                Go to Login
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xl text-gray-600">Manage your appointments and view treatment feedback.</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <Card className="luxury-shadow border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{bookings.length}</div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">
                  {bookings.filter((b) => b.status === "pending").length}
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {bookings.filter((b) => b.status === "completed").length}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bookings Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-playfair font-bold text-gray-900">Your Appointments</h2>
              <Button onClick={() => (window.location.href = "/book")} className="bg-amber-600 hover:bg-amber-700">
                Book New Appointment
              </Button>
            </div>

            {bookings.length === 0 ? (
              <Card className="luxury-shadow border-0">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments yet</h3>
                  <p className="text-gray-600 mb-6">
                    Ready to start your aesthetic journey? Book your first appointment!
                  </p>
                  <Button onClick={() => (window.location.href = "/book")} className="bg-amber-600 hover:bg-amber-700">
                    Book Your First Appointment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="luxury-shadow border-0 hover:shadow-2xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{booking.service}</h3>
                            <div className="flex items-center space-x-4">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                              {booking.doctorFeedback && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  Feedback Available
                                </Badge>
                              )}
                              {booking.doctorFeedback?.followUpRequired && (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Follow-up Required
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div>Booking ID: {booking._id.slice(-6)}</div>
                            <div>Booked: {formatDate(booking.createdAt)}</div>
                          </div>
                        </div>

                        <Tabs defaultValue="details" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">Appointment Details</TabsTrigger>
                            <TabsTrigger value="feedback" disabled={!booking.doctorFeedback}>
                              Doctor Feedback {booking.doctorFeedback ? "" : "(Not Available)"}
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="details" className="mt-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 border-b pb-2">Appointment Information</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-3 text-amber-600" />
                                    <span>{formatDate(booking.date)}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 mr-3 text-amber-600" />
                                    <span>{booking.time}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <User className="w-4 h-4 mr-3 text-amber-600" />
                                    <span>{booking.service}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h4 className="font-semibold text-gray-900 border-b pb-2">Contact Information</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center text-gray-600">
                                    <Mail className="w-4 h-4 mr-3 text-amber-600" />
                                    <span>{booking.email}</span>
                                  </div>
                                  <div className="flex items-center text-gray-600">
                                    <Phone className="w-4 h-4 mr-3 text-amber-600" />
                                    <span>{booking.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {booking.message && (
                              <div className="mt-6 space-y-4">
                                <h4 className="font-semibold text-gray-900 border-b pb-2">Additional Notes</h4>
                                <div className="flex items-start text-gray-600">
                                  <MessageSquare className="w-4 h-4 mr-3 mt-1 text-amber-600" />
                                  <span className="text-sm">{booking.message}</span>
                                </div>
                              </div>
                            )}
                          </TabsContent>

                          <TabsContent value="feedback" className="mt-6">
                            {booking.doctorFeedback ? (
                              <div className="space-y-6">
                                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                                  <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    Treatment Feedback from Dr. {booking.doctorFeedback.doctorName}
                                  </h4>

                                  <div className="space-y-4">
                                    {booking.doctorFeedback.feedback && (
                                      <div>
                                        <h5 className="font-medium text-blue-800 mb-2">Treatment Feedback:</h5>
                                        <p className="text-blue-700 text-sm leading-relaxed">
                                          {booking.doctorFeedback.feedback}
                                        </p>
                                      </div>
                                    )}

                                    {booking.doctorFeedback.treatmentNotes && (
                                      <div>
                                        <h5 className="font-medium text-blue-800 mb-2">Clinical Notes:</h5>
                                        <p className="text-blue-700 text-sm leading-relaxed">
                                          {booking.doctorFeedback.treatmentNotes}
                                        </p>
                                      </div>
                                    )}

                                    {booking.doctorFeedback.followUpRequired && (
                                      <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-400">
                                        <h5 className="font-medium text-amber-800 mb-2 flex items-center">
                                          <AlertCircle className="w-4 h-4 mr-2" />
                                          Follow-up Required
                                        </h5>
                                        <p className="text-amber-700 text-sm">
                                          {booking.doctorFeedback.followUpDate
                                            ? `Please schedule a follow-up appointment by ${formatDate(booking.doctorFeedback.followUpDate)}`
                                            : "Please contact the clinic to schedule a follow-up appointment"}
                                        </p>
                                      </div>
                                    )}

                                    <div className="text-xs text-gray-500 pt-2 border-t border-blue-200">
                                      Feedback provided on {formatDate(booking.doctorFeedback.feedbackDate)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                <p>No feedback available yet. Feedback will appear here after your appointment.</p>
                              </div>
                            )}
                          </TabsContent>
                        </Tabs>

                        {booking.status === "pending" && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                              Your appointment is pending confirmation. You will receive an email once it's confirmed.
                            </p>
                          </div>
                        )}

                        {booking.status === "confirmed" && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex items-center text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Your appointment is confirmed! Please arrive 15 minutes early.
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
