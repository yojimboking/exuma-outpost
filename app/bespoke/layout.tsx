import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bespoke Services | The Exuma Outpost',
  description: 'Customize your Exuma escape with our bespoke services. Swimming pigs, private chefs, boat charters, weddings, and more. Your personal concierge Sharell handles every detail.',
  keywords: ['Exuma tours', 'swimming pigs tour', 'Bahamas private chef', 'Exuma boat charter', 'destination wedding Bahamas', 'Thunderball Grotto', 'luxury concierge Bahamas'],
  openGraph: {
    title: 'Bespoke Services | The Exuma Outpost',
    description: 'Customize your Exuma escape with our bespoke services. Swimming pigs, private chefs, boat charters, weddings, and more.',
    type: 'website',
    locale: 'en_US',
    siteName: 'The Exuma Outpost',
    images: [
      {
        url: '/photos/out-and-about/Beach00001.jpg',
        width: 1200,
        height: 630,
        alt: 'Bespoke experiences at The Exuma Outpost',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bespoke Services | The Exuma Outpost',
    description: 'Customize your Exuma escape with our bespoke services. Swimming pigs, private chefs, boat charters, weddings, and more.',
    images: ['/photos/out-and-about/Beach00001.jpg'],
  },
}

// JSON-LD structured data for TouristDestination
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristDestination',
  name: 'The Exuma Outpost Bespoke Services',
  description: 'Luxury concierge services in Little Exuma, Bahamas including tours, private chefs, boat charters, and event planning.',
  touristType: ['Luxury Travelers', 'Honeymooners', 'Families', 'Corporate Groups'],
  includesAttraction: [
    {
      '@type': 'TouristAttraction',
      name: 'Swimming Pigs at Big Major Cay',
      description: 'Visit the famous swimming pigs of the Exumas',
    },
    {
      '@type': 'TouristAttraction',
      name: 'Thunderball Grotto',
      description: 'Snorkel the legendary James Bond filming location',
    },
    {
      '@type': 'TouristAttraction',
      name: "Dean's Blue Hole",
      description: "World's second deepest blue hole",
    },
  ],
}

export default function BespokeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
