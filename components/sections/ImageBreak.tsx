'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ImageBreakProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: 'wide' | 'ultrawide' | 'cinematic'
}

export function ImageBreak({
  src,
  alt,
  caption,
  aspectRatio = 'wide',
}: ImageBreakProps) {
  const aspectClasses = {
    wide: 'aspect-[16/9]',
    ultrawide: 'aspect-[21/9]',
    cinematic: 'aspect-[2.39/1]',
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full"
    >
      <div className={`relative w-full ${aspectClasses[aspectRatio]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />

        {/* Subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

        {/* Caption if provided */}
        {caption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10"
          >
            <p className="text-white/90 text-sm sm:text-base tracking-widest uppercase">
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}
