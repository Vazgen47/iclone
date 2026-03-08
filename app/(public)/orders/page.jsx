'use client'
import PageTitle from "@/components/PageTitle"
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import { orderDummyData } from "@/assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Սիմուլյացիա բեռնման համար
        const timer = setTimeout(() => {
            setOrders(orderDummyData);
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {orders.length > 0 ? (
                        <motion.div 
                            key="orders-list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="my-10 sm:my-20"
                        >
                            <PageTitle 
                                heading="Իմ Պատվերները" 
                                text={`Ցուցադրված են վերջին ${orders.length} պատվերները`} 
                                linkText="Վերադառնալ գլխավոր" 
                                path="/"
                            />

                            <div className="mt-12 overflow-x-auto no-scrollbar">
                                <table className="w-full text-left border-separate border-spacing-y-6">
                                    <thead>
                                        <tr className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 max-md:hidden">
                                            <th className="pb-4 pl-6">Ապրանք</th>
                                            <th className="pb-4 text-center">Ընդհանուր գին</th>
                                            <th className="pb-4">Առաքման հասցե</th>
                                            <th className="pb-4">Կարգավիճակ</th>
                                            <th className="pb-4 pr-6 text-right">Գործողություն</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <OrderItem order={order} key={order.id} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ) : !loading ? (
                        /* Դատարկ պատվերների վիճակը */
                        <motion.div 
                            key="empty-orders"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="min-h-[70vh] flex flex-col items-center justify-center text-center"
                        >
                            <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 mb-8 relative">
                                <Package size={80} className="text-slate-200" strokeWidth={1.2} />
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">
                                Դուք դեռ չունեք <span className="text-green-600">պատվերներ</span>
                            </h2>
                            <p className="text-slate-400 max-w-sm mb-10 font-medium">
                                Ձեր պատվերների պատմությունը դատարկ է: Սկսեք գնումները հենց հիմա:
                            </p>
                            <Link 
                                href="/shop" 
                                className="group inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200"
                            >
                                <ShoppingBag size={18} /> Գնալ Խանութ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    )
}