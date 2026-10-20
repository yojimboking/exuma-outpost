'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: "The beach was the most beautiful beach we have ever seen, and the water was calm, and we had beautiful sunsets every evening. The team went above and beyond for us.",
    author: "Isabelle",
    location: "New York, NY",
    highlight: "Destination Wedding",
  },
  {
    quote: "By far the most beautiful beach we have ever been on! Our host, Sharell, made the trip worry free and was always there to take care of us!",
    author: "Thomas",
    location: "Tyler, TX",
    highlight: "Family Vacation",
  },
  {
    quote: "The quiet luxury of the villa combined with a panoramic of Exuma blue—this is what fantasy vacations are made of!",
    author: "Tyson",
    location: "Halifax, Canada",
    highlight: "Wedding Reception",
  },
  {
    quote: "Words cannot accurately describe how phenomenal this place was!! We came for our wedding and this home was above and beyond anything we could imagine!",
    author: "Brian",
    location: "Guest Review",
    highlight: "Wedding",
  },
  {
    quote: "The reason we'll be back is the beach. We've been all over the world and haven't seen a better beach than the one directly in front of the house.",
    author: "Chad I.",
    location: "Guest Review",
    highlight: "Return Guest",
  },
  {
    quote: "Our stay at the Exuma Outpost exceeded every expectation. The beach was incredible. Crystal clear water, sugar white sand.",
    author: "Brendan",
    location: "Pleasant Grove, UT",
    highlight: "Family Trip",
  },
  {
    quote: "A marvellous place of peace, a magnificence beach, a fantastic house, and simply an extract of paradise on earth.",
    author: "Christian Aubin",
    location: "Guest Review",
    highlight: "Retreat",
  },
  {
    quote: "This beautifully appointed home is a true gem, offering every comfort, luxury and world class service you could hope for.",
    author: "Colin P.",
    location: "Guest Review",
    highlight: "Luxury Stay",
  },
  {
    quote: "The Outpost is terrific. The porches are just heaven—when you open the living area doors, you get a sense of being outdoors right on the beach.",
    author: "Lucius",
    location: "Alstead, NH",
    highlight: "Extended Stay",
  },
  {
    quote: "Perfect for our three generation family. Superb house manager—she went above and beyond in helping us.",
    author: "Jane C.",
    location: "Guest Review",
    highlight: "Multi-Gen Family",
  },
  {
    quote: "THIS IS WHAT DREAMS ARE MADE OF!!! We rented the Outpost to take our kids to visit our favorite island and to get married.",
    author: "Crystal San",
    location: "Guest Review",
    highlight: "Wedding",
  },
  {
    quote: "I've been on Exuma with my wife for our honeymoon. It was the most wonderful place we've been in our life!!!",
    author: "Jonas",
    location: "Guest Review",
    highlight: "Honeymoon",
  },
]

function StarRating() {
  return (
    <div className="flex gap-1 justify-center mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  // Get visible testimonials (current + 2 more for desktop)
  const getVisibleTestimonials = () => {
    const items = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % TESTIMONIALS.length
      items.push({ ...TESTIMONIALS[index], index })
    }
    return items
  }

  return (
    <section
      className="py-16 sm:py-24 bg-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with rating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-amber-800">10/10 Exceptional</span>
            <span className="text-amber-600">·</span>
            <span className="text-sm text-amber-700">50+ Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl tracking-widest text-ink">
            GUEST REVIEWS
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-ink hover:text-white transition-colors hidden md:flex"
            aria-label="Previous review"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-ink hover:text-white transition-colors hidden md:flex"
            aria-label="Next review"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonials grid - 1 on mobile, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial, i) => (
                <motion.div
                  key={`${testimonial.author}-${testimonial.index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`text-center px-4 ${i > 0 ? 'hidden md:block' : ''}`}
                >
                  <StarRating />
                  <div className="text-warm-gray/40 text-5xl font-serif leading-none mb-2">"</div>
                  <p className="font-serif text-ink text-lg sm:text-xl leading-relaxed italic mb-6 min-h-[120px] flex items-center justify-center">
                    {testimonial.quote}
                  </p>
                  <div className="text-sm text-warm-gray tracking-wide">
                    <span className="font-medium text-ink">{testimonial.author}</span>
                    <span className="mx-2">·</span>
                    <span>{testimonial.location}</span>
                  </div>
                  {testimonial.highlight && (
                    <div className="mt-2">
                      <span className="inline-block px-3 py-1 bg-paper text-xs text-warm-gray tracking-wider uppercase">
                        {testimonial.highlight}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile swipe hint */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            <button onClick={prevSlide} className="p-2 text-warm-gray hover:text-ink">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={nextSlide} className="p-2 text-warm-gray hover:text-ink">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentIndex
                  ? 'bg-ink w-6'
                  : 'bg-warm-gray/30 hover:bg-warm-gray/50'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
