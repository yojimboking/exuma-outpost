'use client'

import { motion } from 'framer-motion'
import { CONTACT } from '@/lib/constants'

export function Contact() {
  // Remove + prefix for wa.me URL format and encode the message
  const whatsappNumber = CONTACT.whatsapp.replace(/^\+/, '')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`

  return (
    <section id="contact" className="py-24 sm:py-32 bg-paper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl sm:text-4xl tracking-wider text-ink mb-8">CONTACT</h2>

        <div className="text-warm-gray text-2xl mb-8">·</div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-12 py-4 bg-ink text-white text-lg tracking-wider hover:bg-black transition-colors mb-6"
        >
          WHATSAPP US
        </a>

        <p className="text-warm-gray mb-8">{CONTACT.whatsapp}</p>

        <div className="text-warm-gray mb-4">or</div>

        <a href={`mailto:${CONTACT.email}`} className="text-ink text-lg underline underline-offset-4">
          {CONTACT.email}
        </a>

        <div className="text-warm-gray text-2xl mt-12">·</div>

        <p className="text-warm-gray mt-8">We respond within 24 hours</p>
      </motion.div>
    </section>
  )
}
