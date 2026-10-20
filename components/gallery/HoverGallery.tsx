'use client'

import { motion } from 'framer-motion'
import { ImageCard } from './ImageCard'
import { Container } from '@/components/ui/Container'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface GallerySection {
  id: string
  title: string
  mainImage: string
  hoverImages: string[]
  href?: string
}

interface HoverGalleryProps {
  title: string
  subtitle?: string
  sections: GallerySection[]
  columns?: 2 | 3 | 4
}

export function HoverGallery({
  title,
  subtitle,
  sections,
  columns = 3,
}: HoverGalleryProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-20 sm:py-32 bg-sand-50">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={staggerContainer}
            className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}
          >
            {sections.map((section) => (
              <motion.div key={section.id} variants={fadeInUp}>
                <ImageCard
                  title={section.title}
                  mainImage={section.mainImage}
                  hoverImages={section.hoverImages}
                  href={section.href}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
