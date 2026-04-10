'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { ContextStoreDataProvider } from '@/Context';
import useDatetime from '@/hooks/useDatetime';
import { useUser } from '@clerk/nextjs';

const SelectorButton = () => {
   const [ProjectId , setProjectId] = useState('')
   const {user} = useUser()
   const {setdata ,data:employeedaa , setProject} = ContextStoreDataProvider()

    const chantier = user?.publicMetadata.project || [];
    const id = (ProjectId || undefined)  as Id<"Project">;
    const fullDate = new Date().toISOString().split("T")[0]; 

    const employeedata  = useQuery(api.function.fetchEmployees , id ? {id , date:fullDate} :'skip') as []
    
   useEffect(()=>{
         setdata(employeedata) 
         const chantierSelected = chantier.find(({project_id})=> project_id===ProjectId)
         setProject(chantierSelected)
        } , [employeedata])
        console.log(ProjectId)
  return (
<Select onValueChange={e=> setProjectId(e)}>
  <SelectTrigger className="">
    <SelectValue placeholder="chantier" />
  </SelectTrigger>
  <SelectContent>
    {chantier.map(({name ,project_id} )=>(
      <SelectItem key={project_id} value={project_id}>{name} </SelectItem>
    ))}
    
  </SelectContent>
</Select>  )
}

export default SelectorButton