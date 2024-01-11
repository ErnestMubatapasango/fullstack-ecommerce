"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const BillboardClient = () => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
        <div className='flex items-center justify-between pb-5'>
            <Heading 
                title='Billboards (0)'
                description='Manage your store billboards'
            />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                <Plus className='mr-2 h-3 w-4'/>
                Add New
            </Button>
            
        </div>
        <Separator />
    </>
  )
}

export default BillboardClient