import { describe, it, expect } from 'vitest'
import {
  calculateStayTotal,
  getSeasonForDate,
  getPriceForDate,
  calculateRefund,
  SEASON_INFO,
  SERVICES,
} from '@/lib/constants'

describe('calculateStayTotal', () => {
  it('calculates correct total for a high season stay', () => {
    // January dates (high season)
    const checkIn = new Date('2024-01-15')
    const checkOut = new Date('2024-01-18')

    const result = calculateStayTotal(checkIn, checkOut)

    expect(result.nights).toBe(3)
    expect(result.subtotal).toBe(6000) // 3 nights * $2000
    expect(result.averagePerNight).toBe(2000)
    expect(result.totalDiscount).toBe(0)
  })

  it('calculates correct total for a low season stay', () => {
    // July dates (low season)
    const checkIn = new Date('2024-07-10')
    const checkOut = new Date('2024-07-15')

    const result = calculateStayTotal(checkIn, checkOut)

    expect(result.nights).toBe(5)
    expect(result.subtotal).toBe(7500) // 5 nights * $1500
    expect(result.averagePerNight).toBe(1500)
    expect(result.totalDiscount).toBe(2500) // 5 nights * $500 discount
  })

  it('calculates correct total for shoulder season stay', () => {
    // May dates (shoulder season)
    const checkIn = new Date('2024-05-01')
    const checkOut = new Date('2024-05-04')

    const result = calculateStayTotal(checkIn, checkOut)

    expect(result.nights).toBe(3)
    expect(result.subtotal).toBe(5250) // 3 nights * $1750
    expect(result.averagePerNight).toBe(1750)
    expect(result.totalDiscount).toBe(750) // 3 nights * $250 discount
  })

  it('calculates correct total for cross-season stay', () => {
    // Stay that spans April (high) to May (shoulder)
    const checkIn = new Date('2024-04-29')
    const checkOut = new Date('2024-05-03')

    const result = calculateStayTotal(checkIn, checkOut)

    expect(result.nights).toBe(4)
    // April 29, 30 = high season ($2000 each)
    // May 1, 2 = shoulder season ($1750 each)
    expect(result.subtotal).toBe(7500) // 2*2000 + 2*1750
    expect(result.averagePerNight).toBe(1875) // 7500/4
  })

  it('handles same day check-in/check-out (zero nights)', () => {
    const checkIn = new Date('2024-06-15')
    const checkOut = new Date('2024-06-15')

    const result = calculateStayTotal(checkIn, checkOut)

    expect(result.nights).toBe(0)
    expect(result.subtotal).toBe(0)
    expect(result.averagePerNight).toBe(0)
  })

  it('returns correct breakdown array', () => {
    const checkIn = new Date('2024-01-15')
    const checkOut = new Date('2024-01-17')

    const result = calculateStayTotal(checkIn, checkOut)

    expect(result.breakdown).toHaveLength(2)
    expect(result.breakdown[0].price).toBe(2000)
    expect(result.breakdown[0].season.type).toBe('high')
    expect(result.breakdown[1].price).toBe(2000)
  })
})

describe('getSeasonForDate', () => {
  it('returns high season for January', () => {
    const result = getSeasonForDate(new Date('2024-01-15'))
    expect(result.type).toBe('high')
    expect(result.pricePerNight).toBe(2000)
  })

  it('returns low season for July', () => {
    const result = getSeasonForDate(new Date('2024-07-15'))
    expect(result.type).toBe('low')
    expect(result.pricePerNight).toBe(1500)
  })

  it('returns shoulder season for May', () => {
    const result = getSeasonForDate(new Date('2024-05-15'))
    expect(result.type).toBe('shoulder')
    expect(result.pricePerNight).toBe(1750)
  })

  it('returns shoulder season for October', () => {
    const result = getSeasonForDate(new Date('2024-10-15'))
    expect(result.type).toBe('shoulder')
    expect(result.pricePerNight).toBe(1750)
  })
})

describe('getPriceForDate', () => {
  it('returns correct price for each season', () => {
    expect(getPriceForDate(new Date('2024-02-01'))).toBe(2000) // high
    expect(getPriceForDate(new Date('2024-05-15'))).toBe(1750) // shoulder
    expect(getPriceForDate(new Date('2024-08-01'))).toBe(1500) // low
  })
})

describe('calculateRefund', () => {
  it('returns full refund for 60+ days out', () => {
    const result = calculateRefund(10000, 90)

    expect(result.refundPercentage).toBe(100)
    expect(result.refundAmount).toBe(10000)
  })

  it('returns 50% refund for 30-60 days out', () => {
    const result = calculateRefund(10000, 45)

    expect(result.refundPercentage).toBe(50)
    expect(result.refundAmount).toBe(5000)
  })

  it('returns no refund for less than 30 days', () => {
    const result = calculateRefund(10000, 15)

    expect(result.refundPercentage).toBe(0)
    expect(result.refundAmount).toBe(0)
  })

  it('returns 50% refund for exactly 30 days', () => {
    const result = calculateRefund(10000, 30)

    expect(result.refundPercentage).toBe(50)
    expect(result.refundAmount).toBe(5000)
  })

  it('returns full refund for exactly 60 days', () => {
    const result = calculateRefund(10000, 60)

    expect(result.refundPercentage).toBe(100)
    expect(result.refundAmount).toBe(10000)
  })
})

describe('SERVICES constant', () => {
  it('contains services from all categories', () => {
    expect(SERVICES.length).toBeGreaterThan(0)
  })

  it('has valid price types for all services', () => {
    const validPriceTypes = ['flat', 'per_day', 'per_person', 'inquire']
    SERVICES.forEach(service => {
      expect(validPriceTypes).toContain(service.priceType)
    })
  })

  it('has null price for inquire services', () => {
    const inquireServices = SERVICES.filter(s => s.priceType === 'inquire')
    inquireServices.forEach(service => {
      expect(service.price).toBeNull()
    })
  })

  it('has numeric price for non-inquire services', () => {
    const pricedServices = SERVICES.filter(s => s.priceType !== 'inquire')
    pricedServices.forEach(service => {
      expect(typeof service.price).toBe('number')
    })
  })
})

describe('SEASON_INFO', () => {
  it('has all three seasons defined', () => {
    expect(SEASON_INFO.high).toBeDefined()
    expect(SEASON_INFO.shoulder).toBeDefined()
    expect(SEASON_INFO.low).toBeDefined()
  })

  it('has correct discount structure', () => {
    expect(SEASON_INFO.high.discount).toBe(0)
    expect(SEASON_INFO.shoulder.discount).toBe(250)
    expect(SEASON_INFO.low.discount).toBe(500)
  })

  it('high season has highest price', () => {
    expect(SEASON_INFO.high.pricePerNight).toBeGreaterThan(SEASON_INFO.shoulder.pricePerNight)
    expect(SEASON_INFO.shoulder.pricePerNight).toBeGreaterThan(SEASON_INFO.low.pricePerNight)
  })
})
