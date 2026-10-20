// Local photos from marcus nispel collection
export const IMAGES = {
  // Hero - Main cover and pig shot
  hero: '/photos/hero/cover.jpg',
  heroMobile: '/photos/hero/cover.jpg',
  heroPig: '/photos/hero/pig.jpg',

  // Property map - aerial/overview
  propertyMap: '/photos/property-map/background.jpg',

  // Wings - hover sections
  grandSalon: {
    hero: '/photos/wings/grand-salon/Main_House.jpg',
    gallery: [
      '/photos/wings/grand-salon/livingroom00001.jpg',
      '/photos/wings/grand-salon/livingroom00002.jpg',
      '/photos/wings/grand-salon/livingroom00003.jpg',
      '/photos/wings/grand-salon/livingroom00004.jpg',
    ],
  },
  eastWing: {
    hero: '/photos/wings/east/main.jpg',
    gallery: [
      '/photos/wings/east/Ostwing00001.jpg',
      '/photos/wings/east/Ostwing00002.jpg',
      '/photos/wings/east/Ostwing00003.jpg',
      '/photos/wings/east/Ostwing00004.jpg',
    ],
  },
  westWing: {
    hero: '/photos/wings/west/main.jpg',
    gallery: [
      '/photos/wings/west/Westwing00001.jpg',
      '/photos/wings/west/Westwing00002.jpg',
      '/photos/wings/west/Westwing00003.jpg',
      '/photos/wings/west/Westwing00004.jpg',
    ],
  },

  // Lifestyle gallery
  lifestyle: [
    '/photos/gallery/pool.jpg',
    '/photos/gallery/moonbath.jpg',
    '/photos/gallery/Beach00007.jpg',
    '/photos/gallery/Beach00008.jpg',
    '/photos/gallery/Deck00007.jpg',
    '/photos/gallery/Deck00008.jpg',
    '/photos/gallery/Atmospherer00007.jpg',
    '/photos/gallery/Atmospherer00008.jpg',
  ],

  // IN & OUT - Interior/property shots
  inAndOut: {
    hero: '/photos/in-and-out/Atmospherer00001.jpg',
    gallery: [
      '/photos/in-and-out/Atmospherer00002.jpg',
      '/photos/in-and-out/Atmospherer00003.jpg',
      '/photos/in-and-out/Deck00001.jpg',
      '/photos/in-and-out/Deck00002.jpg',
      '/photos/in-and-out/kitchen00001.jpg',
      '/photos/in-and-out/exuma-039.jpg',
    ],
  },

  // OUT & ABOUT - Beach, activities, people
  outAndAbout: {
    hero: '/photos/out-and-about/Beach00001.jpg',
    gallery: [
      '/photos/out-and-about/Beach00002.jpg',
      '/photos/out-and-about/Beach00003.jpg',
      '/photos/out-and-about/Beach00004.jpg',
      '/photos/out-and-about/People00001.jpg',
      '/photos/out-and-about/People00002.jpg',
      '/photos/out-and-about/Lead schots for main menu -1.JPG',
    ],
  },

  // Activities
  activities: [
    '/photos/out-and-about/Beach00005.jpg',
    '/photos/out-and-about/Beach00006.jpg',
    '/photos/out-and-about/People00003.jpg',
    '/photos/out-and-about/People00004.jpg',
  ],
}

// Wing data
export interface Wing {
  id: 'grand-salon' | 'east' | 'west'
  name: string
  displayName: string
  description: string
  capacity: number
  bedrooms: number
  bathrooms: number
  heroImage: string
  gallery: string[]
  position: { top: string; left: string; width: string; height: string }
}

export const WINGS: Wing[] = [
  {
    id: 'east',
    name: 'East Wing',
    displayName: 'EAST WING',
    description: 'Pool-facing bedrooms, beach-facing master, private kitchen. Features the traditional Bahamian river rock oven for baking pizzas and bread.',
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    heroImage: IMAGES.eastWing.hero,
    gallery: IMAGES.eastWing.gallery,
    position: { top: '25%', left: '5%', width: '28%', height: '50%' },
  },
  {
    id: 'grand-salon',
    name: 'The Grand Salon',
    displayName: 'THE GRAND SALON',
    description: 'The heart of the Outpost. State-of-the-art entertainment center, large dining area, and open-plan chef\'s kitchen for gourmet courses and events.',
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    heroImage: IMAGES.grandSalon.hero,
    gallery: IMAGES.grandSalon.gallery,
    position: { top: '20%', left: '36%', width: '28%', height: '60%' },
  },
  {
    id: 'west',
    name: 'West Wing',
    displayName: 'WEST WING',
    description: 'Pool-facing bedrooms, beach-facing master, private kitchen. Features outdoor fireplace with sunset beach views.',
    capacity: 4,
    bedrooms: 2,
    bathrooms: 2,
    heroImage: IMAGES.westWing.hero,
    gallery: IMAGES.westWing.gallery,
    position: { top: '25%', left: '67%', width: '28%', height: '50%' },
  },
]

