import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {storeId: string, sizeId: string}}){

    try{

        if(!params.sizeId){
            return new NextResponse("Billboard ID is required", {status: 400})
        }

        const size = prismadb.size.findUnique({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size)
    }
    catch(error){
        console.log('[SIZE_GET]', error);
        return new NextResponse("Something went wrong", {status: 500})
    }
}

export async function PATCH( req: Request, {params}: {params : {storeId: string, sizeId: string}}) {

    try{
        const {userId} = auth()
        const body = await req.json()
        const {name, value} = body;

        if(!userId) {
            return new NextResponse("user ID is required", {status: 400})
        }
        
        if(!name) {
            return new NextResponse("Name is required", {status: 400})
        }

        if(!value) {
            return new NextResponse("Value is required", {status: 400})
        }

        if(!params.sizeId){
            return new NextResponse("Billboard ID is required", {status: 400})
        }

        const storeByUserId =  await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.sizeId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(billboard)
      
    }
    catch(error){
        console.log('[BILLBOARD_PATCH', error)
        return new NextResponse("Internal server error", {status: 500})
    }
}


export async function DELETE( req: Request, {params}: {params : {storeId: string, sizeId: string}}) {

    try{
        const {userId} = auth()
       
        if(!userId) {
            return new NextResponse("user ID is required", {status: 401})
        }
        

        if(!params.sizeId){
            return new NextResponse("Billboard ID is required", {status: 400})
        }

        const storeByUserId =  await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Ünauthorized", {status: 403})
        }

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.sizeId,
            },
         
        })

        return NextResponse.json(billboard)
      
    }
    catch(error){
        console.log('[BILLBOARD_DELETE', error)
        return new NextResponse("Internal server error", {status: 500})
    }
}