"use client"

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { CategoryColumn, columns } from './column'
import {DataTable}  from '@/components/ui/data-table'
import { ApiList } from '@/components/ui/api-list'

interface CategoryClientProps {
    data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({data}) => {

    const router = useRouter()
    const params = useParams()

  return (
    <>
        <div className='flex items-center justify-between pb-3'>
            <Heading 
                title={`Categories (${data.length})`}
                description='Manage your store categories'
            />
            <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                <Plus className='mr-2 h-4 w-4'/>
                Add New
            </Button>
            
        </div>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={data}/>
        <Heading title='API' description="API calls for categories"/>
        <Separator />
        <ApiList entityName="categories" entityIdName="categoryId"/>
    </>
  )
}

export default CategoryClient