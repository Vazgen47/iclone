'use client'
import { PlusIcon, SquarePenIcon, XIcon, ShieldCheck, Truck } from 'lucide-react';
import React, { useState } from 'react'
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '֏';
    const router = useRouter();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState(null);

    const handleCouponCode = async (event) => {
        event.preventDefault();
        // Այստեղ կավելացվի կոդի ստուգման տրամաբանությունը
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!selectedAddress) {
            toast.error('Խնդրում ենք ընտրել առաքման հասցեն');
            return;
        }
        router.push('/orders');
    }

    const discountAmount = coupon ? (coupon.discount / 100 * totalPrice) : 0;
    const finalTotal = totalPrice - discountAmount;

    return (
        <div className='w-full max-w-lg lg:max-w-[380px] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-[2.5rem] p-8 shrink-0 self-start'>
            <h2 className='text-2xl font-bold text-slate-900 mb-6'>Պատվերի <span className='text-green-600'>ամփոփում</span></h2>
            
            {/* Վճարման տարբերակ */}
            <p className='text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-3'>Վճարման եղանակ</p>
            <div className='grid grid-cols-2 gap-3 mb-6'>
                <div 
                    onClick={() => setPaymentMethod('COD')}
                    className={`cursor-pointer p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${paymentMethod === 'COD' ? 'border-green-500 bg-green-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                    <span className={`text-xs font-bold ${paymentMethod === 'COD' ? 'text-green-700' : 'text-slate-500'}`}>Կանխիկ</span>
                    <span className='text-[10px] text-slate-400'>Առաքման պահին</span>
                </div>
                <div 
                    onClick={() => setPaymentMethod('STRIPE')}
                    className={`cursor-pointer p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${paymentMethod === 'STRIPE' ? 'border-green-500 bg-green-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                >
                    <span className={`text-xs font-bold ${paymentMethod === 'STRIPE' ? 'text-green-700' : 'text-slate-500'}`}>Քարտով</span>
                    <span className='text-[10px] text-slate-400'>Օնլայն վճարում</span>
                </div>
            </div>

            {/* Հասցեի բաժին */}
            <div className='py-5 border-y border-slate-50 mb-6'>
                <p className='text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-3 font-medium'>Առաքման հասցե</p>
                {
                    selectedAddress ? (
                        <div className='flex items-center justify-between bg-slate-50 p-4 rounded-2xl'>
                            <div className='text-xs text-slate-600 leading-relaxed'>
                                <p className='font-bold text-slate-800'>{selectedAddress.name}</p>
                                <p className='truncate max-w-[180px]'>{selectedAddress.city}, {selectedAddress.street}</p>
                            </div>
                            <button onClick={() => setSelectedAddress(null)} className='p-2 hover:bg-white rounded-full transition-shadow'>
                                <SquarePenIcon className='text-green-600' size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className='space-y-3'>
                            {
                                addressList.length > 0 && (
                                    <select 
                                        className='w-full bg-slate-50 border border-slate-100 p-3 text-xs rounded-2xl outline-none focus:border-green-500 transition-all cursor-pointer' 
                                        onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                                    >
                                        <option value="">Ընտրել հասցեն</option>
                                        {
                                            addressList.map((address, index) => (
                                                <option key={index} value={index}>{address.name} - {address.city}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                            <button 
                                className='w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 hover:text-green-600 hover:border-green-200 transition-all text-xs font-bold' 
                                onClick={() => setShowAddressModal(true)}
                            >
                                <PlusIcon size={16} /> Ավելացնել հասցե
                            </button>
                        </div>
                    )
                }
            </div>

            {/* Գնային հաշվարկ */}
            <div className='space-y-3 pb-5 border-b border-slate-50'>
                <div className='flex justify-between text-sm'>
                    <span className='text-slate-400'>Ապրանքների գինը:</span>
                    <span className='font-bold text-slate-800'>{totalPrice.toLocaleString()} {currency}</span>
                </div>
                <div className='flex justify-between text-sm items-center'>
                    <span className='text-slate-400 flex items-center gap-1.5'><Truck size={16}/> Առաքում:</span>
                    <span className='text-green-600 font-bold uppercase text-[10px] bg-green-50 px-2 py-1 rounded-md'>Անվճար</span>
                </div>
                {coupon && (
                    <div className='flex justify-between text-sm text-pink-600 font-medium'>
                        <span>Զեղչ ({coupon.code}):</span>
                        <span>-{discountAmount.toLocaleString()} {currency}</span>
                    </div>
                )}

                {/* Պրոմո կոդի դաշտ */}
                {!coupon ? (
                    <form onSubmit={e => handleCouponCode(e)} className='flex gap-2 mt-4'>
                        <input 
                            onChange={(e) => setCouponCodeInput(e.target.value)} 
                            value={couponCodeInput} 
                            type="text" 
                            placeholder='Պրոմո կոդ' 
                            className='flex-1 bg-slate-50 border border-slate-100 p-3 rounded-2xl text-xs outline-none focus:bg-white focus:border-green-500 transition-all' 
                        />
                        <button className='bg-slate-900 text-white px-5 rounded-2xl hover:bg-black transition-all text-xs font-bold'>Կիրառել</button>
                    </form>
                ) : (
                    <div className='flex items-center justify-between bg-pink-50 p-3 rounded-2xl text-[11px] mt-2 border border-pink-100 text-pink-700'>
                        <div className='flex items-center gap-2 uppercase font-black'>
                            <span>{coupon.code}</span>
                            <span className='text-pink-300'>|</span>
                            <span>{coupon.description}</span>
                        </div>
                        <XIcon size={16} onClick={() => setCoupon(null)} className='cursor-pointer hover:rotate-90 transition-all' />
                    </div>
                )}
            </div>

            {/* Վերջնական գին */}
            <div className='flex justify-between items-center py-6'>
                <span className='text-slate-900 font-black text-lg'>Ընդհանուր:</span>
                <span className='text-2xl font-black text-green-600'>{finalTotal.toLocaleString()} {currency}</span>
            </div>

            <button 
                onClick={e => toast.promise(handlePlaceOrder(e), { loading: 'Պատվերը ձևակերպվում է...' })} 
                className='w-full bg-slate-900 text-white py-5 rounded-3xl hover:bg-black active:scale-[0.98] transition-all font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-200'
            >
                Հաստատել պատվերը
            </button>

            <div className='mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium'>
                <ShieldCheck size={14} className='text-green-500' />
                Ապահով և պաշտպանված վճարում
            </div>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
        </div>
    )
}

export default OrderSummary