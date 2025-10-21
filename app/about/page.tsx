"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Users, Heart, Star, Phone, Mail, Instagram } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function AboutPage() {

  const { user } = useAuth()
  const router = useRouter();



  const handleBookNow = () => {
    if (user) {
      router.push("/book")
    } else {
      router.push("/auth/login")
    }
  }

  const doctors = [
    {
      name: "Dr Abdul Basit",
      title: "Director & Chief Consultant",
      subtitle: "Aesthetic Physician & Skin Cancer Surgeon (Australia)",
      experience: "15 years",
      qualifications: [
        "MBBS (AIMC, PAK)",
        "RMP (PMDC)",
        "AMC (AUS)",
        "FRACGP (RACGP, AUS)",
        "Aesthetic Medicine (AAAM, USA)",
      ],
      image: "/dummy_profile.jpg",
    },
    {
      name: "Dr Asma",
      title: "CEO",
      subtitle: "Aesthetic Physician - UK Certified",
      experience: "5 years",
      qualifications: [
        "UK Certified Aesthetic Physician",
        "Advanced Dermatology Training",
        "Laser Treatment Specialist",
      ],
      image: "/dummy_profile.jpg",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "We understand that skin concerns affect more than appearance—they impact confidence and well-being.",
    },
    {
      icon: Award,
      title: "International Standards",
      description: "Combining Australian medical training with cutting-edge technology for world-class treatments.",
    },
    {
      icon: Users,
      title: "Personalized Approach",
      description: "Every treatment plan is tailored to your unique needs, skin type, and aesthetic goals.",
    },
    {
      icon: Star,
      title: "Proven Results",
      description: "Over 15 years of clinical experience delivering safe, effective, and transformative outcomes.",
    },
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
                About
                <span className="block gold-accent">Dr. AB Aesthetic & Laser Skin Clinic</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Empowering individuals through advanced aesthetic care and personalized skin health solutions
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-amber-600" />
                  +923709980002
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-amber-600" />
                  drabaestheticlaserclinic@gmail.com
                </div>
                <div className="flex items-center">
                  <Instagram className="w-4 h-4 mr-2 text-amber-600" />
                  Dr. AB Aesthetic & Laser Clinic
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="luxury-shadow border-0 h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                      To empower individuals by enhancing their natural beauty and skin health through advanced,
                      ethical, and personalized aesthetic care. Drawing on over fifteen years of clinical experience and
                      specialized training in Australia, we deliver world-class dermatological and cosmetic treatments
                      that restore confidence, improve quality of life, and foster emotional well-being—because every
                      person deserves to feel comfortable in their own skin.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card className="luxury-shadow border-0 h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                      To be Pakistan's leading aesthetic and laser skin clinic, setting new standards in dermatological
                      excellence, innovation, and compassionate care. Guided by international expertise and a deep
                      understanding of both medical and aesthetic principles, we envision a society where skin health
                      and beauty are accessible, stigma-free, and celebrated as part of holistic well-being—helping
                      people thrive in their relationships, careers, and personal journeys.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Doctors */}
        <section className="py-16 luxury-gradient">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our internationally trained physicians bring decades of combined experience in aesthetic medicine and
                dermatology
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {doctors.map((doctor, index) => (
                <motion.div
                  key={doctor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="luxury-shadow border-0 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-amber-600 text-white">{doctor.experience} Experience</Badge>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">{doctor.name}</h3>
                        <p className="text-amber-600 font-semibold mb-1">{doctor.title}</p>
                        <p className="text-gray-600 mb-4">{doctor.subtitle}</p>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900">Qualifications:</h4>
                          <div className="flex flex-wrap gap-2">
                            {doctor.qualifications.map((qual, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder's Message */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="luxury-shadow border-0">
                <CardContent className="p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Founder's Message</h2>
                    <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
                  </div>

                  <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
                    <p>
                      As a general physician with over fifteen years of clinical experience in Australia, I've had the
                      privilege of working across diverse healthcare settings, with a special focus on dermatology, skin
                      cancer, and aesthetic medicine. My training has equipped me with the latest techniques and a deep
                      understanding of how skin health impacts not just physical appearance, but emotional well-being
                      and self-confidence.
                    </p>

                    <p>
                      Upon returning to Pakistan, I was deeply moved by how many individuals—especially professionals
                      and young adults—were silently struggling with skin concerns that affected their relationships,
                      careers, and self-esteem. This inspired me to establish a clinic that goes beyond surface-level
                      beauty.
                    </p>

                    <p>
                      At our aesthetic and laser skin clinic, we combine international standards with compassionate care
                      to offer safe, effective, and personalized treatments. Our goal is to help you feel confident,
                      empowered, and radiant—inside and out.
                    </p>

                    <p className="text-center font-medium text-gray-800">
                      Because when you feel good in your skin, everything else begins to shine.
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                    <div className="space-y-2">
                      <p className="font-bold text-gray-900 text-lg">Dr Abdul Basit</p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>MBBS (AIMC,PAK), RMP (PMDC), AMC (AUS)</p>
                        <p>FRACGP (RACGP, AUS), Aesthetic Medicine (AAAM, USA)</p>
                        <p className="font-semibold text-amber-600">Founder & Medical Director</p>
                        <p>Fellow Consultant | Aesthetic Medicine Specialist</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 luxury-gradient">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at Dr. AB Aesthetic & Laser Skin Clinic
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="luxury-shadow border-0 h-full hover:shadow-2xl transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-6">Ready to Begin Your Journey?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Schedule a consultation with our expert team and discover how we can help you achieve your aesthetic
                goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleBookNow}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Book Consultation
                </button>
                <a
                  href="/contact"
                  className="border border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-lg font-semibold transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
