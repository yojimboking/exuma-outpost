import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PROPERTY, PRICING } from '@/lib/constants'

const TOC_ITEMS = [
  { id: 'booking', label: 'Booking Terms' },
  { id: 'cancellation', label: 'Cancellation Policy' },
  { id: 'deposit', label: 'Security Deposit' },
  { id: 'payment', label: 'Payment Terms' },
  { id: 'check-in', label: 'Check-in & Check-out' },
  { id: 'house-rules', label: 'House Rules' },
  { id: 'services', label: 'Bespoke Services' },
  { id: 'faq', label: 'FAQ' },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Header />

      <section className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-warm-gray">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">Home</Link>
              </li>
              <li className="text-warm-gray/50">/</li>
              <li className="text-ink">Terms of Service</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl tracking-wider text-ink mb-4 text-center">
            TERMS OF SERVICE
          </h1>
          <p className="text-center text-warm-gray mb-10">
            {PROPERTY.name} · Little Exuma, Bahamas
          </p>

          {/* Table of Contents */}
          <nav className="mb-16 p-6 bg-white border border-light-gray">
            <h2 className="text-sm tracking-wider text-ink mb-4 uppercase">Contents</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TOC_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-warm-gray hover:text-ink transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Booking Terms */}
          <section id="booking" className="mb-12 scroll-mt-32">
            <h2 className="text-xl tracking-wider text-ink mb-4 uppercase">Booking Terms</h2>
            <div className="space-y-3 text-warm-gray text-sm leading-relaxed">
              <p>
                <strong className="text-ink">Minimum Stay:</strong> {PRICING.minimumNights} nights minimum for all bookings.
              </p>
              <p>
                <strong className="text-ink">Nightly Rate:</strong> ${PRICING.perNight.toLocaleString()} USD per night.
                Rates may vary during peak seasons (Christmas, New Year, Easter). Contact us for seasonal pricing.
              </p>
              <p>
                <strong className="text-ink">Cleaning Fee:</strong> ${PRICING.cleaningFee} one-time fee applied to all bookings.
              </p>
              <p>
                <strong className="text-ink">Maximum Occupancy:</strong> {PROPERTY.sleeps} guests. Additional guests are not permitted without prior approval.
              </p>
            </div>
          </section>

          {/* Cancellation Policy */}
          <section id="cancellation" className="mb-12 scroll-mt-32">
            <h2 className="text-xl tracking-wider text-ink mb-4 uppercase">Cancellation Policy</h2>
            <div className="space-y-3 text-warm-gray text-sm leading-relaxed">
              <p>We understand plans change. Our cancellation policy is designed to be fair to both guests and our property management team.</p>
              <div className="bg-white p-4 border border-light-gray space-y-2">
                <p><strong className="text-ink">60+ days before check-in:</strong> Full refund minus $500 processing fee</p>
                <p><strong className="text-ink">30-59 days before check-in:</strong> 50% refund of total booking</p>
                <p><strong className="text-ink">Less than 30 days:</strong> No refund (full amount retained)</p>
              </div>
              <p className="text-xs text-warm-gray/70 mt-4">
                In case of hurricanes or documented natural disasters, we will work with you to reschedule your stay at no additional cost, subject to availability.
              </p>
            </div>
          </section>

          {/* Security Deposit */}
          <section id="deposit" className="mb-12 scroll-mt-32">
            <h2 className="text-xl tracking-wider text-ink mb-4 uppercase">Security Deposit</h2>
            <div className="space-y-3 text-warm-gray text-sm leading-relaxed">
              <p>
                <strong className="text-ink">Amount:</strong> $2,000 USD security deposit required for all bookings.
              </p>
              <p>
                The deposit is collected 14 days prior to arrival and held until 7 days after departure.
                It covers any damages beyond normal wear and tear, missing items, or excessive cleaning required.
              </p>
              <p>
                Deposit will be returned via the original payment method within 7 business days of checkout,
                provided no deductions are necessary.
              </p>
            </div>
          </section>

          {/* Payment */}
          <section id="payment" className="mb-12 scroll-mt-32">
            <h2 className="text-xl tracking-wider text-ink mb-4 uppercase">Payment Terms</h2>
            <div className="space-y-3 text-warm-gray text-sm leading-relaxed">
              <div className="bg-white p-4 border border-light-gray space-y-2">
                <p><strong className="text-ink">Upon booking:</strong> 50% deposit to secure your dates</p>
                <p><strong className="text-ink">30 days before arrival:</strong> Remaining 50% balance due</p>
                <p><strong className="text-ink">14 days before arrival:</strong> Security deposit charged</p>
              </div>
              <p className="mt-4">
                <strong className="text-ink">Accepted Payment Methods:</strong> Wire transfer, credit card (Visa, Mastercard, Amex).
                3% processing fee applies to credit card payments.
              </p>
            </div>
          </section>

          {/* Check-in/out */}
          <section id="check-in" className="mb-12 scroll-mt-32">
            <h2 className="text-xl tracking-wider text-ink mb-4 uppercase">Check-in & Check-out</h2>
            <div className="space-y-3 text-warm-gray text-sm leading-relaxed">
              <p><strong className="text-ink">Check-in:</strong> 3:00 PM (flexible with advance notice)</p>
              <p><strong className="text-ink">Check-out:</strong> 11:00 AM (late checkout available upon request, subject to availability)</p>
              <p>
                Airport transfers from George Town (GGT) can be arranged.
                Flight information should be provided at least 48 hours before arrival.
              </p>
            </div>
          </section>

          {/* House Rules */}
          <section className="mb-12">
            <h2 className="text-xl tracking-wider text-ink mb-4 uppercase">House Rules</h2>
            <div className="space-y-3 text-warm-gray text-sm leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
                <li>No smoking inside the property (designated outdoor areas available)</li>
                <li>No pets without prior approval</li>
                <li>No events or parties without prior written consent</li>
                <li>Quiet hours from 10 PM to 8 AM</li>
                <li>Respect for neighbors and local community</li>
                <li>No commercial photography or filming without permission</li>
              </ul>
            </div>
          </section>

          {/* Bespoke Services */}
          <section id="services" className="mb-12 scroll-mt-32">
            <h2 className="text-xl tracking-wider text-ink mb-4 uppercase">Bespoke Services</h2>
            <div className="space-y-4 text-warm-gray text-sm leading-relaxed">
              <p>
                The Exuma Outpost operates on a bespoke basis. Our concierge Sharell can arrange a wide range of services to enhance your stay.
              </p>
              <div className="bg-white p-4 border border-light-gray">
                <h3 className="text-ink font-medium mb-3">Popular Add-Ons</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between"><span>Airport Transfer (roundtrip)</span><span className="text-ink">$250</span></div>
                  <div className="flex justify-between"><span>Grocery Stocking</span><span className="text-ink">$150 + groceries</span></div>
                  <div className="flex justify-between"><span>Private Chef</span><span className="text-ink">$500/day + groceries</span></div>
                  <div className="flex justify-between"><span>Boat Charter (full day)</span><span className="text-ink">$1,200</span></div>
                  <div className="flex justify-between"><span>Fishing Trip (half day)</span><span className="text-ink">$800</span></div>
                  <div className="flex justify-between"><span>Diving Excursion</span><span className="text-ink">$350/person</span></div>
                  <div className="flex justify-between"><span>In-Villa Massage</span><span className="text-ink">$200/person</span></div>
                  <div className="flex justify-between"><span>Car Rental</span><span className="text-ink">Inquire</span></div>
                </div>
              </div>
              <p>
                Additional services include wedding planning, photography, live entertainment, yoga instruction, and childcare.
                Visit our <Link href="/bespoke" className="text-ink underline">Bespoke page</Link> for the full menu.
              </p>
              <p className="text-xs text-warm-gray/70">
                Note: Little Exuma is a remote island. Items requiring customs clearance may need 4-6 weeks advance notice.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="mb-12 scroll-mt-32">
            <h2 className="text-xl tracking-wider text-ink mb-6 uppercase">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">How do I get to the property from the airport?</h3>
                <p className="text-warm-gray text-sm">
                  We arrange airport transfers from George Town (GGT) airport. The drive is approximately 45 minutes.
                  Private charters can also fly directly to a closer airstrip—contact us for details.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">Is grocery stocking available?</h3>
                <p className="text-warm-gray text-sm">
                  Yes! Our property manager Sharell can stock the kitchen before your arrival.
                  Provide a list and budget at least 72 hours in advance. A $150 service fee applies.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">Can we book a private chef?</h3>
                <p className="text-warm-gray text-sm">
                  Absolutely. We work with excellent local chefs who can prepare breakfast, lunch, dinner,
                  or all meals during your stay. Rates start at $500/day plus groceries.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">What activities can be arranged?</h3>
                <p className="text-warm-gray text-sm">
                  Swimming pigs, Thunderball Grotto snorkeling, Dean's Blue Hole, island hopping, fishing (bonefishing and deep sea),
                  diving, paddleboarding, and private boat charters. Visit our <Link href="/bespoke" className="underline">Bespoke page</Link> for the full list.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">Can we host a wedding or event?</h3>
                <p className="text-warm-gray text-sm">
                  Yes! The Exuma Outpost is perfect for destination weddings, family reunions, corporate retreats, and celebrations.
                  We can arrange wedding planners, photographers, live music, and catering. Contact Sharell early to coordinate.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">Is the property suitable for children?</h3>
                <p className="text-warm-gray text-sm">
                  Yes, families are welcome. The beach has calm, shallow water perfect for children.
                  We can arrange cribs and high chairs upon request.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">What is the WiFi speed?</h3>
                <p className="text-warm-gray text-sm">
                  We have reliable WiFi throughout the property. Speeds are sufficient for video calls and streaming,
                  though this is a remote island location—expect occasional fluctuations.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">Is there air conditioning?</h3>
                <p className="text-warm-gray text-sm">
                  Yes, all bedrooms and common areas have air conditioning. The property is also designed with
                  cross-ventilation for natural cooling when preferred.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-ink mb-2">What about hurricane season?</h3>
                <p className="text-warm-gray text-sm">
                  Hurricane season runs June through November. We monitor weather closely and will work with you
                  to reschedule if a storm threatens. Travel insurance is strongly recommended.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="text-center pt-8 border-t border-light-gray">
            <p className="text-warm-gray text-sm mb-4">
              Questions? Contact our property manager for assistance.
            </p>
            <a
              href="/#contact"
              className="inline-block px-8 py-3 bg-ink text-white text-sm tracking-wider hover:bg-ink/90 transition-colors"
            >
              INQUIRE NOW
            </a>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  )
}
