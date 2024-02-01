import prismadb from '@/lib/prismadb'
import React from 'react'
import BillBoardForm from './components/billboard-form'


const BillboardPage = async({params} : {params: {billboardId: string}}) => {

    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId
        }
    })
   console.log(`Billboard ${billboard?.label}`)
  return (
    <div className='p-8'>
      
        <BillBoardForm initialData={billboard}/>
      
    </div>
    
  )
}

export default BillboardPage