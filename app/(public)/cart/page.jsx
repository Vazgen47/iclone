'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2Icon, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '֏';
    const dispatch = useDispatch();
    
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    // Օգտագործում ենք useMemo՝ հաշվարկները օպտիմալացնելու համար
    const { cartArray, totalPrice } = useMemo(() => {
        let total = 0;
        const items = Object.entries(cartItems).map(([id, quantity]) => {
            const product = products.find(p => p.id === id);
            if (product) {
                total += product.price * quantity;
                return { ...product, quantity };
            }
            return null;
        }).filter(Boolean);
        
        return { cartArray: items, totalPrice: total };
    }, [cartItems, products]);

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }));
    };

    return (
        <div className="min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <AnimatePresence mode="wait">
                    {cartArray.length > 0 ? (
                        <motion.div 
                            key="cart-content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <PageTitle 
                                heading="Իմ Զամբյուղը" 
                                text={`Դուք ունեք ${cartArray.length} ապրանք զամբյուղում`} 
                                linkText="Ավելացնել ավելին" 
                                path="/shop"
                            />

                            <div className="flex flex-col lg:flex-row items-start gap-12 mt-10">
                                {/* Ապրանքների Աղյուսակ */}
                                <div className="w-full lg:flex-1 overflow-x-auto no-scrollbar">
                                    <table className="w-full text-left border-separate border-spacing-y-4">
                                        <thead>
                                            <tr className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                                                <th className="pb-4 pl-4">Ապրանք</th>
                                                <th className="pb-4 text-center">Քանակ</th>
                                                <th className="pb-4 text-center">Գին</th>
                                                <th className="pb-4 text-right pr-4 max-md:hidden">Հեռացնել</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartArray.map((item) => (
                                                <motion.tr 
                                                    layout
                                                    key={item.id} 
                                                    className="bg-white border border-slate-100 shadow-sm rounded-[2rem] overflow-hidden group hover:shadow-md transition-shadow"
                                                >
                                                    <td className="py-4 pl-4 rounded-l-[2rem]">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative size-20 sm:size-24 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 overflow-hidden shrink-0">
                                                                <Image src={item.images[0]} className="p-2 object-contain" alt={item.name} fill sizes="100px" />
                                                            </div>
                                                            <div className="flex flex-col gap-0.5">
                                                                <p className="font-bold text-slate-900 text-sm sm:text-base leading-tight uppercase tracking-tighter line-clamp-1">{item.name}</p>
                                                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{item.category}</p>
                                                                <p className="text-green-600 font-black mt-1">{item.price.toLocaleString()} {currency}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-center">
                                                        <div className="flex justify-center scale-90 sm:scale-100">
                                                            <Counter productId={item.id} />
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-center font-black text-slate-900">
                                                        {(item.price * item.quantity).toLocaleString()} {currency}
                                                    </td>
                                                    <td className="py-4 text-right pr-4 rounded-r-[2rem] max-md:hidden">
                                                        <button 
                                                            onClick={() => handleDeleteItemFromCart(item.id)} 
                                                            className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-3 rounded-full transition-all active:scale-90"
                                                        >
                                                            <Trash2Icon size={20} />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Պատվերի Ամփոփում */}
                                <OrderSummary totalPrice={totalPrice} items={cartArray} />
                            </div>
                        </motion.div>
                    ) : (
                        /* Դատարկ զամբյուղի վիճակը */
                        <motion.div 
                            key="empty-cart"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="min-h-[70vh] flex flex-col items-center justify-center text-center"
                        >
                            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 mb-8 relative">
                                <ShoppingBag size={80} className="text-slate-200" strokeWidth={1} />
                                <div className="absolute -top-2 -right-2 size-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">0</div>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Ձեր զամբյուղը դատարկ է</h1>
                            <p className="text-slate-400 max-w-sm mb-10 font-medium">Կարծես թե դուք դեռ ոչինչ չեք ավելացրել: Բաց մի թողեք մեր լավագույն առաջարկները:</p>
                            <Link 
                                href="/shop" 
                                className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200"
                            >
                                <ArrowLeft size={16} /> Վերադառնալ խանութ
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}