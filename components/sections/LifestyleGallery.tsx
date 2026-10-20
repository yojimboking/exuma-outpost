'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGES } from '@/lib/constants'

export function LifestyleGallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24 bg-paper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-6"
      >
        <h2 className="text-3xl sm:text-4xl tracking-wider text-ink">GALLERY</h2>
      </motion.div>

      {/* Full-bleed tile grid */}
      <div className="gallery-grid">
        {IMAGES.lifestyle.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src={img}
              alt=""
              fill
              className="gallery-image"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
