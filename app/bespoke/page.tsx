'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ChatBubble } from '@/components/ui/ChatBubble'

// 5 Hero sections with matching testimonials - reordered: Family, Fishing, Weddings, Honeymoon, Dining
const BESPOKE_SECTIONS = [
  {
    id: 'family',
    title: 'Family Getaways',
    subtitle: 'Create memories across generations',
    images: [
      '/photos/gallery/Beach00015.jpg',
      '/photos/gallery/Beach00007.jpg',
      '/photos/gallery/Beach00010.jpg',
    ],
    testimonial: {
      quote: "Perfect for our three generation family. Superb house manager—she went above and beyond in helping us.",
      author: "Jane C.",
      location: "Guest Review",
      highlight: "Multi-Gen Family",
    },
    services: [
      'Nanny Service',
      'Kids Swim Lessons',
      'Family Photo Session',
      'Personal Chef',
      'Island Hopping Tour',
      'Swimming Pigs Excursion',
      'Kayaking & Paddleboarding',
      'BBQ & Pig Roast',
    ],
  },
  {
    id: 'fishing',
    title: 'Fishing & Water Sports',
    subtitle: 'World-class flats and blue water',
    images: [
      '/photos/out-and-about/Lead schots for main menu -16.JPG',
      '/photos/out-and-about/Lead schots for main menu -17.JPG',
      '/photos/out-and-about/Lead schots for main menu -15.JPG',
    ],
    testimonial: {
      quote: "The fishing trip was incredible—Sharell set it all up and we caught wahoo on the first day. Best bonefishing of my life.",
      author: "Chad I.",
      location: "Guest Review",
      highlight: "Return Guest",
    },
    services: [
      'Bonefishing Guide',
      'Deep Sea Charter',
      'Spearfishing',
      'Scuba Diving',
      'Snorkeling Tours',
      'Thunderball Grotto',
      'Kitesurfing Lessons',
      'Boat Charter',
    ],
  },
  {
    id: 'weddings',
    title: 'Weddings & Events',
    subtitle: 'Say "I do" with your toes in the sand',
    images: [
      '/photos/gallery/Beach00007.jpg',
      '/photos/gallery/Beach00008.jpg',
      '/photos/gallery/Atmospherer00010.jpg',
    ],
    testimonial: {
      quote: "The beach was the most beautiful beach we have ever seen, and the water was calm, and we had beautiful sunsets every evening. The team went above and beyond for us.",
      author: "Isabelle",
      location: "New York, NY",
      highlight: "Destination Wedding",
    },
    services: [
      'Wedding Planner',
      'Ceremony at Twin Cays',
      'Custom Wedding Cake',
      'Wedding Officiant',
      'Photographer & Videographer',
      'Hair & Makeup',
      'Junkanoo Band',
      'Catering',
    ],
  },
  {
    id: 'honeymoon',
    title: 'Honeymoon & Romance',
    subtitle: 'Begin forever in paradise',
    images: [
      '/photos/gallery/moonbath.jpg',
      '/photos/gallery/moonbath2.jpg',
      '/photos/gallery/Atmospherer00015.jpg',
    ],
    testimonial: {
      quote: "I've been on Exuma with my wife for our honeymoon. It was the most wonderful place we've been in our life!!!",
      author: "Jonas",
      location: "Guest Review",
      highlight: "Honeymoon",
    },
    services: [
      'Private Chef Dinner',
      'Couples Massage',
      'Sunset Sailing',
      'Beach Picnic',
      'Champagne & Flowers',
      'Photography Session',
      'Spa Treatments',
      'Anniversary Planning',
    ],
  },
  {
    id: 'dining',
    title: 'Chef & Dining',
    subtitle: 'Island flavors, your way',
    images: [
      '/photos/in-and-out/kitchen00001.jpg',
      '/photos/in-and-out/kitchen00002.jpg',
      '/photos/in-and-out/kitchen00003.jpg',
    ],
    testimonial: {
      quote: "This beautifully appointed home is a true gem, offering every comfort, luxury and world class service you could hope for.",
      author: "Colin P.",
      location: "Guest Review",
      highlight: "Luxury Stay",
    },
    services: [
      'Personal Chef',
      'Caribbean Cuisine',
      'Seafood Specialist',
      'Pizza Party',
      'Pig Roast',
      'Gourmet Picnic',
      'Cooking Class',
      'Grocery Stocking',
    ],
  },
]

