import { NextResponse } from 'next/server'

// In-memory storage for product-discounts
let productDiscounts = [
  {
    productId: 1,
    discountId: 1,
    createdAt: '2024-01-15T10:30:00Z'
  }
]

// GET all product-discounts
export async function GET() {
  return NextResponse.json(productDiscounts)
}
