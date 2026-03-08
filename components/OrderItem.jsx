'use client'
import Image from "next/image";
import { DotIcon, MapPin, Package, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";

const OrderItem = ({ order }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '֏';
    const [ratingModal, setRatingModal] = useState(null);

    const { ratings } = useSelector(state => state.rating);

    // Կարգավիճակների հայերեն տարբերակները
    const statusMap = {
        'pending': { text: 'Սպասվում է', color: 'text-orange-500 bg-orange-50' },
        'confirmed': { text: 'Հաստատված', color: 'text-blue-500 bg-blue-50' },
        'shipped': { text: 'Ճանապարհին', color: 'text-purple-500 bg-purple-50' },
        'delivered': { text: 'Առաքված', color: 'text-green-600 bg-green-50' },
        'cancelled': { text: 'Չեղարկված', color: 'text-red-500 bg-red-50' }
    };

    const currentStatus = statusMap[order.status.toLowerCase()] || { text: order.status, color: 'text-slate-500 bg-slate-50' };

    return (
        <>
            <tr className="text-sm border-b border-slate-100 last:border-none">
                {/* Ապրանքների բաժին */}
                <td className="py-6 pr-4">
                    <div className="flex flex-col gap-6">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="relative w-20 aspect-square bg-slate-50 flex items-center justify-center rounded-2xl border border-slate-100 overflow-hidden shrink-0">
                                    <Image
                                        className="h-16 w-auto object-contain p-2"
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="font-bold text-slate-800 text-base leading-tight">{item.product.name}</p>
                                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                        <span>{item.price.toLocaleString()} {currency}</span>
                                        <span className="text-slate-300">|</span>
                                        <span>Քանակ: {item.quantity}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        {new Date(order.createdAt).toLocaleDateString('hy-AM', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <div className="mt-2">
                                        {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId)
                                            ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId).rating} />
                                            : <button 
                                                onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })} 
                                                className={`text-green-600 font-bold text-xs hover:underline transition ${order.status.toLowerCase() !== "delivered" && 'hidden'}`}
                                              >
                                                Գնահատել ապրանքը
                                              </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </td>

                {/* Ընդհանուր գումար */}
                <td className="text-center font-bold text-slate-800 max-md:hidden py-6">
                    {order.total.toLocaleString()} {currency}
                </td>

                {/* Հասցե */}
                <td className="py-6 max-md:hidden">
                    <div className="flex flex-col gap-1 text-xs text-slate-500 max-w-[200px]">
                        <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                            <Package size={14} className="text-slate-400" /> {order.address.name}
                        </p>
                        <p className="flex items-start gap-1.5 leading-relaxed">
                            <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                            {order.address.street}, {order.address.city}, {order.address.state}
                        </p>
                        <p className="flex items-center gap-1.5">
                            <Phone size={14} className="text-slate-400" /> {order.address.phone}
                        </p>
                    </div>
                </td>

                {/* Կարգավիճակ (Desktop) */}
                <td className="py-6 max-md:hidden">
                    <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${currentStatus.color}`}>
                        <DotIcon size={12} className="animate-pulse" />
                        {currentStatus.text}
                    </div>
                </td>
            </tr>

            {/* Mobile View */}
            <tr className="md:hidden">
                <td colSpan={5} className="pb-8 pt-2">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${currentStatus.color}`}>
                                {currentStatus.text}
                            </span>
                            <span className="font-black text-slate-900">{order.total.toLocaleString()} {currency}</span>
                        </div>
                        <div className="text-xs text-slate-500 leading-relaxed">
                            <p className="font-bold text-slate-800">{order.address.name}</p>
                            <p>{order.address.street}, {order.address.city}</p>
                            <p className="mt-1 font-medium">{order.address.phone}</p>
                        </div>
                    </div>
                </td>
            </tr>

            {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
        </>
    )
}

export default OrderItem;