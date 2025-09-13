"use client"

import { motion } from "framer-motion"
import { Zap, Sparkles, Heart, Shield } from "lucide-react"

const services = [
  {
    icon: Zap,
    title: "Laser Hair Removal",
    description: "Permanent hair reduction with laser technology. Safe for all skin types.",
    features: ["Painless treatment", "Long-lasting results", "All skin types"],
  },
  {
    icon: Sparkles,
    title: "Skin Rejuvenation",
    description: "Restore your skin's natural glow with our advanced rejuvenation treatments.",
    features: ["Anti-aging", "Collagen boost", "Smooth texture"],
  },
  {
    icon: Heart,
    title: "Tattoo Removal",
    description: "Safe and effective tattoo removal with minimal discomfort and scarring.",
    features: ["Minimal scarring", "Quick sessions", "All colors"],
  },
  {
    icon: Shield,
    title: "Acne Treatment",
    description: "Clear your skin with our acne treatment solutions and get rid of all acne marks.",
    features: ["Reduces inflammation", "Prevents scarring", "Long-term results"],
  },
]

export function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">Our Premium Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the latest in laser technology with treatments designed for your unique needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 luxury-shadow hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>

                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
