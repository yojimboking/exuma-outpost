'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FloatingImages } from './FloatingImages'

interface ImageCardProps {
  title: string
  mainImage: string
  hoverImages: string[]
  href?: string
  aspectRatio?: 'square' | 'video' | 'portrait'
}

export function ImageCard({
  title,
  mainImage,
  hoverImages,
  href,
  aspectRatio = 'square',
}: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const aspectRatios = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }

  const CardContent = (
    <motion.div
      ref={containerRef}
      className={`relative ${aspectRatios[aspectRatio]} rounded-xl overflow-hidden cursor-pointer group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main Image */}
      <Image
        src={mainImage}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <motion.h3
          className="font-display text-xl sm:text-2xl font-bold text-white"
          initial={false}
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="text-white/80 text-sm mt-1"
        >
          Hover to explore
        </motion.div>
      </div>

      {/* Floating Images on Hover */}
      <FloatingImages
        images={hoverImages}
        isActive={isHovered}
        containerRef={containerRef}
      />
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {CardContent}
      </a>
    )
  }

  return CardContent
}
