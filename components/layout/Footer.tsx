'use client'

import Link from 'next/link'
import { PROPERTY, SOCIAL_LINKS } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-ink text-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <div className="text-2xl tracking-widest mb-8">{PROPERTY.name}</div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-8">
          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          {/* Airbnb */}
          <a
            href={SOCIAL_LINKS.airbnb}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Airbnb"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.001 18.275c-.753-1.157-1.214-2.342-1.5-3.325-.333-1.147-.423-2.063-.423-2.63 0-.797.188-1.387.503-1.787.338-.431.845-.689 1.42-.689s1.082.258 1.42.689c.315.4.503.99.503 1.787 0 .567-.09 1.483-.423 2.63-.286.983-.747 2.168-1.5 3.325zm6.63-1.39c-.181.602-.554 1.207-1.073 1.743-.514.53-1.163.974-1.893 1.298-.657.292-1.37.48-2.084.572.19-.247.373-.5.548-.76.835-1.244 1.388-2.58 1.731-3.758.36-1.234.489-2.328.489-3.16 0-1.165-.287-2.141-.866-2.878-.6-.764-1.494-1.196-2.483-1.196s-1.883.432-2.483 1.196c-.579.737-.866 1.713-.866 2.878 0 .832.129 1.926.489 3.16.343 1.178.896 2.514 1.731 3.758.175.26.358.513.548.76-.714-.092-1.427-.28-2.084-.572-.73-.324-1.379-.768-1.893-1.298-.519-.536-.892-1.141-1.073-1.743-.18-.6-.214-1.227-.078-1.818.135-.586.422-1.147.832-1.63.41-.484.942-.888 1.558-1.175.608-.284 1.286-.45 1.992-.45h.032c-.001-.003-.002-.006-.003-.009-.287-.88-.498-1.74-.498-2.548 0-.865.231-1.587.701-2.146.49-.582 1.193-.921 1.969-.921.775 0 1.478.339 1.968.921.47.559.701 1.281.701 2.146 0 .808-.211 1.668-.498 2.548-.001.003-.002.006-.003.009h.032c.706 0 1.384.166 1.992.45.616.287 1.148.691 1.558 1.175.41.483.697 1.044.832 1.63.136.591.102 1.218-.078 1.818zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
          </a>

          {/* VRBO */}
          <a
            href={SOCIAL_LINKS.vrbo}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="VRBO"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm tracking-wider">
          <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
            Privacy
          </Link>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
          >
            @the_exuma_outpost
          </a>
        </div>

        {/* Book Direct Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full mb-8 text-sm">
          <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          <span className="text-white/80">Book direct & save on fees</span>
        </div>

        {/* Divider */}
        <div className="text-white/30 mb-8">·</div>

        {/* Copyright */}
        <p className="text-white/40 text-sm">
          &copy; {new Date().getFullYear()} {PROPERTY.name}
        </p>
        <p className="text-white/40 text-sm mt-2">{PROPERTY.location}</p>
      </div>
    </footer>
  )
}
