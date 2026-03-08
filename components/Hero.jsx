'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import { motion } from 'framer-motion'

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '֏'

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='px-4 sm:px-6 lg:px-8'
        >
            <div className='flex flex-col xl:flex-row gap-8 max-w-7xl mx-auto my-10'>
                
                {/* Main Banner */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl xl:min-h-[500px] group overflow-hidden border border-slate-200'
                >
                    <div className='p-6 sm:p-8 lg:p-16 z-10'>
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className='inline-flex items-center gap-3 bg-white text-slate-600 pr-4 p-1 rounded-full text-xs sm:text-sm shadow-sm border border-slate-200'
                        >
                            <span className='bg-green-600 px-3 py-1 rounded-full text-white text-xs font-bold'>ՆՈՐՈՒՅԹ</span> 
                            Անվճար առաքում ՀՀ ողջ տարածքում <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className='text-4xl sm:text-6xl lg:text-7xl leading-[1.1] my-4 font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent max-w-sm lg:max-w-lg uppercase tracking-tighter'
                        >
                            Լավագույն <br/> IClone EVN <br/> տեսականին
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className='text-slate-600 max-w-sm lg:max-w-md mb-6 text-sm sm:text-base lg:text-lg'
                        >
                            ☘️ 3 ամիս երաշխիք ամբողջ տեսականու համար: Ձեռք բերեք որակյալ գաջեթներ ամենամատչելի գներով:
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className='text-slate-900 text-sm font-bold mt-4'
                        >
                            <p className='text-slate-500 font-medium uppercase tracking-widest text-xs lg:text-sm'>Սկսած</p>
                            <p className='text-4xl sm:text-5xl lg:text-6xl font-black text-green-600'>9,900 {currency}</p>
                        </motion.div>
                 
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className='flex-1 flex items-center justify-center xl:absolute xl:bottom-0 xl:right-0 xl:right-5'
                    >
                        {/* <Image 
                            className='w-full max-w-[300px] sm:max-w-[400px] xl:max-w-[450px] object-contain' 
                            src={assets.hero_model_img} 
                            alt="IClone EVN Hero" 
                            priority
                        /> */}
                    </motion.div>
                </motion.div>

                {/* Side Blocks */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className='flex flex-col lg:flex-row xl:flex-col gap-5 w-full xl:max-w-sm'
                >
                    
                    {/* Block 1 - Top Sales */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-6 lg:p-8 group cursor-pointer hover:shadow-lg transition-all border border-pink-200'
                    >
                        <div>
                            <p className='text-2xl lg:text-3xl font-black text-slate-800 leading-tight'>Top <br/> Վաճառք</p>
                            <p className='flex items-center gap-1 mt-4 font-semibold text-pink-600'>Տեսնել <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-24 sm:w-28 lg:w-32 group-hover:scale-110 transition-transform' src={assets.hero_product_img1} alt="Top Sales" />
                    </motion.div>

                    {/* Block 2 - Discounts */}
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 lg:p-8 group cursor-pointer hover:shadow-lg transition-all border border-blue-200'
                    >
                        <div>
                            <p className='text-2xl lg:text-3xl font-black text-slate-800 leading-tight'>Հատուկ <br/> Զեղչեր</p>
                            <p className='flex items-center gap-1 mt-4 font-semibold text-blue-600'>Մինչև -20% <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Image className='w-24 sm:w-28 lg:w-32 group-hover:scale-110 transition-transform' src={assets.hero_product_img2} alt="Discounts" />
                    </motion.div>

                </motion.div>
            </div>
            
            <CategoriesMarquee />
        </motion.div>
    )
}

export default Hero