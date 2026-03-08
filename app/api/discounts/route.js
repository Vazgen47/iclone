import { NextResponse } from 'next/server'

// In-memory storage for discounts
let discounts = [
  {
    id: 1,
    name: 'Ամառային զեղչ',
    type: 'percentage',
    value: 15,
    is_active: true,
    start_date: '2024-06-01T00:00:00Z',
    end_date: '2024-08-31T23:59:59Z'
  },
  {
    id: 2,
    name: 'ֆիքսված զեղչ',
    type: 'fixed',
    value: 5000,
    is_active: true,
    start_date: null,
    end_date: null
  }
]

let nextDiscountId = 3

// GET all discounts
export async function GET() {
  return NextResponse.json(discounts)
}

// POST new discount
export async function POST(request) {
  try {
    const body = await request.json()
    const newDiscount = {
      id: nextDiscountId++,
      ...body
    }
    discounts.push(newDiscount)
    return NextResponse.json(newDiscount, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}
