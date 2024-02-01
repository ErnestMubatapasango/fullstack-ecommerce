

import React from 'react'
import BillboardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/column'
import { format } from 'date-fns'

const CategoriesPage = async({params}: {params: {storeId: string}}) => {

  const categories = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    // include: {
    //   billboard: true,
    // },
    orderBy:{
      createdAt: "desc"
    }
  })

  const formattedCategories: BillboardColumn[] = categories.map((item) => ({
   id: item.id,
   label: item.label,
  //  billboardLabel: item.billboard.label,
   createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
       <div className='p-8 flex-1 space-y-4'>
          <BillboardClient  data={formattedCategories}/>
      </div>
    </div>
   
  )
}

export default CategoriesPage