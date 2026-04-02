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
        <div className="w-full button overflow-hidden   group relative bg-white flex flex-col shadow shadow-neutral-100 border  first:bg-tgcc-600 first:border-0 first:text-white p-2 h-full rounded-md">
        
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
              <button className='w-11 button bg-white  flex justify-center items-center gap-2 h-12 cursor-pointer rounded-md  text-tgcc-950 border-0 '> 
              <ArrowUpRight/>
              </button>
            }
</div>

        </div>
  )
}

export default Card