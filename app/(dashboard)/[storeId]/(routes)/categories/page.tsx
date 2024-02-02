

import React from 'react'
import BillboardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { CategoryColumn } from './components/column'
import { format } from 'date-fns'

const CategoriesPage = async({params}: {params: {storeId: string}}) => {

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true,
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
   id: item.id,
   name: item.name,
   billboardLabel: item.billboard.label,
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