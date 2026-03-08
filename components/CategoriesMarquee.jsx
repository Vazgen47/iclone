'use client'
import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {

    // Եթե categories-ը պարզ զանգված է (array of strings), ապա սա կաշխատի հիանալի
    // Եթե ուզում ես ավելի շատ կրկնվի սահունության համար, օգտագործում ենք բազմապատկված տարբերակը
    const marqueeItems = [...categories, ...categories, ...categories, ...categories];

    return (
        <div className="overflow-hidden w-full relative max-w-7xl mx-auto select-none group my-10 sm:my-24">
            {/* Ձախ կողմի ստվերը (Fade effect) */}
            <div className="absolute left-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-white via-white/50 to-transparent" />
            
            {/* Մարքիի հիմնական կոնտեյները */}
            <div className="flex min-w-max animate-[marqueeScroll_15s_linear_infinite] sm:animate-[marqueeScroll_40s_linear_infinite] group-hover:[animation-play-state:paused] gap-4 sm:gap-6 py-2" >
                {marqueeItems.map((category, index) => (
                    <button 
                        key={index} 
                        className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-full text-slate-600 text-xs sm:text-sm font-medium hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 transition-all duration-500 shadow-sm whitespace-nowrap"
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Աջ կողմի ստվերը (Fade effect) */}
            <div className="absolute right-0 top-0 h-full w-20 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-white via-white/50 to-transparent" />
            
            {/* CSS Animation-ի համար հիշեցում. համոզվիր, որ tailwind.config.js-ում ունես marqueeScroll keyframes-ը */}
        </div>
    );
};

export default CategoriesMarquee;