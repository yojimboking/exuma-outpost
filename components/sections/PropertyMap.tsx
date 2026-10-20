'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { IMAGES, WINGS } from '@/lib/constants'

// Expanded hover zones that connect without gaps
const HOVER_ZONES = {
  'east': { top: '15%', left: '0%', width: '33.33%', height: '85%' },
  'grand-salon': { top: '10%', left: '33.33%', width: '33.34%', height: '90%' },
  'west': { top: '15%', left: '66.67%', width: '33.33%', height: '85%' },
}

// Dot positions for connecting lines (center-bottom of each wing area)
const DOT_POSITIONS = {
  'east': { left: '16%', bottom: '25%' },
  'grand-salon': { left: '50%', bottom: '20%' },
  'west': { left: '84%', bottom: '25%' },
}

export function PropertyMap() {
  const [activeWing, setActiveWing] = useState<string | null>(null)
  const activeWingData = WINGS.find(w => w.id === activeWing)

  return (
    <section id="property" className="py-16 sm:py-24 bg-paper">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl tracking-wider text-ink mb-4">THE PROPERTY</h2>
          <p className="text-warm-gray text-lg">Tap or hover to explore each residence</p>
        </motion.div>

        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
          <Image
            src={IMAGES.propertyMap}
            alt="Property aerial view"
            fill
            className="object-cover"
          />

          {/* Hover/tap zones - full coverage, no gaps */}
          {WINGS.map((wing) => {
            const zone = HOVER_ZONES[wing.id as keyof typeof HOVER_ZONES]
            const isActive = activeWing === wing.id

            return (
              <div
                key={wing.id}
                className="absolute cursor-pointer transition-all duration-300"
                style={{
                  top: zone.top,
                  left: zone.left,
                  width: zone.width,
                  height: zone.height,
                }}
                onMouseEnter={() => setActiveWing(wing.id)}
                onMouseLeave={() => setActiveWing(null)}
                onClick={() => setActiveWing(activeWing === wing.id ? null : wing.id)}
              >
                {/* Subtle highlight on hover/tap */}
                <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-white/10' : ''}`} />

                {/* Wing label */}
                <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-shadow transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  <div className="text-xs sm:text-sm uppercase tracking-widest whitespace-nowrap">{wing.displayName}</div>
                </div>
              </div>
            )
          })}

          {/* Connecting dot and line */}
          <AnimatePresence>
            {activeWing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute w-3 h-3 bg-white rounded-full shadow-lg z-10"
                  style={{
                    left: DOT_POSITIONS[activeWing as keyof typeof DOT_POSITIONS]?.left,
                    bottom: DOT_POSITIONS[activeWing as keyof typeof DOT_POSITIONS]?.bottom,
                    transform: 'translateX(-50%)',
                  }}
                />
                {/* Connecting line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  className="absolute w-0.5 bg-white/80 origin-bottom"
                  style={{
                    left: DOT_POSITIONS[activeWing as keyof typeof DOT_POSITIONS]?.left,
                    bottom: '0',
                    height: DOT_POSITIONS[activeWing as keyof typeof DOT_POSITIONS]?.bottom,
                    transform: 'translateX(-50%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info panel - responsive with scrollable images on mobile */}
          <AnimatePresence>
            {activeWingData && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 flex justify-center px-2 sm:px-0"
              >
                <div className="bg-white/95 backdrop-blur-sm flex flex-col sm:flex-row items-stretch max-w-full sm:max-w-3xl w-full sm:w-auto overflow-hidden">
                  {/* Gallery thumbnails - scrollable on mobile */}
                  <div className="flex gap-0.5 flex-shrink-0 overflow-x-auto scrollbar-hide">
                    {activeWingData.gallery.slice(0, 4).map((img, i) => (
                      <div key={i} className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 relative flex-shrink-0">
                        <Image src={img} alt="" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  {/* Info */}
                  <div className="px-3 py-2 sm:px-5 sm:py-3 flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg md:text-xl tracking-wider text-ink">{activeWingData.displayName}</h3>
                    <p className="text-warm-gray text-xs sm:text-sm">{activeWingData.bedrooms} Bed · {activeWingData.bathrooms} Bath · {activeWingData.capacity} Guests</p>
                    <p className="text-ink/70 text-xs mt-1 hidden md:block max-w-xs leading-relaxed">{activeWingData.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
