'use client'

// import { isUserNearSite } from '@/helpers'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'
import { useState } from 'react'
export interface LocationPayload {
  location: {
    latitude: number
    longitude: number
  }
}


export default function ScannerCode() {
  const [data, setData] = useState<IDetectedBarcode[] | null>(null)
  const [latitude , setlatitude ] = useState(0)
  const [longitude , setlongitude] = useState(0)

//    const {location} :LocationPayload  = data ? JSON.parse(data[0].rawValue) ||  null;
//    navigator.geolocation.getCurrentPosition(success, error);

// function success(pos) {
//   const crd = pos.coords;
//   setlatitude(crd.latitude)
//   setlongitude(crd.longitude)
  
// //   console.log(`More or less ${crd.accuracy} meters.`);
// }
// const sitlatitude = location.latitude!;
// const sitlongitude = location.longitude;



//  const isnear = isUserNearSite({latitude  ,longitude} , {sitlatitude ,sitlongitude} , 200 )
// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

  return (
    <div className='p-4'>
<div className="relative w-full aspect-square overflow-hidden rounded-xl">
      
      <Scanner
        allowMultiple={false}
        onScan={(result) => setData(result) }
        components={{ finder: false }} // Removes the default tracker
        constraints={{ facingMode: 'environment' }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2   rounded-tl-lg"></div>
        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2   rounded-tr-lg"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2  rounded-bl-lg"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2  rounded-br-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/30 rounded-full"></div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg- backdrop-blur-md px-4 py-1.5 rounded-full">
        <p className="text-[10px] font-bold text-white uppercase tracking-widest">tgcc scaner </p>
      </div>
    </div>

      <div className="w-full max-w-md">
        {/* {isnear ?'good thank you':'good please got to chaniter'} */}
      </div>
    </div>
  )
}
