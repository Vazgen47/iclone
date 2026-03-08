'use client'
import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {

    return (
        <div className='px-6 my-24 sm:my-40 max-w-7xl mx-auto'>
            {/* Վերնագիրը հայերեն և ավելի ընդգրկուն */}
            <Title 
                visibleButton={false} 
                title='Ինչու՞ ընտրել մեզ' 
                description="Մենք տրամադրում ենք բարձրակարգ սպասարկում և երաշխավորված որակ՝ ապահովելով Ձեր գնումների անվտանգությունն ու հարմարավետությունը:" 
            />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 mt-20'>
                {
                    ourSpecsData.map((spec, index) => {
                        return (
                            <div 
                                key={index}
                                className='relative h-52 px-8 flex flex-col items-center justify-center w-full text-center border rounded-[2rem] group transition-all duration-500 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1'
                                style={{ 
                                    backgroundColor: spec.accent + '08', // Շատ նուրբ ֆոն
                                    borderColor: spec.accent + '20'     // Նուրբ եզրագիծ
                                }} 
                            >
                                {/* Իկոնկայի բլոկը */}
                                <div 
                                    className='absolute -top-7 text-white size-14 flex items-center justify-center rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300' 
                                    style={{ backgroundColor: spec.accent }}
                                >
                                    <spec.icon size={28} strokeWidth={1.5} />
                                </div>

                                {/* Տեքստային մաս */}
                                <h3 className='text-slate-900 font-bold text-lg mt-4'>{spec.title}</h3>
                                <p className='text-sm text-slate-500 mt-3 leading-relaxed px-2'>
                                    {spec.description}
                                </p>

                                {/* Դեկորատիվ տարր ներքևում */}
                                <div 
                                    className='absolute bottom-4 w-12 h-1 rounded-full opacity-20 group-hover:w-20 transition-all duration-500'
                                    style={{ backgroundColor: spec.accent }}
                                />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default OurSpecs