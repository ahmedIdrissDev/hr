"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, SearchAlert } from "lucide-react";
import { ContextStoreDataProvider } from "@/Context";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
const Employee = () => {
  const { data } = ContextStoreDataProvider();
  const Present = data || []
    
  return (
    <div className="bg-tgcc-900  p-2 h-max rounded-md">
      <div className="py-2 text-white">
        <span>Suivi du pointage Mensuel</span>
      </div>
      <ScrollArea className="h-full py-2 flex flex-col space-x-2.5 button w-full rounded-md  ">
      {Present.length > 0 &&
          <Alert className="bg-white" variant="destructive">
          <SearchAlert />
          <AlertTitle>Suivi </AlertTitle>
          <AlertDescription>
            Merci de valider le pointage mensuel.
          </AlertDescription>
        </Alert>
      }
      {!Present &&
      
        <div className="flex h-90 flex-col gap-2  w-full justify-center items-center">
          <Image
                      src={"/icons/thanks.svg"}
                      className=" opacity-100 w-50 "
                      width={1000}
                      height={1000}
                      alt="profile"
                    />
                    <p>Merci pour la validation.</p>

        </div>
      }
        {Present &&
                    <>
                    
                    
            <div className="button p-0 mt-1">
   
        <Table className="mt-2">
           <TableHeader >
    <TableRow >
      <TableHead className="w-[100px]">Matricule</TableHead>
      <TableHead>Nom</TableHead>
      <TableHead>Prenom</TableHead>
      <TableHead>type</TableHead>

      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
          <TableBody>
            
            {Present.map(
              ({ number_id, first_name, last_name, type, _id }, key) => (
                <TableRow key={key}>
                  <TableCell className="font-medium h-14 ">{number_id} </TableCell>

                  <TableCell className="font-medium">{last_name} </TableCell>
                  <TableCell>{first_name} </TableCell>
                  <TableCell>{type}</TableCell>
                  <TableHead className=" flex justify-end items-center h-full">
                     <Link href={`/employee/${_id}`} className="button justify-center w-40 h-11">
                      Consultation
                     </Link>
      
                               </TableHead>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>

                  </div>        
                    </>

      
      }
      </ScrollArea>
    </div>
  );
};

export default Employee;
