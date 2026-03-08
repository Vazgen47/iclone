'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const ThankYou = () => {
    const [orderNumber, setOrderNumber] = useState('')
    const orders = useSelector(state => state.orders.list)
    
    useEffect(() => {
        // Get the most recent order
        if (orders.length > 0) {
            const latestOrder = orders[orders.length - 1]
            setOrderNumber(latestOrder.id)
        }
    }, [orders])
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-br from-green-50 to-slate-50 flex items-center justify-center px-6"
        >
            <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                className="text-center max-w-2xl w-full"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <CheckCircle size={48} className="text-white" />
                </motion.div>
                
                {/* Success Message */}
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl font-black text-slate-900 mb-4"
                >
                    Շնութակի ենք!
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl text-slate-600 mb-8"
                >
                    Ձեր պատվերատվությունը հաջողությամբ ընդունակվեց
                </motion.p>
                
                {/* Order Number */}
                {orderNumber && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white rounded-2xl p-6 shadow-lg mb-8 inline-block"
                    >
                        <p className="text-sm text-slate-600 mb-2">Պայմանակի համարկ</p>
                        <p className="text-2xl font-black text-slate-900">#{orderNumber}</p>
                    </motion.div>
                )}
                
                {/* Action Buttons */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link 
                        href="/shop" 
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-slate-800 transition-colors"
                    >
                        <ShoppingBag size={20} />
                        <span>Շարունակել գնումներ</span>
                    </Link>
                    
                    <Link 
                        href="/orders" 
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-green-700 transition-colors"
                    >
                        <span>Իմ պատվերատվությունները</span>
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
                
                {/* Additional Info */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12 text-sm text-slate-600"
                >
                    <p>Ձեր պատվերատվությունը կուղարկվում է և կուղարկվի ժամանակի ընթացքով</p>
                    <p className="mt-2">Հարցերի դեպք՝ <span className="text-green-600 font-bold">support@iclone-evn.am</span></p>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default ThankYou
