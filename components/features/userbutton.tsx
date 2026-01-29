"use client";
import { ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const Userbutton = () => {
  const [open, setopen] = useState<Boolean>(false);
  const trigger = () => (open ? setopen(false) : setopen(true));

  const { data } = useSession();
  const user = data?.user.first_name;
  return (
    <>
      <div
        onClick={trigger}
        className="flex bg-white border-0 items-center  text-sm   justify-between p-2 cursor-pointer gap-1.5 min-h-12 border-neutral-200 rounded-md"
      >
        <div className="flex items-center gap-1.5">
          <Image
            src={"/icons/user-Profile.png"}
            className="w-10 opacity-70 h-10 rounded-full"
            width={1000}
            height={1000}
            alt="profile"
          />
          <span> bonjour {user} </span>
        </div>
        <ChevronsUpDown className="text-sm opacity-70" />
      </div>
      <AnimatePresence>
        {open && (
          <div
            onClick={trigger}
            className="inset-0 z-40 fixed text-neutral-950 bg-neutral-950/15 flex justify-center items-center"
          >
            <motion.div
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[500px] flex flex-col justify-between gap-2 h-[500px] p-2.5 bg-white rounded-md"
            >
              <div className="w-full p-2 flex flex-col gap-2  h-full">
                  <div className="flex p-1.5  h-20 rounded-md items-center gap-1.5">
          <Image
            src={"/icons/user-Profile.png"}
            className="w-10 opacity-70 h-10 rounded-full"
            width={1000}
            height={1000}
            alt="profile"
          />
          <span>  {data?.user.first_name} {data?.user.last_name} </span>
        </div>
        <form className="flex justify-between h-full  flex-col gap-2 w-full" action="">
          <div className="w-full flex flex-col gap-1.5">

          <div className=" grid grid-cols-3   w-full items-center gap-2">
            <span className=""> Name</span>
            <input type="text" className="" defaultValue={data?.user.first_name} />
            <input type="text" className="" defaultValue={data?.user.last_name} placeholder="email" />
          </div>
                    <div className="flex w-full items-center gap-2">
            <span className=""> email</span>
                        <input type="text" className="w-full" placeholder="your@gmail.com" />

          </div>
            <div className="flex w-full items-center gap-2">
            <span className=""> role</span>
                        <input type="text" className="w-full opacity-70" readOnly defaultValue={data?.user.role} placeholder="your@gmail.com" />

          </div>
          </div>
          <div className="flex items-center justify-end">
               <button className="button justify-center h-11 w-40 bg-tgcc-600 text-white">Valider</button>
          </div>
        </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Userbutton;
