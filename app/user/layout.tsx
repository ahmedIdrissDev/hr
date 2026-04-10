import React from 'react'
import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/section/navgitions/navbar';
import Topbar from '@/components/mobile/topbar';

export const viewport: Viewport = {
  themeColor: "#ffffff",
};


const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='px-2  bg-tgcc-50  h-dvh  '>
      <Topbar/>
      <div className="w-full px-2">
      {children}

      </div>
       </div>
  )
}

export default layout