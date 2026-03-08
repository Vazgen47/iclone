'use client'
import { StarIcon, ShoppingBag, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const ProductCard = ({ product, index = 0 }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '֏'

    // Calculate average rating
    const totalRating = product.rating && product.rating.length > 0 
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length) 
        : 0;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className='group w-full max-w-xs sm:max-w-sm'
        >
            <Link href={`/product/${product.id}`} className='block w-full'>
                {/* Product Image Block */}
                <div className='relative aspect-[4/5] bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl flex items-center justify-center overflow-hidden border border-slate-200 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-300/30'>
                    
                    {/* Image */}
                    <Image 
                        width={500} 
                        height={500} 
                        className='h-40 sm:h-48 lg:h-52 w-auto object-contain group-hover:scale-110 transition-transform duration-700 ease-out' 
                        src={product.images?.[0] || product.image || '/placeholder-product.jpg'} 
                        alt={product.name}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        priority={index < 4}
                    />

                    {/* Quick Add Button */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300'
                    >
                        <div className='bg-white p-3 rounded-full shadow-lg text-slate-900 hover:bg-green-600 hover:text-white transition-colors cursor-pointer'>
                            <ShoppingBag size={18} />
                        </div>
                    </motion.div>

                    {/* Wishlist Button */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className='absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300'
                    >
                        <div className='bg-white p-3 rounded-full shadow-lg text-slate-400 hover:text-red-500 transition-colors cursor-pointer'>
                            <Heart size={18} />
                        </div>
                    </motion.div>

                    {/* Premium Label */}
                    {product.price > 50000 && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className='absolute top-4 left-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg'
                        >
                            Premium
                        </motion.div>
                    )}

                    {/* Featured Badge */}
                    {product.featured && (
                        <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className='absolute top-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg'
                        >
                            Featured
                        </motion.div>
                    )}
                </div>

                {/* Product Details */}
                <div className='mt-4 px-1 flex flex-col gap-2'>
                    <div className='flex justify-between items-start gap-2'>
                        <h3 className='text-slate-800 font-black text-sm sm:text-base lg:text-lg leading-tight group-hover:text-green-600 transition-colors line-clamp-2 uppercase tracking-tighter flex-1'>
                            {product.name}
                        </h3>
                        <p className='text-green-600 font-black text-sm sm:text-base lg:text-lg whitespace-nowrap'>
                            {product.price.toLocaleString()} {currency}
                        </p>
                    </div>

                    {/* Rating */}
                    {product.rating && product.rating.length > 0 && (
                        <div className='flex items-center gap-2 mt-1'>
                            <div className='flex'>
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon 
                                        key={index} 
                                        size={12} 
                                        className='mt-0.5' 
                                        fill={totalRating >= index + 1 ? "#16a34a" : "#E2E8F0"} 
                                        stroke="none"
                                    />
                                ))}
                            </div>
                            <span className='text-xs text-slate-500 font-medium'>
                                ({product.rating.length})
                            </span>
                        </div>
                    )}

                    {/* Category */}
                    {product.category && (
                        <div className='flex items-center gap-2'>
                            <span className='text-xs text-slate-400 font-medium uppercase tracking-wider'>
                                {product.category}
                            </span>
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    )
}

export default ProductCard