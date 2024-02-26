import prismadb from '@/lib/prismadb'
import React from 'react'
import SizeForm from './components/size-form'



const SizePage = async({params} : {params: {sizeId: string}}) => {

        
  let initialData = null;

  if(initialData === "new"){
    initialData = null;
  }
  else {
    const size = await prismadb.size.findUnique({
      where: {
          id: params.sizeId
      }
    })
    initialData = size
  }
    
 
  return (
    <div className='p-8'>
      
        <SizeForm initialData={initialData}/>
      
    </div>
    
  )
}

export default SizePage