'use client'
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Instagram, Facebook, MessageCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import toast from "react-hot-toast"

const Contact = () => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            subject: formData.get('subject') || 'Ընդհանուր հարցում',
            message: formData.get('message')
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Ձեր հաղորդագրությունը հաջողությամբ ուղարկվեց:");
                e.target.reset();
            } else {
                toast.error("Սխալ՝ խնդրում ենք փորձեք նորից");
            }
        } catch (error) {
            console.error('Contact form error:', error);
            toast.error("Սխալ՝ խնդրում ենք փորձեք նորից");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-6 pb-32">
                    
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 py-10">
                        <Link href="/" className="hover:text-slate-900 transition-colors">Գլխավոր</Link>
                        <ChevronRight size={10} />
                        <span className="text-green-600">Կապ Մեզ հետ</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        
                        {/* Ձախ կողմը - Ինֆորմացիա */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h1 className="text-6xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                    Կապ <br /> <span className="text-green-600">Հաստատեք.</span>
                                </h1>
                                <p className="text-slate-500 text-lg font-medium max-w-md leading-relaxed">
                                    Ունե՞ք հարցեր ապրանքների կամ առաքման վերաբերյալ։ Մեր թիմը պատրաստ է օգնել Ձեզ ցանկացած պահի։
                                </p>
                            </div>

                            <div className="space-y-6">
                                {/* Հեռախոս */}
                                <a href="tel:+37496683188" className="group flex items-center gap-6 p-6 rounded-[2.5rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all">
                                    <div className="size-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                        <Phone size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Զանգահարեք</p>
                                        <p className="text-xl font-black text-slate-900">+374 (96) 683 188</p>
                                    </div>
                                </a>

                                {/* Էլ. Փոստ */}
                                <a href="mailto:info@iclone.am" className="group flex items-center gap-6 p-6 rounded-[2.5rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all">
                                    <div className="size-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Էլ. Փոստ</p>
                                        <p className="text-xl font-black text-slate-900">info@iclone.am</p>
                                    </div>
                                </a>
                            </div>

                            {/* Սոց. Ցանցեր */}
                           <div className="pt-8">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Միացեք մեզ սոցցանցերում</p>
    <div className="flex gap-4">
        {[
            { 
                icon: Instagram, 
                link: "https://www.instagram.com/iclone.evn", 
                color: "hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" 
            },
            { 
                icon: ({size}) => (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                    </svg>
                ), 
                link: "https://www.tiktok.com/@iclone.evn",
                color: "hover:bg-black"
            },
            { 
                icon: MessageCircle, 
                link: "https://t.me/iclone_evn_bot",
                color: "hover:bg-[#229ED9]"
            }
        ].map((social, i) => (
            <a 
                key={i} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`size-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-slate-200 ${social.color}`}
            >
                <social.icon size={22} />
            </a>
        ))}
    </div>
</div>
                        </motion.div>

                        {/* Աջ կողմը - Form */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-10 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-50 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 size-40 bg-green-500/5 blur-3xl rounded-full" />
                            
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Անուն Ազգանուն</label>
                                        <input required name="name" type="text" placeholder="Օր. Վազգեն Մխեյան" className="w-full bg-white border border-slate-100 p-5 rounded-[1.5rem] outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all font-bold text-slate-900" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Էլ. Փոստ / Հեռախոս</label>
                                        <input required name="email" type="email" placeholder="Ձեր կոնտակտը" className="w-full bg-white border border-slate-100 p-5 rounded-[1.5rem] outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all font-bold text-slate-900" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Հեռախոս (ըստ ցանկության)</label>
                                        <input name="phone" type="tel" placeholder="+374 XX XXX XXX" className="w-full bg-white border border-slate-100 p-5 rounded-[1.5rem] outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all font-bold text-slate-900" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Հաղորդագրություն</label>
                                        <textarea required name="message" rows={5} placeholder="Ինչո՞վ կարող ենք օգնել։" className="w-full bg-white border border-slate-100 p-5 rounded-[1.5rem] outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/5 transition-all font-bold text-slate-900 resize-none"></textarea>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 group">
                                    Ուղարկել <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact