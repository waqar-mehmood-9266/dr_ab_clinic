"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Star, Shield, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "../providers/auth-provider"

export function Hero() {
  const { user} = useAuth()
  const router = useRouter();

    const handleBookNow = () => {
    if (user) {
      router.push("/book")
    } else {
      router.push("/auth/login")
    }
  } 

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-rose-50" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-amber-200/30 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-200/30 rounded-full blur-xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 text-amber-600"
              >
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">Premium Laser Treatments</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-playfair font-bold text-gray-900 leading-tight"
              >
                Transform Your
                <span className="block gold-accent">Beauty</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Experience the latest in laser technology with our expert team. Safe, effective, and personalized
                treatments for your unique needs.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
                <Button onClick={handleBookNow}  size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
              {/* <Link href="/plans">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-amber-600 text-amber-600 hover:bg-amber-50 bg-transparent"
                >
                  View Plans
                </Button>
              </Link> */}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[550px] mt-8 rounded-3xl overflow-hidden luxury-shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-rose-400/20" />
              <img
                src="/services-background.png"
                alt="Laser treatment"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Cards */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -left-2 glass-effect rounded-2xl p-4 luxury-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">FDA Approved</div>
                  <div className="text-sm text-gray-600">Safe & Certified</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 -right-2 glass-effect rounded-2xl p-4 luxury-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Award Winning</div>
                  <div className="text-sm text-gray-600">Best Clinic 2024</div>
                </div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
