'use client'
import { Search, ShoppingCart, Menu, X, Home, ShoppingBag, Info, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {

    const router = useRouter();
    const [search, setSearch] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    // Get cart count from Redux
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.trim()) {
            router.push(`/shop?search=${search}`)
            setSearch('')
            setMobileMenuOpen(false)
        }
    }

    const navLinks = [
        { name: 'Գլխավոր', href: '/', icon: Home },
        { name: 'Խանութ', href: '/shop', icon: ShoppingBag },
        { name: 'Մեր մասին', href: '/about', icon: Info },
        { name: 'Կապ', href: '/contact', icon: Phone },
    ]

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm"
        >
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4">

                    {/* Logo Section */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link href="/" className="relative text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">
                            IClone<span className="text-green-600">EVN</span>
                            <span className="absolute text-[8px] font-black -top-1 -right-8 px-2 py-0.5 rounded-full uppercase text-white bg-slate-900 shadow-lg">
                                Luxe
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    href={link.href} 
                                    className="hover:text-green-600 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex items-center w-64 text-sm gap-2 bg-slate-100 px-4 py-2 rounded-full border border-transparent focus-within:border-green-500/50 focus-within:bg-white transition-all">
                            <Search size={16} className="text-slate-400" />
                            <input 
                                className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 font-medium" 
                                type="text" 
                                placeholder="Փնտրել..." 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                        </form>

                        {/* Cart Button */}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/cart" className="relative flex items-center gap-2 text-slate-900 hover:text-green-600 transition-colors bg-slate-50 px-5 py-2 rounded-full border border-slate-100">
                                <ShoppingCart size={20} strokeWidth={2.5} />
                                <span className="text-[11px] font-black uppercase tracking-widest">Զամբյուղ</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 text-[10px] font-black text-white bg-green-600 size-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Actions */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <Link href="/cart" className="relative text-slate-900 p-2">
                            <ShoppingCart size={24} strokeWidth={2} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 text-[9px] font-black text-white bg-green-600 size-4.5 flex items-center justify-center rounded-full border border-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-900"
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-6">
                            {/* Mobile Nav Links */}
                            <div className="space-y-3">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-slate-900 font-black uppercase tracking-widest text-xs active:bg-green-50 active:text-green-600 transition-all"
                                    >
                                        <link.icon size={18} className="text-green-600" />
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="flex items-center w-full gap-3 bg-slate-100 px-5 py-4 rounded-2xl">
                                <Search size={20} className="text-slate-400" />
                                <input 
                                    className="w-full bg-transparent outline-none text-slate-700 font-bold text-sm" 
                                    type="text" 
                                    placeholder="Ի՞նչ եք փնտրում..." 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                />
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar;