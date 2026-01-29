'use client'
import React from 'react'
import Card from './ui/card'
import { TrendingDown, TrendingUp, User } from 'lucide-react'
import { ContextStoreDataProvider } from '@/Context'

const Bord = () => {
  const {data} = ContextStoreDataProvider() 
  const employees = data || [] 
  const Present=  data?.filter(({present})=> !!present) || []

  return (
    <div className='w-full p-2 h-60 gap-2 grid grid-cols-3'>
       <Card
        Number={employees.length}
        icon={<User/>}
        main
        label='Aperçu des employés'
        description='Résumé rapide de tous les employés'
       />
          <Card
        Number={ employees.length - Present.length}
        icon={<TrendingDown/>}
        label='Absents'
        description='Employés marqués comme absents'
           

       />
              <Card
        Number={Present.length}
        icon={<TrendingUp/>}
        label='Présents'
                hasbutton

        description='Membres de l’équipe en service aujourd’hui'
       />
    </div>
  )
}

export default Bord