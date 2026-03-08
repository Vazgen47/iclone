'use client'
import { ArrowRightIcon, ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'

const PageTitle = ({ heading, text, path = "/", linkText }) => {
    return (
        <div className="my-10 sm:my-14 space-y-2">
            {/* Հետադարձ կապի կամ նավիգացիայի փոքր հղում */}
            <div className="flex items-center gap-2 mb-4">
                <Link href="/" className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-green-600 transition-colors">
                    Գլխավոր
                </Link>
                <span className="text-slate-300 text-xs">/</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900">
                    {heading}
                </span>
            </div>

            {/* Գլխավոր Վերնագիր */}
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                {heading}<span className="text-green-600">.</span>
            </h1>

            {/* Նկարագրություն և Գործողության հղում */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-2">
                <p className="text-slate-500 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                    {text}
                </p>
                {linkText && (
                    <Link 
                        href={path} 
                        className="group inline-flex items-center gap-2 text-green-600 text-sm font-bold uppercase tracking-wider hover:text-slate-900 transition-all"
                    >
                        {linkText} 
                        <ArrowRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>

            {/* Դեկորատիվ գիծ */}
            <div className="w-20 h-1.5 bg-green-600 rounded-full mt-6" />
        </div>
    )
}

export default PageTitle