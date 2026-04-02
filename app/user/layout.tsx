import React from 'react'
import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/section/navgitions/navbar';
import Topbar from '@/components/mobile/topbar';

export const viewport: Viewport = {
  themeColor: "#4c63ff",
};


const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='px-2 bg-tgcc-500 text-white  h-dvh  '>
      <Topbar/>
      {children}
       </div>
  )
}

export default layout