import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { Welcome } from '@/components/sections/Welcome'
import { ImageBreak } from '@/components/sections/ImageBreak'
import { TrustBar } from '@/components/sections/TrustBar'
import { Testimonials } from '@/components/sections/Testimonials'
import { PropertyMap } from '@/components/sections/PropertyMap'
import { Amenities } from '@/components/sections/Amenities'
import { SplitGallery } from '@/components/sections/SplitGallery'
import { ExploreArea } from '@/components/sections/ExploreArea'
import { MontageGallery } from '@/components/sections/MontageGallery'
import { BespokeLuxury } from '@/components/sections/BespokeLuxury'
import { About } from '@/components/sections/About'
import { InquiryForm } from '@/components/sections/InquiryForm'
import { IMAGES } from '@/lib/constants'

export default function Home() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />

      {/* 1. Hero - Aerial top-down */}
      <Hero />

      {/* 2. Welcome - Short poetic intro */}
      <Welcome />

      {/* 2.5. Image Break - Pig shot */}
      <ImageBreak
        src={IMAGES.heroPig}
        alt="Swimming with pigs in Exuma"
        caption="The Experience"
        aspectRatio="ultrawide"
      />

      {/* 3. Trust Bar - Stats */}
      <TrustBar />

      {/* 4. Testimonials - Guest stories */}
      <Testimonials />

      {/* 5. Property Map - Interactive hover zones */}
      <PropertyMap />

      {/* 6. Amenities - Simple highlights */}
      <Amenities />

      {/* 7. Split Gallery - In & Out / Out & About */}
      <SplitGallery />

      {/* 8. Explore the Area - Map & nearby */}
      <ExploreArea />

      {/* 9. Montage Gallery - Sliding panels */}
      <MontageGallery />

      {/* 10. Bespoke Luxury - Quote section */}
      <BespokeLuxury />

      {/* 11. About - Story */}
      <About />

      {/* 12. Inquiry - Sharell booking manager with sunset bg */}
      <InquiryForm />

      {/* 13. Footer */}
      <Footer />
    </main>
  )
}
