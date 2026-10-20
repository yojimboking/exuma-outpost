import { NextResponse } from 'next/server'

export const revalidate = 3600 // Revalidate every hour

/**
 * Mock availability API
 * Returns mock blocked dates until OwnerRez integration is complete
 */
export async function GET() {
  // Generate mock blocked dates (will be replaced with OwnerRez API)
  const today = new Date()
  const blockedDates: string[] = []

  // Helper to format date as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Add mock bookings: next 2 weeks blocked (simulating current booking)
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() + i)
    blockedDates.push(formatDate(date))
  }

  // Add a mock booking 6 weeks out (1 week blocked)
  for (let i = 42; i < 49; i++) {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() + i)
    blockedDates.push(formatDate(date))
  }

  // Add a mock booking 10 weeks out (10 days blocked)
  for (let i = 70; i < 80; i++) {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() + i)
    blockedDates.push(formatDate(date))
  }

  return NextResponse.json({
    blockedDates,
    lastUpdated: new Date().toISOString(),
  })
}
