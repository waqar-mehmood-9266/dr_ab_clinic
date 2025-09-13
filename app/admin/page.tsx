// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Header } from "@/components/layout/header"
// import { Footer } from "@/components/layout/footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import {
//   Calendar,
//   Clock,
//   User,
//   Mail,
//   Phone,
//   MessageSquare,
//   CheckCircle,
//   FileText,
//   RefreshCw,
//   Users,
//   MessageCircle,
//   Plus,
//   Edit,
//   Eye,
//   Trash2,
// } from "lucide-react"
// import { useAuth } from "@/hooks/use-auth"
// import { useToast } from "@/hooks/use-toast"

// interface UserType {
//   _id: string
//   name: string
//   email: string
//   role: string
//   isEmailVerified: boolean
//   createdAt: string
//   bookingCount: number
//   recentBookings: Array<{
//     _id: string
//     service: string
//     date: string
//     status: string
//     createdAt: string
//   }>
// }

// interface Booking {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   service: string
//   date: string
//   time: string
//   message?: string
//   age: string
//   weight: string
//   occupation: string
//   address: string
//   previousTreatment: string
//   previousTreatmentDetails?: string
//   bleedingDisorder?: string
//   pregnant: string
//   allergies?: string
//   diabetic: string
//   takingSupplements?: string
//   supplementDetails?: string
//   otherConditions?: string
//   useSunblock: string
//   useTanningLotion?: string
//   treatedAreaBefore?: string
//   treatmentName?: string
//   planningHoliday?: string
//   consentPhotos?: string
//   understandTreatment: boolean
//   understandRisks: boolean
//   informationAccurate: boolean
//   consentToTreatment: boolean
//   status: "pending" | "confirmed" | "completed" | "cancelled"
//   createdAt: string
//   userId?: string
//   doctorFeedback?: {
//     feedback: string
//     treatmentNotes: string
//     followUpRequired: boolean
//     followUpDate?: string
//     doctorName: string
//     feedbackDate: string
//   }
// }

// interface UserBookingsResponse {
//   user: {
//     _id: string
//     name: string
//     email: string
//   }
//   bookings: Booking[]
// }

// // Helper function for status colors
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "pending":
//       return "bg-yellow-100 text-yellow-800"
//     case "confirmed":
//       return "bg-blue-100 text-blue-800"
//     case "completed":
//       return "bg-green-100 text-green-800"
//     case "cancelled":
//       return "bg-red-100 text-red-800"
//     default:
//       return "bg-gray-100 text-gray-800"
//   }
// }

// // Component to show user's bookings in dialog
// function UserBookingsView({ userId }: { userId: string }) {
//   const [userBookings, setUserBookings] = useState<UserBookingsResponse | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     fetchUserBookings()
//   }, [userId])

//   const fetchUserBookings = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await fetch(`/api/admin/users/${userId}/bookings`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setUserBookings(data)
//       }
//     } catch (error) {
//       console.error("Failed to fetch user bookings:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   if (isLoading) {
//     return (
//       <div className="text-center py-4">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
//         <p className="text-gray-600">Loading bookings...</p>
//       </div>
//     )
//   }

//   if (!userBookings || userBookings.bookings.length === 0) {
//     return <div className="text-center py-4 text-gray-500">No bookings found for this user.</div>
//   }

