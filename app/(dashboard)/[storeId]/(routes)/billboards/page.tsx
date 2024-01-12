
import React from 'react'
import BillboardClient from './components/client'

const BillboardsPage = () => {
  return (
    <div className='flex-col'>
       <div className='p-8 flex-1 space-y-4'>
          <BillboardClient />
      </div>
    </div>
   
  )
}

export default BillboardsPage