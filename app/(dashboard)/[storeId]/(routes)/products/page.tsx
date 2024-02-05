import React from 'react'
import BillboardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { ProductColumn } from './components/column'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'

const ProductsPage = async({params}: {params: {storeId: string}}) => {

  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      size: true,
      color: true,
      category: true
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
   id: item.id,
   name: item.name,
   price: formatter.format(item.price.toNumber()),
   isFeatured: item.isFeatured,
   isArchived: item.isArchived,
   size: item.size.name,
   color: item.color.value,
   category: item.category.name,
   createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
       <div className='p-8 flex-1 space-y-4'>
          <BillboardClient  data={formattedProducts}/>
      </div>
    </div>
   
  )
}

export default ProductsPage