//   return (
//     <div className="space-y-4">
//       {userBookings.bookings.map((booking: any) => (
//         <div key={booking._id} className="border rounded-lg p-4">
//           <div className="flex justify-between items-start mb-2">
//             <h4 className="font-semibold">{booking.service}</h4>
//             <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
//           </div>
//           <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//             <div>Date: {new Date(booking.date).toLocaleDateString()}</div>
//             <div>Time: {booking.time}</div>
//             <div>Phone: {booking.phone}</div>
//             <div>Age: {booking.age}</div>
//           </div>
//           {booking.doctorFeedback && (
//             <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
//               <h5 className="font-medium text-blue-900 mb-1">Doctor Feedback</h5>
//               <p className="text-sm">{booking.doctorFeedback.feedback}</p>
//               {booking.doctorFeedback.treatmentNotes && (
//                 <p className="text-sm mt-1">
//                   <strong>Notes:</strong> {booking.doctorFeedback.treatmentNotes}
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default function AdminPage() {
//   const [bookings, setBookings] = useState<Booking[]>([])
//   const [users, setUsers] = useState<UserType[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [refreshing, setRefreshing] = useState(false)
//   const [activeTab, setActiveTab] = useState("bookings")
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
//   const [feedbackForm, setFeedbackForm] = useState({
//     feedback: "",
//     treatmentNotes: "",
//     followUpRequired: false,
//     followUpDate: "",
//   })
//   const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
//   const { user, loading } = useAuth()
//   const { toast } = useToast()

//   useEffect(() => {
//     if (!loading && user?.role === "admin") {
//       fetchAllData()
//     } else if (!loading && (!user || user.role !== "admin")) {
//       setError("Access denied. Admin privileges required.")
//       setIsLoading(false)
//     }
//   }, [user, loading])

//   const fetchAllData = async () => {
//     try {
//       setError(null)
//       setRefreshing(true)
//       const token = localStorage.getItem("token")

//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       // Fetch bookings and users in parallel
//       const [bookingsResponse, usersResponse] = await Promise.all([
//         fetch("/api/admin/bookings", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }),
//         fetch("/api/admin/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }),
//       ])

//       if (!bookingsResponse.ok || !usersResponse.ok) {
//         throw new Error("Failed to fetch data")
//       }

//       const [bookingsData, usersData] = await Promise.all([bookingsResponse.json(), usersResponse.json()])

//       setBookings(bookingsData)
//       setUsers(usersData)
//     } catch (error) {
//       console.error("Failed to fetch data:", error)
//       setError(error instanceof Error ? error.message : "Failed to load data")
//       toast({
//         title: "Error",
//         description: "Failed to load admin data. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//       setRefreshing(false)
//     }
//   }

//   const updateBookingStatus = async (bookingId: string, status: string) => {
//     try {
//       const token = localStorage.getItem("token")

//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const response = await fetch(`/api/admin/bookings/${bookingId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || "Failed to update status")
//       }

//       setBookings((prev) =>
//         prev.map((booking) => (booking._id === bookingId ? { ...booking, status: status as any } : booking)),
//       )

//       toast({
//         title: "Status updated",
//         description: "Booking status has been updated successfully.",
//       })
//     } catch (error) {
//       console.error("Failed to update booking status:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update booking status.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleFeedbackSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!selectedBooking) return

//     setIsSubmittingFeedback(true)

//     try {
//       const token = localStorage.getItem("token")

//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const method = selectedBooking.doctorFeedback ? "PUT" : "POST"
//       const response = await fetch(`/api/admin/bookings/${selectedBooking._id}/feedback`, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(feedbackForm),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || "Failed to save feedback")
//       }

//       const data = await response.json()

//       // Update the booking in the list
//       setBookings((prev) => prev.map((booking) => (booking._id === selectedBooking._id ? data.booking : booking)))

//       toast({
//         title: "Feedback saved",
//         description: "Doctor feedback has been saved successfully.",
//       })

//       // Reset form and close dialog
//       setFeedbackForm({
//         feedback: "",
//         treatmentNotes: "",
//         followUpRequired: false,
//         followUpDate: "",
//       })
//       setSelectedBooking(null)
//     } catch (error) {
//       console.error("Failed to save feedback:", error)
//       toast({
//         title: "Error",
//         description: "Failed to save feedback.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmittingFeedback(false)
//     }
//   }

//   const handleDeleteFeedback = async (bookingId: string) => {
//     if (!confirm("Are you sure you want to delete this feedback? This action cannot be undone.")) {
//       return
//     }

//     try {
//       const token = localStorage.getItem("token")
//       const response = await fetch(`/api/admin/bookings/${bookingId}/feedback`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response.ok) {
//         // Refresh bookings to get updated data
//         fetchAllData()
//         // If we're viewing this booking's details, close the dialog
//         if (selectedBooking && selectedBooking._id === bookingId) {
//           setSelectedBooking(null)
//         }
//         toast({
//           title: "Feedback deleted",
//           description: "Doctor feedback has been deleted successfully.",
//         })
//       } else {
//         const data = await response.json()
//         toast({
//           title: "Error",
//           description: data.message || "Failed to delete feedback",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       console.error("Error deleting feedback:", error)
//       toast({
//         title: "Error",
//         description: "Error deleting feedback",
//         variant: "destructive",
//       })
//     }
//   }

//   const openFeedbackDialog = (booking: Booking) => {
//     setSelectedBooking(booking)
//     if (booking.doctorFeedback) {
//       setFeedbackForm({
//         feedback: booking.doctorFeedback.feedback || "",
//         treatmentNotes: booking.doctorFeedback.treatmentNotes || "",
//         followUpRequired: booking.doctorFeedback.followUpRequired || false,
//         followUpDate: booking.doctorFeedback.followUpDate ? booking.doctorFeedback.followUpDate.split("T")[0] : "",
//       })
//     } else {
//       setFeedbackForm({
//         feedback: "",
//         treatmentNotes: "",
//         followUpRequired: false,
//         followUpDate: "",
//       })
//     }
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   const formatYesNo = (value?: string) => {
//     if (!value) return "Not specified"
//     return value === "yes" ? "Yes" : value === "no" ? "No" : value
//   }

//   // Loading state
//   // if (loading || isLoading) {
//   //   return (
//   //     <div className="min-h-screen luxury-gradient">
//   //       <Header />
//   //       <main className="pt-24 pb-16">
//   //         <div className="container mx-auto px-4">
//   //           <div className="text-center">
//   //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
//   //             <p className="text-gray-600">Loading admin dashboard...</p>
//   //           </div>
//   //         </div>
//   //       </main>
//   //       <Footer />
//   //     </div>
//   //   )
//   // }
//   if (loading || isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col luxury-gradient">
//         <Header />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading admin dashboard...</p>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     )
//   }


//   // Error state or access denied
//   if (!user || user.role !== "admin" || error) {
//     return (
//       <div className="min-h-screen luxury-gradient">
//         <Header />
//         <main className="pt-24 pb-16">
//           <div className="container mx-auto px-4">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Access Denied"}</h1>
//               <p className="text-gray-600 mb-6">{error || "You don't have permission to access this page."}</p>
//               {error && (
//                 <Button onClick={fetchAllData} className="bg-amber-600 hover:bg-amber-700">
//                   Try Again
//                 </Button>
//               )}
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen luxury-gradient">
//       <Header />

//       <main className="pt-24 pb-16">
//         <div className="container mx-auto px-4">
//           {/* Header */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
//             <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">Admin Dashboard</h1>
//             <p className="text-xl text-gray-600">Manage bookings, users, and provide medical feedback.</p>
//             <div className="mt-4 flex items-center space-x-4">
//               <Button onClick={fetchAllData} variant="outline" className="bg-transparent" disabled={refreshing}>
//                 <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
//                 {refreshing ? "Refreshing..." : "Refresh Data"}
//               </Button>
//               <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
//             </div>
//           </motion.div>

//           {/* Stats Cards */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
//           >
//             <Card className="luxury-shadow border-0">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold text-gray-900">{users.length}</div>
//               </CardContent>
//             </Card>

//             <Card className="luxury-shadow border-0">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-sm font-medium text-gray-600">Total Bookings</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold text-gray-900">{bookings.length}</div>
//               </CardContent>
//             </Card>

//             <Card className="luxury-shadow border-0">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold text-yellow-600">
//                   {bookings.filter((b) => b.status === "pending").length}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="luxury-shadow border-0">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-sm font-medium text-gray-600">Confirmed</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold text-blue-600">
//                   {bookings.filter((b) => b.status === "confirmed").length}
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="luxury-shadow border-0">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold text-green-600">
//                   {bookings.filter((b) => b.status === "completed").length}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Main Content Tabs */}
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-8">
//                 <TabsTrigger value="bookings" className="flex items-center">
//                   <Calendar className="w-4 h-4 mr-2" />
//                   Bookings & Feedback
//                 </TabsTrigger>
//                 <TabsTrigger value="users" className="flex items-center">
//                   <Users className="w-4 h-4 mr-2" />
//                   User Management
//                 </TabsTrigger>
//               </TabsList>

//               {/* Bookings Tab */}
//               <TabsContent value="bookings">
//                 <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-8">All Appointments</h2>

//                 {bookings.length === 0 ? (
//                   <Card className="luxury-shadow border-0">
//                     <CardContent className="p-12 text-center">
//                       <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
//                       <p className="text-gray-600">
//                         Bookings will appear here once customers start making appointments.
//                       </p>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   <div className="grid gap-6">
//                     {bookings.map((booking, index) => (
//                       <motion.div
//                         key={booking._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                       >
//                         <Card className="luxury-shadow border-0 hover:shadow-2xl transition-shadow">
//                           <CardContent className="p-6">
//                             <div className="flex items-start justify-between mb-6">
//                               <div>
//                                 <h3 className="text-2xl font-semibold text-gray-900 mb-3">{booking.service}</h3>
//                                 <div className="flex items-center space-x-4">
//                                   <Badge className={getStatusColor(booking.status)}>
//                                     {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                                   </Badge>
//                                   <Select
//                                     value={booking.status}
//                                     onValueChange={(value) => updateBookingStatus(booking._id, value)}
//                                   >
//                                     <SelectTrigger className="w-40">
//                                       <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                       <SelectItem value="pending">Pending</SelectItem>
//                                       <SelectItem value="confirmed">Confirmed</SelectItem>
//                                       <SelectItem value="completed">Completed</SelectItem>
//                                       <SelectItem value="cancelled">Cancelled</SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                   <Dialog
//                                     open={selectedBooking !== null}
//                                     onOpenChange={(open) => !open && setSelectedBooking(null)}
//                                   >
//                                     <DialogTrigger asChild>
//                                       <Button
//                                         variant="outline"
//                                         size="sm"
//                                         onClick={() => openFeedbackDialog(booking)}
//                                         className="bg-white border-gray-300 hover:bg-gray-50"
//                                       >
//                                         {booking.doctorFeedback ? (
//                                           <>
//                                             <Edit className="w-4 h-4 mr-2" />
//                                             Edit Feedback
//                                           </>
//                                         ) : (
//                                           <>
//                                             <Plus className="w-4 h-4 mr-2" />
//                                             Add Feedback
//                                           </>
//                                         )}
//                                       </Button>
//                                     </DialogTrigger>
//                                     <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-2xl z-[100]">
//                                       <DialogHeader className="border-b border-gray-200 pb-4">
//                                         <DialogTitle className="text-xl font-semibold text-gray-900">
//                                           {selectedBooking?.doctorFeedback ? "Edit" : "Add"} Doctor Feedback
//                                         </DialogTitle>
//                                       </DialogHeader>
//                                       <form onSubmit={handleFeedbackSubmit} className="space-y-6 pt-4">
//                                         <div>
//                                           <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
//                                             Treatment Feedback
//                                           </Label>
//                                           <Textarea
//                                             id="feedback"
//                                             value={feedbackForm.feedback}
//                                             onChange={(e) =>
//                                               setFeedbackForm((prev) => ({ ...prev, feedback: e.target.value }))
//                                             }
//                                             placeholder="Enter feedback about the treatment..."
//                                             rows={4}
//                                             className="mt-1 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500"
//                                           />
//                                         </div>
//                                         <div>
//                                           <Label htmlFor="treatmentNotes" className="text-sm font-medium text-gray-700">
//                                             Treatment Notes
//                                           </Label>
//                                           <Textarea
//                                             id="treatmentNotes"
//                                             value={feedbackForm.treatmentNotes}
//                                             onChange={(e) =>
//                                               setFeedbackForm((prev) => ({ ...prev, treatmentNotes: e.target.value }))
//                                             }
//                                             placeholder="Enter detailed treatment notes..."
//                                             rows={4}
//                                             className="mt-1 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500"
//                                           />
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                           <input
//                                             type="checkbox"
//                                             id="followUpRequired"
//                                             checked={feedbackForm.followUpRequired}
//                                             onChange={(e) =>
//                                               setFeedbackForm((prev) => ({
//                                                 ...prev,
//                                                 followUpRequired: e.target.checked,
//                                               }))
//                                             }
//                                             className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
//                                           />
//                                           <Label
//                                             htmlFor="followUpRequired"
//                                             className="text-sm font-medium text-gray-700"
//                                           >
//                                             Follow-up required
//                                           </Label>
//                                         </div>
//                                         {feedbackForm.followUpRequired && (
//                                           <div>
//                                             <Label htmlFor="followUpDate" className="text-sm font-medium text-gray-700">
//                                               Follow-up Date
//                                             </Label>
//                                             <Input
//                                               type="date"
//                                               id="followUpDate"
//                                               value={feedbackForm.followUpDate}
//                                               onChange={(e) =>
//                                                 setFeedbackForm((prev) => ({ ...prev, followUpDate: e.target.value }))
//                                               }
//                                               className="mt-1 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500"
//                                             />
//                                           </div>
//                                         )}
//                                         <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//                                           <Button
//                                             type="button"
//                                             variant="outline"
//                                             onClick={() => setSelectedBooking(null)}
//                                             className="bg-white border-gray-300 hover:bg-gray-50"
//                                           >
//                                             Cancel
//                                           </Button>
//                                           {selectedBooking?.doctorFeedback && (
//                                             <Button
//                                               type="button"
//                                               variant="destructive"
//                                               onClick={() => handleDeleteFeedback(selectedBooking._id)}
//                                               className="bg-red-600 hover:bg-red-700 text-white"
//                                             >
//                                               <Trash2 className="w-4 h-4 mr-2" />
//                                               Delete
//                                             </Button>
//                                           )}
//                                           <Button
//                                             type="submit"
//                                             disabled={isSubmittingFeedback}
//                                             className="bg-amber-600 hover:bg-amber-700 text-white"
//                                           >
//                                             {isSubmittingFeedback ? "Saving..." : "Save Feedback"}
//                                           </Button>
//                                         </div>
//                                       </form>
//                                     </DialogContent>
//                                   </Dialog>
//                                 </div>
//                               </div>
//                               <div className="text-right text-sm text-gray-500">
//                                 <div>Booking ID: {booking._id.slice(-6)}</div>
//                                 <div>Booked: {formatDate(booking.createdAt)}</div>
//                               </div>
//                             </div>

//                             {/* Doctor Feedback Display */}
//                             {booking.doctorFeedback && (
//                               <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//                                 <div className="flex items-center justify-between mb-2">
//                                   <h4 className="font-semibold text-blue-900 flex items-center">
//                                     <MessageCircle className="w-4 h-4 mr-2" />
//                                     Doctor Feedback
//                                   </h4>
//                                   <Button
//                                     size="sm"
//                                     variant="ghost"
//                                     onClick={() => handleDeleteFeedback(booking._id)}
//                                     className="h-6 w-6 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
//                                   >
//                                     <Trash2 className="h-3 w-3" />
//                                   </Button>
//                                 </div>
//                                 <div className="space-y-2 text-sm">
//                                   {booking.doctorFeedback.feedback && (
//                                     <p>
//                                       <strong>Feedback:</strong> {booking.doctorFeedback.feedback}
//                                     </p>
//                                   )}
//                                   {booking.doctorFeedback.treatmentNotes && (
//                                     <p>
//                                       <strong>Treatment Notes:</strong> {booking.doctorFeedback.treatmentNotes}
//                                     </p>
//                                   )}
//                                   {booking.doctorFeedback.followUpRequired && (
//                                     <p className="text-amber-700">
//                                       <strong>Follow-up Required:</strong>{" "}
//                                       {booking.doctorFeedback.followUpDate
//                                         ? `Yes - ${formatDate(booking.doctorFeedback.followUpDate)}`
//                                         : "Yes"}
//                                     </p>
//                                   )}
//                                   <p className="text-gray-500">
//                                     By {booking.doctorFeedback.doctorName} on{" "}
//                                     {formatDate(booking.doctorFeedback.feedbackDate)}
//                                   </p>
//                                 </div>
//                               </div>
//                             )}

//                             <Tabs defaultValue="basic" className="w-full">
//                               <TabsList className="grid w-full grid-cols-4">
//                                 <TabsTrigger value="basic">Basic Info</TabsTrigger>
//                                 <TabsTrigger value="personal">Personal</TabsTrigger>
//                                 <TabsTrigger value="medical">Medical</TabsTrigger>
//                                 <TabsTrigger value="consent">Consent</TabsTrigger>
//                               </TabsList>

//                               <TabsContent value="basic" className="mt-6">
//                                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                   <div className="space-y-4">
//                                     <h4 className="font-semibold text-gray-900 border-b pb-2">Contact Information</h4>
//                                     <div className="space-y-3">
//                                       <div className="flex items-center text-gray-600">
//                                         <User className="w-4 h-4 mr-3 text-amber-600" />
//                                         <span>{booking.name}</span>
//                                       </div>
//                                       <div className="flex items-center text-gray-600">
//                                         <Mail className="w-4 h-4 mr-3 text-amber-600" />
//                                         <span>{booking.email}</span>
//                                       </div>
//                                       <div className="flex items-center text-gray-600">
//                                         <Phone className="w-4 h-4 mr-3 text-amber-600" />
//                                         <span>{booking.phone}</span>
//                                       </div>
//                                     </div>
//                                   </div>

//                                   <div className="space-y-4">
//                                     <h4 className="font-semibold text-gray-900 border-b pb-2">Appointment Details</h4>
//                                     <div className="space-y-3">
//                                       <div className="flex items-center text-gray-600">
//                                         <Calendar className="w-4 h-4 mr-3 text-amber-600" />
//                                         <span>{formatDate(booking.date)}</span>
//                                       </div>
//                                       <div className="flex items-center text-gray-600">
//                                         <Clock className="w-4 h-4 mr-3 text-amber-600" />
//                                         <span>{booking.time}</span>
//                                       </div>
//                                       <div className="flex items-center text-gray-600">
//                                         <FileText className="w-4 h-4 mr-3 text-amber-600" />
//                                         <span>{booking.service}</span>
//                                       </div>
//                                     </div>
//                                   </div>

//                                   {booking.message && (
//                                     <div className="space-y-4">
//                                       <h4 className="font-semibold text-gray-900 border-b pb-2">Additional Notes</h4>
//                                       <div className="flex items-start text-gray-600">
//                                         <MessageSquare className="w-4 h-4 mr-3 mt-1 text-amber-600" />
//                                         <span className="text-sm">{booking.message}</span>
//                                       </div>
//                                     </div>
//                                   )}
//                                 </div>
//                               </TabsContent>

//                               <TabsContent value="personal" className="mt-6">
//                                 <div className="grid md:grid-cols-2 gap-6">
//                                   <div className="space-y-4">
//                                     <h4 className="font-semibold text-gray-900 border-b pb-2">Personal Details</h4>
//                                     <div className="space-y-3 text-sm">
//                                       <div className="flex justify-between">
//                                         <span className="text-gray-600">Age:</span>
//                                         <span className="font-medium">{booking.age} years</span>
//                                       </div>
//                                       <div className="flex justify-between">
//                                         <span className="text-gray-600">Weight:</span>
//                                         <span className="font-medium">{booking.weight} kg</span>
//                                       </div>
//                                       <div className="flex justify-between">
//                                         <span className="text-gray-600">Occupation:</span>
//                                         <span className="font-medium">{booking.occupation}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div className="space-y-4">
//                                     <h4 className="font-semibold text-gray-900 border-b pb-2">Address</h4>
//                                     <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                                       {booking.address}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </TabsContent>

//                               <TabsContent value="medical" className="mt-6">
//                                 <div className="grid md:grid-cols-2 gap-6">
//                                   <div className="space-y-6">
//                                     <div>
//                                       <h4 className="font-semibold text-gray-900 border-b pb-2 mb-4">
//                                         Medical History
//                                       </h4>
//                                       <div className="space-y-3 text-sm">
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Previous IPL/Laser Treatment:</span>
//                                           <span
//                                             className={`font-medium ${booking.previousTreatment === "yes" ? "text-amber-600" : "text-green-600"}`}
//                                           >
//                                             {formatYesNo(booking.previousTreatment)}
//                                           </span>
//                                         </div>
//                                         {booking.previousTreatmentDetails && (
//                                           <div className="text-xs text-gray-500 bg-amber-50 p-2 rounded">
//                                             <strong>Details:</strong> {booking.previousTreatmentDetails}
//                                           </div>
//                                         )}
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Bleeding Disorder:</span>
//                                           <span
//                                             className={`font-medium ${booking.bleedingDisorder === "yes" ? "text-red-600" : "text-green-600"}`}
//                                           >
//                                             {formatYesNo(booking.bleedingDisorder)}
//                                           </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Pregnant:</span>
//                                           <span
//                                             className={`font-medium ${booking.pregnant === "yes" ? "text-red-600" : "text-green-600"}`}
//                                           >
//                                             {formatYesNo(booking.pregnant)}
//                                           </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Allergies:</span>
//                                           <span
//                                             className={`font-medium ${booking.allergies === "yes" ? "text-amber-600" : "text-green-600"}`}
//                                           >
//                                             {formatYesNo(booking.allergies)}
//                                           </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Diabetic:</span>
//                                           <span
//                                             className={`font-medium ${booking.diabetic === "yes" ? "text-amber-600" : "text-green-600"}`}
//                                           >
//                                             {formatYesNo(booking.diabetic)}
//                                           </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Taking Supplements:</span>
//                                           <span
//                                             className={`font-medium ${booking.takingSupplements === "yes" ? "text-amber-600" : "text-green-600"}`}
//                                           >
//                                             {formatYesNo(booking.takingSupplements)}
//                                           </span>
//                                         </div>
//                                         {booking.supplementDetails && (
//                                           <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
//                                             <strong>Supplements:</strong> {booking.supplementDetails}
//                                           </div>
//                                         )}
//                                       </div>
//                                     </div>

//                                     {booking.otherConditions && (
//                                       <div>
//                                         <h5 className="font-medium text-gray-900 mb-2">Other Medical Conditions:</h5>
//                                         <div className="text-sm text-gray-600 bg-red-50 p-3 rounded-lg border-l-4 border-red-200">
//                                           {booking.otherConditions}
//                                         </div>
//                                       </div>
//                                     )}
//                                   </div>

//                                   <div className="space-y-6">
//                                     <div>
//                                       <h4 className="font-semibold text-gray-900 border-b pb-2 mb-4">
//                                         Treatment Information
//                                       </h4>
//                                       <div className="space-y-3 text-sm">
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Uses Sunblock:</span>
//                                           <span
//                                             className={`font-medium ${booking.useSunblock === "yes" ? "text-green-600" : "text-amber-600"}`}
//                                           >
//                                             {formatYesNo(booking.useSunblock)}
//                                           </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Uses Tanning Lotion:</span>
//                                           <span
//                                             className={`font-medium ${booking.useTanningLotion === "yes" ? "text-amber-600" : "text-green-600"}`}
//                                           >
//                                             {formatYesNo(booking.useTanningLotion)}
//                                           </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Treated Area Before:</span>
//                                           <span
//                                             className={`font-medium ${booking.treatedAreaBefore === "yes" ? "text-amber-600" : "text-green-600"}`}
//                                           >
//                                             {formatYesNo(booking.treatedAreaBefore)}
//                                           </span>
//                                         </div>
//                                         {booking.treatmentName && (
//                                           <div className="text-xs text-gray-500 bg-amber-50 p-2 rounded">
//                                             <strong>Previous Treatment:</strong> {booking.treatmentName}
//                                           </div>
//                                         )}
//                                         <div className="flex justify-between">
//                                           <span className="text-gray-600">Consent to Photos:</span>
//                                           <span
//                                             className={`font-medium ${booking.consentPhotos === "yes" ? "text-green-600" : "text-amber-600"}`}
//                                           >
//                                             {formatYesNo(booking.consentPhotos)}
//                                           </span>
//                                         </div>
//                                       </div>
//                                     </div>

//                                     {booking.planningHoliday && (
//                                       <div>
//                                         <h5 className="font-medium text-gray-900 mb-2">Holiday/Sun Exposure Plans:</h5>
//                                         <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-200">
//                                           {booking.planningHoliday}
//                                         </div>
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>
//                               </TabsContent>

//                               <TabsContent value="consent" className="mt-6">
//                                 <div className="bg-green-50 p-6 rounded-lg border border-green-200">
//                                   <h4 className="font-semibold text-green-800 mb-4 flex items-center">
//                                     <CheckCircle className="w-5 h-5 mr-2" />
//                                     Legal Consent Status
//                                   </h4>
//                                   <div className="grid md:grid-cols-2 gap-6 text-sm">
//                                     <div className="space-y-3">
//                                       <div className="flex items-center text-green-700">
//                                         <CheckCircle
//                                           className={`w-4 h-4 mr-3 ${booking.understandTreatment ? "text-green-600" : "text-red-600"}`}
//                                         />
//                                         <span>
//                                           Understands Treatment: {booking.understandTreatment ? "✅ Yes" : "❌ No"}
//                                         </span>
//                                       </div>
//                                       <div className="flex items-center text-green-700">
//                                         <CheckCircle
//                                           className={`w-4 h-4 mr-3 ${booking.understandRisks ? "text-green-600" : "text-red-600"}`}
//                                         />
//                                         <span>Understands Risks: {booking.understandRisks ? "✅ Yes" : "❌ No"}</span>
//                                       </div>
//                                     </div>
//                                     <div className="space-y-3">
//                                       <div className="flex items-center text-green-700">
//                                         <CheckCircle
//                                           className={`w-4 h-4 mr-3 ${booking.informationAccurate ? "text-green-600" : "text-red-600"}`}
//                                         />
//                                         <span>
//                                           Information Accurate: {booking.informationAccurate ? "✅ Yes" : "❌ No"}
//                                         </span>
//                                       </div>
//                                       <div className="flex items-center text-green-700">
//                                         <CheckCircle
//                                           className={`w-4 h-4 mr-3 ${booking.consentToTreatment ? "text-green-600" : "text-red-600"}`}
//                                         />
//                                         <span>
//                                           Consents to Treatment: {booking.consentToTreatment ? "✅ Yes" : "❌ No"}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>

//                                   <div className="mt-4 p-3 bg-green-100 rounded border-l-4 border-green-500">
//                                     <p className="text-green-800 text-sm font-medium">
//                                       {booking.understandTreatment &&
//                                         booking.understandRisks &&
//                                         booking.informationAccurate &&
//                                         booking.consentToTreatment
//                                         ? "✅ All consent requirements have been met. Patient is cleared for treatment."
//                                         : "⚠️ Incomplete consent. Please verify all requirements before proceeding with treatment."}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </TabsContent>
//                             </Tabs>

//                             {booking.status !== "completed" && (
//                               <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
//                                 <div className="text-sm text-gray-500">
//                                   Patient ready for treatment:{" "}
//                                   {booking.understandTreatment &&
//                                     booking.understandRisks &&
//                                     booking.informationAccurate &&
//                                     booking.consentToTreatment
//                                     ? "✅ Yes"
//                                     : "⚠️ Pending consent"}
//                                 </div>
//                                 <Button
//                                   onClick={() => updateBookingStatus(booking._id, "completed")}
//                                   className="bg-green-600 hover:bg-green-700 text-white"
//                                   size="sm"
//                                 >
//                                   <CheckCircle className="w-4 h-4 mr-2" />
//                                   Mark as Completed
//                                 </Button>
//                               </div>
//                             )}
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </TabsContent>

//               {/* Users Tab */}
//               <TabsContent value="users">
//                 <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-8">User Management</h2>

//                 {users.length === 0 ? (
//                   <Card className="luxury-shadow border-0">
//                     <CardContent className="p-12 text-center">
//                       <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                       <h3 className="text-xl font-semibold text-gray-900 mb-2">No users yet</h3>
//                       <p className="text-gray-600">Users will appear here once they start registering.</p>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   <div className="grid gap-6">
//                     {users.map((user, index) => (
//                       <motion.div
//                         key={user._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                       >
//                         <Card className="luxury-shadow border-0 hover:shadow-2xl transition-shadow">
//                           <CardContent className="p-6">
//                             <div className="flex items-start justify-between mb-6">
//                               <div className="flex items-center space-x-4">
//                                 <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
//                                   <User className="w-6 h-6 text-white" />
//                                 </div>
//                                 <div>
//                                   <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
//                                   <p className="text-gray-600">{user.email}</p>
//                                   <div className="flex items-center space-x-2 mt-2">
//                                     <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
//                                     <Badge variant={user.isEmailVerified ? "default" : "destructive"}>
//                                       {user.isEmailVerified ? "Verified" : "Unverified"}
//                                     </Badge>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="text-right text-sm text-gray-500">
//                                 <div>User ID: {user._id.slice(-6)}</div>
//                                 <div>Joined: {formatDate(user.createdAt)}</div>
//                               </div>
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-6">
//                               <div>
//                                 <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
//                                   <Calendar className="w-4 h-4 mr-2 text-amber-600" />
//                                   Booking Statistics
//                                 </h4>
//                                 <div className="space-y-2">
//                                   <div className="flex justify-between">
//                                     <span className="text-gray-600">Total Bookings:</span>
//                                     <span className="font-medium text-amber-600">{user.bookingCount}</span>
//                                   </div>
//                                   <div className="flex justify-between">
//                                     <span className="text-gray-600">Account Status:</span>
//                                     <span
//                                       className={`font-medium ${user.isEmailVerified ? "text-green-600" : "text-red-600"}`}
//                                     >
//                                       {user.isEmailVerified ? "Active" : "Pending Verification"}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div>
//                                 <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
//                                   <Clock className="w-4 h-4 mr-2 text-amber-600" />
//                                   Recent Bookings
//                                 </h4>
//                                 {user.recentBookings && user.recentBookings.length > 0 ? (
//                                   <div className="space-y-2">
//                                     {user.recentBookings.map((booking) => (
//                                       <div key={booking._id} className="text-sm bg-gray-50 p-2 rounded">
//                                         <div className="flex justify-between items-center">
//                                           <span className="font-medium">{booking.service}</span>
//                                           <Badge className={getStatusColor(booking.status)} variant="outline">
//                                             {booking.status}
//                                           </Badge>
//                                         </div>
//                                         <div className="text-gray-500 text-xs">{formatDate(booking.date)}</div>
//                                       </div>
//                                     ))}
//                                   </div>
//                                 ) : (
//                                   <p className="text-gray-500 text-sm">No bookings yet</p>
//                                 )}
//                               </div>
//                             </div>

//                             <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
//                               <div className="text-sm text-gray-500">Member since {formatDate(user.createdAt)}</div>
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button
//                                     variant="outline"
//                                     size="sm"
//                                     className="bg-white border-gray-300 hover:bg-gray-50"
//                                   >
//                                     <Eye className="w-4 h-4 mr-2" />
//                                     View All Bookings
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-gray-200 shadow-2xl z-[100]">
//                                   <DialogHeader className="border-b border-gray-200 pb-4">
//                                     <DialogTitle className="text-xl font-semibold text-gray-900">
//                                       All Bookings for {user.name}
//                                     </DialogTitle>
//                                   </DialogHeader>
//                                   <div className="pt-4">
//                                     <UserBookingsView userId={user._id} />
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </TabsContent>
//             </Tabs>
//           </motion.div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }



// Admin page with mobile view errors fixed

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  FileText,
  RefreshCw,
  Users,
  MessageCircle,
  Plus,
  Edit,
  Eye,
  Trash2,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface UserType {
  _id: string
  name: string
  email: string
  role: string
  isEmailVerified: boolean
  createdAt: string
  bookingCount: number
  recentBookings: Array<{
    _id: string
    service: string
    date: string
    status: string
    createdAt: string
  }>
}

interface Booking {
  _id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
  age: string
  weight: string
  occupation: string
  address: string
  previousTreatment: string
  previousTreatmentDetails?: string
  bleedingDisorder?: string
  pregnant: string
  allergies?: string
  diabetic: string
  takingSupplements?: string
  supplementDetails?: string
  otherConditions?: string
  useSunblock: string
  useTanningLotion?: string
  treatedAreaBefore?: string
  treatmentName?: string
  planningHoliday?: string
  consentPhotos?: string
  understandTreatment: boolean
  understandRisks: boolean
  informationAccurate: boolean
  consentToTreatment: boolean
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
  userId?: string
  doctorFeedback?: {
    feedback: string
    treatmentNotes: string
    followUpRequired: boolean
    followUpDate?: string
    doctorName: string
    feedbackDate: string
  }
}

interface UserBookingsResponse {
  user: {
    _id: string
    name: string
    email: string
  }
  bookings: Booking[]
}

// Helper function for status colors
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

// Component to show user's bookings in dialog
function UserBookingsView({ userId }: { userId: string }) {
  const [userBookings, setUserBookings] = useState<UserBookingsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserBookings()
  }, [userId])

  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/users/${userId}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUserBookings(data)
      }
    } catch (error) {
      console.error("Failed to fetch user bookings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading bookings...</p>
      </div>
    )
  }

  if (!userBookings || userBookings.bookings.length === 0) {
    return <div className="text-center py-4 text-gray-500">No bookings found for this user.</div>
  }

  return (
    <div className="space-y-4">
      {userBookings.bookings.map((booking: any) => (
        <div key={booking._id} className="border rounded-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 space-y-2 sm:space-y-0">
            <h4 className="font-semibold text-sm sm:text-base">{booking.service}</h4>
            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm text-gray-600">
            <div>Date: {new Date(booking.date).toLocaleDateString()}</div>
            <div>Time: {booking.time}</div>
            <div>Phone: {booking.phone}</div>
            <div>Age: {booking.age}</div>
          </div>
          {booking.doctorFeedback && (
            <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
              <h5 className="font-medium text-blue-900 mb-1 text-sm">Doctor Feedback</h5>
              <p className="text-sm">{booking.doctorFeedback.feedback}</p>
              {booking.doctorFeedback.treatmentNotes && (
                <p className="text-sm mt-1">
                  <strong>Notes:</strong> {booking.doctorFeedback.treatmentNotes}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [users, setUsers] = useState<UserType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("bookings")
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [feedbackForm, setFeedbackForm] = useState({
    feedback: "",
    treatmentNotes: "",
    followUpRequired: false,
    followUpDate: "",
  })
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)
  const { user, loading } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && user?.role === "admin") {
      fetchAllData()
    } else if (!loading && (!user || user.role !== "admin")) {
      setError("Access denied. Admin privileges required.")
      setIsLoading(false)
    }
  }, [user, loading])

  const fetchAllData = async () => {
    try {
      setError(null)
      setRefreshing(true)
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("No authentication token found")
      }

      // Fetch bookings and users in parallel
      const [bookingsResponse, usersResponse] = await Promise.all([
        fetch("/api/admin/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
        fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
      ])

      if (!bookingsResponse.ok || !usersResponse.ok) {
        throw new Error("Failed to fetch data")
      }

      const [bookingsData, usersData] = await Promise.all([bookingsResponse.json(), usersResponse.json()])

      setBookings(bookingsData)
      setUsers(usersData)
    } catch (error) {
      console.error("Failed to fetch data:", error)
      setError(error instanceof Error ? error.message : "Failed to load data")
      toast({
        title: "Error",
        description: "Failed to load admin data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update status")
      }

      setBookings((prev) =>
        prev.map((booking) => (booking._id === bookingId ? { ...booking, status: status as any } : booking)),
      )

      toast({
        title: "Status updated",
        description: "Booking status has been updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update booking status:", error)
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      })
    }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBooking) return

    setIsSubmittingFeedback(true)

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("No authentication token found")
      }

      const method = selectedBooking.doctorFeedback ? "PUT" : "POST"
      const response = await fetch(`/api/admin/bookings/${selectedBooking._id}/feedback`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(feedbackForm),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save feedback")
      }

      const data = await response.json()

      // Update the booking in the list
      setBookings((prev) => prev.map((booking) => (booking._id === selectedBooking._id ? data.booking : booking)))

      toast({
        title: "Feedback saved",
        description: "Doctor feedback has been saved successfully.",
      })

      // Reset form and close dialog
      setFeedbackForm({
        feedback: "",
        treatmentNotes: "",
        followUpRequired: false,
        followUpDate: "",
      })
      setSelectedBooking(null)
    } catch (error) {
      console.error("Failed to save feedback:", error)
      toast({
        title: "Error",
        description: "Failed to save feedback.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  const handleDeleteFeedback = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this feedback? This action cannot be undone.")) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/bookings/${bookingId}/feedback`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // Refresh bookings to get updated data
        fetchAllData()
        // If we're viewing this booking's details, close the dialog
        if (selectedBooking && selectedBooking._id === bookingId) {
          setSelectedBooking(null)
        }
        toast({
          title: "Feedback deleted",
          description: "Doctor feedback has been deleted successfully.",
        })
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.message || "Failed to delete feedback",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting feedback:", error)
      toast({
        title: "Error",
        description: "Error deleting feedback",
        variant: "destructive",
      })
    }
  }

  const openFeedbackDialog = (booking: Booking) => {
    setSelectedBooking(booking)
    if (booking.doctorFeedback) {
      setFeedbackForm({
        feedback: booking.doctorFeedback.feedback || "",
        treatmentNotes: booking.doctorFeedback.treatmentNotes || "",
        followUpRequired: booking.doctorFeedback.followUpRequired || false,
        followUpDate: booking.doctorFeedback.followUpDate ? booking.doctorFeedback.followUpDate.split("T")[0] : "",
      })
    } else {
      setFeedbackForm({
        feedback: "",
        treatmentNotes: "",
        followUpRequired: false,
        followUpDate: "",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatYesNo = (value?: string) => {
    if (!value) return "Not specified"
    return value === "yes" ? "Yes" : value === "no" ? "No" : value
  }

  // Loading state
  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex flex-col luxury-gradient">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading admin dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Error state or access denied
  if (!user || user.role !== "admin" || error) {
    return (
      <div className="min-h-screen flex flex-col luxury-gradient">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{error || "Access Denied"}</h1>
            <p className="text-gray-600 mb-6">{error || "You don't have permission to access this page."}</p>
            {error && (
              <Button onClick={fetchAllData} className="bg-amber-600 hover:bg-amber-700">
                Try Again
              </Button>
            )}
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col luxury-gradient">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 admin-content">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-12 text-center sm:text-left"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-4">
              Manage bookings, users, and provide medical feedback.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
              <Button onClick={fetchAllData} variant="outline" className="bg-transparent" disabled={refreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
              <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 mb-8 sm:mb-12"
          >
            <Card className="luxury-shadow border-0">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Users</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl sm:text-3xl font-bold text-gray-900">{users.length}</div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow border-0">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl sm:text-3xl font-bold text-gray-900">{bookings.length}</div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow border-0">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Pending</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl sm:text-3xl font-bold text-yellow-600">
                  {bookings.filter((b) => b.status === "pending").length}
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow border-0">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Confirmed</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl sm:text-3xl font-bold text-blue-600">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow border-0 col-span-2 sm:col-span-1">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Completed</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl sm:text-3xl font-bold text-green-600">
                  {bookings.filter((b) => b.status === "completed").length}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
                <TabsTrigger value="bookings" className="flex items-center text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Bookings & Feedback</span>
                  <span className="sm:hidden">Bookings</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center text-xs sm:text-sm">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">User Management</span>
                  <span className="sm:hidden">Users</span>
                </TabsTrigger>
              </TabsList>

              {/* Bookings Tab */}
              <TabsContent value="bookings">
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
                  All Appointments
                </h2>

                {bookings.length === 0 ? (
                  <Card className="luxury-shadow border-0">
                    <CardContent className="p-8 sm:p-12 text-center">
                      <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Bookings will appear here once customers start making appointments.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 sm:gap-6">
                    {bookings.map((booking, index) => (
                      <motion.div
                        key={booking._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="luxury-shadow border-0 hover:shadow-2xl transition-shadow">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                              <div className="w-full sm:w-auto">
                                <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-3">
                                  {booking.service}
                                </h3>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </Badge>
                                  <Select
                                    value={booking.status}
                                    onValueChange={(value) => updateBookingStatus(booking._id, value)}
                                  >
                                    <SelectTrigger className="w-full sm:w-40">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="confirmed">Confirmed</SelectItem>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Dialog
                                    open={selectedBooking !== null}
                                    onOpenChange={(open) => !open && setSelectedBooking(null)}
                                  >
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openFeedbackDialog(booking)}
                                        className="bg-white border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
                                      >
                                        {booking.doctorFeedback ? (
                                          <>
                                            <Edit className="w-4 h-4 mr-2" />
                                            <span className="hidden sm:inline">Edit Feedback</span>
                                            <span className="sm:hidden">Edit</span>
                                          </>
                                        ) : (
                                          <>
                                            <Plus className="w-4 h-4 mr-2" />
                                            <span className="hidden sm:inline">Add Feedback</span>
                                            <span className="sm:hidden">Add</span>
                                          </>
                                        )}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-2xl z-[100] mx-4 max-h-[90vh] overflow-y-auto">
                                      <DialogHeader className="border-b border-gray-200 pb-4">
                                        <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                                          {selectedBooking?.doctorFeedback ? "Edit" : "Add"} Doctor Feedback
                                        </DialogTitle>
                                      </DialogHeader>
                                      <form onSubmit={handleFeedbackSubmit} className="space-y-4 sm:space-y-6 pt-4">
                                        <div>
                                          <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
                                            Treatment Feedback
                                          </Label>
                                          <Textarea
                                            id="feedback"
                                            value={feedbackForm.feedback}
                                            onChange={(e) =>
                                              setFeedbackForm((prev) => ({ ...prev, feedback: e.target.value }))
                                            }
                                            placeholder="Enter feedback about the treatment..."
                                            rows={4}
                                            className="mt-1 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="treatmentNotes" className="text-sm font-medium text-gray-700">
                                            Treatment Notes
                                          </Label>
                                          <Textarea
                                            id="treatmentNotes"
                                            value={feedbackForm.treatmentNotes}
                                            onChange={(e) =>
                                              setFeedbackForm((prev) => ({ ...prev, treatmentNotes: e.target.value }))
                                            }
                                            placeholder="Enter detailed treatment notes..."
                                            rows={4}
                                            className="mt-1 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                          />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <input
                                            type="checkbox"
                                            id="followUpRequired"
                                            checked={feedbackForm.followUpRequired}
                                            onChange={(e) =>
                                              setFeedbackForm((prev) => ({
                                                ...prev,
                                                followUpRequired: e.target.checked,
                                              }))
                                            }
                                            className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                          />
                                          <Label
                                            htmlFor="followUpRequired"
                                            className="text-sm font-medium text-gray-700"
                                          >
                                            Follow-up required
                                          </Label>
                                        </div>
                                        {feedbackForm.followUpRequired && (
                                          <div>
                                            <Label htmlFor="followUpDate" className="text-sm font-medium text-gray-700">
                                              Follow-up Date
                                            </Label>
                                            <Input
                                              type="date"
                                              id="followUpDate"
                                              value={feedbackForm.followUpDate}
                                              onChange={(e) =>
                                                setFeedbackForm((prev) => ({ ...prev, followUpDate: e.target.value }))
                                              }
                                              className="mt-1 bg-white border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                                            />
                                          </div>
                                        )}
                                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
                                          <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setSelectedBooking(null)}
                                            className="bg-white border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
                                          >
                                            Cancel
                                          </Button>
                                          {selectedBooking?.doctorFeedback && (
                                            <Button
                                              type="button"
                                              variant="destructive"
                                              onClick={() => handleDeleteFeedback(selectedBooking._id)}
                                              className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
                                            >
                                              <Trash2 className="w-4 h-4 mr-2" />
                                              Delete
                                            </Button>
                                          )}
                                          <Button
                                            type="submit"
                                            disabled={isSubmittingFeedback}
                                            className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto"
                                          >
                                            {isSubmittingFeedback ? "Saving..." : "Save Feedback"}
                                          </Button>
                                        </div>
                                      </form>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </div>
                              <div className="text-right text-xs sm:text-sm text-gray-500 w-full sm:w-auto">
                                <div>Booking ID: {booking._id.slice(-6)}</div>
                                <div>Booked: {formatDate(booking.createdAt)}</div>
                              </div>
                            </div>

                            {/* Doctor Feedback Display */}
                            {booking.doctorFeedback && (
                              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-blue-900 flex items-center text-sm sm:text-base">
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Doctor Feedback
                                  </h4>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteFeedback(booking._id)}
                                    className="h-6 w-6 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="space-y-2 text-xs sm:text-sm">
                                  {booking.doctorFeedback.feedback && (
                                    <p>
                                      <strong>Feedback:</strong> {booking.doctorFeedback.feedback}
                                    </p>
                                  )}
                                  {booking.doctorFeedback.treatmentNotes && (
                                    <p>
                                      <strong>Treatment Notes:</strong> {booking.doctorFeedback.treatmentNotes}
                                    </p>
                                  )}
                                  {booking.doctorFeedback.followUpRequired && (
                                    <p className="text-amber-700">
                                      <strong>Follow-up Required:</strong>{" "}
                                      {booking.doctorFeedback.followUpDate
                                        ? `Yes - ${formatDate(booking.doctorFeedback.followUpDate)}`
                                        : "Yes"}
                                    </p>
                                  )}
                                  <p className="text-gray-500">
                                    By {booking.doctorFeedback.doctorName} on{" "}
                                    {formatDate(booking.doctorFeedback.feedbackDate)}
                                  </p>
                                </div>
                              </div>
                            )}

                            <Tabs defaultValue="basic" className="w-full">
                              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 text-xs sm:text-sm">
                                <TabsTrigger value="basic">Basic</TabsTrigger>
                                <TabsTrigger value="personal">Personal</TabsTrigger>
                                <TabsTrigger value="medical">Medical</TabsTrigger>
                                <TabsTrigger value="consent">Consent</TabsTrigger>
                              </TabsList>

                              <TabsContent value="basic" className="mt-8 sm:mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 border-b pb-2 text-sm sm:text-base">
                                      Contact Information
                                    </h4>
                                    <div className="space-y-3">
                                      <div className="flex items-center text-gray-600 text-sm">
                                        <User className="w-4 h-4 mr-3 text-amber-600 flex-shrink-0" />
                                        <span className="break-all">{booking.name}</span>
                                      </div>
                                      <div className="flex items-center text-gray-600 text-sm">
                                        <Mail className="w-4 h-4 mr-3 text-amber-600 flex-shrink-0" />
                                        <span className="break-all">{booking.email}</span>
                                      </div>
                                      <div className="flex items-center text-gray-600 text-sm">
                                        <Phone className="w-4 h-4 mr-3 text-amber-600 flex-shrink-0" />
                                        <span>{booking.phone}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 border-b pb-2 text-sm sm:text-base">
                                      Appointment Details
                                    </h4>
                                    <div className="space-y-3">
                                      <div className="flex items-center text-gray-600 text-sm">
                                        <Calendar className="w-4 h-4 mr-3 text-amber-600 flex-shrink-0" />
                                        <span>{formatDate(booking.date)}</span>
                                      </div>
                                      <div className="flex items-center text-gray-600 text-sm">
                                        <Clock className="w-4 h-4 mr-3 text-amber-600 flex-shrink-0" />
                                        <span>{booking.time}</span>
                                      </div>
                                      <div className="flex items-start text-gray-600 text-sm">
                                        <FileText className="w-4 h-4 mr-3 mt-0.5 text-amber-600 flex-shrink-0" />
                                        <span>{booking.service}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {booking.message && (
                                    <div className="space-y-4 md:col-span-2 lg:col-span-1">
                                      <h4 className="font-semibold text-gray-900 border-b pb-2 text-sm sm:text-base">
                                        Additional Notes
                                      </h4>
                                      <div className="flex items-start text-gray-600 text-sm">
                                        <MessageSquare className="w-4 h-4 mr-3 mt-1 text-amber-600 flex-shrink-0" />
                                        <span>{booking.message}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </TabsContent>

                              <TabsContent value="personal" className="mt-8 sm:mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 border-b pb-2 text-sm sm:text-base">
                                      Personal Details
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Age:</span>
                                        <span className="font-medium">{booking.age} years</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Weight:</span>
                                        <span className="font-medium">{booking.weight} kg</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-gray-600">Occupation:</span>
                                        <span className="font-medium break-all">{booking.occupation}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 border-b pb-2 text-sm sm:text-base">
                                      Address
                                    </h4>
                                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                      {booking.address}
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="medical" className="mt-8 sm:mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                  <div className="space-y-6">
                                    <div>
                                      <h4 className="font-semibold text-gray-900 border-b pb-2 mb-4 text-sm sm:text-base">
                                        Medical History
                                      </h4>
                                      <div className="space-y-3 text-sm">
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Previous IPL/Laser Treatment:</span>
                                          <span
                                            className={`font-medium ${booking.previousTreatment === "yes" ? "text-amber-600" : "text-green-600"}`}
                                          >
                                            {formatYesNo(booking.previousTreatment)}
                                          </span>
                                        </div>
                                        {booking.previousTreatmentDetails && (
                                          <div className="text-xs text-gray-500 bg-amber-50 p-2 rounded">
                                            <strong>Details:</strong> {booking.previousTreatmentDetails}
                                          </div>
                                        )}
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Bleeding Disorder:</span>
                                          <span
                                            className={`font-medium ${booking.bleedingDisorder === "yes" ? "text-red-600" : "text-green-600"}`}
                                          >
                                            {formatYesNo(booking.bleedingDisorder)}
                                          </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Pregnant:</span>
                                          <span
                                            className={`font-medium ${booking.pregnant === "yes" ? "text-red-600" : "text-green-600"}`}
                                          >
                                            {formatYesNo(booking.pregnant)}
                                          </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Allergies:</span>
                                          <span
                                            className={`font-medium ${booking.allergies === "yes" ? "text-amber-600" : "text-green-600"}`}
                                          >
                                            {formatYesNo(booking.allergies)}
                                          </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Diabetic:</span>
                                          <span
                                            className={`font-medium ${booking.diabetic === "yes" ? "text-amber-600" : "text-green-600"}`}
                                          >
                                            {formatYesNo(booking.diabetic)}
                                          </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Taking Supplements:</span>
                                          <span
                                            className={`font-medium ${booking.takingSupplements === "yes" ? "text-amber-600" : "text-green-600"}`}
                                          >
                                            {formatYesNo(booking.takingSupplements)}
                                          </span>
                                        </div>
                                        {booking.supplementDetails && (
                                          <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                                            <strong>Supplements:</strong> {booking.supplementDetails}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {booking.otherConditions && (
                                      <div>
                                        <h5 className="font-medium text-gray-900 mb-2 text-sm">
                                          Other Medical Conditions:
                                        </h5>
                                        <div className="text-sm text-gray-600 bg-red-50 p-3 rounded-lg border-l-4 border-red-200">
                                          {booking.otherConditions}
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  <div className="space-y-6">
                                    <div>
                                      <h4 className="font-semibold text-gray-900 border-b pb-2 mb-4 text-sm sm:text-base">
                                        Treatment Information
                                      </h4>
                                      <div className="space-y-3 text-sm">
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Uses Sunblock:</span>
                                          <span
                                            className={`font-medium ${booking.useSunblock === "yes" ? "text-green-600" : "text-amber-600"}`}
                                          >
                                            {formatYesNo(booking.useSunblock)}
                                          </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Uses Tanning Lotion:</span>
                                          <span
                                            className={`font-medium ${booking.useTanningLotion === "yes" ? "text-amber-600" : "text-green-600"}`}
                                          >
                                            {formatYesNo(booking.useTanningLotion)}
                                          </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Treated Area Before:</span>
                                          <span
                                            className={`font-medium ${booking.treatedAreaBefore === "yes" ? "text-amber-600" : "text-green-600"}`}
                                          >
                                            {formatYesNo(booking.treatedAreaBefore)}
                                          </span>
                                        </div>
                                        {booking.treatmentName && (
                                          <div className="text-xs text-gray-500 bg-amber-50 p-2 rounded">
                                            <strong>Previous Treatment:</strong> {booking.treatmentName}
                                          </div>
                                        )}
                                        <div className="flex flex-col sm:flex-row sm:justify-between space-y-1 sm:space-y-0">
                                          <span className="text-gray-600">Consent to Photos:</span>
                                          <span
                                            className={`font-medium ${booking.consentPhotos === "yes" ? "text-green-600" : "text-amber-600"}`}
                                          >
                                            {formatYesNo(booking.consentPhotos)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {booking.planningHoliday && (
                                      <div>
                                        <h5 className="font-medium text-gray-900 mb-2 text-sm">
                                          Holiday/Sun Exposure Plans:
                                        </h5>
                                        <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-200">
                                          {booking.planningHoliday}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="consent" className="mt-8 sm:mt-6">
                                <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
                                  <h4 className="font-semibold text-green-800 mb-4 flex items-center text-sm sm:text-base">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Legal Consent Status
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
                                    <div className="space-y-3">
                                      <div className="flex items-center text-green-700">
                                        <CheckCircle
                                          className={`w-4 h-4 mr-3 flex-shrink-0 ${booking.understandTreatment ? "text-green-600" : "text-red-600"}`}
                                        />
                                        <span>
                                          Understands Treatment: {booking.understandTreatment ? "✅ Yes" : "❌ No"}
                                        </span>
                                      </div>
                                      <div className="flex items-center text-green-700">
                                        <CheckCircle
                                          className={`w-4 h-4 mr-3 flex-shrink-0 ${booking.understandRisks ? "text-green-600" : "text-red-600"}`}
                                        />
                                        <span>Understands Risks: {booking.understandRisks ? "✅ Yes" : "❌ No"}</span>
                                      </div>
                                    </div>
                                    <div className="space-y-3">
                                      <div className="flex items-center text-green-700">
                                        <CheckCircle
                                          className={`w-4 h-4 mr-3 flex-shrink-0 ${booking.informationAccurate ? "text-green-600" : "text-red-600"}`}
                                        />
                                        <span>
                                          Information Accurate: {booking.informationAccurate ? "✅ Yes" : "❌ No"}
                                        </span>
                                      </div>
                                      <div className="flex items-center text-green-700">
                                        <CheckCircle
                                          className={`w-4 h-4 mr-3 flex-shrink-0 ${booking.consentToTreatment ? "text-green-600" : "text-red-600"}`}
                                        />
                                        <span>
                                          Consents to Treatment: {booking.consentToTreatment ? "✅ Yes" : "❌ No"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-4 p-3 bg-green-100 rounded border-l-4 border-green-500">
                                    <p className="text-green-800 text-sm font-medium">
                                      {booking.understandTreatment &&
                                      booking.understandRisks &&
                                      booking.informationAccurate &&
                                      booking.consentToTreatment
                                        ? "✅ All consent requirements have been met. Patient is cleared for treatment."
                                        : "⚠️ Incomplete consent. Please verify all requirements before proceeding with treatment."}
                                    </p>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>

                            {booking.status !== "completed" && (
                              <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                                <div className="text-sm text-gray-500">
                                  Patient ready for treatment:{" "}
                                  {booking.understandTreatment &&
                                  booking.understandRisks &&
                                  booking.informationAccurate &&
                                  booking.consentToTreatment
                                    ? "✅ Yes"
                                    : "⚠️ Pending consent"}
                                </div>
                                <Button
                                  onClick={() => updateBookingStatus(booking._id, "completed")}
                                  className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
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
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 mb-6 sm:mb-8 text-center sm:text-left">
                  User Management
                </h2>

                {users.length === 0 ? (
                  <Card className="luxury-shadow border-0">
                    <CardContent className="p-8 sm:p-12 text-center">
                      <Users className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No users yet</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Users will appear here once they start registering.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 sm:gap-6">
                    {users.map((user, index) => (
                      <motion.div
                        key={user._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="luxury-shadow border-0 hover:shadow-2xl transition-shadow">
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
                              <div className="flex items-center space-x-4 w-full sm:w-auto">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
                                    {user.name}
                                  </h3>
                                  <p className="text-gray-600 text-sm sm:text-base truncate">{user.email}</p>
                                  <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                                    <Badge variant={user.isEmailVerified ? "default" : "destructive"}>
                                      {user.isEmailVerified ? "Verified" : "Unverified"}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="text-left sm:text-right text-xs sm:text-sm text-gray-500 w-full sm:w-auto">
                                <div>User ID: {user._id.slice(-6)}</div>
                                <div>Joined: {formatDate(user.createdAt)}</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                                  <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                                  Booking Statistics
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Total Bookings:</span>
                                    <span className="font-medium text-amber-600">{user.bookingCount}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Account Status:</span>
                                    <span
                                      className={`font-medium ${user.isEmailVerified ? "text-green-600" : "text-red-600"}`}
                                    >
                                      {user.isEmailVerified ? "Active" : "Pending Verification"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm sm:text-base">
                                  <Clock className="w-4 h-4 mr-2 text-amber-600" />
                                  Recent Bookings
                                </h4>
                                {user.recentBookings && user.recentBookings.length > 0 ? (
                                  <div className="space-y-2">
                                    {user.recentBookings.map((booking) => (
                                      <div key={booking._id} className="text-sm bg-gray-50 p-2 rounded">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0">
                                          <span className="font-medium truncate">{booking.service}</span>
                                          <Badge className={getStatusColor(booking.status)} variant="outline">
                                            {booking.status}
                                          </Badge>
                                        </div>
                                        <div className="text-gray-500 text-xs">{formatDate(booking.date)}</div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 text-sm">No bookings yet</p>
                                )}
                              </div>
                            </div>

                            <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                              <div className="text-sm text-gray-500">Member since {formatDate(user.createdAt)}</div>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white border-gray-300 hover:bg-gray-50 w-full sm:w-auto"
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View All Bookings
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-gray-200 shadow-2xl z-[100] mx-4">
                                  <DialogHeader className="border-b border-gray-200 pb-4">
                                    <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                                      All Bookings for {user.name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="pt-4">
                                    <UserBookingsView userId={user._id} />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
