'use client'

import { Star, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const RatingModal = ({ ratingModal, setRatingModal }) => {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [hover, setHover] = useState(0);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error('Խնդրում ենք ընտրել գնահատական');
            throw new Error('No rating');
        }
        if (review.length < 5) {
            toast.error('Խնդրում ենք գրել կարճ կարծիք (մին. 5 տառ)');
            throw new Error('Review too short');
        }

        // Սիմուլյացիա API call-ի համար
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setRatingModal(null);
        toast.success('Շնորհակալություն գնահատականի համար:');
    }

    return (
        <AnimatePresence>
            <div className='fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-6'>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className='bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm relative border border-slate-100'
                >
                    {/* Փակելու կոճակը */}
                    <button 
                        onClick={() => setRatingModal(null)} 
                        className='absolute top-5 right-5 p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors'
                    >
                        <XIcon size={18} />
                    </button>

                    <div className='text-center mb-6'>
                        <h2 className='text-2xl font-black text-slate-900 uppercase tracking-tighter'>Գնահատել <span className='text-green-600'>Ապրանքը</span></h2>
                        <p className='text-xs text-slate-400 mt-1 font-medium italic'>Ձեր կարծիքը կարևոր է մեզ համար</p>
                    </div>

                    {/* Աստղերի ընտրություն */}
                    <div className='flex items-center justify-center gap-2 mb-8'>
                        {[...Array(5)].map((_, i) => {
                            const starValue = i + 1;
                            return (
                                <Star
                                    key={i}
                                    size={36}
                                    className={`cursor-pointer transition-all duration-200 transform ${
                                        (hover || rating) >= starValue 
                                        ? "text-green-500 fill-green-500 scale-110" 
                                        : "text-slate-200 hover:text-slate-300"
                                    }`}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(starValue)}
                                    strokeWidth={1.5}
                                />
                            );
                        })}
                    </div>

                    <textarea
                        className='w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl mb-6 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:bg-white focus:border-green-500 transition-all text-sm text-slate-700 placeholder:text-slate-400'
                        placeholder='Գրեք Ձեր կարծիքը այստեղ...'
                        rows='4'
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    ></textarea>

                    <button 
                        onClick={() => toast.promise(handleSubmit(), { 
                            loading: 'Ուղարկվում է...', 
                            success: 'Հաջողությամբ ուղարկվեց', 
                            error: (err) => err.message 
                        })} 
                        className='w-full bg-slate-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black active:scale-95 transition-all shadow-lg shadow-slate-200'
                    >
                        Ուղարկել
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default RatingModal