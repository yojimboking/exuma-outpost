import type { Metadata } from 'next'
import { EB_Garamond } from 'next/font/google'
import './globals.css'

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'The Exuma Outpost | Luxury Resort Rental in the Bahamas',
  description: 'Experience barefoot luxury at The Exuma Outpost. A private 6-bedroom resort on the pristine waters of Little Exuma, Bahamas. Book the full property or individual wings for your perfect island escape.',
  keywords: ['Exuma', 'Bahamas', 'luxury rental', 'vacation rental', 'private resort', 'Caribbean', 'Little Exuma'],
  openGraph: {
    title: 'The Exuma Outpost | Luxury Resort Rental in the Bahamas',
    description: 'Experience barefoot luxury at The Exuma Outpost. A private 6-bedroom resort on the pristine waters of Little Exuma, Bahamas.',
    type: 'website',
    locale: 'en_US',
    siteName: 'The Exuma Outpost',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&h=630&fit=crop&q=80',
        width: 1200,
        height: 630,
        alt: 'The Exuma Outpost - Luxury beachfront resort in the Bahamas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Exuma Outpost | Luxury Resort Rental in the Bahamas',
    description: 'Experience barefoot luxury at The Exuma Outpost. A private 6-bedroom resort on the pristine waters of Little Exuma, Bahamas.',
    images: ['https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&h=630&fit=crop&q=80'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

// JSON-LD structured data for LodgingBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'The Exuma Outpost',
  description: 'A private 6-bedroom luxury resort on the pristine waters of Little Exuma, Bahamas.',
  image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Little Exuma',
    addressCountry: 'BS',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.4942,
    longitude: -75.7834,
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Pool' },
    { '@type': 'LocationFeatureSpecification', name: 'Private Beach' },
    { '@type': 'LocationFeatureSpecification', name: 'Chef Kitchen' },
    { '@type': 'LocationFeatureSpecification', name: 'WiFi' },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning' },
  ],
  numberOfRooms: 6,
  petsAllowed: false,
  priceRange: '$$$$',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={garamond.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
