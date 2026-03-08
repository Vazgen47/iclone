'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

const AddressModal = ({ setShowAddressModal }) => {

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: 'Երևան',
        zip: '',
        country: 'Հայաստան',
        phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Այստեղ կարող ես ավելացնել API call-ը
        setShowAddressModal(false)
        return new Promise((resolve) => setTimeout(resolve, 1000)) // Պարզապես սիմուլյացիա
    }

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm h-screen flex items-center justify-center transition-all">
            <form 
                onSubmit={e => toast.promise(handleSubmit(e), { 
                    loading: 'Պահպանվում է...', 
                    success: 'Հասցեն ավելացվեց', 
                    error: 'Սխալ տեղի ունեցավ' 
                })} 
                className="bg-white p-8 rounded-[2rem] shadow-2xl flex flex-col gap-4 text-slate-700 w-full max-w-md mx-6 relative"
            >
                {/* Փակելու կոճակը */}
                <button 
                    type="button"
                    className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                    onClick={() => setShowAddressModal(false)}
                >
                    <XIcon size={20} />
                </button>

                <div className="mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">Ավելացնել <span className="text-green-600 font-black">Հասցե</span></h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1 font-medium">Առաքման տվյալներ</p>
                </div>

                <div className="space-y-3">
                    <input name="name" onChange={handleAddressChange} value={address.name} className="w-full p-3 px-5 outline-none border border-slate-100 bg-slate-50 focus:bg-white focus:border-green-500 rounded-2xl transition-all" type="text" placeholder="Անուն Ազգանուն" required />
                    
                    <div className="grid grid-cols-2 gap-3">
                        <input name="email" onChange={handleAddressChange} value={address.email} className="w-full p-3 px-5 outline-none border border-slate-100 bg-slate-50 focus:bg-white focus:border-green-500 rounded-2xl transition-all" type="email" placeholder="Էլ. հասցե" required />
                        <input name="phone" onChange={handleAddressChange} value={address.phone} className="w-full p-3 px-5 outline-none border border-slate-100 bg-slate-50 focus:bg-white focus:border-green-500 rounded-2xl transition-all" type="text" placeholder="Հեռախոսահամար" required />
                    </div>

                    <input name="street" onChange={handleAddressChange} value={address.street} className="w-full p-3 px-5 outline-none border border-slate-100 bg-slate-50 focus:bg-white focus:border-green-500 rounded-2xl transition-all" type="text" placeholder="Փողոց, շենք, բնակարան" required />
                    
                    <div className="grid grid-cols-2 gap-3">
                        <input name="city" onChange={handleAddressChange} value={address.city} className="w-full p-3 px-5 outline-none border border-slate-100 bg-slate-50 focus:bg-white focus:border-green-500 rounded-2xl transition-all" type="text" placeholder="Քաղաք" required />
                        <input name="zip" onChange={handleAddressChange} value={address.zip} className="w-full p-3 px-5 outline-none border border-slate-100 bg-slate-50 focus:bg-white focus:border-green-500 rounded-2xl transition-all" type="text" placeholder="Փոստային ինդեքս" required />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <input name="state" onChange={handleAddressChange} value={address.state} className="w-full p-3 px-5 outline-none border border-slate-100 bg-slate-50 focus:bg-white focus:border-green-500 rounded-2xl transition-all font-medium text-slate-400" type="text" placeholder="Մարզ" required />
                        <input name="country" onChange={handleAddressChange} value={address.country} className="w-full p-3 px-5 outline-none border border-slate-100 bg-slate-50 focus:bg-white focus:border-green-500 rounded-2xl transition-all font-medium text-slate-400" type="text" placeholder="Երկիր" required />
                    </div>
                </div>

                <button className="mt-4 bg-slate-900 text-white text-sm font-bold py-4 rounded-2xl hover:bg-black active:scale-95 transition-all shadow-lg shadow-slate-200 uppercase tracking-widest">
                    Պահպանել հասցեն
                </button>
            </form>
        </div>
    )
}

export default AddressModal