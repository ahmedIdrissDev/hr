import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Topbar = () => {
  return (
<nav className='flex  justify-between items-center px-3 py-3  gap-1.5'>
        <span>Ahmed Idriss </span>
        <UserButton/>
    </nav>  )
}

export default Topbar