'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface FloatingImagesProps {
  images: string[]
  isActive: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}

interface FloatingImageData {
  id: number
  src: string
  startX: number
  startY: number
  endX: number
  endY: number
  rotation: number
  scale: number
  delay: number
  width: number
  height: number
}

export function FloatingImages({ images, isActive, containerRef }: FloatingImagesProps) {
  // Generate random positions for floating images
  const floatingData = useMemo<FloatingImageData[]>(() => {
    if (!images.length) return []

    return images.slice(0, 6).map((src, index) => {
      // Random starting position from edges
      const edge = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
      let startX = 0
      let startY = 0

      switch (edge) {
        case 0: // top
          startX = Math.random() * 100 - 50
          startY = -150
          break
        case 1: // right
          startX = 150
          startY = Math.random() * 100 - 50
          break
        case 2: // bottom
          startX = Math.random() * 100 - 50
          startY = 150
          break
        case 3: // left
          startX = -150
          startY = Math.random() * 100 - 50
          break
      }

      // Random end position within container
      const endX = (Math.random() - 0.5) * 60
      const endY = (Math.random() - 0.5) * 60

      // Vary sizes for visual interest
      const sizes = [
        { width: 180, height: 240 },
        { width: 220, height: 160 },
        { width: 160, height: 200 },
        { width: 200, height: 150 },
        { width: 170, height: 220 },
        { width: 190, height: 140 },
      ]
      const size = sizes[index % sizes.length]

      return {
        id: index,
        src,
        startX,
        startY,
        endX,
        endY,
        rotation: (Math.random() - 0.5) * 15,
        scale: 0.8 + Math.random() * 0.4,
        delay: index * 0.08,
        ...size,
      }
    })
  }, [images])

  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {floatingData.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                x: `${item.startX}%`,
                y: `${item.startY}%`,
                scale: 0.6,
                rotate: item.rotation * 2,
              }}
              animate={{
                opacity: 1,
                x: `calc(50% + ${item.endX}px)`,
                y: `calc(50% + ${item.endY}px)`,
                scale: item.scale,
                rotate: item.rotation,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3 },
              }}
              transition={{
                duration: 0.7,
                delay: item.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute"
              style={{
                width: item.width,
                height: item.height,
                left: 0,
                top: 0,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
              </div>
            </motion.div>
          ))}

          {/* Backdrop blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] -z-10"
          />
        </div>
      )}
    </AnimatePresence>
  )
}
