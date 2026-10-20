'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function BespokeLuxury() {
  return (
    <section className="bg-white">
      {/* Quote Section */}
      <div className="py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-widest text-ink mb-8">
            BESPOKE LUXURY
          </h2>

          <div className="text-warm-gray text-2xl mb-10">·</div>

          <p className="text-2xl sm:text-3xl text-ink italic leading-relaxed mb-10">
            "The Exuma Outpost was built for 12."
          </p>

          <div className="text-warm-gray text-2xl mb-10">·</div>

          <p className="text-lg sm:text-xl text-warm-gray leading-relaxed max-w-2xl mx-auto">
            Your own private beach. A chef's kitchen that opens to the sea.
            Six bedrooms spread across three wings—enough space for the whole family
            to gather, yet intimate enough for quiet mornings with just the sound of waves.
          </p>

          <p className="text-lg sm:text-xl text-warm-gray leading-relaxed max-w-2xl mx-auto mt-6">
            Whether you're celebrating with loved ones or retreating with a close circle,
            The Exuma Outpost offers the rare gift of togetherness without compromise.
          </p>
        </motion.div>
      </div>

      {/* Full-Width Beach Image - Fades into About section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative w-full aspect-[21/9] sm:aspect-[3/1]"
      >
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=80"
          alt="Private beach at The Exuma Outpost"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay - fades to white at bottom for seamless transition to About */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />

        {/* Caption */}
        <div className="absolute top-6 left-6 sm:top-10 sm:left-10">
          <p className="text-white/90 text-sm sm:text-base tracking-widest uppercase">
            Your Private Beach
          </p>
        </div>
      </motion.div>
    </section>
  )
}
