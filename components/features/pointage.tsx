"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Files, SearchAlert } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { toast } from "sonner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatePresence, motion } from "motion/react"
import { twMerge } from "tailwind-merge";
import { PointgaeTypes } from "@/types";
import { useSession } from "next-auth/react";
import { ContextStoreDataProvider } from "@/Context";
import useDatetime from "@/hooks/useDatetime";
import { Spinner } from "../ui/spinner";
import LoadingSpinner from "../section/ui/Loading";

interface  AttendanceType{
   project_id:Id<"Project"> ,
   employee_id:Id<"Employee">

}
const Pointage = () => {
  const [open, setopen] = useState<Boolean>(false);
  const [number_Id, setNumber_Id] = useState<number>(0);
  const [loading , setloading] = useState<boolean>(false)
  const trigger = () => (open ? setopen(false) : setopen(true));

  const {dateTime} = useDatetime()
  const {Project:chantier} = ContextStoreDataProvider() ;

  const fullDate =new Date().toISOString().split("T")[0]; 
  const time = new Date().toTimeString().split(" ")[0];    

  const getEmployeesData = useQuery(api.function.getEmaployeesData, number_Id  ? { number_id: number_Id , date:fullDate }:'skip');
  const handleAttendance = useMutation(api.function.handleAttendance)
  const formRef = useRef<HTMLFormElement>(null)
const Employee = getEmployeesData
  const {employee ,status ,project_id}  = (Employee  || [] )  as PointgaeTypes

  async function handleSubmite(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const   project_id = employee.project_id as Id<"Project"> 
      const employee_id = employee._id as Id<"Employee">
       
      if(employee.status ==="Inactif") {
         return  toast.error('Le salaire ne pas actif.')
       } 
      // if(project_id !== chantier._id) {
      //     return  toast.error('Le salaire n’est pas affecté au chantier.')

      //  } 
      
        const data = {
             project_id  ,
             employee_id ,
             date:fullDate  ,
             time
        }
              setloading(true)

        const error = await handleAttendance(data)
        setloading(false)
        if(error?.error) {
          toast.info(error.error)
        }

      


    } catch (error) {}
  }
  
  
  console.log(status)
  return (
    <>
      
      <AnimatePresence>

        <div onClick={trigger} className="   w-full h-dvh flex justify-center items-center">
          <motion.form
            ref={formRef}
            initial={{opacity:0 , translateY:10}}
            animate={{opacity:1 , translateY:0}}
            exit={{opacity:0 , translateY:10}}
            onClick={e=> e.stopPropagation()}
            onSubmit={handleSubmite}
            className="w-1/2 border flex   border-neutral-200 flex-col justify-between gap-2 min-h-96 p-2.5 bg-white rounded-md"
          >
            {loading && <LoadingSpinner/>}
            <div className="flex  flex-col gap-2">
              
              <input
                
                onChange={(e) => setNumber_Id(Number(e.currentTarget.value))}
                className="w-full  rounded-md h-11 border border-neutral-200 px-2"
                type="number"
                autoFocus
                placeholder="Maricule"
              />
              {getEmployeesData?.error ? (
                <Alert variant="destructive">
                  <SearchAlert />
                  <AlertTitle>matricule Error </AlertTitle>
                  <AlertDescription>Ce matricule n’existe pas. Veuillez vérifier que le matricule est correct             </AlertDescription>
                </Alert>
              ) : (
                <>
                 
                  {employee?._id &&
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="flex flex-col gap-1.5 w-full">
                      <span className="text-sm opacity-80"> Prénom :</span>
                      <input
                        className="w-full  rounded-md h-11 text-sm border border-neutral-200 px-2"
                        type="text"
                        readOnly
                        defaultValue={employee?.first_name}
                        placeholder="Maricule"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <span className="text-sm opacity-80"> Nom :</span>
                      <input
                        className="w-full  rounded-md h-11 text-sm border border-neutral-200 px-2"
                        type="text"
                        readOnly
                        defaultValue={employee?.last_name}
                        placeholder="Maricule"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <span className="text-sm opacity-80"> type :</span>
                      <input
                        className="w-full  rounded-md h-11 text-sm border border-neutral-200 px-2"
                        type="text"
                        readOnly
                        defaultValue={employee?.type}
                        placeholder="Maricule"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 w-full">
                      <span className="text-sm opacity-80"> etat :</span>
                      <input
                        className="w-full  rounded-md h-11 text-sm border border-neutral-200 px-2"
                        type="text"
                        readOnly
                        defaultValue={employee?.status}
                        placeholder="Maricule"
                      />
                    </div>
                  </div>
                  
                  }
                </>
              )}
              
            </div>
           
            <div className="flex items-center justify-end gap-1.5">
              <button disabled={loading} className={twMerge('h-11 gap-2 flex justify-center items-center cursor-pointer w-40 bg-tgcc-600   text-white rounded-md', loading  || number_Id == 0 || number_Id==null ? 'bg-neutral-500 cursor-auto':'bg-tgcc-600')}>
                 {status ? "Pointage sortie":"Pointage"}
              </button>
            </div>
          </motion.form>
        </div>
            </AnimatePresence>

    </>
  );
};

export default Pointage;
