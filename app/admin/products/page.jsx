'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, Save, X, Package, Tag, DollarSign, Box, Star, Search, Filter, TestTube } from 'lucide-react'
import { AuthProvider, useAuth } from '@/components/admin/AdminAuth'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '@/lib/features/product/productSlice'

function AdminProductsContent() {
  const { logout } = useAuth()
  const dispatch = useDispatch()
  const reduxProducts = useSelector(state => state.product.list)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Սմարթֆոններ',
    price: '',
    images: [''],
    description: '',
    stock: '',
    featured: false
  })

  const categories = ['Սմարթֆոններ', 'Պլանշետներ', 'Ժամացույցներ', 'Նոթբուքեր', 'Աուդիո սարքեր']

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      console.log('🔄 Fetching products from API...')
      const response = await fetch('/api/products')
      const data = await response.json()
      console.log('📦 Products fetched:', data)
      setProducts(data)
      // Also update Redux store
      dispatch({ type: 'product/setProduct', payload: data })
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const createTestProduct = async () => {
    console.log('🧪 Creating test product...')
    const testProduct = {
      name: 'Test Product ' + Date.now(),
      category: 'Սմարթֆոններ',
      price: '999',
      images: ['https://picsum.photos/400/500?random=' + Date.now()],
      description: 'This is a test product created automatically',
      stock: '10',
      featured: false
    }
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testProduct)
      })
      
      if (response.ok) {
        console.log('✅ Test product created successfully')
        fetchProducts()
      } else {
        console.log('❌ Failed to create test product')
      }
    } catch (error) {
      console.error('💥 Error creating test product:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('🚀 Form submission started')
    console.log('📝 Form data:', formData)
    
    if (!formData.name || !formData.price) {
      console.log('❌ Validation failed: missing required fields')
      alert('Լրացրեք պարտադիր դաշտերը')
      return
    }

    const validImages = formData.images.filter(img => img.trim() !== '')
    console.log('🖼️ Valid images:', validImages)
    
    if (validImages.length === 0) {
      console.log('❌ Validation failed: no images')
      alert('Ավելացրեք առնվազն մեկ նկար')
      return
    }

    try {
      const productData = {
        ...formData,
        images: validImages,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        inStock: parseInt(formData.stock) > 0
      }
      
      console.log('📦 Product data to send:', productData)

      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      console.log('🌐 API call:', { url, method })

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
      
      console.log('📡 Response status:', response.status)
      const responseData = await response.json()
      console.log('📬 Response data:', responseData)

      if (response.ok) {
        console.log('✅ Product saved successfully')
        // Update Redux store based on action type
        if (editingProduct) {
          // Update existing product
          dispatch({ type: 'product/updateProduct', payload: responseData })
        } else {
          // Add new product
          dispatch(addProduct(responseData))
        }
        fetchProducts()
        setShowForm(false)
        setEditingProduct(null)
        setFormData({
          name: '',
          category: 'Սմարթֆոններ',
          price: '',
          images: [''],
          description: '',
          stock: '',
          featured: false
        })
      } else {
        console.log('❌ API error:', responseData)
        alert(`Առաջացավ սխալ: ${responseData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('💥 Error saving product:', error)
      alert('Առաջացավ սխալ պահպանման ընթացքում')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      images: product.images || (product.image ? [product.image] : ['']),
      description: product.description || '',
      stock: product.stock?.toString() || '',
      featured: product.featured || false
    })
    setShowForm(true)
  }

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    })
  }

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      images: newImages.length > 0 ? newImages : ['']
    })
  }

  const updateImageField = (index, value) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({
      ...formData,
      images: newImages
    })
  }

  const handleDelete = async (productId) => {
    if (!confirm('Համոզված եք, որ ուզում եք ջնջել այս ապրանքը?')) return

    try {
      console.log('🗑️ Deleting product:', productId)
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
      
      if (response.ok) {
        // Update Redux store
        dispatch({ type: 'product/deleteProduct', payload: productId })
        
        // Show success message
        alert('Ապրանքը հաջողությամբ հեռացվեց:')
        
        // Refresh local state
        fetchProducts()
      } else {
        const error = await response.json()
        alert(`Ջնջելու սխալ: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Ջնջելու սխալ: խնդիր ցանցի հետ')
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Ապրանքների կառավարում</h1>
          <button onClick={logout} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-wider hover:bg-slate-800 transition-colors">Ելք</button>
        </div>

        <div className="mb-8 flex gap-4">
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-green-700 transition-colors">
            <Plus size={20} />Նոր Ապրանք
          </button>
          <button onClick={createTestProduct} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-wider hover:bg-blue-700 transition-colors">
            <TestTube size={20} />Ստեղծել Թեստային Ապրանք
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Փնտրել ապրանքներ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 w-full" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
            <option value="all">Բոլոր կատեգորիաները</option>
            {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>

        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowForm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-slate-900">{editingProduct ? 'Խմբագրել Ապրանք' : 'Նոր Ապրանք'}</h2>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ապրանքի Անուն *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" placeholder="Ապրանքի անուն" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Կատեգորիա</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500">
                      {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Գին *</label>
                    <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" placeholder="0" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Պահեստ</label>
                    <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" placeholder="0" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Նկարների URL-ներ *</label>
                  <div className="space-y-3">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="flex gap-2">
                        <input type="url" value={imageUrl} onChange={(e) => updateImageField(index, e.target.value)} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" placeholder="https://example.com/image.jpg" />
                        {formData.images.length > 1 && (
                          <button type="button" onClick={() => removeImageField(index)} className="px-3 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addImageField} className="w-full px-4 py-3 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                      <Plus size={16} />Ավելացնել ևս մեկ նկար
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Նկարագրություն</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500" rows={3} placeholder="Ապրանքի նկարագրություն" />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500" />
                  <label htmlFor="featured" className="text-sm font-medium text-slate-700">Ոնտրված ապրանք</label>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-slate-900 text-white py-3 px-6 rounded-xl font-black uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    <Save size={18} />{editingProduct ? 'Թարմացնել' : 'Պահպակել'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">Չեղարկել</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">Ապրանքներ չեն գտնվել</h3>
            <p className="text-slate-500">Փորձեք փոխել որոնման պարամետրերը</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100 hover:border-slate-200 transition-all duration-300">
                <div className="relative aspect-[4/5] bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden mb-4">
                  <img src={product.images?.[0] || product.image || '/placeholder-product.jpg'} alt={product.name} className="w-full h-full object-cover" />
                  {product.featured && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-black px-3 py-1 rounded-full">Ոնտրված</div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">{product.name}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(product)} className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Tag size={16} />
                      <span>{product.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <DollarSign size={16} />
                      <span>{product.price.toLocaleString()} ֏</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Box size={16} />
                      <span>{product.stock || 0} հատ</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function AdminProducts() {
  return (
    <AuthProvider>
      <AdminProductsContent />
    </AuthProvider>
  )
}
