'use client'
import { Star, StarHalf } from "lucide-react";
import React from "react";

const Rating = ({ value = 0, size = 16, showValue = false }) => {
    
    // Հաշվարկում ենք լիարժեք, կիսատ և դատարկ աստղերը
    const fullStars = Math.floor(value);
    const hasHalfStar = value % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
                {/* Լիարժեք աստղեր */}
                {Array.from({ length: fullStars }).map((_, i) => (
                    <Star
                        key={`full-${i}`}
                        size={size}
                        className="text-green-500 fill-green-500 shrink-0 transition-transform hover:scale-110"
                    />
                ))}

                {/* Կիսատ աստղ */}
                {hasHalfStar && (
                    <div className="relative">
                        <Star size={size} className="text-slate-200 fill-slate-200 shrink-0" />
                        <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star size={size} className="text-green-500 fill-green-500 shrink-0" />
                        </div>
                    </div>
                )}

                {/* Դատարկ աստղեր */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <Star
                        key={`empty-${i}`}
                        size={size}
                        className="text-slate-200 fill-slate-200 shrink-0"
                    />
                ))}
            </div>

            {/* Թվային արժեքը (ըստ ցանկության) */}
            {showValue && (
                <span className="text-xs font-bold text-slate-400 ml-1 mt-0.5 tracking-tighter">
                    {value.toFixed(1)}
                </span>
            )}
        </div>
    );
};

export default Rating;