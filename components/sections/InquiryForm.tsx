'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BOOKING_MANAGER, SERVICES, SERVICE_CATEGORIES, PROPERTY, PRICING, getSeasonForDate, calculateStayTotal, MONTH_SEASONS, SEASON_INFO } from '@/lib/constants'

// Simple date utilities
function formatDateForWhatsApp(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function isSameDay(date1: Date, date2: Date): boolean {
  return date1.toDateString() === date2.toDateString()
}

function isDateInRange(date: Date, start: Date, end: Date): boolean {
  return date >= start && date <= end
}

function daysBetween(start: Date, end: Date): number {
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startPadding = firstDay.getDay()
  const days: (Date | null)[] = []
  for (let i = 0; i < startPadding; i++) days.push(null)
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day))
  }
  return days
}

interface ServiceQuantity {
  id: string
  quantity: number
}

interface FormData {
  name: string
  email: string
  guests: number
  checkIn: Date | null
  checkOut: Date | null
  services: ServiceQuantity[]
  message: string
}

export function InquiryForm() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectingCheckOut, setSelectingCheckOut] = useState(false)
  const [showMinimumWarning, setShowMinimumWarning] = useState(false)

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)
  const [inquiryId, setInquiryId] = useState<string | null>(null)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    guests: 2,
    checkIn: null,
    checkOut: null,
    services: [],
    message: '',
  })

  // Blocked dates from availability API
  const [blockedDates, setBlockedDates] = useState<Date[]>([])

  // Fetch blocked dates from availability API on mount
  useEffect(() => {
    fetch('/api/availability')
      .then(res => res.json())
      .then(data => {
        if (data.blockedDates && Array.isArray(data.blockedDates)) {
          // Convert YYYY-MM-DD strings to Date objects
          const dates = data.blockedDates.map((dateStr: string) => {
            const [year, month, day] = dateStr.split('-').map(Number)
            return new Date(year, month - 1, day)
          })
          setBlockedDates(dates)
        }
      })
      .catch(err => {
        console.error('Failed to fetch availability:', err)
      })
  }, [])

  // Load bespoke selections from localStorage (from /bespoke page)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bespokeSelections')
      if (stored) {
        try {
          const selections = JSON.parse(stored) as { id: string; label: string; section: string }[]
          if (selections.length > 0) {
            // Convert bespoke selections to service format
            const serviceIds = selections.map(s => ({ id: s.id, quantity: 1 }))
            setFormData(prev => ({ ...prev, services: serviceIds }))
            // Build message from selections
            const grouped = selections.reduce((acc, s) => {
              if (!acc[s.section]) acc[s.section] = []
              acc[s.section].push(s.label)
              return acc
            }, {} as Record<string, string[]>)
            const message = Object.entries(grouped)
              .map(([section, items]) => `${section}: ${items.join(', ')}`)
              .join('\n')
            setFormData(prev => ({ ...prev, message: `Interested in:\n${message}` }))
            // Clear after loading
            localStorage.removeItem('bespokeSelections')
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [])

  // isBlackoutDate now uses blockedDates state from API

  // Calculate seasonal pricing
  const stayCalculation = useMemo(() => {
    if (formData.checkIn && formData.checkOut) {
      return calculateStayTotal(formData.checkIn, formData.checkOut)
    }
    return null
  }, [formData.checkIn, formData.checkOut])

  const nights = stayCalculation?.nights || 0
  const isValidStay = nights >= PRICING.minimumNights

  // Get current month's season for display
  const currentMonthSeason = useMemo(() => {
    const seasonType = MONTH_SEASONS[currentMonth]
    return SEASON_INFO[seasonType]
  }, [currentMonth])

  const addOnsTotal = useMemo(() => {
    return formData.services.reduce((total, item) => {
      const service = SERVICES.find(s => s.id === item.id)
      if (!service || service.price === null) return total
      let itemTotal = 0
      switch (service.priceType) {
        case 'flat':
          itemTotal = service.price * item.quantity
          break
        case 'per_day':
          // Only charge per-day add-ons when dates are selected (nights > 0)
          if (nights > 0) {
            itemTotal = service.price * item.quantity * nights
          }
          break
        case 'per_person':
          itemTotal = service.price * item.quantity * formData.guests
          break
        case 'inquire':
          // No price for inquire items
          break
      }
      return total + itemTotal
    }, 0)
  }, [formData.services, nights, formData.guests])

  const accommodationTotal = stayCalculation?.subtotal || 0
  const totalDiscount = stayCalculation?.totalDiscount || 0
  const grandTotal = accommodationTotal + PRICING.cleaningFee + addOnsTotal

  const isBlackoutDate = (date: Date): boolean => blockedDates.some(b => isSameDay(date, b))
  const isPastDate = (date: Date): boolean => date < today

  const calendarDays = useMemo(() => getCalendarDays(currentYear, currentMonth), [currentYear, currentMonth])

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) }
    else setCurrentMonth(currentMonth - 1)
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) }
    else setCurrentMonth(currentMonth + 1)
  }

  const handleDateClick = (date: Date) => {
    if (isPastDate(date) || isBlackoutDate(date)) return
    setShowMinimumWarning(false)
    if (!formData.checkIn || (formData.checkIn && formData.checkOut)) {
      setFormData({ ...formData, checkIn: date, checkOut: null })
      setSelectingCheckOut(true)
    } else if (selectingCheckOut) {
      if (date > formData.checkIn) {
        const selectedNights = daysBetween(formData.checkIn, date)
        if (selectedNights < PRICING.minimumNights) {
          setShowMinimumWarning(true)
          return
        }
        setFormData({ ...formData, checkOut: date })
        setSelectingCheckOut(false)
      } else {
        setFormData({ ...formData, checkIn: date, checkOut: null })
      }
    }
  }

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => {
      const existing = prev.services.find(s => s.id === serviceId)
      if (existing) {
        return { ...prev, services: prev.services.filter(s => s.id !== serviceId) }
      }
      return { ...prev, services: [...prev.services, { id: serviceId, quantity: 1 }] }
    })
  }

  const handleServiceQuantity = (serviceId: string, delta: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === serviceId ? { ...s, quantity: Math.max(1, s.quantity + delta) } : s)
    }))
  }

  const getServiceQuantity = (serviceId: string): number => formData.services.find(s => s.id === serviceId)?.quantity || 0
  const isServiceSelected = (serviceId: string): boolean => formData.services.some(s => s.id === serviceId)

  const generateWhatsAppMessage = (): string => {
    const lines = [
      `Hello ${BOOKING_MANAGER.name}!`,
      ``,
      `I'd like to inquire about booking ${PROPERTY.name}.`,
      ``,
      `*Guest Details*`,
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Guests: ${formData.guests}`,
      ``,
      `*Dates*`,
      `Check-in: ${formData.checkIn ? formatDateForWhatsApp(formData.checkIn) : 'TBD'}`,
      `Check-out: ${formData.checkOut ? formatDateForWhatsApp(formData.checkOut) : 'TBD'}`,
      `Nights: ${nights}`,
      ``,
      `*Pricing*`,
      `Accommodation: ${formatCurrency(accommodationTotal)}`,
      `Cleaning: ${formatCurrency(PRICING.cleaningFee)}`,
    ]
    if (totalDiscount > 0) {
      lines.push(`Seasonal Savings: ${formatCurrency(totalDiscount)}`)
    }
    lines.push(``, `*Estimated Total: ${formatCurrency(grandTotal)}*`)
    if (formData.services.length > 0) {
      lines.push(``, `*Add-ons:*`)
      formData.services.forEach(item => {
        const service = SERVICES.find(s => s.id === item.id)
        if (service) lines.push(`- ${service.label} (×${item.quantity})`)
      })
    }
    if (formData.message) lines.push(``, `*Notes:* ${formData.message}`)
    return encodeURIComponent(lines.join('\n'))
  }

  const handleSubmit = async () => {
    if (!formData.checkIn || !formData.checkOut) return

    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      // Format dates as YYYY-MM-DD for API
      const formatDateForAPI = (date: Date): string => {
        return date.toISOString().split('T')[0]
      }

      const response = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          guests: formData.guests,
          checkIn: formatDateForAPI(formData.checkIn),
          checkOut: formatDateForAPI(formData.checkOut),
          addOns: formData.services.map(s => s.id),
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit inquiry')
      }

      setInquiryId(result.inquiryId)
      setIsSubmitted(true)
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenWhatsApp = () => {
    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/${BOOKING_MANAGER.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank')
  }

  const isFormValid = formData.name && formData.checkIn && formData.checkOut && formData.guests > 0 && isValidStay

  const getDayClasses = (date: Date | null): string => {
    if (!date) return 'invisible'
    const base = 'w-full h-full flex flex-col items-center justify-center transition-all rounded-md'
    if (isPastDate(date)) return `${base} text-warm-gray/30 cursor-not-allowed`
    if (isBlackoutDate(date)) return `${base} bg-red-100 text-red-300 cursor-not-allowed line-through`
    if (formData.checkIn && isSameDay(date, formData.checkIn)) return `${base} bg-ink text-white`
    if (formData.checkOut && isSameDay(date, formData.checkOut)) return `${base} bg-ink text-white`
    if (formData.checkIn && formData.checkOut && isDateInRange(date, formData.checkIn, formData.checkOut)) return `${base} bg-ink/10 text-ink`
    return `${base} hover:bg-ink/10 cursor-pointer text-ink`
  }

  // Format price for calendar (compact)
  const formatCalendarPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}k`
    }
    return `$${price}`
  }

  return (
    <section id="contact" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl tracking-wider text-ink mb-2">INQUIRE</h2>
          <p className="text-warm-gray text-sm">From {formatCurrency(SEASON_INFO.low.pricePerNight)}/night · {PRICING.minimumNights} night minimum</p>
        </motion.div>

        {/* Success State - Inline Thank You */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-paper p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl text-ink mb-2">Inquiry Received!</h3>
              <p className="text-warm-gray text-sm mb-6">
                Thank you, {formData.name}. Sharell will contact you within 24 hours to discuss your stay.
              </p>

              <div className="bg-white border border-light-gray p-4 mb-6 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Reference</span>
                    <span className="text-ink font-mono">{inquiryId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Dates</span>
                    <span className="text-ink">
                      {formData.checkIn?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {formData.checkOut?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Guests</span>
                    <span className="text-ink">{formData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Estimated Total</span>
                    <span className="text-ink font-medium">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <p className="text-warm-gray text-xs mb-4">
                Want a faster response? Reach Sharell directly:
              </p>
              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#1DA851] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message on WhatsApp
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ name: '', email: '', guests: 2, checkIn: null, checkOut: null, services: [], message: '' })
                }}
                className="mt-4 text-sm text-warm-gray hover:text-ink transition-colors"
              >
                Submit another inquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <>
          {/* Main Grid - 2 columns on desktop */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column - Calendar & Sharell */}
          <div className="space-y-4 order-1">
            {/* Calendar */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-paper p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm tracking-wider text-ink">SELECT DATES</h4>
                <div className="flex items-center gap-3">
                  {currentMonthSeason.badge && (
                    <span className={`${currentMonthSeason.badgeColor} text-white text-xs px-2.5 py-1 rounded-full font-medium`}>
                      {currentMonthSeason.badge}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-xs text-warm-gray">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-100"></span>Booked
                  </span>
                </div>
              </div>

              {/* Date Summary - Now with type-able inputs */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2 border border-light-gray">
                  <p className="text-[10px] text-warm-gray uppercase mb-1">Check-in</p>
                  <input
                    type="date"
                    value={formData.checkIn ? formData.checkIn.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value + 'T00:00:00') : null
                      if (date && !isPastDate(date) && !isBlackoutDate(date)) {
                        setFormData({ ...formData, checkIn: date, checkOut: null })
                        setSelectingCheckOut(true)
                      }
                    }}
                    min={today.toISOString().split('T')[0]}
                    className="w-full text-sm text-ink bg-transparent focus:outline-none"
                  />
                </div>
                <div className="p-2 border border-light-gray">
                  <p className="text-[10px] text-warm-gray uppercase mb-1">Check-out</p>
                  <input
                    type="date"
                    value={formData.checkOut ? formData.checkOut.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value + 'T00:00:00') : null
                      if (date && formData.checkIn && date > formData.checkIn) {
                        const selectedNights = daysBetween(formData.checkIn, date)
                        if (selectedNights >= PRICING.minimumNights) {
                          setFormData({ ...formData, checkOut: date })
                          setSelectingCheckOut(false)
                          setShowMinimumWarning(false)
                        } else {
                          setShowMinimumWarning(true)
                        }
                      }
                    }}
                    min={formData.checkIn ? addDays(formData.checkIn, PRICING.minimumNights).toISOString().split('T')[0] : ''}
                    disabled={!formData.checkIn}
                    className="w-full text-sm text-ink bg-transparent focus:outline-none disabled:text-warm-gray/50"
                  />
                </div>
              </div>

              <AnimatePresence>
                {showMinimumWarning && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-2 p-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                    Minimum {PRICING.minimumNights} nights required
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Month Nav */}
              <div className="flex items-center justify-between mb-2">
                <button onClick={handlePrevMonth} className="p-1 hover:bg-ink/5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="text-sm tracking-wider">{monthName}</span>
                <button onClick={handleNextMonth} className="p-1 hover:bg-ink/5 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Calendar Grid with Prices */}
              <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-warm-gray py-1">{day}</div>
                ))}
                {calendarDays.map((date, index) => {
                  const season = date ? getSeasonForDate(date) : null
                  const isSelected = date && ((formData.checkIn && isSameDay(date, formData.checkIn)) || (formData.checkOut && isSameDay(date, formData.checkOut)))
                  const isInRange = date && formData.checkIn && formData.checkOut && isDateInRange(date, formData.checkIn, formData.checkOut)
                  const showPrice = date && !isPastDate(date) && !isBlackoutDate(date)

                  return (
                    <div key={index} className="aspect-square p-0.5">
                      <button
                        onClick={() => date && handleDateClick(date)}
                        disabled={!date || isPastDate(date) || isBlackoutDate(date)}
                        className={getDayClasses(date)}
                      >
                        <span className="text-sm sm:text-base font-medium">{date?.getDate()}</span>
                        {showPrice && (
                          <span className={`text-[11px] sm:text-xs font-medium leading-none ${isSelected ? 'text-white/80' : isInRange ? 'text-ink/60' : season?.type === 'low' ? 'text-emerald-600' : season?.type === 'shoulder' ? 'text-blue-600' : 'text-warm-gray'}`}>
                            {formatCalendarPrice(season?.pricePerNight || 0)}
                          </span>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Season Legend */}
              <div className="mt-4 pt-4 border-t border-light-gray flex flex-wrap items-center gap-4 text-xs sm:text-sm text-warm-gray">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Special Offer ({formatCurrency(SEASON_INFO.low.pricePerNight)}/night)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  Seasonal Rate ({formatCurrency(SEASON_INFO.shoulder.pricePerNight)}/night)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-warm-gray"></span>
                  Peak Season ({formatCurrency(SEASON_INFO.high.pricePerNight)}/night)
                </span>
              </div>
            </motion.div>

            {/* Sharell Card - Hidden on mobile, shown on desktop */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="hidden lg:block space-y-4">
              <div className="bg-paper p-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <Image src={BOOKING_MANAGER.photo} alt={BOOKING_MANAGER.name} fill className="object-cover rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm text-warm-gray uppercase tracking-wide">{BOOKING_MANAGER.title}</p>
                    <h3 className="text-lg text-ink">{BOOKING_MANAGER.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-warm-gray mt-3 leading-relaxed">{BOOKING_MANAGER.bio}</p>
              </div>

              {/* Terms Link */}
              <div className="text-sm text-warm-gray">
                <Link href="/terms" className="underline hover:text-ink">Terms of Service</Link>
                <span className="mx-2">·</span>
                <Link href="/terms#cancellation" className="underline hover:text-ink">Cancellation Policy</Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4 order-2">
            {/* Guest Info */}
            <div className="bg-paper p-4">
              <h4 className="text-sm tracking-wider text-ink mb-3">GUEST DETAILS</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full p-3 border border-light-gray bg-white text-sm text-ink placeholder:text-warm-gray/50 focus:outline-none focus:border-ink"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full p-3 border border-light-gray bg-white text-sm text-ink placeholder:text-warm-gray/50 focus:outline-none focus:border-ink"
                />
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <span className="text-sm text-warm-gray">Guests</span>
                  <button onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })} className="w-8 h-8 border border-light-gray flex items-center justify-center text-sm hover:bg-ink hover:text-white">-</button>
                  <span className="text-lg w-8 text-center">{formData.guests}</span>
                  <button onClick={() => setFormData({ ...formData, guests: Math.min(PROPERTY.sleeps, formData.guests + 1) })} className="w-8 h-8 border border-light-gray flex items-center justify-center text-sm hover:bg-ink hover:text-white">+</button>
                  <span className="text-xs text-warm-gray">max {PROPERTY.sleeps}</span>
                </div>
              </div>
            </div>

            {/* Add-ons - Categorized grid */}
            <div className="bg-paper p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm tracking-wider text-ink">ADD-ONS</h4>
                <Link href="/bespoke" className="text-xs text-warm-gray hover:text-ink transition-colors">
                  View all →
                </Link>
              </div>
              <div className="space-y-4">
                {SERVICE_CATEGORIES.map(category => (
                  <div key={category.name}>
                    <p className="text-sm text-warm-gray uppercase tracking-wider mb-2">{category.name}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                      {category.services.map(service => {
                        const selected = isServiceSelected(service.id)
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleServiceToggle(service.id)}
                            className={`p-2 text-left border transition-all text-base ${selected ? 'border-ink bg-ink/5' : 'border-light-gray hover:border-ink'}`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className={`w-3 h-3 border rounded-sm flex-shrink-0 flex items-center justify-center ${selected ? 'border-ink bg-ink' : 'border-warm-gray'}`}>
                                {selected && <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </span>
                              <span className="text-ink truncate">{service.label}</span>
                            </div>
                            <p className="text-sm text-warm-gray mt-0.5 ml-4">
                              {service.price === null ? 'Inquire' : service.price === 0 ? 'Free' : formatCurrency(service.price)}{service.priceType === 'per_day' && '/day'}{service.priceType === 'per_person' && '/person'}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Special requests..."
              rows={2}
              className="w-full p-3 border border-light-gray bg-paper text-sm text-ink placeholder:text-warm-gray/50 focus:outline-none focus:border-ink resize-none"
            />
          </motion.div>
        </div>

        {/* Price Estimate - Full width at bottom */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6">
          <div className="bg-ink text-white p-4 sm:p-5">
            <div className="max-w-xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm tracking-wider">PRICE ESTIMATE</h4>
                {totalDiscount > 0 && (
                  <span className="bg-emerald-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-medium">
                    Saving {formatCurrency(totalDiscount)}
                  </span>
                )}
              </div>
              {nights > 0 && stayCalculation ? (
                <div className="space-y-2 text-sm">
                  {/* Show breakdown by season type */}
                  {(() => {
                    const seasonGroups = stayCalculation.breakdown.reduce((acc, day) => {
                      const key = day.season.type
                      if (!acc[key]) acc[key] = { count: 0, total: 0, season: day.season }
                      acc[key].count++
                      acc[key].total += day.price
                      return acc
                    }, {} as Record<string, { count: number; total: number; season: typeof SEASON_INFO.high }>)

                    return Object.entries(seasonGroups).map(([type, data]) => (
                      <div key={type} className="flex justify-between items-center">
                        <span className="flex items-center gap-2 flex-wrap">
                          {formatCurrency(data.season.pricePerNight)} × {data.count} nights
                          {data.season.badge && (
                            <span className={`${data.season.badgeColor} text-white text-[11px] px-2 py-0.5 rounded-full font-medium`}>
                              {data.season.badge}
                            </span>
                          )}
                        </span>
                        <span>{formatCurrency(data.total)}</span>
                      </div>
                    ))
                  })()}
                  <div className="flex justify-between text-white/70">
                    <span>Cleaning</span>
                    <span>{formatCurrency(PRICING.cleaningFee)}</span>
                  </div>
                  {addOnsTotal > 0 && (
                    <div className="flex justify-between text-white/70">
                      <span>Add-ons</span>
                      <span>{formatCurrency(addOnsTotal)}</span>
                    </div>
                  )}
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Seasonal savings</span>
                      <span>-{formatCurrency(totalDiscount)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-2 flex justify-between font-medium text-base sm:text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                  {totalDiscount > 0 && (
                    <p className="text-emerald-400 text-xs">
                      vs. {formatCurrency(grandTotal + totalDiscount)} at peak season rates
                    </p>
                  )}
                  {!isValidStay && <p className="text-amber-300 text-xs mt-2 text-center sm:text-left">Minimum {PRICING.minimumNights} nights required</p>}
                </div>
              ) : (
                <p className="text-white/70 text-sm text-center sm:text-left">Select dates to see pricing</p>
              )}
            </div>
          </div>

          {/* Error Display */}
          <AnimatePresence>
            {submissionError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm flex items-center gap-2"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{submissionError}</span>
                <button
                  onClick={() => setSubmissionError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button - Ocean Blue */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-4 text-sm tracking-wider transition-all flex items-center justify-center gap-2 ${isFormValid && !isSubmitting ? 'bg-[#0EA5E9] text-white hover:bg-[#0284C7]' : 'bg-light-gray text-warm-gray cursor-not-allowed'}`}
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                SENDING...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {nights > 0 ? `SEND INQUIRY · ${formatCurrency(grandTotal)}` : 'SEND INQUIRY'}
              </>
            )}
          </button>

          {/* Mobile Sharell Card & Terms */}
          <div className="lg:hidden mt-6 space-y-4">
            <div className="bg-paper p-4">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <Image src={BOOKING_MANAGER.photo} alt={BOOKING_MANAGER.name} fill className="object-cover rounded-full" />
                </div>
                <div>
                  <p className="text-sm text-warm-gray uppercase tracking-wide">{BOOKING_MANAGER.title}</p>
                  <h3 className="text-lg text-ink">{BOOKING_MANAGER.name}</h3>
                </div>
              </div>
              <p className="text-sm text-warm-gray mt-3 leading-relaxed">{BOOKING_MANAGER.bio}</p>
            </div>

            {/* Terms Link */}
            <div className="text-sm text-warm-gray text-center">
              <Link href="/terms" className="underline hover:text-ink">Terms of Service</Link>
              <span className="mx-2">·</span>
              <Link href="/terms#cancellation" className="underline hover:text-ink">Cancellation Policy</Link>
            </div>
          </div>
        </motion.div>
          </>
        )}
      </div>

    </section>
  )
}
