"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Instagram, MessageSquare, Send } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || "General Inquiry",
          message: formData.message,
        }),
      })

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        })

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+923709980002"],
      description: "Call us for immediate assistance",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["drabaestheticlaserclinic@gmail.com"],
      description: "Send us your questions anytime",
    },
    {
      icon: Instagram,
      title: "Social Media",
      details: ["Dr. AB Aesthetic & Laser Clinic"],
      description: "Follow us for updates and tips",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM", "Sun: Closed"],
      description: "We're here when you need us",
    },
  ]

  const services = [
    "Laser Hair Removal",
    "Skin Rejuvenation",
    "Acne Treatment",
    "Tattoo Removal",
    "IPL Treatment",
    "Skin Cancer Screening",
    "Anti-Aging Treatments",
    "Pigmentation Treatment",
  ]

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
                Get In <span className="block gold-accent">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Ready to start your journey to healthier, more beautiful skin? We're here to help you every step of the
                way.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multiple ways to reach our expert team at Dr. AB Aesthetic & Laser Skin Clinic
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="luxury-shadow border-0 h-full hover:shadow-2xl transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <info.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                      <div className="space-y-2 mb-4">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-800 font-medium">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Services */}
        <section className="py-16 luxury-gradient">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="luxury-shadow border-0">
                  <CardHeader>
                    <CardTitle className="text-3xl font-playfair font-bold text-gray-900 flex items-center">
                      <MessageSquare className="w-8 h-8 mr-3 text-amber-600" />
                      Send Us a Message
                    </CardTitle>
                    <p className="text-gray-600">
                      Have questions about our treatments? Fill out the form below and we'll get back to you within 24
                      hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-700 mb-2 block">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                            required
                            className="h-12"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter your phone number"
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700 mb-2 block">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email address"
                          required
                          className="h-12"
                        />
                      </div>

                      <div>
                        <Label htmlFor="service" className="text-gray-700 mb-2 block">
                          Service of Interest
                        </Label>
                        <Input
                          id="service"
                          type="text"
                          value={formData.service}
                          onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))}
                          placeholder="Which service are you interested in?"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-gray-700 mb-2 block">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                          placeholder="Tell us about your skin concerns or questions..."
                          required
                          rows={6}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 text-lg"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Services & Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Our Services */}
                <Card className="luxury-shadow border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair font-bold text-gray-900">Our Services</CardTitle>
                    <p className="text-gray-600">Comprehensive aesthetic and dermatological treatments</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((service, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 flex-shrink-0"></div>
                          {service}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Us */}
                <Card className="luxury-shadow border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair font-bold text-gray-900">Why Choose Us?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">International Expertise</h4>
                          <p className="text-sm text-gray-600">15+ years of Australian medical experience</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Advanced Technology</h4>
                          <p className="text-sm text-gray-600">Latest laser and aesthetic equipment</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Personalized Care</h4>
                          <p className="text-sm text-gray-600">Tailored treatment plans for each patient</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Proven Results</h4>
                          <p className="text-sm text-gray-600">Thousands of satisfied patients</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card className="luxury-shadow border-0 bg-amber-50 border-amber-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">Need Immediate Assistance?</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      For urgent skin concerns or post-treatment questions, call us directly:
                    </p>
                    <div className="flex items-center text-amber-700 font-semibold">
                      <Phone className="w-4 h-4 mr-2" />
                      +923709980002
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Location & Directions */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Visit Our Clinic</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Located in a convenient and accessible area with modern facilities designed for your comfort
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="luxury-shadow border-0">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-6 flex items-center">
                      <MapPin className="w-6 h-6 mr-3 text-amber-600" />
                      Dr. AB Aesthetic & Laser Skin Clinic
                    </h3>
                    <div className="space-y-4 text-gray-600">
                      <p>
                        <strong>Address:</strong>
                        <br />
                        DR AB Aesthetic and Laser Clinic
                        <br />
                        Jalalpur Rd, near Kalma Chowk, Hafizabad, Pakistan
                      </p>
                      <p>
                        <strong>Parking:</strong> Free parking available on-site
                      </p>
                      <p>
                        <strong>Accessibility:</strong> Wheelchair accessible facility
                      </p>
                      <p>
                        <strong>Public Transport:</strong> Easily accessible by bus and taxi
                      </p>
                    </div>
                    {/* <div className="mt-6">
                      <Button className="bg-amber-600 hover:bg-amber-700">Get Directions</Button>
                    </div> */}
                    <div className="mt-6">
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=DR+AB+AESTHETIC+AND+LASER+SKIN+CLINIC+HAFIZABAD&destination_place_id=0x391f4de862b3f7e1:0x63e5e80ec4f39c09"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          Get Directions
                        </Button>
                      </a>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="rounded-lg overflow-hidden h-96 luxury-shadow">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.02678510889!2d73.67751407542923!3d32.068524273967746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f4de862b3f7e1%3A0x63e5e80ec4f39c09!2sDR%20AB%20AESTHETIC%20AND%20LASER%20SKIN%20CLINIC%20HAFIZABAD!5e0!3m2!1sen!2s!4v1757171985285!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dr. AB Aesthetic Clinic Location"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
