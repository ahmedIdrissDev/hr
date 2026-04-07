"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import {
  File ,
  Files ,
  Search ,
  SearchAlert ,
  SquarePen ,
  UserRoundSearch ,
} from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Employee } from "@/types";
import { countries, departments, nationalities, roles, Types } from "@/constant";

interface AttendanceType {
  project_id: Id<"Project">;
  employee_id: Id<"Employee">;
}
const EditButton = (data: Employee) => {
  const [open, setopen] = useState<Boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const trigger = () => (open ? setopen(false) : setopen(true));

  return (
    <>
      <button
        onClick={trigger}
        className={
          "h-11 button border-0 shadow-none cursor-pointer w-36 text-white rounded-md bg-tgcc-500"
        }
      >
        <SquarePen />
Fiche salarié      </button>
      <AnimatePresence>
        {open && (
          <div
            onClick={trigger}
            className="inset-0 z-40 fixed bg-neutral-950/15 flex justify-end items-center"
          >
            <motion.div
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[80%] flex flex-col justify-between gap-2 h-full p-2.5 bg-white rounded-none"
            >
              <div className="">

                 <div className="">
              <h1>RH Consultation </h1>
              <span className="text-sm"> Détails complets des salaires employés</span>
            </div>
  <div className="w-full h-full">
                <div className="grid w-full h-max grid-cols-3 gap-2">
                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Nom</span>
                    <input type="text" defaultValue={data.last_name} name="last_name" className="w-full" />
                  </div>

                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Prénom</span>
                    <input type="text" defaultValue={data.first_name} name="first_name" className="w-full" />
                  </div>

                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">CIN</span>
                    <input type="text" defaultValue={data.cin} name="cin" className="w-full" />
                  </div>

                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">
                      Date de Naissance
                    </span>
                    <input
                      type="date"
                      defaultValue={data.date_naissance}
                      name="date_naissance"
                      className="w-full"
                    />
                  </div>
                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Nationalité</span>
                    <select
                      defaultValue={data.nationalite}
                      className="input w-full"
                      id="datalist-2"
                      name="nationalite"
                    >
                      {nationalities.map((country, key) => (
                        <option key={key} value={country}>
                          {country}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Type</span>
                    <select
                      name="type"
                      defaultValue={data.type}
                      className="input w-full"
                      id="datalist-2"
                    >
                      {Types.map((type, key) => (
                        <option key={key} value={type}>
                          {type}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Statut</span>
                    <select
                      name="tgcc_statu"
                      defaultValue={data.tgcc_statu}
                      className="input w-full"
                      id="datalist-2"
                    >
                      {departments.map((country, key) => (
                        <option key={key} value={country}>
                          {country}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Fonction</span>
                    <select
                      name="tgcc_role"
                      defaultValue={data.tgcc_role}
                      className="input w-full"
                      id="datalist-2"
                    >
                      {roles.map((role, key) => (
                        <option key={key} value={role}>
                          {role}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                   <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Telephone</span>
                    <input defaultValue={data.telephone} type="text" name="telephone" className="w-full" />
                  </div>
                  <div className="w-full flex col-span-3 h-12  items-center">
                    Adress
                  </div>
                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Ville</span>
                    <input name="ville"        defaultValue={data.ville} type="text" className="w-full" />
                  </div>

                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Pays</span>
                    <select
                      name="pays"
                      defaultValue={data.pays}
                      className="input w-full"
                      id="datalist-2"
                    >
                      {countries.map((country, key) => (
                        <option key={key} value={country}>
                          {country}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full items-start  flex flex-col gap-1.5">
                    <span className="text-sm opacity-80">Adress</span>
                    <input name="adresse"                       defaultValue={data.adresse} type="text" className="w-full" />
                  </div>

                
              </div>
                <div className="w-full flex col-span-3 h-12  items-center">
                    Tgcc servies
                  </div>
                  <div className="w-full  items-center  flex  gap-1.5">
                    <span className="text-sm opacity-80"> 	Utilise transport TGCC 		</span>
                    <input name="adresse"                     type="checkbox" className="w-3 accent-tgcc-600 outline-0 h-3" />
                  </div>
              </div>


              </div>
               <div className="flex items-center justify-end">
                 <button
        className={
          "h-11  border-0 shadow-none cursor-pointer w-36 text-white rounded-md bg-tgcc-500"
        }
      >
         Valider
      </button>
               </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditButton;
