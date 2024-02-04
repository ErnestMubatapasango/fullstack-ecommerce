

import React from 'react'
import prismadb from '@/lib/prismadb'
import { SizeColumn } from './components/column'
import { format } from 'date-fns'
import SizeClient from './components/client'

const SizesPage = async({params}: {params: {storeId: string}}) => {

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
   id: item.id,
   name: item.name,
   value: item.value,
   createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
       <div className='p-8 flex-1 space-y-4'>
          <SizeClient  data={formattedSizes}/>
      </div>
    </div>
   
  )
}

export default SizesPage