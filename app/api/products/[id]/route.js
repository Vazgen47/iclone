import { NextResponse } from 'next/server'
import { findProduct, updateProduct, deleteProduct } from '@/lib/sharedProducts'

// GET single product
export async function GET(request, { params }) {
  const product = findProduct(params.id)
  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
  return NextResponse.json(product)
}

// PUT update product
export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const updatedProduct = updateProduct(params.id, body)
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}

// DELETE product
export async function DELETE(request, { params }) {
  const deletedProduct = deleteProduct(params.id)
  
  if (!deletedProduct) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(deletedProduct)
}
