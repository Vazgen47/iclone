// Shared localStorage storage for products
// This ensures both /api/products and /api/products/[id] use the same data

// Helper functions for localStorage
const loadProducts = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('iclone_products')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Error parsing localStorage data:', error)
        return []
      }
    }
  }
  return []
}

const saveProducts = (products) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('iclone_products', JSON.stringify(products))
      console.log('💾 Saved products to localStorage:', products.length)
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
}

// Initialize products from localStorage
let products = loadProducts();

// Helper function to migrate single image to images array and add store info
const migrateImageToImages = (product) => {
  if (product.image && !product.images) {
    return {
      ...product,
      images: [product.image],
      image: undefined // Remove old single image field
    };
  }
  if (!product.images) {
    return {
      ...product,
      images: ['/placeholder-product.jpg'] // Default placeholder
    };
  }
  // Add store object if missing
  if (!product.store) {
    return {
      ...product,
      store: {
        id: product.storeId || 'default-store',
        name: 'Default Store',
        username: 'default',
        logo: '/placeholder-store-logo.png',
        email: 'store@example.com',
        contact: '+1234567890'
      }
    };
  }
  return product;
};

export const getProducts = () => {
  const products = loadProducts();
  console.log('📦 Getting products from localStorage:', products.length);
  return products.map(migrateImageToImages);
};

export const setProducts = (newProducts) => {
  const migratedProducts = newProducts.map(migrateImageToImages);
  products = migratedProducts;
  saveProducts(products);
};

export const addProduct = (product) => {
  console.log('📥 Adding product to localStorage:', product)
  
  // Ensure images array exists
  if (product.image && !product.images) {
    product.images = [product.image];
    delete product.image;
  }
  if (!product.images || product.images.length === 0) {
    product.images = ['/placeholder-product.jpg'];
  }
  
  products.push(product);
  saveProducts(products);
  console.log('✅ Product added. Total products:', products.length)
  return product;
};

export const updateProduct = (id, updates) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    // Handle image migration in updates
    if (updates.image && !updates.images) {
      updates.images = [updates.image];
      delete updates.image;
    }
    
    products[index] = { ...products[index], ...updates };
    saveProducts(products);
    return products[index];
  }
  return null;
};

export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    const deleted = products.splice(index, 1);
    saveProducts(products);
    console.log('🗑️ Product deleted:', id, 'Remaining:', products.length);
    return deleted[0];
  }
  return null;
};

export const findProduct = (id) => {
  const allProducts = loadProducts();
  const product = allProducts.find(p => p.id === id);
  console.log('🔍 Finding product:', id, product ? 'Found' : 'Not found');
  return product ? migrateImageToImages(product) : null;
};
