import { NextResponse } from 'next/server'
import { getProducts, setProducts, addProduct, updateProduct, deleteProduct } from '@/lib/sharedProducts'

// GET all products
export async function GET() {
  return NextResponse.json(getProducts())
}

// POST new product
export async function POST(request) {
  try {
    const body = await request.json()
    console.log('🚀 API POST received:', body)
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      console.log('❌ API Validation failed:', { name: !!body.name, price: !!body.price, category: !!body.category })
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      )
    }

    // Ensure images is an array
    let images = body.images || []
    if (typeof images === 'string') {
      images = [images]
    }
    if (images.length === 0) {
      images = ['/placeholder-product.jpg']
    }

    // Create new product with ID and timestamp
    const newProduct = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description || '',
      price: parseFloat(body.price),
      mrp: parseFloat(body.price) * 1.2, // Add MRP as 20% higher
      category: body.category,
      images: images,
      inStock: body.inStock !== false,
      stock: body.stock || 0,
      featured: body.featured || false,
      storeId: 'default-store', // Add default store ID
      store: {
        id: 'default-store',
        name: 'Default Store',
        username: 'default',
        logo: '/placeholder-store-logo.png',
        email: 'store@example.com',
        contact: '+1234567890'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: []
    }
    
    console.log('📦 New product created:', newProduct)

    addProduct(newProduct)
    console.log('✅ Product added to storage')
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('💥 API POST Error:', error)
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}

export async function PUT(request) {
  try {
    const { id, ...updateData } = await request.json()
    
    const updatedProduct = updateProduct(id, updateData)
    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const deletedProduct = deleteProduct(id)
    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Product deleted successfully' }
    )
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
