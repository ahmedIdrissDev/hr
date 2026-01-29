"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { File, Files, Search, SearchAlert, UserRoundSearch } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatePresence, motion } from "motion/react"
import { twMerge } from "tailwind-merge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation";
import { Employee } from "@/types";
import { Badge } from "@/components/ui/badge"
interface  AttendanceType{
   project_id:Id<"Project"> ,
   employee_id:Id<"Employee">

}
const Searchbutton = () => {
  const [open, setopen] = useState<Boolean>(false);
  const [number_Id, setNumber_Id] = useState<number>(0);
  const [loading , setloading] = useState<boolean>(false)
  const trigger = () => (open ? setopen(false) : setopen(true));


  const getEmployeesData = useQuery(api.function.getEmaployeesData, { number_id: number_Id});
  const Employee = getEmployeesData
    const {employee ,status ,project_id}  = (Employee  || [] )  as PointgaeTypes
  const route = useRouter()
  const tagret= ()=>{
     route.push(`/employee/${employee?._id}`)
     trigger()
  }
  return (
    <>
      <button onClick={trigger} className=" button h-10 cursor-pointer w-30  ">
        <span className=" bg-linear-60 from-tgcc-500 to-tgcc-950 bg-clip-text">
        <UserRoundSearch />
         
        </span>
        <span> Salaries </span>
      </button>
      <AnimatePresence>

      {open && (
        <div onClick={trigger} className="inset-0 z-40 fixed bg-neutral-950/15 flex justify-center items-center">
          <motion.div
            initial={{opacity:0 , translateY:10}}
            animate={{opacity:1 , translateY:0}}
            exit={{opacity:0 , translateY:10}}

            onClick={e=> e.stopPropagation()}
            className="w-1/2 flex flex-col justify-between gap-2 h-96 p-2.5 bg-white rounded-md"
          >
            <div className="flex flex-col gap-2">
            <div className="">
              <h1>RH Consultation </h1>
              <span className="text-sm"> Détails complets des salaires employés</span>
            </div>
              <input
                autoFocus
                onChange={(e) => setNumber_Id(Number(e.currentTarget.value))}
                className="w-full  rounded-md h-11 border border-neutral-200 px-2"
                type="number"
                placeholder="Matricule"
              />
              {getEmployeesData?.error ? (
                <Alert className="border-0" variant="destructive">
                  <AlertTitle>matricule Error </AlertTitle>
                  <AlertDescription>Ce matricule n’existe pas. Veuillez vérifier que le matricule est correct             </AlertDescription>
                </Alert>
              ) : (
                <>
                <div className="button p-0">

                        <Table>
  {/* <TableCaption>A list of Employees.</TableCaption> */}
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Matricule</TableHead>
    
      <TableHead >Nom</TableHead>
      <TableHead>Prenom</TableHead>
      <TableHead>Type</TableHead>
      <TableHead >Etat</TableHead>

      <TableHead className="text-right">Profile</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
            <TableCell className="font-medium">{employee?.number_id} </TableCell>

      <TableCell className="font-medium">{employee?.last_name} </TableCell>
      <TableCell>{employee?.first_name} </TableCell>
      <TableCell>{employee?.type}</TableCell>
            <TableHead >

              <Badge variant="default">{employee?.status} </Badge>
            </TableHead>

      <TableCell className="text-right flex justify-end items-center">
        <button onClick={tagret} className="button h-11 w-11"> <File/></button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
                </div>

             
                </>
              )}
              
            </div>
            
          </motion.div>
        </div>
      )}
            </AnimatePresence>

    </>
  );
};

export default Searchbutton;
