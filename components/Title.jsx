'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const Title = ({ title, description, visibleButton = true, href = '#' }) => {

    return (
        <div className='flex flex-col items-center text-center px-4 sm:px-6 lg:px-8'>
            {/* Decorative line above title */}
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 60, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className='h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 shadow-lg shadow-green-500/30'
            />

            {/* Main Title */}
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-6'
            >
                {title}<span className='text-green-600'>.</span>
            </motion.h2>

            {/* Description and "See More" link */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='flex flex-col items-center gap-6 max-w-4xl'
            >
                <p className='text-slate-600 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-3xl'>
                    {description}
                </p>

                {visibleButton && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link 
                            href={href} 
                            className='group flex items-center gap-3 bg-slate-900 text-white px-8 py-3 sm:px-10 sm:py-3.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-green-600 transition-all duration-500 shadow-xl shadow-slate-200/50 hover:shadow-green-500/25 hover:scale-105 active:scale-95'
                        >
                            Տեսնել ավելին 
                            <ArrowRight size={16} className='group-hover:translate-x-2 transition-transform duration-300' />
                        </Link>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

export default Title