// Property info
export const PROPERTY = {
  name: 'THE EXUMA OUTPOST',
  tagline: 'A Bespoke Luxury Rental',
  location: 'Forbes Hill, Little Exuma, Bahamas',

  // VRBO-style stats
  rating: 10,
  ratingLabel: 'Exceptional',
  reviewCount: 33,
  bedrooms: 6,
  bathrooms: 6,
  sleeps: 12,
  sqft: 4000,

  // Welcome - short poetic intro
  welcome: 'A private retreat on the shores of Little Exuma. Three distinct residences united by secluded white-sand beach and the clearest water on Earth.',

  // Welcome extended - for longer sections
  welcomeExtended: 'The Outpost sleeps up to 12 people in luxury and simplicity—something we firmly believe goes hand in hand. This serene refuge is located in the middle of a secluded cove with calm, Tiffany-blue waters and endless white powder-sands that extend all the way to legendary Tropic of Cancer Beach.',

  // About - founder story
  about: 'The Outpost was conceived by director Marcus Nispel and Dyan Nispel—members of the creative community who built a place to host discerning guests from the world of arts and entertainment.',

  // About extended - philosophy
  aboutExtended: 'A creative space for people to get together and bond, celebrate life, make plans for the future, get engaged or get married. The Exuma Outpost can be anything from a bonefishing lodge to a yoga retreat, a live-in production facility to a corporate think-tank.',

  // Notable clients
  clients: 'Condé Nast, Absolut Vodka, Veuve Clicquot, National Geographic, Target, Sony, Nike, McIntosh',

  // Tagline
  closingTagline: 'Turn key for the experience of a lifetime and lifelong memories.',

  // Property overview
  overview: '4,000 square feet of living space across three connected structures. The Grand Salon accommodates big families, multiple couples, and large groups with sectional designer couches, a comfortable daybed, and an open-plan chef\'s kitchen.',

  // Amenities
  popularAmenities: ['Pool', 'Chef\'s Kitchen', 'Washer', 'Dryer', 'Free WiFi', 'Air conditioning'],

  fullAmenities: [
    'Secluded white-sand beach',
    'Tropical rain pool',
    'Chef\'s kitchen + 2 side kitchens',
    'Wine cooler',
    'Micro-greens grower',
    'Vitamix blender',
    'Outdoor dining for 30',
    'BBQ grill station',
    'Bahamian river rock pizza oven',
    'Wrap-around decks',
    'Outdoor fireplaces',
    'Spa & yoga deck',
    'Al fresco bathtub',
    'Kayaks & paddleboards',
    'Bicycles',
    'WiFi throughout',
    'Bluetooth Phantom speaker',
    'Air conditioning',
    'Washer & dryer',
  ],
}

// Nearby locations (from VRBO)
export const NEARBY = [
  { name: 'Tropic of Cancer Beach', type: 'Beach', drive: '7 min' },
  { name: 'Little Exuma Beaches', type: 'Beach', drive: '8 min' },
  { name: 'Salt Pond', type: 'Nature', drive: '9 min' },
  { name: 'George Town (GGT)', type: 'Airport', drive: '43 min' },
]

// Activities
export const ACTIVITIES = [
  { name: 'Swimming Pigs', description: 'Visit the famous swimming pigs at Big Major Cay' },
  { name: 'Thunderball Grotto', description: 'Snorkel the legendary James Bond film location' },
  { name: 'Island Hopping', description: 'Explore the 365 cays of the Exuma chain' },
  { name: 'Diving', description: 'World-class reef and blue hole diving' },
  { name: 'Fishing', description: 'Deep sea, bonefishing, and reef fishing' },
  { name: 'Kayaking', description: 'Paddle through crystal-clear mangroves' },
]

// Navigation
export const NAV_LINKS = [
  { href: '#property', label: 'Property' },
  { href: '#explore', label: 'Explore' },
  { href: '/bespoke', label: 'Bespoke' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Inquire' },
]

// Contact
export const CONTACT = {
  whatsapp: '+12425551234',
  whatsappMessage: 'Hello, I am interested in booking The Exuma Outpost.',
  email: 'hello@exumaoutpost.com',
  instagram: '@exumaoutpost',
}

// Social Links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/the_exuma_outpost/',
  airbnb: 'https://www.airbnb.com/rooms/30688616',
  vrbo: 'https://www.vrbo.com/7560901ha',
}

