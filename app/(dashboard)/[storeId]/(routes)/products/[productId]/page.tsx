import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForm from './components/category-form'


const CategoryPage = async({params} : {params: {categoryId: string, storeId: string}}) => {

    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId
        }
    })
    const billboard = await prismadb.billboard.findMany({
      where:{
        storeId: params.storeId
      }
    })
   
  return (
    <div className='p-8'>
      
        <CategoryForm billboards={billboard} initialData={category}/>
      
    </div>
    
  )
}

export default CategoryPage