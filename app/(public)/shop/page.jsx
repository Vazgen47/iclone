'use client'
import { Suspense, useMemo } from "react"
import ProductCard from "@/components/ProductCard"
import { ArrowLeft, SearchX, LayoutGrid } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import Loading from "@/components/Loading"

function ShopContent() {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)

    // Օպտիմալացված ֆիլտրում useMemo-ի միջոցով
    const filteredProducts = useMemo(() => {
        if (!search) return products;
        return products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, products]);

    return (
        <div className="min-h-screen pb-32">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Վերնագրի և Նավիգացիայի հատված */}
                <div className="flex flex-col md:flex-row md:items-end justify-between py-10 gap-4 border-b border-slate-50 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                            <LayoutGrid size={12} />
                            <span>Տեսականի</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                            {search ? `Որոնում: "${search}"` : "Բոլոր Ապրանքները"}<span className="text-green-600">.</span>
                        </h1>
                    </div>

                    {search && (
                        <button 
                            onClick={() => router.push('/shop')}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-green-600 transition-colors group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Մաքրել որոնումը
                        </button>
                    )}
                </div>

                {/* Ապրանքների ցանցը (Grid) */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        ) : (
                            /* Երբ որոնումը արդյունք չի տալիս */
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 flex flex-col items-center justify-center text-center"
                            >
                                <div className="bg-slate-50 p-8 rounded-[2.5rem] mb-6">
                                    <SearchX size={48} className="text-slate-300" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Արդյունք չի գտնվել</h2>
                                <p className="text-slate-400 mt-2 max-w-xs font-medium">
                                    Ցավոք, նման անունով ապրանք մեր բազայում չկա: Փորձեք այլ անուն:
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default function Shop() {
  return (
    <Suspense fallback={<Loading />}>
      <ShopContent />
    </Suspense>
  );
}