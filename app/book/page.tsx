// "use client"

// import type React from "react"
// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Header } from "@/components/layout/header"
// import { Footer } from "@/components/layout/footer"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import {
//   Calendar,
//   Clock,
//   User,
//   Mail,
//   Phone,
//   MessageSquare,
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   AlertTriangle,
// } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// const services = [
//   "Laser Hair Removal",
//   "Skin Rejuvenation",
//   "Tattoo Removal",
//   "Acne Treatment",
//   "IPL Treatment",
//   "Consultation Only",
// ]
// const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

// interface BookingFormData {
//   // Basic booking info
//   name: string
//   email: string
//   phone: string
//   service: string
//   date: string
//   time: string
//   message: string

//   // Consent form data
//   age: string
//   weight: string
//   occupation: string
//   address: string

//   // Medical History
//   previousTreatment: string
//   previousTreatmentDetails: string
//   bleedingDisorder: string
//   pregnant: string
//   allergies: string
//   diabetic: string
//   takingSupplements: string
//   supplementDetails: string
//   otherConditions: string

//   // Additional Information
//   useSunblock: string
//   useTanningLotion: string
//   treatedAreaBefore: string
//   treatmentName: string
//   planningHoliday: string
//   consentPhotos: string

//   // Consent acknowledgment
//   understandTreatment: boolean
//   understandRisks: boolean
//   informationAccurate: boolean
//   consentToTreatment: boolean
// }

