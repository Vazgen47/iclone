'use client'
import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, Truck, Clock, Award, ChevronRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar" 
import Footer from "@/components/Footer"

const About = () => {
    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-white pb-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 py-10">
                        <Link href="/" className="hover:text-slate-900 transition-colors">Գլխավոր</Link>
                        <ChevronRight size={10} />
                        <span className="text-green-600">Մեր Մասին</span>
                    </nav>

                    {/* Hero Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <h1 className="text-5xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-[0.85]">
                                Որակը <br /> <span className="text-green-600">Առաջնային է.</span>
                            </h1>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                                IClone EVN-ը ստեղծվել է նրանց համար, ովքեր փնտրում են կատարելություն: Մենք մասնագիտացված ենք բարձրակարգ Luxe Copy տեխնիկայի ոլորտում՝ առաջարկելով միայն լավագույնը Հայաստանում:
                            </p>
                            <div className="flex gap-4">
                                <Link href="/shop" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95">
                                    Տեսնել Տեսականին
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-slate-50"
                        >
                            <Image 
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                                alt="IClone Workspace" 
                                fill 
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                        </motion.div>
                    </div>

                    {/* Features Grid */}
                    <div className="mb-32">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Ինչու՞ հենց <span className="text-green-600">IClone.</span></h2>
                            <div className="h-1 w-20 bg-green-500 mx-auto mt-4 rounded-full" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: ShieldCheck, title: "Իրական Երաշխիք", desc: "Յուրաքանչյուր ապրանք անցնում է բազմափուլ ստուգում և ունի երաշխիք:" },
                                { icon: Truck, title: "Արագ Առաքում", desc: "Առաքում Երևանում և մարզերում՝ Ձեր նախընտրած ժամին:" },
                                { icon: Clock, title: "24/7 Աջակցություն", desc: "Մեր թիմը միշտ կապի մեջ է Ձեր հարցերին պատասխանելու համար:" },
                                { icon: Award, title: "Լավագույն Որակ", desc: "Մենք համագործակցում ենք միայն ստուգված գործարանների հետ:" }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-100 transition-all group"
                                >
                                    <div className="size-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-green-600 group-hover:text-white transition-all text-slate-900">
                                        <item.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-3 leading-none">{item.title}</h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Mission Section with Warranty Card below text */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-10 bg-slate-900 rounded-[4rem] overflow-hidden p-8 md:p-16 lg:p-20 relative shadow-2xl shadow-slate-200"
                    >
                        {/* Decorative background blurs */}
                        <div className="absolute top-0 right-0 size-80 bg-green-500/5 blur-[120px] rounded-full" />
                        
                        {/* Top Section - Content */}
                        <div className="relative z-10 space-y-6 text-center max-w-4xl mx-auto">
                            <div className="space-y-3">
                                <p className="text-green-500 text-[10px] font-black uppercase tracking-[0.5em]">Մեր Առաքելությունը</p>
                                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                    Վստահություն և <span className="text-green-600 font-outline-2">Որակ.</span>
                                </h2>
                            </div>
                            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed italic px-4">
                                «Հասանելի դարձնել պրեմիում տեխնոլոգիաները բոլորին՝ պահպանելով որակի ամենաբարձր չափանիշները։ Մենք չենք վաճառում պարզապես ապրանք, մենք մատուցում ենք վստահություն և էսթետիկա։»
                            </p>
                        </div>

                        {/* Bottom Section - Image Block (Warranty Card) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="relative w-full h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-inner group"
                        >
                            <Image 
                                src="https://github.com/Vazgen47/iclone/blob/main/IMG_6882.JPG?raw=true" 
                                alt="IClone Warranty Card" 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            {/* Overlay gradient for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/40" />
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default About