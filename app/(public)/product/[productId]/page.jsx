'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'
import { addToCart } from '@/lib/features/cart/cartSlice'
import { ArrowLeft, ShoppingCart, Star, Package, Truck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ProductPage() {
    const params = useParams()
    const productId = params.productId
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '֏'
    const dispatch = useDispatch()

    useEffect(() => {
        // Load from localStorage first for instant loading
        const savedProducts = localStorage.getItem('iclone_products')
        if (savedProducts) {
            try {
                const products = JSON.parse(savedProducts)
                const foundProduct = products.find(p => p.id === productId)
                if (foundProduct) {
                    setProduct(foundProduct)
                    setLoading(false)
                    return
                }
            } catch (error) {
                console.error('Error loading from localStorage:', error)
            }
        }
        
        // Fallback to API if not found in localStorage
        const fetchProductFromAPI = async () => {
            try {
                setLoading(true)
                setError(null)
                
                console.log('🔍 Fetching product from API:', productId)
                const response = await fetch(`/api/products/${productId}`)
                
                if (response.ok) {
                    const data = await response.json()
                    console.log('✅ Product loaded from API:', data)
                    setProduct(data)
                } else if (response.status === 404) {
                    console.log('❌ Product not found:', productId)
                    setError('Ապրանքը չի գտնվել')
                } else {
                    setError('Սխալ՝ ապրանքը հնարավոր չէ բեռնել')
                }
            } catch (error) {
                console.error('Error fetching product:', error)
                setError('Սխալ՝ ապրանքը հնարավոր չէ բեռնել')
            } finally {
                setLoading(false)
            }
        }
        
        fetchProductFromAPI()
    }, [productId])

    // Scroll to top when product loads
    useEffect(() => {
        if (product) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [product])

    const handleAddToCart = () => {
        if (product && product.inStock) {
            dispatch(addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || product.image
            }))
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!product || error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-black text-slate-900 uppercase">{error || 'Ապրանքը չի գտնվել'}</h1>
                <Link href="/shop" className="mt-4 text-green-600 font-bold uppercase text-xs tracking-widest hover:underline">
                    Վերադառնալ խանութ
                </Link>
            </div>
        )
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="min-h-screen bg-slate-50 py-8"
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumb */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-slate-600 mb-8"
                >
                    <Link href="/" className="hover:text-green-600 transition-colors">Գլխավոր</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-green-600 transition-colors">Խանութ</Link>
                    <span>/</span>
                    <span className="text-slate-900 font-medium">{product.name}</span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
                            <Image 
                                src={product.images?.[0] || product.image} 
                                alt={product.name}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Additional Images */}
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.slice(1, 5).map((img, index) => (
                                    <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden">
                                        <Image 
                                            src={img} 
                                            alt={`${product.name} ${index + 2}`}
                                            width={150}
                                            height={150}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Details */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Product Header */}
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 mb-2">{product.name}</h1>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl font-black text-green-600">
                                    {product.price.toLocaleString()} {currency}
                                </span>
                                {product.featured && (
                                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                                        Առաջանդագված
                                    </span>
                                )}
                            </div>
                            
                            {/* Stock Status */}
                            <div className="flex items-center gap-2">
                                {product.inStock ? (
                                    <>
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        <span className="text-green-600 font-medium">Առկա է</span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                        <span className="text-red-600 font-medium">Անջառակ է</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Նկարագիր</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {product.description || 'Այս ապրանքի մասին մասին նկարագիր չունի։'}
                            </p>
                        </div>

                        {/* Product Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-4 shadow-lg">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Package size={20} />
                                    <span className="font-medium">Դասակ</span>
                                </div>
                                <p className="text-slate-900 font-bold mt-1">{product.category}</p>
                            </div>
                            <div className="bg-white rounded-2xl p-4 shadow-lg">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <Truck size={20} />
                                    <span className="font-medium">Առաքանչություն</span>
                                </div>
                                <p className="text-slate-900 font-bold mt-1">1-3 օր</p>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className={`w-full py-4 rounded-2xl font-black uppercase tracking-wider transition-all ${
                                product.inStock 
                                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg' 
                                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                            }`}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <ShoppingCart size={24} />
                                <span>{product.inStock ? 'Ավելագնել զամբյուղ' : 'Անջառակ է'}</span>
                            </div>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}
