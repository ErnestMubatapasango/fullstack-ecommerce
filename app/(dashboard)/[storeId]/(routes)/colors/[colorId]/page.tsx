import prismadb from '@/lib/prismadb'
import React from 'react'
import ColorForm from './components/color-form'



const ColorPage = async({params} : {params: {colorId: string}}) => {

    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    })
 
  return (
    <div className='p-8'>
      
        <ColorForm initialData={color}/>
      
    </div>
    
  )
}

export default ColorPage