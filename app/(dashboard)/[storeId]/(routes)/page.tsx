import prismadb from "@/lib/prismadb"

interface DashbaordPageProps {
    params: {storeId : string}
}

import React from 'react'

const DashboardPage: React.FC<DashbaordPageProps> = async({params}) => {

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })
  return (
    <>
        Active Store: {store?.name}
    </>
  )
}

export default DashboardPage

