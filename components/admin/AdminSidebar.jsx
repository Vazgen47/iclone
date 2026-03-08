'use client'

import { usePathname } from "next/navigation"
import { Package, ShoppingCart, MessageSquare, Plus } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const AdminSidebar = () => {

    const pathname = usePathname()

    const sidebarLinks = [
        { 
            name: 'Ավելացնել Ապրանք', 
            href: '/admin/products', 
            icon: Plus,
            description: 'Ապրանքների կառավարում'
        },
        { 
            name: 'Պատվերներ', 
            href: '/admin/orders', 
            icon: ShoppingCart,
            description: 'Պատվերների հետևում'
        },
        { 
            name: 'Նամակներ/Կապ', 
            href: '/admin/messages', 
            icon: MessageSquare,
            description: 'Հաճախորդների նամակներ'
        }
    ]

    return (
        <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="inline-flex h-full flex-col gap-2 bg-slate-900 border-r border-slate-800 sm:min-w-72"
        >
            {/* Header */}
            <div className="flex flex-col gap-3 justify-center items-center pt-8 pb-6 px-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <Package size={20} className="text-white" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-white font-black text-lg tracking-tighter">IClone</h2>
                        <p className="text-green-500 font-black text-xs tracking-[0.2em] uppercase">Admin Console</p>
                    </div>
                </div>
                <p className="text-slate-400 text-xs text-center">Բարի գալուստ, Admin</p>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 py-6">
                <div className="space-y-2">
                    {
                        sidebarLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link 
                                    href={link.href} 
                                    className={`relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                                        pathname === link.href 
                                            ? 'bg-green-600 text-white shadow-lg' 
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                                >
                                    <div className={`p-2 rounded-lg ${
                                        pathname === link.href 
                                            ? 'bg-white/20' 
                                            : 'bg-slate-800 group-hover:bg-green-600/20'
                                    }`}>
                                        <link.icon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-black text-sm tracking-tight">{link.name}</p>
                                        <p className={`text-xs ${
                                            pathname === link.href 
                                                ? 'text-green-100' 
                                                : 'text-slate-500 group-hover:text-slate-400'
                                        }`}>{link.description}</p>
                                    </div>
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))
                    }
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>System Online</span>
                </div>
            </div>
        </motion.div>
    )
}

export default AdminSidebar