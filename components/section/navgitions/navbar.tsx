'use client'
import Pointage from '@/components/features/pointage'
import Searchbutton from '@/components/features/search'
import { ArrowUpRight, Files } from 'lucide-react'
import React from 'react'
import SelectorButton from '../ui/selectorButton'
import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex  justify-end items-center px-3 py-3  gap-1.5'>
        <UserButton/>
    </nav>
  )
}

export default Navbar