'use client'
import { ArrowRight, StarIcon, MessageSquare, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ProductDescription = ({ product }) => {
    const [selectedTab, setSelectedTab] = useState('Նկարագրություն')
    
    console.log('📦 Product data in ProductDescription:', product)
    console.log('🏪 Store data:', product?.store)

    const tabs = [
        { name: 'Նկարագրություն', icon: <Info size={16} /> },
        { name: 'Կարծիքներ', icon: <MessageSquare size={16} /> }
    ]

    return (
        <div className="my-20 text-sm text-slate-600">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-100 mb-8 overflow-x-auto scrollbar-hide lg:overflow-visible">
                {tabs.map((tab) => (
                    <button 
                        key={tab.name}
                        onClick={() => setSelectedTab(tab.name)}
                        className={`relative pb-4 flex items-center gap-2 transition-all duration-300 ${
                            selectedTab === tab.name ? 'text-slate-900 font-bold' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                        {tab.icon}
                        <span>{tab.name}</span>
                        {selectedTab === tab.name && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area with Animation */}
            <div className="min-h-[200px]">
                <AnimatePresence mode="wait">
                    {selectedTab === "Նկարագրություն" ? (
                        <motion.div
                            key="description"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-2xl leading-relaxed text-slate-500 text-base"
                        >
                            <p className="whitespace-pre-line">{product.description}</p>
                            
                            {/* Լրացուցիչ տեղեկություն (օրինակ) */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="font-bold text-slate-900">Որակ</p>
                                    <p className="text-xs text-slate-400">Luxe Copy / Պրեմիում</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="font-bold text-slate-900">Երաշխիք</p>
                                    <p className="text-xs text-slate-400">3 ամիս պաշտոնական</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-8"
                        >
                            {product.rating.length > 0 ? (
                                product.rating.map((item, index) => (
                                    <div key={index} className="flex gap-5 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                                        <Image src={item.user.image} alt="" className="size-12 rounded-full border-2 border-white shadow-sm" width={100} height={100} />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <p className="font-bold text-slate-900">{item.user.name}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                                                    {new Date(item.createdAt).toLocaleDateString('hy-AM')}
                                                </p>
                                            </div>
                                            <div className="flex gap-0.5 my-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <StarIcon key={i} size={14} fill={item.rating >= i + 1 ? "#16a34a" : "#E2E8F0"} stroke="none" />
                                                ))}
                                            </div>
                                            <p className="text-sm text-slate-600 italic leading-relaxed">"{item.review}"</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-400 italic">Այս ապրանքի համար դեռևս կարծիքներ չկան:</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Store/Brand Info */}
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center gap-4 mt-20 p-6 bg-slate-900 rounded-[2.5rem] text-white"
            >
                <div className="relative size-14 shrink-0">
                    {product.store?.logo ? (
                        <Image 
                            src={product.store.logo} 
                            alt="" 
                            className="rounded-full border-2 border-green-500" 
                            fill 
                        />
                    ) : (
                        <div className="size-14 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">Վաճառող</p>
                    <p className="font-bold text-lg">
                        {product.store?.name || 'Default Store'}
                    </p>
                </div>
                <Link 
                    href={`/shop/${product.store?.username || 'default'}`} 
                    className="group flex items-center gap-2 bg-white/10 hover:bg-green-600 px-6 py-3 rounded-full transition-all"
                >
                    <span className="text-xs font-bold uppercase">Այցելել խանութ</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </div>
    )
}

export default ProductDescription