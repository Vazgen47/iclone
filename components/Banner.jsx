'use client'
import React from 'react'
import toast from 'react-hot-toast';

export default function Banner() {

    const [isOpen, setIsOpen] = React.useState(true);

    const handleClaim = () => {
        setIsOpen(false);
        // Հայերեն հաղորդագրություն և կոդ
        toast.success('Պրոմո կոդը պատճենվեց: ICLONE10');
        navigator.clipboard.writeText('ICLONE10');
    };

    return isOpen && (
        <div className="w-full px-6 py-2 font-medium text-sm text-white text-center bg-gradient-to-r from-slate-900 via-slate-800 to-green-900 border-b border-white/10">
            <div className='flex items-center justify-between max-w-7xl mx-auto'>
                <p className="max-sm:text-xs">
                    🎁 Ստացեք <span className="text-green-400 font-bold">10% ԶԵՂՉ</span> առաջին պատվերի համար
                </p>
                <div className="flex items-center space-x-4 sm:space-x-6">
                    <button 
                        onClick={handleClaim} 
                        type="button" 
                        className="font-bold text-slate-900 bg-green-500 hover:bg-green-400 px-6 py-1.5 rounded-full max-sm:hidden transition-all active:scale-95 text-xs uppercase"
                    >
                        Ստանալ
                    </button>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        type="button" 
                        className="flex items-center justify-center p-1 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="#fff" />
                            <rect x="12.533" y="13.915" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.533 13.915)" fill="#fff" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};