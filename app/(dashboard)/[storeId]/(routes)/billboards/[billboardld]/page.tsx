import prismadb from '@/lib/prismadb'
import React from 'react'
import BillBoardForm from './components/billboard-form'


const BillboardPage = async({params} : {params: {billboardId?: string}}) => {

  const billboardId = params.billboardId || ''

    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: billboardId
        }
    })
    const initialData = billboard ? { ...billboard } : null;
  return (
    <div>
        <BillBoardForm initialData={initialData}/>
    </div>
  )
}

export default BillboardPage