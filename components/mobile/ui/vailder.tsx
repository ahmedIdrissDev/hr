import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
const Vailder = () => {
  return (
<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent className='h-dvh'>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
      <div className="flex flex-"></div>
      <button className='w-40 h-11 bg-tgcc-600 rounded-2xl text-white'>Valider</button>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose>
        close
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>  )
}

export default Vailder