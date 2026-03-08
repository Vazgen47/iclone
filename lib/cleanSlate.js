// Clean Slate Data Initializer for IClone EVN
// This utility clears all old "Gocart" data and sets up fresh state

import { saveToStorage } from './storage'

// Clear all old data and set clean slate
export const initializeCleanSlate = () => {
  console.log('🧹 Initializing clean slate for IClone EVN...')
  
  // Clear all localStorage keys
  const keysToClear = [
    'gocart_products',
    'gocart_cart', 
    'gocart_orders',
    'gocart_messages',
    'gocart_addresses',
    'iclone_products',
    'iclone_cart',
    'iclone_orders', 
    'iclone_messages',
    'iclone_addresses'
  ]
  
  keysToClear.forEach(key => {
    localStorage.removeItem(key)
    console.log(`🗑️ Cleared: ${key}`)
  })
  
  // Initialize with clean empty arrays
  saveToStorage('iclone_products', [])
  saveToStorage('iclone_cart', {})
  saveToStorage('iclone_orders', [])
  saveToStorage('iclone_messages', [])
  saveToStorage('iclone_addresses', [])
  
  console.log('✅ Clean slate initialized successfully!')
}

// Create test products for development
export const createTestProducts = () => {
  const testProducts = [
    {
      id: 'test-1',
      name: 'iPhone 15 Pro Max',
      category: 'Սմարթֆոններ',
      price: 280000,
      images: [
        'https://images.unsplash.com/photo-1592899637977-0c97a4498ab6?w=800',
        'https://images.unsplash.com/photo-1592899637977-0c97a4498ab6?w=800'
      ],
      description: 'Նորագույց iPhone 15 Pro Max՝ ամենագույց տեխնոլոգիայով և անվաճակ տեսակով',
      stock: 10,
      featured: true,
      inStock: true
    },
    {
      id: 'test-2', 
      name: 'MacBook Pro 16"',
      category: 'Պլանշետներ',
      price: 450000,
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'
      ],
      description: 'Պրոֆեսիոնալ MacBook Pro՝ M3 Pro չիպով և 16-դյույմ էկրան',
      stock: 5,
      featured: true,
      inStock: true
    },
    {
      id: 'test-3',
      name: 'AirPods Pro',
      category: 'Աուդիո սարքեր',
      price: 65000,
      images: [
        'https://images.unsplash.com/photo-16062783760-4a9a3b6b8c5c?w=800'
      ],
      description: 'AirPods Pro՝ ակտիվ աղմբառականգ և տարածային աղմբառականգ',
      stock: 15,
      featured: false,
      inStock: true
    }
  ]
  
  saveToStorage('iclone_products', testProducts)
  console.log('📦 Test products created successfully!')
  
  return testProducts
}

// Auto-initialize on first load
if (typeof window !== 'undefined') {
  const hasInitialized = localStorage.getItem('iclone_initialized')
  if (!hasInitialized) {
    initializeCleanSlate()
    localStorage.setItem('iclone_initialized', 'true')
  }
}
