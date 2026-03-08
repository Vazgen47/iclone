'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, TruckIcon, ShieldCheckIcon, HeadphonesIcon, ShoppingBagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '֏';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const router = useRouter();

    // Handle images array with fallback for single image
    const productImages = product.images || (product.image ? [product.image] : ['/placeholder-product.jpg']);
    const [mainImage, setMainImage] = useState(productImages[0]);
    const [isImageChanging, setIsImageChanging] = useState(false);

    const handleImageChange = (newImage) => {
        if (newImage !== mainImage) {
            setIsImageChanging(true);
            setTimeout(() => {
                setMainImage(newImage);
                setIsImageChanging(false);
            }, 150);
        }
    };

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    };

    const averageRating = product.rating.length > 0 
        ? product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length 
        : 0;
    
    const discountPercentage = ((product.mrp - product.price) / product.mrp * 100).toFixed(0);

    return (
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 py-10">
            
            {/* Ձախ կողմ՝ Նկարների պատկերասրահ */}
            <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-24 h-fit">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-3 overflow-x-auto scrollbar-hide pb-2 md:pb-0 snap-x md:snap-none">
                    {productImages.map((image, index) => (
                        <motion.div 
                            key={index} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleImageChange(image)} 
                            className={`relative shrink-0 flex items-center justify-center size-20 md:size-24 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${mainImage === image ? 'border-green-500 bg-white shadow-lg shadow-green-100' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}
                        >
                            <Image 
                                src={image} 
                                className="object-contain p-2" 
                                alt={`${product.name} - Image ${index + 1}`} 
                                fill 
                                sizes="100px"
                                onError={(e) => {
                                    e.target.src = '/placeholder-product.jpg'
                                }}
                            />
                            {mainImage === image && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-green-500/10 rounded-2xl"
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Main Image View */}
                <motion.div 
                    key={mainImage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex justify-center items-center w-full aspect-square md:size-[500px] bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isImageChanging ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full h-full"
                    >
                        <Image 
                            src={mainImage} 
                            alt={`${product.name} - Main Image`} 
                            fill 
                            priority
                            className="object-contain p-10 hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 500px"
                            onError={(e) => {
                                e.target.src = '/placeholder-product.jpg'
                            }}
                        />
                    </motion.div>
                    {discountPercentage > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="absolute top-6 right-6 bg-green-500 text-white text-xs font-black px-4 py-2 rounded-full shadow-lg shadow-green-200 uppercase tracking-widest"
                        >
                            -{discountPercentage}%
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Աջ կողմ՝ Ապրանքի տվյալներ */}
            <div className="flex-1 flex flex-col pt-4">
                <div className="mb-6">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                        {product.name}
                    </h1>
                    <div className='flex items-center mt-4 gap-2'>
                        <div className="flex">
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon key={index} size={16} fill={averageRating >= index + 1 ? "#16a34a" : "#E2E8F0"} stroke="none" />
                            ))}
                        </div>
                        <p className="text-sm font-bold text-slate-400 ml-2 uppercase tracking-widest">
                            {product.rating.length} Կարծիք
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl font-black text-green-600">
                        {product.price.toLocaleString()} {currency}
                    </span>
                    {product.mrp > product.price && (
                        <span className="text-xl text-slate-300 line-through font-medium">
                            {product.mrp.toLocaleString()} {currency}
                        </span>
                    )}
                </div>

                <div className="inline-flex items-center gap-2 text-green-700 bg-green-50 w-fit px-3 py-1 rounded-lg text-xs font-bold border border-green-100 mb-8">
                    <TagIcon size={14} />
                    <p>Խնայեք {discountPercentage}% այսօր</p>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-lg">
                    {product.description.slice(0, 160)}...
                </p>

                {/* Գործողության կոճակներ */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto py-8 border-t border-slate-100">
                    {cart[productId] && (
                        <div className="w-full sm:w-auto">
                            <Counter productId={productId} />
                        </div>
                    )}
                    
                    <button 
                        onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} 
                        className={`group w-full flex items-center justify-center gap-3 py-5 rounded-3xl font-black uppercase tracking-widest text-sm transition-all active:scale-[0.98] shadow-xl ${
                            !cart[productId] 
                            ? 'bg-slate-900 text-white hover:bg-black shadow-slate-200' 
                            : 'bg-green-600 text-white hover:bg-green-700 shadow-green-100'
                        }`}
                    >
                        {!cart[productId] ? (
                            <>
                                <ShoppingBagIcon size={18} />
                                Ավելացնել զամբյուղ
                            </>
                        ) : (
                            'Դիտել զամբյուղը'
                        )}
                    </button>
                </div>

                {/* Առավելություններ */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                        <TruckIcon className="text-green-600 shrink-0" size={20} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase leading-none">Անվճար առաքում</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                        <ShieldCheckIcon className="text-green-600 shrink-0" size={20} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase leading-none">3 ամիս երաշխիք</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                        <HeadphonesIcon className="text-green-600 shrink-0" size={20} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase leading-none">24/7 Սպասարկում</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails