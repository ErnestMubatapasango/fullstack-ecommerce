

import React from 'react'
import BillboardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { OrderColumn } from './components/column'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'

const OrdersPage = async({params}: {params: {storeId: string}}) => {

  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include:{
          product: true //our order can have mutliple items inside so this allows'
          //us to add the prices of all those items .
        } 
      }
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
   id: item.id,
   phone: item.phone,
   address: item.address,
   products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
   totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
   }, 0)),
   isPaid: item.isPaid,
   createdAt: format(item.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
       <div className='p-8 flex-1 space-y-4'>
          <BillboardClient  data={formattedOrders}/>
      </div>
    </div>
   
  )
}

export default OrdersPage