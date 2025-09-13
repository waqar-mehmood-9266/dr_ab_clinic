"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    treatment: "Laser Hair Removal",
    rating: 5,
    text: "Amazing results! The staff was professional and the treatment was virtually painless. I'm so happy.",
    image: "testimonial-sarah.png",
  },
  {
    name: "Michael Chen",
    treatment: "Tattoo Removal",
    rating: 5,
    text: "I thought I'd be stuck with my old tattoo forever. The team here worked miracles - it's completely gone now!",
    image: "/testimonial-michael.png",
  },
  {
    name: "Emma Davis",
    treatment: "Skin Rejuvenation",
    rating: 5,
    text: "My skin looks 10 years younger! The treatment was comfortable and the results exceeded my expectations.",
    image: "/testimonial-emma.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-3xl p-8 luxury-shadow hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-200" />

                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.treatment}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed">"{testimonial.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
