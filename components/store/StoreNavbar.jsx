'use client'
import Link from "next/link"
import { UserCircle, Bell, Settings } from "lucide-react"

const StoreNavbar = () => {
    return (
        <nav className="sticky top-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-slate-100 backdrop-blur-md bg-white/80 transition-all">
            {/* Logo Section */}
            <Link href="/" className="relative group">
                <div className="flex items-end gap-0.5">
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter transition-transform group-hover:scale-95">
                        IClone <span className="text-green-600">EVN</span>
                    </h1>
                    <div className="mb-1 size-1.5 bg-green-500 rounded-full animate-pulse" />
                </div>
                {/* Store Badge */}
                <span className="absolute -right-14 -top-1 bg-slate-900 text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg shadow-slate-200">
                    Store
                </span>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4 md:gap-8">
                {/* Notifications & Settings (Desktop Only) */}
                <div className="hidden sm:flex items-center gap-4 text-slate-400">
                    <button className="p-2 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 size-2 bg-green-500 border-2 border-white rounded-full" />
                    </button>
                    <button className="p-2 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all">
                        <Settings size={20} />
                    </button>
                </div>

                {/* User Profile Info */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                    <div className="hidden md:block text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Բարի գալուստ</p>
                        <p className="text-sm font-bold text-slate-900 mt-1">Admin Seller</p>
                    </div>
                    <div className="size-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 border-2 border-white hover:scale-105 transition-transform cursor-pointer">
                        <UserCircle size={24} strokeWidth={1.5} />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default StoreNavbar