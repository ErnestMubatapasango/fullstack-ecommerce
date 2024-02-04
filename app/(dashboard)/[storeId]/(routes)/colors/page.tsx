import React from 'react'
import prismadb from '@/lib/prismadb'
import { ColorColumn } from './components/column'
import { format } from 'date-fns'
import SizeClient from './components/client'

const ColorsPage = async({params}: {params: {storeId: string}}) => {

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  const formattedColors: ColorColumn[] = colors.map((item) => ({
   id: item.id,
   name: item.name,
   value: item.value,
   createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
       <div className='p-8 flex-1 space-y-4'>
          <SizeClient  data={formattedColors}/>
      </div>
    </div>
   
  )
}

export default ColorsPage