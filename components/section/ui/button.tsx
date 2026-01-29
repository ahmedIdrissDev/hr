'use client'
import {  usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface linksProps{
    icon:React.ReactNode , label:string ,path:string
}


const Button = ({icon , label ,path}:linksProps) => {
    const routeParams = usePathname()
    const route = useRouter()
    const isActive = routeParams.startsWith(path) ? true : false
    const handleNavigation = ()=> route.push(path)

  return (
   <button onClick={handleNavigation} className={twMerge('w-full text-[15px]    relative h-11   px-2 flex rounded-md border   cursor-pointer items-center justify-center  gap-2' , isActive ? 'opacity-100  bg-tgcc-500 text-white border-0       ':"opacity-60 border-0  ")}>
        <span className="material-symbols-outlined">
{icon}
</span>
       

   </button>
  )
}

export default Button
