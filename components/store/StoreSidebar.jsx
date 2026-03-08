'use client'
import { usePathname } from "next/navigation"
import { LayoutDashboard, PlusCircle, Package, ShoppingCart, Store, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const StoreSidebar = ({ storeInfo }) => {
    const pathname = usePathname()

    const sidebarLinks = [
        { name: 'Վահանակ', href: '/store', icon: LayoutDashboard },
        { name: 'Ավելացնել Ապրանք', href: '/store/add-product', icon: PlusCircle },
        { name: 'Կառավարել Տեսականին', href: '/store/manage-product', icon: Package },
        { name: 'Պատվերներ', href: '/store/orders', icon: ShoppingCart },
    ]

    return (
        <div className="flex h-full flex-col bg-white w-full md:w-72 border-r border-slate-100 py-8 px-4">
            
            {/* Store Profile Section */}
            <div className="flex flex-col items-center mb-10 px-2">
                <div className="relative group cursor-pointer">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative size-16 md:size-20 bg-white rounded-full p-1 shadow-xl overflow-hidden">
                        <Image 
                            className="rounded-full object-cover w-full h-full" 
                            src={storeInfo?.logo || "/default-avatar.png"} 
                            alt={storeInfo?.name} 
                            width={100} 
                            height={100} 
                        />
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tighter line-clamp-1">{storeInfo?.name}</h3>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                        <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ակտիվ Խանութ</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
                {sidebarLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link 
                            key={index} 
                            href={link.href} 
                            className="group relative"
                        >
                            <div className={`
                                flex items-center justify-between p-4 rounded-2xl transition-all duration-300
                                ${isActive 
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
                            `}>
                                <div className="flex items-center gap-3">
                                    <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-xs font-black uppercase tracking-widest">{link.name}</span>
                                </div>
                                {isActive && (
                                    <motion.div layoutId="activeArrow">
                                        <ChevronRight size={14} className="text-green-500" />
                                    </motion.div>
                                )}
                            </div>

                            {/* Indicator for Tablet/Mobile */}
                            {isActive && (
                                <motion.div 
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-green-500 rounded-r-full md:hidden"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Section: Footer / Support */}
            <div className="mt-auto pt-6 border-t border-slate-50">
                <Link 
                    href="/store/settings"
                    className="flex items-center gap-3 p-4 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
                >
                    <Store size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Խանութի Կարգավորումներ</span>
                </Link>
            </div>
        </div>
    )
}

export default StoreSidebar