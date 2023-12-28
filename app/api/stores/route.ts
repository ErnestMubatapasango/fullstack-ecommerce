import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST( req: Request) {

    const {userId} = auth()
    const body = await req.json()
    const {name } = body;

    try{
        if(!userId){
            return new NextResponse("Unauthorzed", {status: 401})
        }

        if(!name){
            return new NextResponse("Name is required", {status: 401})
        }

        const store = await prismadb.create.store({
            data: {
                name,
                userId,
                
            }
        })

        return NextResponse.json(store)
    }
    catch(error){
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal Server error", { status: 500 })
    }
}