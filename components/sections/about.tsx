"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Award, Clock } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified professionals with years of experience",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in laser treatments",
  },
  {
    icon: Clock,
    title: "Quick Results",
    description: "See visible improvements in just a few sessions",
  },
]

export function About() {
  return (
    <section className="py-24 luxury-gradient">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900">Why Choose Dr.AR Clinic?</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                We combine cutting-edge technology with personalized care to deliver exceptional results that exceed
                your expectations.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                <div className="text-gray-600">Satisfied Clients</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden luxury-shadow">
              <img
                src="/hero-laser-treatment.png"
                alt="Modern clinic interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Achievement Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-8 glass-effect rounded-2xl p-6 luxury-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
