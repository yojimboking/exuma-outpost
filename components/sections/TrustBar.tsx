'use client'

import { motion } from 'framer-motion'
import { PROPERTY } from '@/lib/constants'

export function TrustBar() {
  const stats = [
    { value: PROPERTY.bedrooms, label: 'Bedrooms' },
    { value: PROPERTY.bathrooms, label: 'Bathrooms' },
    { value: `Sleeps ${PROPERTY.sleeps}`, label: '' },
    { value: `${PROPERTY.sqft.toLocaleString()} sq ft`, label: '' },
  ]

  return (
    <section className="py-16 bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6"
      >
        {/* Stats - Centered and Larger */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-12">
              <div>
                <div className="text-2xl md:text-3xl text-ink tracking-wide">
                  {typeof stat.value === 'number' ? stat.value : stat.value}
                  {stat.label && <span className="ml-2">{stat.label}</span>}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-warm-gray/30" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
