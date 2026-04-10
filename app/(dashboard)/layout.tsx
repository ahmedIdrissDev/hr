import Navbar from '@/components/section/navgitions/navbar';
import Sidebar from '@/components/section/navgitions/sidebar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='grid   h-dvh grid-cols-[65px_1fr] '>
        <Sidebar />
        <ScrollArea  className="w-full  bg-tgcc-50/50    h-dvh">
        <Navbar/>
        <div className="p-2  h-full ">
        {children}
        </div>
        <ScrollBar hidden orientation="vertical" />
       </ScrollArea>
    </div>
  )
}

export default layout