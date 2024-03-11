import prismadb from '@/lib/prismadb'
import React from 'react'
import ProductForm from './components/product-form'


const ProductPage = async({params} : {params: {productId: string, storeId: string}}) => {

    let initialData = null;

    if(params.productId === 'new'){
      initialData = null;
    }
    else {
      const product = await prismadb.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
          images: true
        }
      })

      initialData = product
    }
  
    
    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    })

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    })

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId
      }
    })
   
  return (
    <div className='p-8'>
      
        <ProductForm colors={colors} sizes={sizes} categories={categories} initialData={initialData}/>
      
    </div>
    
  )
}

export default ProductPage