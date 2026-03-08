'use client'
import React, { useState } from 'react'
import Title from './Title'
import { toast } from 'react-hot-toast'
import { Mail } from 'lucide-react'

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            toast.success('Շնորհակալություն բաժանորդագրվելու համար:');
            setEmail('');
        }
    };

    return (
        <div className='flex flex-col items-center px-6 my-24 sm:my-40 max-w-7xl mx-auto'>
            {/* Վերնագիրը և Նկարագրությունը */}
            <div className="text-center">
                <Title 
                    title="Միացեք մեր լրատվին" 
                    description="Բաժանորդագրվեք՝ ստանալու բացառիկ առաջարկներ, նոր տեսականու մասին տեղեկություններ և հատուկ զեղչեր անմիջապես ձեր էլ. հասցեին:" 
                    visibleButton={false} 
                />
            </div>

            {/* Բաժանորդագրման դաշտը */}
            <form 
                onSubmit={handleSubscribe}
                className='flex flex-col sm:flex-row items-center bg-slate-50 p-1.5 rounded-3xl sm:rounded-full w-full max-w-2xl mt-12 border border-slate-200 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/10 transition-all duration-300'
            >
                <div className="flex items-center flex-1 w-full px-4 gap-3">
                    <Mail size={20} className="text-slate-400" />
                    <input 
                        className='flex-1 py-3 bg-transparent outline-none text-slate-700 placeholder-slate-400 text-sm' 
                        type="email" 
                        placeholder='Մուտքագրեք Ձեր էլ. հասցեն' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type="submit"
                    className='w-full sm:w-auto font-bold bg-slate-900 text-white px-10 py-4 rounded-2xl sm:rounded-full hover:bg-black hover:shadow-lg active:scale-95 transition-all duration-300 uppercase tracking-wider text-xs'
                >
                    Բաժանորդագրվել
                </button>
            </form>

            {/* Լրացուցիչ տեքստ */}
            <p className='mt-6 text-xs text-slate-400'>
                * Մենք երաշխավորում ենք Ձեր տվյալների գաղտնիությունը:
            </p>
        </div>
    )
}

export default Newsletter