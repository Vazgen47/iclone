import { NextResponse } from 'next/server'

// In-memory storage for product-discounts (should be the same as in the main route)
let productDiscounts = [
  {
    productId: 1,
    discountId: 1,
    createdAt: '2024-01-15T10:30:00Z'
  }
]

// DELETE remove discount from product
export async function DELETE(request, { params }) {
  const { productId, discountId } = params
  const productDiscountIndex = productDiscounts.findIndex(
    pd => pd.productId == productId && pd.discountId == discountId
  )
  
  if (productDiscountIndex === -1) {
    return NextResponse.json(
      { error: 'Product discount not found' },
      { status: 404 }
    )
  }
  
  const deletedProductDiscount = productDiscounts.splice(productDiscountIndex, 1)
  return NextResponse.json(deletedProductDiscount[0])
}
