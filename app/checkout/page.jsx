'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '@/lib/features/cart/cartSlice'
import { addOrder } from '@/lib/features/orders/ordersSlice'
import { getAddresses } from '@/lib/storage'
import { notifyOrderPlaced } from '@/lib/telegramService'
import { ArrowRight, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const Checkout = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.cartItems)
    const products = useSelector(state => state.product.list)
    const addresses = useSelector(state => state.address.list)
    
    const [selectedAddress, setSelectedAddress] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('COD')
    const [isProcessing, setIsProcessing] = useState(false)
    
    const getCartItems = () => {
        return Object.entries(cartItems).map(([productId, quantity]) => {
            const product = products.find(p => p.id === productId)
            return product ? { ...product, quantity } : null
        }).filter(Boolean)
    }
    
    const cartProductList = getCartItems()
    const subtotal = cartProductList.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = subtotal > 50000 ? 0 : 2000 // Free shipping over 50000 AMD
    const total = subtotal + shipping
    
    const handleCheckout = async () => {
        if (!selectedAddress) {
            alert('Խնդրեք առաքելու հասցե')
            return
        }
        
        setIsProcessing(true)
        
        const order = {
            items: cartProductList,
            subtotal,
            shipping,
            total,
            address: addresses.find(addr => addr.id === selectedAddress),
            paymentMethod,
            status: 'ORDER_PLACED'
        }
        
        try {
            dispatch(addOrder(order))
            dispatch(clearCart())
            
            // Send Telegram notification
            await notifyOrderPlaced(order)
            
            // Show success and redirect
            setTimeout(() => {
                window.location.href = '/thank-you'
            }, 1500)
        } catch (error) {
            console.error('Checkout error:', error)
            alert('Սխալ պատվերատվության կատարվեց')
        } finally {
            setIsProcessing(false)
        }
    }
    
    if (cartProductList.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h1 className="text-3xl font-black text-slate-900 mb-4">Զամբարը դատարկ է</h1>
                    <p className="text-slate-600 mb-8">Ավելացրեք ապրանքներ շարունակելու համար</p>
                    <Link href="/shop" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-slate-800 transition-colors">
                        <span>Խանութ այցել</span>
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        )
    }
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-slate-50 py-12"
        >
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-black text-slate-900 mb-12 text-center">Պայմանակում</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Order Summary */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-black text-slate-900 mb-6">Պայմանակման ամփոփոխանք</h2>
                            
                            <div className="space-y-4">
                                {cartProductList.map((item, index) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex gap-4 p-4 border border-slate-100 rounded-xl"
                                    >
                                        <img src={item.images?.[0] || '/placeholder-product.jpg'} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-900">{item.name}</h3>
                                            <p className="text-slate-600">{item.category}</p>
                                            <p className="text-green-600 font-bold">{item.price.toLocaleString()} ֏ × {item.quantity}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        
                        {/* Shipping Address */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                <Truck size={24} className="text-green-600" />
                                Առաքելու հասցե
                            </h2>
                            
                            {addresses.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-slate-600 mb-4">Հասցե չի գտնվել</p>
                                    <Link href="/cart" className="text-green-600 font-bold hover:underline">
                                        Ավելացնել հասցե
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {addresses.map(address => (
                                        <label key={address.id} className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                            <input 
                                                type="radio" 
                                                name="address" 
                                                value={address.id}
                                                checked={selectedAddress === address.id}
                                                onChange={(e) => setSelectedAddress(e.target.value)}
                                                className="mt-1"
                                            />
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-900">{address.name}</p>
                                                <p className="text-slate-600">{address.street}, {address.city}</p>
                                                <p className="text-slate-600">{address.phone}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                    
                    {/* Payment & Total */}
                    <div className="space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                                <CreditCard size={24} className="text-green-600" />
                                Վճարկման եղանակ
                            </h2>
                            
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                    <input 
                                        type="radio" 
                                        name="payment" 
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <div>
                                        <p className="font-bold text-slate-900">Դրամատրամադրմամբ</p>
                                        <p className="text-slate-600 text-sm">Վճարկում ստացում</p>
                                    </div>
                                </label>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-slate-900 text-white rounded-2xl p-8 shadow-lg"
                        >
                            <h3 className="text-lg font-black mb-6">Գումարկ</h3>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Ենթեր</span>
                                    <span>{subtotal.toLocaleString()} ֏</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Առաքանցում</span>
                                    <span>{shipping === 0 ? 'Անվճար' : shipping.toLocaleString() + ' ֏'}</span>
                                </div>
                                <div className="h-px bg-slate-700 my-4"></div>
                                <div className="flex justify-between text-xl font-black">
                                    <span>Ամբողջ</span>
                                    <span>{total.toLocaleString()} ֏</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleCheckout}
                                disabled={isProcessing || !selectedAddress}
                                className="w-full mt-8 bg-green-600 text-white py-4 rounded-xl font-black uppercase tracking-wider hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Մշակում...</span>
                                    </>
                                ) : (
                                    <>
                                        <Shield size={20} />
                                        <span>Հաստտակել պատվերատվություն</span>
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Checkout
