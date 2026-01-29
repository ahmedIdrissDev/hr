import { ArrowUpRight, ListCollapse } from 'lucide-react'
import React from 'react'
interface Cardtype{
    icon:React.ReactNode ,
    label:string ,
    Number:number ,
    description?:string ,
    hasbutton?:boolean ;
    main?:boolean ;
} 
const Card = ({Number ,icon ,label ,description ,hasbutton , main}:Cardtype) => {
  return (
        <div className="w-full button overflow-hidden   group relative bg-white flex flex-col shadow shadow-neutral-100 border  first:bg-tgcc-950 first:border-0 first:text-white p-2 h-full rounded-md">
        {main &&
        
<svg className='absolute  -top-8 -right-8  opacity-10' width="309" height="278" viewBox="0 0 309 278" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_1_9)">
<g filter="url(#filter0_f_1_9)">
<path d="M30.6881 36.6742C24.8816 35.3462 25.8463 26.8 31.8027 26.8H276.513C279.274 26.8 281.513 29.0386 281.513 31.8V246.18C281.513 251.783 273.709 253.146 271.809 247.875L211.439 80.3699C210.862 78.7683 209.509 77.5705 207.85 77.191L30.6881 36.6742Z" fill="#FF6A19"/>
</g>
</g>
<defs>
<filter id="filter0_f_1_9" x="-1.14441e-05" y="-1.14441e-05" width="308.313" height="277.985" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="13.4" result="effect1_foregroundBlur_1_9"/>
</filter>
<clipPath id="clip0_1_9">
<rect width="309" height="278" fill="white"/>
</clipPath>
</defs>
</svg>
        }
<div className="flex h-full p-2 absolute inset-0 z-30 flex-col">
            <div className="flex justify-between items-center">
                <span className='text-[17px] '>{label} </span>
                <span>{icon} </span>
            </div>
            <span className='text-sm opacity-80'>{description} </span>
            <div className="flex justify-center items-center w-full h-[90%] ">
               <h3 className='text-2xl'>{Number}</h3> 
            </div>
            {hasbutton &&
              <button className='w-11 button bg-tgcc-500  flex justify-center items-center gap-2 h-12 cursor-pointer rounded-md  text-white border-0 '> 
              <ArrowUpRight/>
              </button>
            }
</div>

        </div>
  )
}

export default Card