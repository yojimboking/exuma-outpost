'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Gallery photos from marcus nispel collection - expanded list
const MONTAGE_IMAGES = [
  '/photos/gallery/pool.jpg',
  '/photos/gallery/moonbath.jpg',
  '/photos/gallery/moonbath2.jpg',
  '/photos/gallery/mainpicture.jpg',
  '/photos/gallery/Beach00007.jpg',
  '/photos/gallery/Beach00008.jpg',
  '/photos/gallery/Beach00009.jpg',
  '/photos/gallery/Beach00010.jpg',
  '/photos/gallery/Beach00011.jpg',
  '/photos/gallery/Beach00012.jpg',
  '/photos/gallery/Beach00013.jpg',
  '/photos/gallery/Beach00014.jpg',
  '/photos/gallery/Beach00015.jpg',
  '/photos/gallery/Deck00007.jpg',
  '/photos/gallery/Deck00008.jpg',
  '/photos/gallery/Deck00009.jpg',
  '/photos/gallery/Deck00010.jpg',
  '/photos/gallery/Deck00011.jpg',
  '/photos/gallery/Deck00012.jpg',
  '/photos/gallery/Atmospherer00007.jpg',
  '/photos/gallery/Atmospherer00008.jpg',
  '/photos/gallery/Atmospherer00009.jpg',
  '/photos/gallery/Atmospherer00010.jpg',
  '/photos/gallery/Atmospherer00011.jpg',
  '/photos/gallery/Atmospherer00012.jpg',
  '/photos/gallery/Atmospherer00013.jpg',
  '/photos/gallery/exuma-082.jpg',
  '/photos/gallery/exuma-083.jpg',
  '/photos/gallery/exuma-088.jpg',
  '/photos/gallery/exuma-089.jpg',
  '/photos/gallery/exuma-102.jpg',
  '/photos/gallery/exuma-105.jpg',
  '/photos/gallery/exuma-107.jpg',
  '/photos/gallery/exuma-108.jpg',
  '/photos/gallery/exuma-110.jpg',
  '/photos/gallery/exuma-112.jpg',
]

// Grid cell configurations - mixed sizes for visual interest
const GRID_CELLS = [
  { col: 'col-span-2', row: 'row-span-2' },
  { col: 'col-span-1', row: 'row-span-1' },
  { col: 'col-span-1', row: 'row-span-2' },
  { col: 'col-span-1', row: 'row-span-1' },
  { col: 'col-span-2', row: 'row-span-1' },
  { col: 'col-span-1', row: 'row-span-1' },
  { col: 'col-span-1', row: 'row-span-2' },
  { col: 'col-span-2', row: 'row-span-2' },
  { col: 'col-span-1', row: 'row-span-1' },
  { col: 'col-span-1', row: 'row-span-1' },
  { col: 'col-span-2', row: 'row-span-1' },
  { col: 'col-span-1', row: 'row-span-2' },
]

interface MontageCell {
  id: number
  imageIndex: number
  config: typeof GRID_CELLS[0]
}

export function MontageGallery() {
  const [cells, setCells] = useState<MontageCell[]>([])
  const [isClient, setIsClient] = useState(false)
  const intervalsRef = useRef<Map<number, NodeJS.Timeout>>(new Map())
  const usedImagesRef = useRef<Set<number>>(new Set())

  // Get next available image index for a cell
  const getNextImage = useCallback((currentIndex: number): number => {
    const available = MONTAGE_IMAGES
      .map((_, i) => i)
      .filter(i => i !== currentIndex && !usedImagesRef.current.has(i))

    if (available.length > 0) {
      return available[Math.floor(Math.random() * available.length)]
    }
    // Fallback: just get a different random image
    let next = currentIndex
    while (next === currentIndex) {
      next = Math.floor(Math.random() * MONTAGE_IMAGES.length)
    }
    return next
  }, [])

  // Swap image for a specific cell
  const swapCell = useCallback((cellId: number) => {
    setCells(prev => {
      const newCells = [...prev]
      const cellIndex = newCells.findIndex(c => c.id === cellId)
      if (cellIndex === -1) return prev

      const oldImageIndex = newCells[cellIndex].imageIndex
      const newImageIndex = getNextImage(oldImageIndex)

      // Update tracking
      usedImagesRef.current.delete(oldImageIndex)
      usedImagesRef.current.add(newImageIndex)

      newCells[cellIndex] = {
        ...newCells[cellIndex],
        imageIndex: newImageIndex,
      }
      return newCells
    })
  }, [getNextImage])

  // Initialize on client only
  useEffect(() => {
    setIsClient(true)

    // Create initial cell configuration with staggered starting images
    const initialCells: MontageCell[] = GRID_CELLS.map((config, index) => {
      const imageIndex = index % MONTAGE_IMAGES.length
      usedImagesRef.current.add(imageIndex)
      return {
        id: index,
        imageIndex,
        config,
      }
    })
    setCells(initialCells)
  }, [])

  // Set up individual timers for each cell with staggered intervals
  useEffect(() => {
    if (!isClient || cells.length === 0) return

    // Clear any existing intervals
    intervalsRef.current.forEach(interval => clearInterval(interval))
    intervalsRef.current.clear()

    // Each cell gets its own timer with a random offset
    cells.forEach((cell, index) => {
      // Stagger start times and use varying intervals (4-8 seconds)
      const baseInterval = 4000 + Math.random() * 4000
      const startDelay = index * 500 + Math.random() * 1000

      const timeoutId = setTimeout(() => {
        // Initial swap after delay
        swapCell(cell.id)

        // Then set up recurring interval
        const intervalId = setInterval(() => {
          swapCell(cell.id)
        }, baseInterval)

        intervalsRef.current.set(cell.id, intervalId)
      }, startDelay)

      // Store timeout as interval temporarily
      intervalsRef.current.set(cell.id, timeoutId as unknown as NodeJS.Timeout)
    })

    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval))
      intervalsRef.current.clear()
    }
  }, [isClient, cells.length, swapCell])

  // Handle hover - swap image immediately
  const handleHover = useCallback((cellId: number) => {
    swapCell(cellId)
  }, [swapCell])

  if (!isClient) {
    return (
      <section className="min-h-screen bg-ink">
        <div className="h-screen" />
      </section>
    )
  }

  return (
    <section className="bg-ink overflow-hidden">
      {/* Full-bleed montage grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 auto-rows-[150px] md:auto-rows-[200px] gap-1">
        {cells.map((cell) => (
          <motion.div
            key={cell.id}
            className={`relative overflow-hidden cursor-pointer ${cell.config.col} ${cell.config.row}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: cell.id * 0.1 }}
            onMouseEnter={() => handleHover(cell.id)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${cell.id}-${cell.imageIndex}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, ease: 'easeOut' }
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.5, ease: 'easeIn' }
                }}
              >
                <Image
                  src={MONTAGE_IMAGES[cell.imageIndex]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
