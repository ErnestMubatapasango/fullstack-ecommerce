import prismadb from "@/lib/prismadb"

interface DashbaordPageProps {
    params: {storeId : string}
}


export default  async function DashboardPage({params }: DashbaordPageProps){

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })

    return(
        <>
            Active Store: {store.name}
        </>
    )
}