// Listing IDs (for calendar sync and deep links)
export const LISTING_IDS = {
  airbnb: '30688616',
  vrbo: '7560901ha',
}

// Booking Manager
export const BOOKING_MANAGER = {
  name: 'Sharell',
  title: 'Property Manager',
  photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
  greeting: "Let's plan your stay",
  bio: '"Sharell was fantastic—she handled everything from airport pickup to dinner reservations. Truly made our trip effortless."',
  whatsapp: '+12425551234',
}

// Seasonal Pricing Model
// Based on Exuma Bahamas rental seasons:
// - High Season: November - April (peak demand, winter escape)
// - Shoulder Season: May, October (transitional months)
// - Low Season: June - September (hurricane season, lowest demand)

export type SeasonType = 'high' | 'shoulder' | 'low'

export interface SeasonInfo {
  type: SeasonType
  label: string
  pricePerNight: number
  discount: number // amount off from high season
  badge: string | null // what the user sees
  badgeColor: string
}

// Month index (0-11) to season mapping
export const MONTH_SEASONS: Record<number, SeasonType> = {
  0: 'high',      // January - High
  1: 'high',      // February - High
  2: 'high',      // March - Peak High (Spring Break)
  3: 'high',      // April - High
  4: 'shoulder',  // May - Shoulder
  5: 'low',       // June - Low
  6: 'low',       // July - Low
  7: 'low',       // August - Low
  8: 'low',       // September - Lowest
  9: 'shoulder',  // October - Shoulder
  10: 'high',     // November - High
  11: 'high',     // December - Peak High (Holidays)
}

export const SEASON_INFO: Record<SeasonType, SeasonInfo> = {
  high: {
    type: 'high',
    label: 'Peak Season',
    pricePerNight: 2000,
    discount: 0,
    badge: null,
    badgeColor: '',
  },
  shoulder: {
    type: 'shoulder',
    label: 'Shoulder Season',
    pricePerNight: 1750,
    discount: 250,
    badge: 'Seasonal Rate',
    badgeColor: 'bg-blue-500',
  },
  low: {
    type: 'low',
    label: 'Special Offer',
    pricePerNight: 1500,
    discount: 500,
    badge: 'Special Offer',
    badgeColor: 'bg-emerald-500',
  },
}

// Helper to get season info for a specific date
export function getSeasonForDate(date: Date): SeasonInfo {
  const month = date.getMonth()
  const seasonType = MONTH_SEASONS[month]
  return SEASON_INFO[seasonType]
}

// Helper to get price for a specific date
export function getPriceForDate(date: Date): number {
  return getSeasonForDate(date).pricePerNight
}

// Helper to calculate total for a date range
export function calculateStayTotal(checkIn: Date, checkOut: Date): {
  nights: number
  breakdown: { date: Date; price: number; season: SeasonInfo }[]
  subtotal: number
  averagePerNight: number
  totalDiscount: number
} {
  const breakdown: { date: Date; price: number; season: SeasonInfo }[] = []
  let currentDate = new Date(checkIn)
  let totalDiscount = 0

  while (currentDate < checkOut) {
    const season = getSeasonForDate(currentDate)
    breakdown.push({
      date: new Date(currentDate),
      price: season.pricePerNight,
      season,
    })
    totalDiscount += season.discount
    currentDate.setDate(currentDate.getDate() + 1)
  }

  const subtotal = breakdown.reduce((sum, day) => sum + day.price, 0)
  const nights = breakdown.length

  return {
    nights,
    breakdown,
    subtotal,
    averagePerNight: nights > 0 ? Math.round(subtotal / nights) : 0,
    totalDiscount,
  }
}

// Pricing (keeping for backwards compatibility, uses high season as base)
export const PRICING = {
  perNight: 2000, // Base/high season rate
  minimumNights: 7,
  currency: 'USD',
  cleaningFee: 500,
  serviceFee: 0, // percentage
}

// Service type definition
export type ServicePriceType = 'flat' | 'per_day' | 'per_person' | 'inquire'

export interface Service {
  id: string
  label: string
  description: string
  price: number | null
  priceType: ServicePriceType
}

export interface ServiceCategory {
  name: string
  services: Service[]
}

