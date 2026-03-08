'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRight, ShieldAlert, LayoutDashboard } from "lucide-react"
import SellerNavbar from "./StoreNavbar"
import SellerSidebar from "./StoreSidebar"
import { dummyStoreData } from "@/assets/assets"
import { motion } from "framer-motion"

const StoreLayout = ({ children }) => {
    const [isSeller, setIsSeller] = useState(false)
    const [loading, setLoading] = useState(true)
    const [storeInfo, setStoreInfo] = useState(null)

    const fetchIsSeller = async () => {
        // Սիմուլյացիա ստուգման համար
        setTimeout(() => {
            setIsSeller(true)
            setStoreInfo(dummyStoreData)
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        fetchIsSeller()
    }, [])

    if (loading) return <Loading />

    return isSeller ? (
        <div className="flex flex-col h-screen bg-slate-50/50">
            {/* Վերևի Նավիգացիա */}
            <SellerNavbar />

            <div className="flex flex-1 overflow-hidden">
                {/* Կողային մենյու */}
                <aside className="hidden md:block w-72 h-full bg-white border-r border-slate-100 shadow-sm">
                    <SellerSidebar storeInfo={storeInfo} />
                </aside>

                {/* Հիմնական բովանդակություն */}
                <main className="flex-1 h-full overflow-y-auto no-scrollbar bg-[#FDFDFD]">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 lg:p-12 max-w-[1600px] mx-auto"
                    >
                        {/* Փոքրիկ Header Dashboard-ի համար */}
                        <div className="flex items-center gap-2 mb-8 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">
                            <LayoutDashboard size={14} />
                            <span>Վաճառողի Վահանակ / {storeInfo?.name}</span>
                        </div>
                        
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    ) : (
        /* Authorization Error Page */
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white"
        >
            <div className="bg-red-50 p-8 rounded-[3rem] mb-8">
                <ShieldAlert size={60} className="text-red-500" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter max-w-lg leading-tight">
                Մուտքը <span className="text-red-500">Մերժված է</span>.
            </h1>
            <p className="text-slate-500 mt-4 max-w-sm font-medium">
                Դուք չունեք համապատասխան թույլտվություն այս էջը դիտելու համար: Խնդրում ենք նախ գրանցել Ձեր խանութը:
            </p>
            <Link 
                href="/" 
                className="group inline-flex items-center gap-3 bg-slate-900 text-white mt-10 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
                Վերադառնալ Գլխավոր <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    )
}

export default StoreLayout