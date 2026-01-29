import Bord from '@/components/section/bord'
import Employee from '@/components/section/ui/employee'
import Engins from '@/components/section/ui/Engins'
import Stock from '@/components/section/ui/stock'

const page = () => {
  return (
    <>
    <div className="p-2.5 h-max">
      <h1 className='text-[17px] '>Tableau de bord</h1>
      <p className='text-sm'>Aperçu global des ressources du chantier.</p>
    </div>
    <Bord/>
    <div className="p-2  rounded-md  h-max grid gap-2 grid-cols-1">
    <Employee/>
    </div>
    </>
  )
}

export default page