// Services/Add-ons with pricing - organized by category for inquiry form
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: 'Essentials',
    services: [
      { id: 'airport-transfer', label: 'Airport Transfer', description: 'Roundtrip from George Town (GGT)', price: 250, priceType: 'flat' as const },
      { id: 'grocery', label: 'Grocery Stocking', description: 'Provisions upon arrival', price: 150, priceType: 'flat' as const },
      { id: 'car-rental', label: 'Car Rental', description: 'Explore the island', price: null, priceType: 'inquire' as const },
    ],
  },
  {
    name: 'Dining',
    services: [
      { id: 'private-chef', label: 'Private Chef', description: 'Full day in-house dining', price: 500, priceType: 'per_day' as const },
      { id: 'bbq-grill', label: 'BBQ Grill Master', description: 'Island-style BBQ', price: null, priceType: 'inquire' as const },
      { id: 'pizza-party', label: 'Pizza Party', description: 'Wood-fired at our outdoor oven', price: null, priceType: 'inquire' as const },
    ],
  },
  {
    name: 'Activities',
    services: [
      { id: 'boat-charter', label: 'Boat Charter', description: 'Swimming pigs & Thunderball', price: 1200, priceType: 'per_day' as const },
      { id: 'fishing', label: 'Fishing Trip', description: 'Bonefishing or deep sea', price: 800, priceType: 'flat' as const },
      { id: 'diving', label: 'Diving / Snorkeling', description: 'Reef and blue hole', price: 350, priceType: 'per_person' as const },
    ],
  },
  {
    name: 'Wellness',
    services: [
      { id: 'spa', label: 'In-Villa Spa', description: 'Massage and treatments', price: 200, priceType: 'per_person' as const },
      { id: 'yoga', label: 'Yoga / Meditation', description: 'Private sessions', price: null, priceType: 'inquire' as const },
    ],
  },
  {
    name: 'Events',
    services: [
      { id: 'wedding', label: 'Wedding Planning', description: 'Destination wedding coordination', price: null, priceType: 'inquire' as const },
      { id: 'photography', label: 'Photography / Video', description: 'Professional coverage', price: null, priceType: 'inquire' as const },
      { id: 'live-music', label: 'Live Music', description: 'Junkanoo, DJ, or band', price: null, priceType: 'inquire' as const },
    ],
  },
]

// Flat list for backwards compatibility
export const SERVICES = SERVICE_CATEGORIES.flatMap(cat => cat.services)

// Payment Policy
// Based on industry standard for luxury vacation rentals
export interface PaymentPolicy {
  depositPercentage: number
  depositDescription: string
  balanceDueDays: number
  balanceDescription: string
  cancellationPolicy: CancellationTier[]
  travelInsuranceRecommended: boolean
}

export interface CancellationTier {
  minDaysOut: number
  maxDaysOut: number | null // null means "or more"
  refundPercentage: number
  description: string
}

export const PAYMENT_POLICY: PaymentPolicy = {
  depositPercentage: 50,
  depositDescription: '50% deposit required to confirm booking',
  balanceDueDays: 30,
  balanceDescription: 'Remaining balance due 30 days before arrival',
  cancellationPolicy: [
    {
      minDaysOut: 60,
      maxDaysOut: null,
      refundPercentage: 100,
      description: 'Full refund if cancelled 60+ days before arrival',
    },
    {
      minDaysOut: 30,
      maxDaysOut: 60,
      refundPercentage: 50,
      description: '50% refund if cancelled 30-60 days before arrival',
    },
    {
      minDaysOut: 0,
      maxDaysOut: 30,
      refundPercentage: 0,
      description: 'No refund if cancelled less than 30 days before arrival',
    },
  ],
  travelInsuranceRecommended: true,
}

/**
 * Get human-readable summary of payment policy
 */
export function getPaymentPolicySummary(): string {
  const { depositPercentage, balanceDueDays, cancellationPolicy } = PAYMENT_POLICY

  const cancellationSummary = cancellationPolicy
    .map(tier => tier.description)
    .join('. ')

  return `${depositPercentage}% deposit to confirm booking. Balance due ${balanceDueDays} days before arrival. Cancellation policy: ${cancellationSummary}. Travel insurance is recommended.`
}

/**
 * Calculate refund amount based on days until arrival
 */
export function calculateRefund(totalPaid: number, daysUntilArrival: number): {
  refundPercentage: number
  refundAmount: number
  description: string
} {
  const tier = PAYMENT_POLICY.cancellationPolicy.find(t => {
    if (t.maxDaysOut === null) {
      return daysUntilArrival >= t.minDaysOut
    }
    return daysUntilArrival >= t.minDaysOut && daysUntilArrival < t.maxDaysOut
  })

  if (!tier) {
    return {
      refundPercentage: 0,
      refundAmount: 0,
      description: 'No refund available',
    }
  }

  return {
    refundPercentage: tier.refundPercentage,
    refundAmount: Math.round(totalPaid * (tier.refundPercentage / 100)),
    description: tier.description,
  }
}

// iCal feeds for availability sync (placeholder URLs - replace with actual VRBO/Airbnb feeds)
export const ICAL_FEEDS = {
  vrbo: 'https://www.vrbo.com/icalendar/exuma-outpost.ics',
  airbnb: 'https://www.airbnb.com/calendar/ical/exuma-outpost.ics',
}