// Additional services not in main sections
const MORE_SERVICES = [
  {
    category: 'Wellness',
    items: ['Yoga Instruction', 'Meditation', 'Personal Trainer', 'Beauty Services'],
  },
  {
    category: 'Transportation',
    items: ['Airport Transfer', 'Car Rental', 'Personal Driver'],
  },
  {
    category: 'Home Services',
    items: ['Daily Housekeeping', 'Laundry & Valet', 'Butler Service'],
  },
  {
    category: 'Retreats',
    items: ['Corporate Retreat', 'Yoga Retreat', 'Creative Think Tank', 'Art Retreat'],
  },
  {
    category: 'Entertainment',
    items: ['Live Band', 'DJ', 'Rake & Scrape Music'],
  },
  {
    category: 'For Kids',
    items: ['Babysitter', 'Sailing School', 'Art Classes'],
  },
]

function StarRating() {
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Image carousel component with arrows and auto-scroll
function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextImage, 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextImage])

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors z-10"
        aria-label="Previous image"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors z-10"
        aria-label="Next image"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default function BespokePage() {
  const [moreServicesOpen, setMoreServicesOpen] = useState(false)

  return (
    <main className="min-h-screen bg-paper">
      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] w-full overflow-hidden">
        <Image
          src="/photos/gallery/Atmospherer00007.jpg"
          alt="Bespoke luxury at The Exuma Outpost"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-widest mb-4">BESPOKE</h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Every stay is tailored. Sharell crafts your perfect island escape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5 Hero Sections */}
      {BESPOKE_SECTIONS.map((section, index) => {
        const isEven = index % 2 === 0
        return (
          <section key={section.id} id={section.id} className="bg-white">
            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              {/* Image Carousel */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full lg:w-1/2 h-[50vh] lg:h-[80vh]"
              >
                <ImageCarousel images={section.images} alt={section.title} />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-0"
              >
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl tracking-widest text-ink mb-2">{section.title.toUpperCase()}</h2>
                <p className="text-warm-gray text-lg mb-8">{section.subtitle}</p>

                {/* Testimonial */}
                <div className="mb-8 border-l-2 border-amber-400 pl-6">
                  <StarRating />
                  <p className="font-serif text-ink text-lg italic leading-relaxed mb-4">
                    "{section.testimonial.quote}"
                  </p>
                  <div className="text-sm text-warm-gray">
                    <span className="font-medium text-ink">{section.testimonial.author}</span>
                    <span className="mx-2">·</span>
                    <span>{section.testimonial.highlight}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-8">
                  <h3 className="text-xs tracking-wider text-warm-gray uppercase mb-4">Services Include</h3>
                  <div className="flex flex-wrap gap-2">
                    {section.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1.5 bg-paper text-sm text-ink border border-light-gray"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/#contact"
                  className="inline-block w-fit px-8 py-3 bg-ink text-white text-sm tracking-wider hover:bg-ink/90 transition-colors"
                >
                  INQUIRE ABOUT {section.title.split(' ')[0].toUpperCase()}
                </Link>
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* More Services Accordion */}
      <section className="py-16 sm:py-24 bg-paper">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => setMoreServicesOpen(!moreServicesOpen)}
            className="w-full flex items-center justify-between py-4 border-b border-light-gray group"
          >
            <span className="text-lg tracking-wider text-ink">MORE SERVICES</span>
            <motion.svg
              animate={{ rotate: moreServicesOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5 text-warm-gray group-hover:text-ink transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {moreServicesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                  {MORE_SERVICES.map((category) => (
                    <div key={category.category}>
                      <h3 className="text-sm tracking-wider text-ink uppercase mb-3">{category.category}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item} className="text-warm-gray flex items-center gap-2">
                            <span className="w-1 h-1 bg-warm-gray/50 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/#contact"
                    className="inline-block px-6 py-2 border border-ink text-ink text-sm tracking-wider hover:bg-ink hover:text-white transition-colors"
                  >
                    INQUIRE ABOUT ANY SERVICE
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Note about timing */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-warm-gray text-sm leading-relaxed">
            <span className="text-ink">Note:</span> Little Exuma is a remote island paradise. Items requiring customs clearance may need 4-6 weeks advance notice. The earlier you share your wishlist, the more we can accommodate.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-ink text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl tracking-widest mb-4">READY TO PLAN YOUR ESCAPE?</h2>
          <p className="text-white/70 mb-8">Tell us your vision and Sharell will make it happen.</p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-white text-ink text-sm tracking-wider hover:bg-white/90 transition-colors"
          >
            START PLANNING
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </main>
  )
}
