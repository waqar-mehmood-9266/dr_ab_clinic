"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react"
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
  userId: string
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAllBookings()
    }
  }, [user])

  const fetchAllBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setBookings(data)
      } else {
        throw new Error("Failed to fetch bookings")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load bookings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setBookings((prev) =>
          prev.map((booking) => (booking._id === bookingId ? { ...booking, status: status as any } : booking)),
        )
        toast({
          title: "Status updated",
          description: "Booking status has been updated successfully.",
        })
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      })
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

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen luxury-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
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
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-600">Manage all bookings and appointments.</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-6 mb-12"
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
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-8">All Appointments</h2>

            {isLoading ? (
              <div className="grid gap-6">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="luxury-shadow border-0">
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <Card className="luxury-shadow border-0">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-600">Bookings will appear here once customers start making appointments.</p>
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
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking.service}</h3>
                            <div className="flex items-center space-x-4">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                              <Select
                                value={booking.status}
                                onValueChange={(value) => updateBookingStatus(booking._id, value)}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            Booked on {formatDate(booking.createdAt)}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                              <User className="w-4 h-4 mr-3" />
                              <span>{booking.name}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-4 h-4 mr-3" />
                              <span>{booking.email}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-4 h-4 mr-3" />
                              <span>{booking.phone}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-3" />
                              <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-3" />
                              <span>{booking.time}</span>
                            </div>
                          </div>

                          {booking.message && (
                            <div className="space-y-3">
                              <div className="flex items-start text-gray-600">
                                <MessageSquare className="w-4 h-4 mr-3 mt-1" />
                                <span className="text-sm">{booking.message}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {booking.status !== "completed" && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <Button
                              onClick={() => updateBookingStatus(booking._id, "completed")}
                              className="bg-green-600 hover:bg-green-700 text-white"
                              size="sm"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Completed
                            </Button>
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
