'use client'
import { assets } from "@/assets/assets"
import { useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"
import { motion } from "framer-motion"
import { Store, UploadCloud, MapPin, Phone, Mail, BadgeCheck, Clock } from "lucide-react"

export default function CreateStore() {

    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("Ձեր հայտը վերանայման փուլում է:")

    const [storeInfo, setStoreInfo] = useState({
        name: "",
        username: "",
        description: "",
        email: "",
        contact: "",
        address: "",
        image: ""
    })

    const onChangeHandler = (e) => {
        setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value })
    }

    const fetchSellerStatus = async () => {
        // Սիմուլյացիա կարգավիճակի ստուգման համար
        setTimeout(() => setLoading(false), 1000)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        // Սիմուլյացիա ուղարկման համար
        await new Promise(resolve => setTimeout(resolve, 2000))
        setAlreadySubmitted(true)
        setStatus("pending")
        setMessage("Շնորհակալություն: Ձեր խանութի տվյալները հաջողությամբ ուղարկվել են վերանայման:")
    }

    useEffect(() => {
        fetchSellerStatus()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-white pb-20 pt-10 px-6">
            {!alreadySubmitted ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
                            Գրանցել <span className="text-green-600">Խանութը</span>.
                        </h1>
                        <p className="text-slate-500 mt-4 max-w-xl font-medium leading-relaxed">
                            Դարձեք **IClone EVN**-ի գործընկերը: Լրացրեք տվյալները, և մեր թիմը կվերանայի Ձեր հայտը 24 ժամվա ընթացքում:
                        </p>
                    </div>

                    <form 
                        onSubmit={e => toast.promise(onSubmitHandler(e), { 
                            loading: "Տվյալները մշակվում են...", 
                            success: "Հայտն ուղարկված է", 
                            error: "Սխալ տեղի ունեցավ" 
                        })} 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* Լոգոյի բաժին */}
                        <div className="md:col-span-2 bg-slate-50 p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:border-green-400 transition-all cursor-pointer relative overflow-hidden">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setStoreInfo({ ...storeInfo, image: e.target.files[0] })} 
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            {storeInfo.image ? (
                                <div className="text-center">
                                    <Image 
                                        src={URL.createObjectURL(storeInfo.image)} 
                                        className="rounded-3xl shadow-xl mx-auto h-32 w-32 object-cover border-4 border-white" 
                                        alt="Store Logo" width={128} height={128} 
                                    />
                                    <p className="mt-3 text-xs font-bold text-green-600 uppercase tracking-widest">Փոխել լոգոն</p>
                                </div>
                            ) : (
                                <div className="text-center space-y-3">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm mx-auto w-fit group-hover:scale-110 transition-transform">
                                        <UploadCloud size={32} className="text-slate-400 group-hover:text-green-500" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Վերբեռնել Խանութի Լոգոն</p>
                                    <p className="text-[10px] text-slate-400 italic">PNG, JPG կամ WEBP (առավելագույնը 2MB)</p>
                                </div>
                            )}
                        </div>

                        {/* Տվյալների դաշտեր */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-2">Օգտանուն (Username)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                    <input name="username" onChange={onChangeHandler} value={storeInfo.username} required type="text" placeholder="iclone_store" className="w-full bg-slate-50 border border-slate-100 p-4 pl-10 rounded-2xl outline-none focus:bg-white focus:border-green-500 transition-all font-medium text-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-2">Խանութի Անվանում</label>
                                <input name="name" onChange={onChangeHandler} value={storeInfo.name} required type="text" placeholder="Օրինակ՝ Tech World" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:bg-white focus:border-green-500 transition-all font-medium text-sm" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-2">Էլ. Փոստ</label>
                                <input name="email" onChange={onChangeHandler} value={storeInfo.email} required type="email" placeholder="store@example.com" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:bg-white focus:border-green-500 transition-all font-medium text-sm" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-2">Հեռախոսահամար</label>
                                <input name="contact" onChange={onChangeHandler} value={storeInfo.contact} required type="text" placeholder="+374 (__) __-__-__" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:bg-white focus:border-green-500 transition-all font-medium text-sm" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-2">Նկարագրություն</label>
                                <textarea name="description" onChange={onChangeHandler} value={storeInfo.description} required rows={5} placeholder="Պատմեք Ձեր խանութի մասին..." className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:bg-white focus:border-green-500 transition-all font-medium text-sm resize-none" />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-2">Հասցե</label>
                            <textarea name="address" onChange={onChangeHandler} value={storeInfo.address} required rows={3} placeholder="Քաղաք, փողոց, շենք..." className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:bg-white focus:border-green-500 transition-all font-medium text-sm resize-none" />
                        </div>

                        <div className="md:col-span-2 pt-6">
                            <button className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-black active:scale-[0.98] transition-all shadow-xl shadow-slate-200">
                                Ուղարկել Հայտը
                            </button>
                        </div>
                    </form>
                </motion.div>
            ) : (
                /* Վիճակը ուղարկելուց հետո */
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6"
                >
                    <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100 relative mb-8">
                        {status === "approved" ? (
                            <BadgeCheck size={80} className="text-green-500" />
                        ) : (
                            <Clock size={80} className="text-orange-400 animate-pulse" />
                        )}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter max-w-lg">
                        {message}
                    </h2>
                    <p className="mt-4 text-slate-400 font-medium max-w-sm">
                        Մենք կուսումնասիրենք Ձեր տվյալները և կկապվենք Ձեզ հետ էլեկտրոնային փոստի միջոցով:
                    </p>
                    
                    {status === "approved" && (
                        <div className="mt-8 inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest">
                            Վերահասցեավորում 5 վայրկյանից...
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    )
}