import { NextResponse } from 'next/server'

// In-memory storage for discounts (should be the same as in the main route)
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

// PUT update discount
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const discountIndex = discounts.findIndex(d => d.id == params.id)
    
    if (discountIndex === -1) {
      return NextResponse.json(
        { error: 'Discount not found' },
        { status: 404 }
      )
    }
    
    discounts[discountIndex] = { ...discounts[discountIndex], ...body }
    return NextResponse.json(discounts[discountIndex])
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}

// DELETE discount
export async function DELETE(request, { params }) {
  const discountIndex = discounts.findIndex(d => d.id == params.id)
  
  if (discountIndex === -1) {
    return NextResponse.json(
      { error: 'Discount not found' },
      { status: 404 }
    )
  }
  
  const deletedDiscount = discounts.splice(discountIndex, 1)
  return NextResponse.json(deletedDiscount[0])
}
