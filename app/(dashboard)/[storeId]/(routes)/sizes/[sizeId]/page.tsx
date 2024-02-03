import prismadb from '@/lib/prismadb'
import React from 'react'
import SizeForm from './components/size-form'



const SizePage = async({params} : {params: {sizeId: string}}) => {

    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    })
 
  return (
    <div className='p-8'>
      
        <SizeForm initialData={size}/>
      
    </div>
    
  )
}

export default SizePage