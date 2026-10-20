'use client'

import { motion } from 'framer-motion'
import { PROPERTY } from '@/lib/constants'

export function Welcome() {
  return (
    <section className="py-24 sm:py-32 bg-paper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <div className="text-warm-gray text-2xl mb-8">·</div>
        
        <p className="text-xl sm:text-2xl md:text-3xl text-ink leading-relaxed font-normal">
          {PROPERTY.welcome}
        </p>
        
        <div className="text-warm-gray text-2xl mt-8">·</div>
      </motion.div>
    </section>
  )
}
