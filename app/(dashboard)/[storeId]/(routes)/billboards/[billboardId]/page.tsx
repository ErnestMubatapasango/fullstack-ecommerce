import prismadb from '@/lib/prismadb'
import React from 'react'
import BillBoardForm from './components/billboard-form'


const BillboardPage = async({params} : {params: {billboardId: string}}) => {
        let initialData = null;

    if(params.billboardId === 'new'){
        initialData = null;
    }
    else {
        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })
        initialData = billboard
    }
 
  return (
    <div className='p-8'>
      
        <BillBoardForm initialData={initialData}/>
      
    </div>
    
  )
}

export default BillboardPage