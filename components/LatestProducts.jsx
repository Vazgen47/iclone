'use client'
import React, { useEffect } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '@/lib/features/product/productSlice'
import { motion } from 'framer-motion'

const LatestProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.list)
    const { loading } = useSelector(state => state.product)
    
    const displayQuantity = 4

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, products.length])

    const latestProducts = products
        ? [...products]
            .sort((a, b) => new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id))
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
                    title='Նոր Տեսականի' 
                    description={`Ցուցադրված է ${latestProducts.length} ապրանք ընդհանուր ${products.length}-ից`} 
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
                    {latestProducts.map((product, index) => (
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

            {!loading && products.length > displayQuantity && (
                <motion.div 
                    variants={itemVariants}
                    className='mt-12 sm:mt-16 flex justify-center'
                >
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/shop'}
                        className='px-8 sm:px-10 py-3 border-2 border-slate-900 text-slate-900 font-black text-sm sm:text-base rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 uppercase tracking-wider'
                    >
                        ՏԵՍՆԵԼ ԱՄԲՈՂՋԸ
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    )
}

export default LatestProducts