// export default function BookPage() {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [formData, setFormData] = useState<BookingFormData>({
//     name: "",
//     email: "",
//     phone: "",
//     service: "",
//     date: "",
//     time: "",
//     message: "",
//     age: "",
//     weight: "",
//     occupation: "",
//     address: "",
//     previousTreatment: "",
//     previousTreatmentDetails: "",
//     bleedingDisorder: "",
//     pregnant: "",
//     allergies: "",
//     diabetic: "",
//     takingSupplements: "",
//     supplementDetails: "",
//     otherConditions: "",
//     useSunblock: "",
//     useTanningLotion: "",
//     treatedAreaBefore: "",
//     treatmentName: "",
//     planningHoliday: "",
//     consentPhotos: "",
//     understandTreatment: false,
//     understandRisks: false,
//     informationAccurate: false,
//     consentToTreatment: false,
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const { toast } = useToast()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const response = await fetch("/api/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         toast({
//           title: "Booking Submitted!",
//           description: "We'll contact you soon to confirm your appointment.",
//         })
//         // Reset form
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           service: "",
//           date: "",
//           time: "",
//           message: "",
//           age: "",
//           weight: "",
//           occupation: "",
//           address: "",
//           previousTreatment: "",
//           previousTreatmentDetails: "",
//           bleedingDisorder: "",
//           pregnant: "",
//           allergies: "",
//           diabetic: "",
//           takingSupplements: "",
//           supplementDetails: "",
//           otherConditions: "",
//           useSunblock: "",
//           useTanningLotion: "",
//           treatedAreaBefore: "",
//           treatmentName: "",
//           planningHoliday: "",
//           consentPhotos: "",
//           understandTreatment: false,
//           understandRisks: false,
//           informationAccurate: false,
//           consentToTreatment: false,
//         })
//         setCurrentStep(1)
//       } else {
//         throw new Error("Failed to submit booking")
//       }
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to submit booking. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleInputChange = (field: keyof BookingFormData, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const nextStep = () => {
//     if (currentStep < 4) setCurrentStep(currentStep + 1)
//   }

//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1)
//   }

//   const canProceedToNextStep = () => {
//     switch (currentStep) {
//       case 1:
//         return formData.name && formData.email && formData.phone && formData.service && formData.date && formData.time
//       case 2:
//         return formData.age && formData.weight && formData.occupation && formData.address
//       case 3:
//         return formData.previousTreatment && formData.pregnant && formData.diabetic && formData.useSunblock
//       case 4:
//         return (
//           formData.understandTreatment &&
//           formData.understandRisks &&
//           formData.informationAccurate &&
//           formData.consentToTreatment
//         )
//       default:
//         return false
//     }
//   }

//   const renderStepIndicator = () => (
//     <div className="flex items-center justify-center mb-8">
//       {[1, 2, 3, 4].map((step) => (
//         <div key={step} className="flex items-center">
//           <div
//             className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
//               step <= currentStep ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-600"
//             }`}
//           >
//             {step}
//           </div>
//           {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-amber-600" : "bg-gray-200"}`} />}
//         </div>
//       ))}
//     </div>
//   )

//   const renderStep1 = () => (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-6"
//     >
//       <div className="text-center mb-6">
//         <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Appointment Details</h3>
//         <p className="text-gray-600">Let's start with your basic information and preferred appointment time.</p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="name" className="flex items-center text-gray-700 mb-2">
//             <User className="w-4 h-4 mr-2" />
//             Full Name
//           </Label>
//           <Input
//             id="name"
//             type="text"
//             value={formData.name}
//             onChange={(e) => handleInputChange("name", e.target.value)}
//             placeholder="Enter your full name"
//             required
//             className="h-12"
//           />
//         </div>

//         <div>
//           <Label htmlFor="age" className="flex items-center text-gray-700 mb-2">
//             <User className="w-4 h-4 mr-2" />
//             Age
//           </Label>
//           <Input
//             id="age"
//             type="number"
//             value={formData.age}
//             onChange={(e) => handleInputChange("age", e.target.value)}
//             placeholder="Enter your age"
//             required
//             className="h-12"
//           />
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="email" className="flex items-center text-gray-700 mb-2">
//             <Mail className="w-4 h-4 mr-2" />
//             Email Address
//           </Label>
//           <Input
//             id="email"
//             type="email"
//             value={formData.email}
//             onChange={(e) => handleInputChange("email", e.target.value)}
//             placeholder="Enter your email"
//             required
//             className="h-12"
//           />
//         </div>

//         <div>
//           <Label htmlFor="phone" className="flex items-center text-gray-700 mb-2">
//             <Phone className="w-4 h-4 mr-2" />
//             Phone Number
//           </Label>
//           <Input
//             id="phone"
//             type="tel"
//             value={formData.phone}
//             onChange={(e) => handleInputChange("phone", e.target.value)}
//             placeholder="Enter your phone number"
//             required
//             className="h-12"
//           />
//         </div>
//       </div>

//       <div>
//         <Label className="flex items-center text-gray-700 mb-2">
//           <MessageSquare className="w-4 h-4 mr-2" />
//           Service
//         </Label>
//         <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
//           <SelectTrigger className="h-12">
//             <SelectValue placeholder="Select a service" />
//           </SelectTrigger>
//           <SelectContent>
//             {services.map((service) => (
//               <SelectItem key={service} value={service}>
//                 {service}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="date" className="flex items-center text-gray-700 mb-2">
//             <Calendar className="w-4 h-4 mr-2" />
//             Preferred Date
//           </Label>
//           <Input
//             id="date"
//             type="date"
//             value={formData.date}
//             onChange={(e) => handleInputChange("date", e.target.value)}
//             required
//             className="h-12"
//             min={new Date().toISOString().split("T")[0]}
//           />
//         </div>

//         <div>
//           <Label className="flex items-center text-gray-700 mb-2">
//             <Clock className="w-4 h-4 mr-2" />
//             Preferred Time
//           </Label>
//           <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
//             <SelectTrigger className="h-12">
//               <SelectValue placeholder="Select time" />
//             </SelectTrigger>
//             <SelectContent>
//               {timeSlots.map((time) => (
//                 <SelectItem key={time} value={time}>
//                   {time}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </motion.div>
//   )

//   const renderStep2 = () => (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-6"
//     >
//       <div className="text-center mb-6">
//         <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Personal Information</h3>
//         <p className="text-gray-600">Please provide additional personal details for your treatment file.</p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="weight" className="text-gray-700 mb-2 block">
//             Weight (kg)
//           </Label>
//           <Input
//             id="weight"
//             type="number"
//             value={formData.weight}
//             onChange={(e) => handleInputChange("weight", e.target.value)}
//             placeholder="Enter your weight"
//             required
//             className="h-12"
//           />
//         </div>

//         <div>
//           <Label htmlFor="occupation" className="text-gray-700 mb-2 block">
//             Occupation
//           </Label>
//           <Input
//             id="occupation"
//             type="text"
//             value={formData.occupation}
//             onChange={(e) => handleInputChange("occupation", e.target.value)}
//             placeholder="Enter your occupation"
//             required
//             className="h-12"
//           />
//         </div>
//       </div>

//       <div>
//         <Label htmlFor="address" className="text-gray-700 mb-2 block">
//           Address
//         </Label>
//         <Textarea
//           id="address"
//           value={formData.address}
//           onChange={(e) => handleInputChange("address", e.target.value)}
//           placeholder="Enter your complete address"
//           required
//           rows={3}
//         />
//       </div>

//       <div>
//         <Label htmlFor="message" className="text-gray-700 mb-2 block">
//           Additional Message (Optional)
//         </Label>
//         <Textarea
//           id="message"
//           value={formData.message}
//           onChange={(e) => handleInputChange("message", e.target.value)}
//           placeholder="Any specific concerns or questions?"
//           rows={4}
//         />
//       </div>
//     </motion.div>
//   )

//   const renderStep3 = () => (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-6"
//     >
//       <div className="text-center mb-6">
//         <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Medical History</h3>
//         <p className="text-gray-600">This information helps us provide the safest and most effective treatment.</p>
//       </div>

//       {/* Medical History Questions */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Previous Treatments</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label className="text-gray-700 mb-3 block">
//               Have you had IPL/Laser Therapy or any other treatment previously?
//             </Label>
//             <RadioGroup
//               value={formData.previousTreatment}
//               onValueChange={(value) => handleInputChange("previousTreatment", value)}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="yes" id="prev-yes" />
//                 <Label htmlFor="prev-yes">Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="no" id="prev-no" />
//                 <Label htmlFor="prev-no">No</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {formData.previousTreatment === "yes" && (
//             <div>
//               <Label htmlFor="previousTreatmentDetails" className="text-gray-700 mb-2 block">
//                 Please specify which treatment
//               </Label>
//               <Input
//                 id="previousTreatmentDetails"
//                 value={formData.previousTreatmentDetails}
//                 onChange={(e) => handleInputChange("previousTreatmentDetails", e.target.value)}
//                 placeholder="Describe previous treatments"
//                 className="h-12"
//               />
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Health Conditions</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <Label className="text-gray-700 mb-3 block">Bleeding disorder</Label>
//               <RadioGroup
//                 value={formData.bleedingDisorder}
//                 onValueChange={(value) => handleInputChange("bleedingDisorder", value)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="bleeding-yes" />
//                   <Label htmlFor="bleeding-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="bleeding-no" />
//                   <Label htmlFor="bleeding-no">No</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div>
//               <Label className="text-gray-700 mb-3 block">Are you pregnant?</Label>
//               <RadioGroup value={formData.pregnant} onValueChange={(value) => handleInputChange("pregnant", value)}>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="pregnant-yes" />
//                   <Label htmlFor="pregnant-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="pregnant-no" />
//                   <Label htmlFor="pregnant-no">No</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div>
//               <Label className="text-gray-700 mb-3 block">Allergies</Label>
//               <RadioGroup value={formData.allergies} onValueChange={(value) => handleInputChange("allergies", value)}>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="allergies-yes" />
//                   <Label htmlFor="allergies-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="allergies-no" />
//                   <Label htmlFor="allergies-no">No</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div>
//               <Label className="text-gray-700 mb-3 block">Are you Diabetic?</Label>
//               <RadioGroup value={formData.diabetic} onValueChange={(value) => handleInputChange("diabetic", value)}>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="diabetic-yes" />
//                   <Label htmlFor="diabetic-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="diabetic-no" />
//                   <Label htmlFor="diabetic-no">No</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//           </div>

//           <div>
//             <Label className="text-gray-700 mb-3 block">Are you taking any supplements?</Label>
//             <RadioGroup
//               value={formData.takingSupplements}
//               onValueChange={(value) => handleInputChange("takingSupplements", value)}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="yes" id="supplements-yes" />
//                 <Label htmlFor="supplements-yes">Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="no" id="supplements-no" />
//                 <Label htmlFor="supplements-no">No</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {formData.takingSupplements === "yes" && (
//             <div>
//               <Label htmlFor="supplementDetails" className="text-gray-700 mb-2 block">
//                 Please list the supplements you are taking
//               </Label>
//               <Textarea
//                 id="supplementDetails"
//                 value={formData.supplementDetails}
//                 onChange={(e) => handleInputChange("supplementDetails", e.target.value)}
//                 placeholder="List all supplements, medications, or vitamins"
//                 rows={3}
//               />
//             </div>
//           )}

//           <div>
//             <Label htmlFor="otherConditions" className="text-gray-700 mb-2 block">
//               Please list any other medical conditions you have
//             </Label>
//             <Textarea
//               id="otherConditions"
//               value={formData.otherConditions}
//               onChange={(e) => handleInputChange("otherConditions", e.target.value)}
//               placeholder="Describe any other medical conditions or concerns"
//               rows={3}
//             />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Additional Information</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <Label className="text-gray-700 mb-3 block">Do you use sunblock?</Label>
//               <RadioGroup
//                 value={formData.useSunblock}
//                 onValueChange={(value) => handleInputChange("useSunblock", value)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="sunblock-yes" />
//                   <Label htmlFor="sunblock-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="sunblock-no" />
//                   <Label htmlFor="sunblock-no">No</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div>
//               <Label className="text-gray-700 mb-3 block">Do you use tanning lotion?</Label>
//               <RadioGroup
//                 value={formData.useTanningLotion}
//                 onValueChange={(value) => handleInputChange("useTanningLotion", value)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="yes" id="tanning-yes" />
//                   <Label htmlFor="tanning-yes">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="no" id="tanning-no" />
//                   <Label htmlFor="tanning-no">No</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//           </div>

//           <div>
//             <Label className="text-gray-700 mb-3 block">Have you treated in this area before?</Label>
//             <RadioGroup
//               value={formData.treatedAreaBefore}
//               onValueChange={(value) => handleInputChange("treatedAreaBefore", value)}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="yes" id="treated-yes" />
//                 <Label htmlFor="treated-yes">Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="no" id="treated-no" />
//                 <Label htmlFor="treated-no">No</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {formData.treatedAreaBefore === "yes" && (
//             <div>
//               <Label htmlFor="treatmentName" className="text-gray-700 mb-2 block">
//                 Please state name of treatment
//               </Label>
//               <Input
//                 id="treatmentName"
//                 value={formData.treatmentName}
//                 onChange={(e) => handleInputChange("treatmentName", e.target.value)}
//                 placeholder="Name of previous treatment in this area"
//                 className="h-12"
//               />
//             </div>
//           )}

//           <div>
//             <Label htmlFor="planningHoliday" className="text-gray-700 mb-2 block">
//               Are you planning a holiday in the sun & do you have a sun tan?
//             </Label>
//             <Textarea
//               id="planningHoliday"
//               value={formData.planningHoliday}
//               onChange={(e) => handleInputChange("planningHoliday", e.target.value)}
//               placeholder="Please provide details about upcoming sun exposure or current tan"
//               rows={2}
//             />
//           </div>

//           <div>
//             <Label className="text-gray-700 mb-3 block">
//               In order to assess your treatment progress, we will need to take photos of the area being treated. Do you
//               consent to having your picture taken for your file?
//             </Label>
//             <RadioGroup
//               value={formData.consentPhotos}
//               onValueChange={(value) => handleInputChange("consentPhotos", value)}
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="yes" id="photos-yes" />
//                 <Label htmlFor="photos-yes">Yes</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="no" id="photos-no" />
//                 <Label htmlFor="photos-no">No</Label>
//               </div>
//             </RadioGroup>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )

//   const renderStep4 = () => (
//     <motion.div
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       className="space-y-6"
//     >
//       <div className="text-center mb-6">
//         <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Treatment Consent</h3>
//         <p className="text-gray-600">Please read and acknowledge the following information carefully.</p>
//       </div>

//       <Card className="border-amber-200">
//         <CardHeader className="bg-amber-50">
//           <CardTitle className="flex items-center text-amber-800">
//             <AlertTriangle className="w-5 h-5 mr-2" />
//             Important Treatment Information
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-6">
//           <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
//             <p>
//               It has been explained to me that IPL/Laser Aesthetic treatment will help to improve the condition and the
//               appearance of the area being treated and that clinical results may vary from person to person. I
//               understand that multiple treatments are necessary to achieve optimal results.
//             </p>

//             <p>
//               I have also been advised that there can be short term effects such as reddening, mild burning, temporary
//               bruising and temporary discoloration of the skin, as well as possibility of blistering and mild scarring.
//               Although these side effects are not permanent, I understand a time cannot be predicted for recovery of the
//               skin.
//             </p>

//             <p>
//               I have been informed that if I do blister some long-term pigmentation may occur. This is more evident in
//               tattoo removal and vascular therapy. I understand that any pre-paid treatment package is non-refundable
//               and non-transferable.
//             </p>

//             <p>
//               All possible risks and side effects have been explained to me and I confirm I fully understand them. I
//               have been given the opportunity to ask any questions relevant to my treatment and risks involved.
//             </p>

//             <p>
//               I will inform my consultant/therapist immediately if I plan to have an alternative treatment on the same
//               area. DR.AR AESTHETIC CLINIC reserves the right to stop treatment if we learn that another treatment is
//               being carried out which may be contradictory to the results of our treatment.
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="space-y-4">
//         <div className="flex items-start space-x-3">
//           <Checkbox
//             id="understandTreatment"
//             checked={formData.understandTreatment}
//             onCheckedChange={(checked) => handleInputChange("understandTreatment", checked as boolean)}
//           />
//           <Label htmlFor="understandTreatment" className="text-sm text-gray-700 leading-relaxed">
//             I understand that multiple treatments are necessary to achieve optimal results and that clinical results may
//             vary from person to person.
//           </Label>
//         </div>

//         <div className="flex items-start space-x-3">
//           <Checkbox
//             id="understandRisks"
//             checked={formData.understandRisks}
//             onCheckedChange={(checked) => handleInputChange("understandRisks", checked as boolean)}
//           />
//           <Label htmlFor="understandRisks" className="text-sm text-gray-700 leading-relaxed">
//             I understand all possible risks and side effects have been explained to me, including reddening, mild
//             burning, temporary bruising, discoloration, blistering, and mild scarring.
//           </Label>
//         </div>

//         <div className="flex items-start space-x-3">
//           <Checkbox
//             id="informationAccurate"
//             checked={formData.informationAccurate}
//             onCheckedChange={(checked) => handleInputChange("informationAccurate", checked as boolean)}
//           />
//           <Label htmlFor="informationAccurate" className="text-sm text-gray-700 leading-relaxed">
//             I confirm all information provided by me is accurate and complete.
//           </Label>
//         </div>

//         <div className="flex items-start space-x-3">
//           <Checkbox
//             id="consentToTreatment"
//             checked={formData.consentToTreatment}
//             onCheckedChange={(checked) => handleInputChange("consentToTreatment", checked as boolean)}
//           />
//           <Label htmlFor="consentToTreatment" className="text-sm text-gray-700 leading-relaxed">
//             I agree that I fully understand all information given to me verbally and within this disclaimer. I consent
//             to having my treatment at DR.AR AESTHETIC CLINIC.
//           </Label>
//         </div>
//       </div>
//     </motion.div>
//   )

//   return (
//     <div className="min-h-screen luxury-gradient">
//       <Header />

//       <main className="pt-24">
//         {/* Hero Section */}
//         <section className="py-16">
//           <div className="container mx-auto px-4 text-center">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
//               <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
//                 Book Your
//                 <span className="block gold-accent">Appointment</span>
//               </h1>
//               <p className="text-xl text-gray-600 leading-relaxed">
//                 Complete our comprehensive consultation form to ensure the safest and most effective treatment.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Booking Form */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto">
//               <div className="bg-white rounded-3xl p-8 luxury-shadow">
//                 {renderStepIndicator()}

//                 <form onSubmit={handleSubmit}>
//                   <AnimatePresence mode="wait">
//                     {currentStep === 1 && renderStep1()}
//                     {currentStep === 2 && renderStep2()}
//                     {currentStep === 3 && renderStep3()}
//                     {currentStep === 4 && renderStep4()}
//                   </AnimatePresence>

//                   {/* Navigation Buttons */}
//                   <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
//                     <Button
//                       type="button"
//                       onClick={prevStep}
//                       disabled={currentStep === 1}
//                       variant="outline"
//                       className="flex items-center bg-transparent"
//                     >
//                       <ChevronLeft className="w-4 h-4 mr-2" />
//                       Previous
//                     </Button>

//                     {currentStep < 4 ? (
//                       <Button
//                         type="button"
//                         onClick={nextStep}
//                         disabled={!canProceedToNextStep()}
//                         className="bg-amber-600 hover:bg-amber-700 flex items-center"
//                       >
//                         Next
//                         <ChevronRight className="w-4 h-4 ml-2" />
//                       </Button>
//                     ) : (
//                       <Button
//                         type="submit"
//                         disabled={isSubmitting || !canProceedToNextStep()}
//                         className="bg-amber-600 hover:bg-amber-700 flex items-center"
//                       >
//                         {isSubmitting ? "Submitting..." : "Submit Booking"}
//                         <FileText className="w-4 h-4 ml-2" />
//                       </Button>
//                     )}
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   )
// }
















"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const services = [
  "Gold_Hydra_Facial",
  "Silver_Hydra_Facial",
  "Platinum_Hydra_Facial",
  "Baby_Doll_Facial_Carbon_Facial",
  "Vampire_Facial",
  "Derma_Abrasion",
  "BB_Glow_Facial",
  "LED_Light_Facial",
  "Photo_Facial",
  "Skin_Rejuvenation_Facial",
  "RF_Facial_Laser",

  // Peels
  "Chemical_Peel",
  "Whitening_Peel",
  "Acne_Peel",
  "Scars_Peel",
  "Melasma_Peel",
  "Glowing_Peel",

  // Laser Hair Removal (LHR)
  "Face_LHR",
  "Neck_LHR",
  "Face_Neck_LHR",
  "Half_Arms_LHR",
  "Full_Arms_LHR",
  "Half_Legs_LHR",
  "Full_Legs_LHR",
  "Tummy_LHR",
  "Armpit_LHR",
  "Bikini_LHR",
  "Full_Body_LHR",

  // Minimal Invasive Procedures
  "Micro_Needling",
  "Face_PRP",
  "Head_PRP",
  "Face_Exosomes",
  "Head_Exosomes",
  "Plexer_Per_Area",
  "Skin_Tag_Removal",
  "Warts_Removal",
  "Mole_Removal",
  "Tattoo_Removal",
  "Stretch_Mark_Removal",

  // Fat Reduction Treatments
  "Weight_Loss_Injections",
  "Weight_Loss_Drips",
  "RF_Monopolar",

  // Whitening Treatments
  "Whitening_Injections",
  "Whitening_Drips",
  "Whitening_Drops",
  "Whitening_Medicine",
  "Whitening_Peel_Facial",

  // Drips
  "Multivitamin_Drips",
  "Nutrition_Drips",
  "Collagen_Drips_Wrinkle_Free_Korean_Skin",
  "Glowing_Drips",

  // Semi-Permanent Makeup
  "BB_Glow",
  "Lip_Tint",
  "Cheek_Tint",
  "Pink_Lips_Laser",
  "Lash_Extensions",
  "Eyelash_Uplift",
  "Microblading",
  "Micropigmentation",
  "Dermaplaning",

  // Invasive Procedures
  "Botox",

  // General
  "Consultation_Only",
]
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

interface BookingFormData {
  // Basic booking info
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string

  // Consent form data
  age: string
  weight: string
  occupation: string
  address: string

  // Medical History
  previousTreatment: string
  previousTreatmentDetails: string
  bleedingDisorder: string
  pregnant: string
  allergies: string
  diabetic: string
  takingSupplements: string
  supplementDetails: string
  otherConditions: string

  // Additional Information
  useSunblock: string
  useTanningLotion: string
  treatedAreaBefore: string
  treatmentName: string
  planningHoliday: string
  consentPhotos: string

  // Consent acknowledgment
  understandTreatment: boolean
  understandRisks: boolean
  informationAccurate: boolean
  consentToTreatment: boolean
}

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
    age: "",
    weight: "",
    occupation: "",
    address: "",
    previousTreatment: "",
    previousTreatmentDetails: "",
    bleedingDisorder: "",
    pregnant: "",
    allergies: "",
    diabetic: "",
    takingSupplements: "",
    supplementDetails: "",
    otherConditions: "",
    useSunblock: "",
    useTanningLotion: "",
    treatedAreaBefore: "",
    treatmentName: "",
    planningHoliday: "",
    consentPhotos: "",
    understandTreatment: false,
    understandRisks: false,
    informationAccurate: false,
    consentToTreatment: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Booking Submitted!",
          description: "We'll contact you soon to confirm your appointment.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          message: "",
          age: "",
          weight: "",
          occupation: "",
          address: "",
          previousTreatment: "",
          previousTreatmentDetails: "",
          bleedingDisorder: "",
          pregnant: "",
          allergies: "",
          diabetic: "",
          takingSupplements: "",
          supplementDetails: "",
          otherConditions: "",
          useSunblock: "",
          useTanningLotion: "",
          treatedAreaBefore: "",
          treatmentName: "",
          planningHoliday: "",
          consentPhotos: "",
          understandTreatment: false,
          understandRisks: false,
          informationAccurate: false,
          consentToTreatment: false,
        })
        setCurrentStep(1)
      } else {
        throw new Error("Failed to submit booking")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof BookingFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.service && formData.date && formData.time
      case 2:
        return formData.age && formData.weight && formData.occupation && formData.address
      case 3:
        return formData.previousTreatment && formData.pregnant && formData.diabetic && formData.useSunblock
      case 4:
        return (
          formData.understandTreatment &&
          formData.understandRisks &&
          formData.informationAccurate &&
          formData.consentToTreatment
        )
      default:
        return false
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
          >
            {step}
          </div>
          {step < 4 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-amber-600" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Appointment Details</h3>
        <p className="text-gray-600">Let's start with your basic information and preferred appointment time.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="flex items-center text-gray-700 mb-2">
            <User className="w-4 h-4 mr-2" />
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
            required
            className="h-12"
          />
        </div>

        <div>
          <Label htmlFor="age" className="flex items-center text-gray-700 mb-2">
            <User className="w-4 h-4 mr-2" />
            Age
          </Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            placeholder="Enter your age"
            required
            className="h-12"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email" className="flex items-center text-gray-700 mb-2">
            <Mail className="w-4 h-4 mr-2" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email"
            required
            className="h-12"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center text-gray-700 mb-2">
            <Phone className="w-4 h-4 mr-2" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            required
            className="h-12"
          />
        </div>
      </div>

      <div>
        <Label className="flex items-center text-gray-700 mb-2">
          <MessageSquare className="w-4 h-4 mr-2" />
          Service
        </Label>
        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            {services.map((service) => (
              <SelectItem key={service} value={service} className="py-2">
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date" className="flex items-center text-gray-700 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            Preferred Date
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            required
            className="h-12"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          <Label className="flex items-center text-gray-700 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            Preferred Time
          </Label>
          <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-600">Please provide additional personal details for your treatment file.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="weight" className="text-gray-700 mb-2 block">
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            value={formData.weight}
            onChange={(e) => handleInputChange("weight", e.target.value)}
            placeholder="Enter your weight"
            required
            className="h-12"
          />
        </div>

        <div>
          <Label htmlFor="occupation" className="text-gray-700 mb-2 block">
            Occupation
          </Label>
          <Input
            id="occupation"
            type="text"
            value={formData.occupation}
            onChange={(e) => handleInputChange("occupation", e.target.value)}
            placeholder="Enter your occupation"
            required
            className="h-12"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address" className="text-gray-700 mb-2 block">
          Address
        </Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Enter your complete address"
          required
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="message" className="text-gray-700 mb-2 block">
          Additional Message (Optional)
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Any specific concerns or questions?"
          rows={4}
        />
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Medical History</h3>
        <p className="text-gray-600">This information helps us provide the safest and most effective treatment.</p>
      </div>

      {/* Medical History Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Previous Treatments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-700 mb-3 block">
              Have you had IPL/Laser Therapy or any other treatment previously?
            </Label>
            <RadioGroup
              value={formData.previousTreatment}
              onValueChange={(value) => handleInputChange("previousTreatment", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="prev-yes" />
                <Label htmlFor="prev-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="prev-no" />
                <Label htmlFor="prev-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.previousTreatment === "yes" && (
            <div>
              <Label htmlFor="previousTreatmentDetails" className="text-gray-700 mb-2 block">
                Please specify which treatment
              </Label>
              <Input
                id="previousTreatmentDetails"
                value={formData.previousTreatmentDetails}
                onChange={(e) => handleInputChange("previousTreatmentDetails", e.target.value)}
                placeholder="Describe previous treatments"
                className="h-12"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Health Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-700 mb-3 block">Bleeding disorder</Label>
              <RadioGroup
                value={formData.bleedingDisorder}
                onValueChange={(value) => handleInputChange("bleedingDisorder", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="bleeding-yes" />
                  <Label htmlFor="bleeding-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="bleeding-no" />
                  <Label htmlFor="bleeding-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 mb-3 block">Are you pregnant?</Label>
              <RadioGroup value={formData.pregnant} onValueChange={(value) => handleInputChange("pregnant", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pregnant-yes" />
                  <Label htmlFor="pregnant-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pregnant-no" />
                  <Label htmlFor="pregnant-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 mb-3 block">Allergies</Label>
              <RadioGroup value={formData.allergies} onValueChange={(value) => handleInputChange("allergies", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="allergies-yes" />
                  <Label htmlFor="allergies-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="allergies-no" />
                  <Label htmlFor="allergies-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 mb-3 block">Are you Diabetic?</Label>
              <RadioGroup value={formData.diabetic} onValueChange={(value) => handleInputChange("diabetic", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="diabetic-yes" />
                  <Label htmlFor="diabetic-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="diabetic-no" />
                  <Label htmlFor="diabetic-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Label className="text-gray-700 mb-3 block">Are you taking any supplements?</Label>
            <RadioGroup
              value={formData.takingSupplements}
              onValueChange={(value) => handleInputChange("takingSupplements", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="supplements-yes" />
                <Label htmlFor="supplements-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="supplements-no" />
                <Label htmlFor="supplements-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.takingSupplements === "yes" && (
            <div>
              <Label htmlFor="supplementDetails" className="text-gray-700 mb-2 block">
                Please list the supplements you are taking
              </Label>
              <Textarea
                id="supplementDetails"
                value={formData.supplementDetails}
                onChange={(e) => handleInputChange("supplementDetails", e.target.value)}
                placeholder="List all supplements, medications, or vitamins"
                rows={3}
              />
            </div>
          )}

          <div>
            <Label htmlFor="otherConditions" className="text-gray-700 mb-2 block">
              Please list any other medical conditions you have
            </Label>
            <Textarea
              id="otherConditions"
              value={formData.otherConditions}
              onChange={(e) => handleInputChange("otherConditions", e.target.value)}
              placeholder="Describe any other medical conditions or concerns"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-700 mb-3 block">Do you use sunblock?</Label>
              <RadioGroup
                value={formData.useSunblock}
                onValueChange={(value) => handleInputChange("useSunblock", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="sunblock-yes" />
                  <Label htmlFor="sunblock-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="sunblock-no" />
                  <Label htmlFor="sunblock-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-gray-700 mb-3 block">Do you use tanning lotion?</Label>
              <RadioGroup
                value={formData.useTanningLotion}
                onValueChange={(value) => handleInputChange("useTanningLotion", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="tanning-yes" />
                  <Label htmlFor="tanning-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="tanning-no" />
                  <Label htmlFor="tanning-no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Label className="text-gray-700 mb-3 block">Have you treated in this area before?</Label>
            <RadioGroup
              value={formData.treatedAreaBefore}
              onValueChange={(value) => handleInputChange("treatedAreaBefore", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="treated-yes" />
                <Label htmlFor="treated-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="treated-no" />
                <Label htmlFor="treated-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.treatedAreaBefore === "yes" && (
            <div>
              <Label htmlFor="treatmentName" className="text-gray-700 mb-2 block">
                Please state name of treatment
              </Label>
              <Input
                id="treatmentName"
                value={formData.treatmentName}
                onChange={(e) => handleInputChange("treatmentName", e.target.value)}
                placeholder="Name of previous treatment in this area"
                className="h-12"
              />
            </div>
          )}

          <div>
            <Label htmlFor="planningHoliday" className="text-gray-700 mb-2 block">
              Are you planning a holiday in the sun & do you have a sun tan?
            </Label>
            <Textarea
              id="planningHoliday"
              value={formData.planningHoliday}
              onChange={(e) => handleInputChange("planningHoliday", e.target.value)}
              placeholder="Please provide details about upcoming sun exposure or current tan"
              rows={2}
            />
          </div>

          <div>
            <Label className="text-gray-700 mb-3 block">
              In order to assess your treatment progress, we will need to take photos of the area being treated. Do you
              consent to having your picture taken for your file?
            </Label>
            <RadioGroup
              value={formData.consentPhotos}
              onValueChange={(value) => handleInputChange("consentPhotos", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="photos-yes" />
                <Label htmlFor="photos-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="photos-no" />
                <Label htmlFor="photos-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderStep4 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Treatment Consent</h3>
        <p className="text-gray-600">Please read and acknowledge the following information carefully.</p>
      </div>

      <Card className="border-amber-200">
        <CardHeader className="bg-amber-50">
          <CardTitle className="flex items-center text-amber-800">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Important Treatment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
            <p>
              It has been explained to me that IPL/Laser Aesthetic treatment will help to improve the condition and the
              appearance of the area being treated and that clinical results may vary from person to person. I
              understand that multiple treatments are necessary to achieve optimal results.
            </p>

            <p>
              I have also been advised that there can be short term effects such as reddening, mild burning, temporary
              bruising and temporary discoloration of the skin, as well as possibility of blistering and mild scarring.
              Although these side effects are not permanent, I understand a time cannot be predicted for recovery of the
              skin.
            </p>

            <p>
              I have been informed that if I do blister some long-term pigmentation may occur. This is more evident in
              tattoo removal and vascular therapy. I understand that any pre-paid treatment package is non-refundable
              and non-transferable.
            </p>

            <p>
              All possible risks and side effects have been explained to me and I confirm I fully understand them. I
              have been given the opportunity to ask any questions relevant to my treatment and risks involved.
            </p>

            <p>
              I will inform my consultant/therapist immediately if I plan to have an alternative treatment on the same
              area. DR.AR AESTHETIC CLINIC reserves the right to stop treatment if we learn that another treatment is
              being carried out which may be contradictory to the results of our treatment.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="understandTreatment"
            checked={formData.understandTreatment}
            onCheckedChange={(checked) => handleInputChange("understandTreatment", checked as boolean)}
          />
          <Label htmlFor="understandTreatment" className="text-sm text-gray-700 leading-relaxed">
            I understand that multiple treatments are necessary to achieve optimal results and that clinical results may
            vary from person to person.
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="understandRisks"
            checked={formData.understandRisks}
            onCheckedChange={(checked) => handleInputChange("understandRisks", checked as boolean)}
          />
          <Label htmlFor="understandRisks" className="text-sm text-gray-700 leading-relaxed">
            I understand all possible risks and side effects have been explained to me, including reddening, mild
            burning, temporary bruising, discoloration, blistering, and mild scarring.
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="informationAccurate"
            checked={formData.informationAccurate}
            onCheckedChange={(checked) => handleInputChange("informationAccurate", checked as boolean)}
          />
          <Label htmlFor="informationAccurate" className="text-sm text-gray-700 leading-relaxed">
            I confirm all information provided by me is accurate and complete.
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="consentToTreatment"
            checked={formData.consentToTreatment}
            onCheckedChange={(checked) => handleInputChange("consentToTreatment", checked as boolean)}
          />
          <Label htmlFor="consentToTreatment" className="text-sm text-gray-700 leading-relaxed">
            I agree that I fully understand all information given to me verbally and within this disclaimer. I consent
            to having my treatment at DR.AR AESTHETIC CLINIC.
          </Label>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
                Book Your
                <span className="block gold-accent">Appointment</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Complete our comprehensive consultation form to ensure the safest and most effective treatment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 luxury-shadow">
                {renderStepIndicator()}

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      variant="outline"
                      className="flex items-center bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!canProceedToNextStep()}
                        className="bg-amber-600 hover:bg-amber-700 flex items-center"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting || !canProceedToNextStep()}
                        className="bg-amber-600 hover:bg-amber-700 flex items-center"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Booking"}
                        <FileText className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
