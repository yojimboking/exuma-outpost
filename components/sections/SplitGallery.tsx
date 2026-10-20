'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { IMAGES } from '@/lib/constants'

// Captions for each gallery
const IN_AND_OUT_CAPTIONS = [
  'The Grand Salon',
  'The Kitchen',
  'Master Bedroom',
  'Living Space',
  'East Wing Suite',
  'West Wing Retreat',
  'Dining Area',
]

const OUT_AND_ABOUT_CAPTIONS = [
  'Private Beach',
  'Swimming with Pigs',
  'Snorkeling Paradise',
  'Thunderball Grotto',
  'Island Hopping',
  'Sunset Views',
  'Crystal Waters',
]

interface GalleryColumnProps {
  title: string
  heroImage: string
  gallery: string[]
  captions: string[]
}

function GalleryColumn({ title, heroImage, gallery, captions }: GalleryColumnProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const allImages = [heroImage, ...gallery]

  // Auto-scroll every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [allImages.length])

  // Scroll thumbnail into view when active changes
  useEffect(() => {
    if (scrollRef.current && activeIndex > 0) {
      const thumbnailIndex = activeIndex - 1
      const thumbnailWidth = 120
      scrollRef.current.scrollTo({
        left: thumbnailIndex * thumbnailWidth - 60,
        behavior: 'smooth',
      })
    }
  }, [activeIndex])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -120, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 120, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="py-6 text-center">
        <h3 className="text-xl sm:text-2xl tracking-widest text-ink">{title}</h3>
      </div>

      {/* Hero Image - Animated with Caption */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-light-gray">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={allImages[activeIndex]}
              alt={captions[activeIndex] || title}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Caption Overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
          >
            <p className="text-white text-lg tracking-wide">{captions[activeIndex] || ''}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrolling Gallery with Arrows - Smaller thumbnails */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Scroll left"
        >
          <svg className="w-3 h-3 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          aria-label="Scroll right"
        >
          <svg className="w-3 h-3 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Thumbnails - Smaller */}
        <div
          ref={scrollRef}
          className="flex gap-0 overflow-x-auto scrollbar-hide"
        >
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i + 1)}
              className={`relative flex-shrink-0 w-20 sm:w-24 md:w-28 aspect-square transition-all duration-300 ${
                activeIndex === i + 1 ? 'ring-2 ring-ink ring-inset opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={captions[i + 1] || ''}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SplitGallery() {
  return (
    <section id="gallery" className="bg-paper py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl mx-auto px-4"
      >
        {/* Split Grid - Constrained with gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left: In & Out */}
          <div className="border border-warm-gray/10">
            <GalleryColumn
              title="IN & OUT"
              heroImage={IMAGES.inAndOut.hero}
              gallery={IMAGES.inAndOut.gallery}
              captions={IN_AND_OUT_CAPTIONS}
            />
          </div>

          {/* Right: Out & About */}
          <div className="border border-warm-gray/10">
            <GalleryColumn
              title="OUT & ABOUT"
              heroImage={IMAGES.outAndAbout.hero}
              gallery={IMAGES.outAndAbout.gallery}
              captions={OUT_AND_ABOUT_CAPTIONS}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
