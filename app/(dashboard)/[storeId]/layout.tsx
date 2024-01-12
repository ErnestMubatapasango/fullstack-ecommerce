import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

//local imports

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";


export default async function DashboardLayout({children, params}: {children: React.ReactNode; params: {storeId: string}}){

    //check if user is logged in
    const {userId} = auth()

    if(!userId){
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where : {
            id: params.storeId,
            userId: userId
        }
    })

    //check if the store actually exists

    if(!store){
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )

}