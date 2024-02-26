import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForm from './components/category-form'
import { PrismaClient} from '@prisma/client'


const CategoryPage = async ({ params }: { params: { categoryId: string, storeId: string } }) => {

  let initialData = null;

  if(params.categoryId === "new"){
    initialData = null;
  }
  else {
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });    

    initialData = category
  }

  const billboard = await prismadb.billboard.findMany({
    where:{
      storeId: params.storeId
    }
  })
  
  return (
    <div className='p-8'>
      
        <CategoryForm billboards={billboard} initialData={initialData}/>
      
    </div>
    
  )
}

export default CategoryPage