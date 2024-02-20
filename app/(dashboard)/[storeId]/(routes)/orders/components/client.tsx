"use client"


import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import React from 'react'
import { OrderColumn, columns } from './column'
import {DataTable}  from '@/components/ui/data-table'


interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({data}) => {

    

  return (
    <>
        <div className='flex items-center justify-between pb-3'>
            <Heading 
                title={`Orders (${data.length})`}
                description='Manage your store orders'
            />
            
        </div>
        <Separator />
        <DataTable filterKey='products' columns={columns} data={data}/>
    </>
  )
}

export default OrderClient