'use client'

import { motion } from 'framer-motion'

const HIGHLIGHTS = [
  'Private Beach',
  'Pool',
  'Chef\'s Kitchen',
  'Pizza Oven',
  'Outdoor Dining for 30',
  'Kayaks & Paddleboards',
  'Spa Deck',
  'WiFi',
]

export function Amenities() {
  return (
    <section className="py-12 sm:py-16 bg-paper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="flex flex-wrap justify-center items-center gap-y-4">
          {HIGHLIGHTS.map((item, i) => (
            <div key={item} className="flex items-center">
              <span className="text-ink/80 text-sm sm:text-base tracking-wide px-4 sm:px-6">
                {item}
              </span>
              {i < HIGHLIGHTS.length - 1 && (
                <div className="w-px h-4 bg-warm-gray/40" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
