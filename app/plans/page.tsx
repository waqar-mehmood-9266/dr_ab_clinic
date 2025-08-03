"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: 299,
    duration: "per session",
    description: "Perfect for trying our services",
    features: ["Single treatment session", "Basic consultation", "Aftercare instructions", "Follow-up call"],
    popular: false,
  },
  {
    name: "Premium",
    price: 899,
    duration: "3 sessions",
    description: "Most popular choice for visible results",
    features: [
      "3 treatment sessions",
      "Comprehensive consultation",
      "Personalized treatment plan",
      "Progress tracking",
      "Aftercare products included",
      "24/7 support",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: 1599,
    duration: "6 sessions",
    description: "Complete transformation package",
    features: [
      "6 treatment sessions",
      "VIP consultation",
      "Custom treatment protocol",
      "Progress monitoring",
      "Premium aftercare kit",
      "Priority booking",
      "Lifetime support",
      "Maintenance sessions discount",
    ],
    popular: false,
  },
]

export default function PlansPage() {
  return (
    <div className="min-h-screen luxury-gradient">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6">
                Choose Your Perfect
                <span className="block gold-accent">Treatment Plan</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Select the plan that best fits your needs and budget. All plans include our premium service guarantee.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group ${plan.popular ? "lg:-mt-8" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div
                    className={`bg-white rounded-3xl p-8 luxury-shadow hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 border ${
                      plan.popular ? "border-amber-200 ring-2 ring-amber-100" : "border-gray-100"
                    } h-full flex flex-col`}
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      <div className="mb-4">
                        <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600 ml-2">{plan.duration}</span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/book" className="block">
                      <Button
                        className={`w-full py-4 text-lg ${
                          plan.popular
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : "bg-gray-900 hover:bg-gray-800 text-white"
                        }`}
                      >
                        Choose {plan.name}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How many sessions will I need?",
                  answer:
                    "The number of sessions varies depending on your individual needs and the treatment type. Most clients see significant results within 3-6 sessions.",
                },
                {
                  question: "Is the treatment painful?",
                  answer:
                    "Our advanced laser technology minimizes discomfort. Most clients describe the sensation as a mild warming feeling.",
                },
                {
                  question: "What is your cancellation policy?",
                  answer: "We require 24-hour notice for cancellations. Same-day cancellations may incur a fee.",
                },
                {
                  question: "Do you offer payment plans?",
                  answer: "Yes, we offer flexible payment plans to make our treatments accessible to everyone.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 luxury-shadow border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
