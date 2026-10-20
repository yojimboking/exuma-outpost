'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { BOOKING_MANAGER } from '@/lib/constants'

export function ChatBubble() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggered) return

      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      // Show after scrolling 50% or after 30 seconds
      if (scrollPercent > 50) {
        setIsVisible(true)
        setHasTriggered(true)
      }
    }

    // Also trigger after 30 seconds
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setIsVisible(true)
        setHasTriggered(true)
      }
    }, 30000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [hasTriggered])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in planning my stay at The Exuma Outpost.")
    window.open(`https://wa.me/${BOOKING_MANAGER.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Chat Panel */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-20 right-0 w-80 bg-white shadow-2xl rounded-lg overflow-hidden"
              >
                {/* Header */}
                <div className="bg-ink text-white p-4 flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={BOOKING_MANAGER.photo}
                      alt={BOOKING_MANAGER.name}
                      fill
                      className="object-cover rounded-full"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-ink" />
                  </div>
                  <div>
                    <p className="font-medium">{BOOKING_MANAGER.name}</p>
                    <p className="text-xs text-white/70">{BOOKING_MANAGER.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="bg-light-gray rounded-lg p-3 mb-4">
                    <p className="text-sm text-ink">
                      Hello! I'm {BOOKING_MANAGER.name}, your personal concierge. How can I help you plan your Exuma escape?
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg hover:bg-[#20BD5A] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </button>
                    <a
                      href="/#contact"
                      className="w-full flex items-center justify-center gap-2 bg-ink text-white py-3 rounded-lg hover:bg-ink/90 transition-colors"
                    >
                      Send Inquiry
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bubble Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
              isOpen ? 'bg-warm-gray' : 'bg-ink'
            }`}
          >
            {isOpen ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="text-white text-center">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            )}
          </motion.button>

          {/* Label */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute bottom-0 right-16 whitespace-nowrap"
            >
              <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm text-ink">
                Plan Your Stay
              </div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  )
}
