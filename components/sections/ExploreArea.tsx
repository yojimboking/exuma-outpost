'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { NEARBY } from '@/lib/constants'

// Signature tours - the main attractions
const SIGNATURE_TOURS = [
  {
    name: 'Swimming Pigs',
    description: 'Visit the famous swimming pigs at Big Major Cay',
    image: 'https://images.unsplash.com/photo-1632850670562-49b3866796e1?w=800&q=80',
    duration: 'Full day',
    link: 'https://www.tripadvisor.com/Attraction_Review-g147432-d5489633-Reviews-Pig_Beach-Staniel_Cay_Out_Islands_Bahamas.html',
  },
  {
    name: 'Thunderball Grotto',
    description: 'Snorkel the legendary James Bond filming location',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    duration: 'Half day',
    link: 'https://www.tripadvisor.com/Attraction_Review-g147432-d185182-Reviews-Thunderball_Grotto-Staniel_Cay_Out_Islands_Bahamas.html',
  },
  {
    name: "Dean's Blue Hole",
    description: "World's third deepest blue hole — 663 feet deep",
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
    duration: 'Half day',
    link: 'https://www.tripadvisor.com/Attraction_Review-g2073708-d2281036-Reviews-Dean_s_Blue_Hole-Clarence_Town_Long_Island_Out_Islands_Bahamas.html',
  },
  {
    name: "Norman's Cay Plane Wreck",
    description: 'Snorkel a sunken drug plane from the 1980s',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
    duration: 'Full day',
    link: 'https://www.tripadvisor.com/Attraction_Review-g8305044-d23281664-Reviews-The_Wreck_Snorkel_Sunken_Plane_of_Pablo_Escobar-Norman_s_Cay_Out_Islands_Bahama.html',
  },
]

// Activity categories
const ACTIVITY_CATEGORIES = [
  {
    name: 'Water Sports',
    items: ['Scuba Diving', 'Snorkeling', 'Kayaking', 'Paddleboarding', 'Sailing'],
  },
  {
    name: 'Fishing',
    items: ['Bonefishing', 'Deep Sea Fishing', 'Spearfishing'],
  },
  {
    name: 'Nature',
    items: ['Mangrove Tours', 'Island Hopping', 'Iguana Island'],
  },
]

export function ExploreArea() {
  return (
    <section id="explore" className="py-16 sm:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl tracking-wider text-ink mb-4">EXPLORE THE AREA</h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Sharell arranges everything. From swimming pigs to Thunderball Grotto, your adventure awaits.
          </p>
        </motion.div>

        {/* Signature Tours - Hero Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {SIGNATURE_TOURS.map((tour, i) => (
            <motion.a
              key={tour.name}
              href={tour.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ y: -8 }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                <div className="text-white/70 text-xs tracking-wider uppercase mb-1 group-hover:text-white/90 transition-colors">{tour.duration}</div>
                <h3 className="text-white text-lg tracking-wide mb-1">{tour.name}</h3>
                <p className="text-white/80 text-sm opacity-80 group-hover:opacity-100 transition-opacity">{tour.description}</p>
              </div>
              {/* External link indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Activity Categories */}
          {ACTIVITY_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-sm tracking-wider mb-4 uppercase text-ink">{category.name}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-warm-gray text-lg flex items-center gap-2">
                    <span className="w-1 h-1 bg-warm-gray/50 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Nearby */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm tracking-wider mb-4 uppercase text-ink">Nearby</h3>
            <div className="space-y-2">
              {NEARBY.map((place) => (
                <div key={place.name} className="flex justify-between items-center text-sm">
                  <span className="text-warm-gray text-lg">{place.name}</span>
                  <span className="text-warm-gray/60 text-lg">{place.drive}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Guest Review */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-8 border-t border-light-gray"
        >
          <p className="text-ink italic text-lg max-w-2xl mx-auto">
            "The fishing trip was incredible—Sharell set it all up and we caught wahoo on the first day. Best bonefishing of my life."
          </p>
          <p className="text-warm-gray text-sm mt-2">— Chad I., Guest Review</p>
        </motion.div>

        {/* CTA to Bespoke */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href="/bespoke"
            className="inline-block px-8 py-3 border border-ink text-ink text-sm tracking-wider hover:bg-ink hover:text-white transition-colors"
          >
            VIEW ALL EXPERIENCES
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
