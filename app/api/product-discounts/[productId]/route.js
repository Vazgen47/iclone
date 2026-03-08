import { NextResponse } from 'next/server'

// In-memory storage for product-discounts (should be the same as in the main route)
let productDiscounts = [
  {
    productId: 1,
    discountId: 1,
    createdAt: '2024-01-15T10:30:00Z'
  }
]

// POST add discount to product
export async function POST(request, { params }) {
  try {
    const body = await request.json()
    const { discountId } = body
    
    // Check if this combination already exists
    const existingIndex = productDiscounts.findIndex(
      pd => pd.productId == params.productId && pd.discountId == discountId
    )
    
    if (existingIndex !== -1) {
      return NextResponse.json(
        { error: 'Product already has this discount' },
        { status: 400 }
      )
    }
    
    const newProductDiscount = {
      productId: parseInt(params.productId),
      discountId: parseInt(discountId),
      createdAt: new Date().toISOString()
    }
    
    productDiscounts.push(newProductDiscount)
    return NextResponse.json(newProductDiscount, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}
