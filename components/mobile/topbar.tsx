import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Logo from '../section/ui/logo'
import SelectorButton from '../section/ui/selectorButton'

const Topbar = () => {
  return (
<nav className='flex  justify-between items-center px-3 py-3  gap-1.5'>
       <Logo/>
       <div className="flex items-center gap-2">
         <UserButton/>
       </div>
    </nav>  )
}

export default Topbar