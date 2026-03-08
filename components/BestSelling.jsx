'use client'
import React, { useEffect } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '@/lib/features/product/productSlice'
import { motion } from 'framer-motion'

const BestSelling = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.list)
    const { loading } = useSelector(state => state.product)
    
    const displayQuantity = 8

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, products.length])

    // Sort by rating count safely with null checks
    const bestSellingProducts = products 
        ? [...products]
            .sort((a, b) => {
                const aRatingCount = (a.rating && Array.isArray(a.rating)) ? a.rating.length : 0
                const bRatingCount = (b.rating && Array.isArray(b.rating)) ? b.rating.length : 0
                return bRatingCount - aRatingCount
            })
            .slice(0, displayQuantity)
        : []

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className='px-4 sm:px-6 lg:px-8 my-16 sm:my-24 lg:my-32 max-w-7xl mx-auto'
        >
            <motion.div variants={itemVariants}>
                <Title 
                    title='Ամենավաճառվող' 
                    description={`Բացահայտեք մեր ամենապահանջված ${bestSellingProducts.length} IClone EVN գաջեթները`} 
                    href='/shop' 
                />
            </motion.div>

            {loading ? (
                <div className='mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-center'>
                    {[...Array(displayQuantity)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="bg-slate-200 rounded-2xl h-64 sm:h-72 lg:h-80"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div 
                    variants={containerVariants}
                    className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-center'
                >
                    {bestSellingProducts.map((product, index) => (
                        <motion.div 
                            key={product.id || index} 
                            variants={itemVariants}
                            className="flex justify-center"
                        >
                            <ProductCard product={product} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {!loading && bestSellingProducts.length > 0 && (
                <motion.div 
                    variants={itemVariants}
                    className='mt-16 p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl border border-slate-200 flex flex-col items-center text-center shadow-lg'
                >
                    <h4 className='text-xl sm:text-2xl font-black text-slate-900 mb-4'>Ինչու՞ ընտրել IClone EVN-ը</h4>
                    <p className='text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed'>
                        Մենք տրամադրում ենք շուկայի լավագույն էլեկտրոնիկայի տարբերակները, որոնք ոչ միայն տեսքով, այլև ֆունկցիոնալությամբ չեն զիջում բնօրինակին: 
                        <span className="font-black text-green-600"> 3 ամիս երաշխիքը</span> մեր որակի գրավականն է:
                    </p>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className='mt-6 flex flex-wrap gap-4 justify-center'
                    >
                        <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <span className='text-xs font-black text-slate-700 uppercase tracking-wider'>Պաշտպանություն</span>
                        </div>
                        <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <span className='text-xs font-black text-slate-700 uppercase tracking-wider'>Որակի երաշխիք</span>
                        </div>
                        <div className='flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm'>
                            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            <span className='text-xs font-black text-slate-700 uppercase tracking-wider'>Արագ առաքում</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default BestSelling