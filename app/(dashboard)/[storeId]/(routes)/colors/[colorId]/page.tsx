import prismadb from '@/lib/prismadb'
import React from 'react'
import ColorForm from './components/color-form'



const ColorPage = async({params} : {params: {colorId: string}}) => {
      
  let initialData = null;

  if(initialData === "new"){
    initialData = null;
  }
  else {
    const color = await prismadb.color.findUnique({
      where: {
          id: params.colorId
      }
    })
    initialData = color
  }
  
  return (
    <div className='p-8'>
      
        <ColorForm initialData={initialData}/>
      
    </div>
    
  )
}

export default ColorPage