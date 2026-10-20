'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { IMAGES } from '@/lib/constants'
import { Lightbox } from '@/components/ui/Lightbox'

// Grid layout configuration - supports wide (2 cols) and square (1 col) images
// When you add real photos, mark wide ones with isWide: true
const GALLERY_ITEMS = [
  { src: IMAGES.lifestyle[0], caption: 'Morning Light', isWide: true },
  { src: IMAGES.lifestyle[1], caption: 'Crystal Waters', isWide: false },
  { src: IMAGES.lifestyle[2], caption: 'Island Life', isWide: false },
  { src: IMAGES.lifestyle[3], caption: 'Golden Hour', isWide: false },
  { src: IMAGES.lifestyle[4], caption: 'Sunset Deck', isWide: false },
  { src: IMAGES.lifestyle[5], caption: 'The Cove', isWide: true },
]

export function GalleryBanner() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <section className="bg-paper py-4">
        {/* Asymmetric Grid - Top luxury villa style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {GALLERY_ITEMS.map((item, i) => {
            const isActive = hoverIndex === i

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`relative overflow-hidden group cursor-pointer ${
                  item.isWide ? 'col-span-2 aspect-[16/9]' : 'col-span-1 aspect-square'
                }`}
                onClick={() => openLightbox(i)}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : ''}`}
                  sizes={item.isWide ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                />

                {/* Hover/tap overlay with caption */}
                <div className={`absolute inset-0 transition-colors duration-300 ${isActive ? 'bg-black/30' : 'bg-black/0'}`}>
                  {/* Expand icon */}
                  <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 transition-transform duration-300 ${isActive ? 'translate-y-0' : 'translate-y-full'}`}>
                    <p className="text-white text-sm sm:text-base tracking-wide">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={GALLERY_ITEMS.map(item => ({ src: item.src, caption: item.caption }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
