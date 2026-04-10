import React from 'react'
import Logo from '../ui/logo'
import Button from '../ui/button'
import { Home, Users } from 'lucide-react'
import Searchbutton from '../ui/search'
import { links } from '@/constant/links'
import Userbutton from '../../features/userbutton'

const Sidebar = () => {
  return (
    <div className="w-full bg-white border-r  gap-2.5 p-2   border-neutral-200 flex flex-col justify-between h-full">
      <div className="w-full flex items-center">

      <Logo/>
      </div>
      {/* <div className="py-2">
        <Userbutton/>
      </div> */}
      <div className="w-full py-3 gap-1 h-full flex flex-col">
      {links.map((data , index)=>(
        <Button key={index} {...data} />

      ))}
         
      </div>
    </div>
  )
}

export default Sidebar