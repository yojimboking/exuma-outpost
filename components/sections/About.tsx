'use client'

import { motion } from 'framer-motion'
import { PROPERTY } from '@/lib/constants'

export function About() {
  return (
    <section id="about" className="pt-0 pb-16 sm:pb-20 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-6 text-center"
      >
        <h2 className="text-2xl sm:text-3xl tracking-wider text-ink mb-6">ABOUT</h2>

        <p className="text-lg text-ink leading-relaxed mb-4">
          {PROPERTY.about}
        </p>

        <p className="text-base text-warm-gray leading-relaxed mb-6">
          {PROPERTY.aboutExtended}
        </p>

        <p className="text-xs text-warm-gray/70 tracking-wide uppercase">
          Past clients include {PROPERTY.clients}
        </p>
      </motion.div>
    </section>
  )
}
