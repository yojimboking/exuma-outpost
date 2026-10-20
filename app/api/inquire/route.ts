import { NextResponse } from 'next/server'

interface InquiryRequest {
  name: string
  email: string
  guests?: number
  checkIn: string
  checkOut: string
  addOns?: string[]
  message?: string
}

/**
 * Inquiry submission API
 * Placeholder for OwnerRez guest/quote creation
 */
export async function POST(req: Request) {
  try {
    const data: InquiryRequest = await req.json()

    // Validate required fields
    if (!data.name || !data.email || !data.checkIn || !data.checkOut) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, email, checkIn, checkOut' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(data.checkIn) || !dateRegex.test(data.checkOut)) {
      return NextResponse.json(
        { success: false, error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      )
    }

    // Log inquiry (placeholder for OwnerRez API call)
    console.log('[Inquire] New inquiry received:', {
      name: data.name,
      email: data.email,
      guests: data.guests || 'not specified',
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      addOns: data.addOns || [],
      message: data.message || 'none',
      timestamp: new Date().toISOString(),
    })

    // Generate mock inquiry ID
    const inquiryId = `INQ-${Date.now()}`

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Inquiry received. Sharell will contact you within 24 hours.',
    })
  } catch (error) {
    console.error('[Inquire] Error processing inquiry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
