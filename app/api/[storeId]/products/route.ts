import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { URL } from "url";

export async function POST( req: Request, {params}: {params: {storeId: string} }) {

    

    try{
        const { userId } = auth()
        const body = await req.json()
        const { name, price, quantity, images, categoryId, sizeId, colorId, isFeatured, isArchived } = body;

        if(!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if(!name){
            return new NextResponse("Name is required", {status: 400})
        }
        if(!images || !images.length){
            return new NextResponse("Image(s) is required", {status: 400})
        }
        
        if(!price){
            return new NextResponse("Price  is required", {status: 400})
        }
        if(!quantity){
            return new NextResponse("Quantity  is required", {status: 400})
        }
        if(!categoryId){
            return new NextResponse("Category ID is required", {status: 400})
        }
        if(!sizeId){
            return new NextResponse("Size ID is required", {status: 400})
        }
        if(!colorId){
            return new NextResponse("Color ID is required", {status: 400})
        }
        
        if(!params.storeId){
            return new NextResponse(" store ID is required", {status: 400})
        }

        const storeById = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId,     
            }
        })
        //Here the check we are doing is making sure that the user who is logged in is authorized to modify the store they want to modify.
        if(!storeById){
            return new NextResponse("Unauthorized", {status: 403})
        }
 
        const product = await prismadb.product.create({
            data: {
                name,
                price,
                quantity,
                categoryId,
                sizeId,
                colorId,
                isArchived,
                isFeatured,
                images: {
                    createMany: {
                        data:[
                            ...images.map((image: {url: string}) => image )
                        ]
                    }
                },
                storeId: params.storeId    
            }
        })

        return NextResponse.json(product)
    }
    catch(error){
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal Server error", { status: 500 })
    }
}   




export async function GET( req: Request, {params}: {params : {storeId: string, colorId: string}}) {

    try{
        
        const {searchParams} = new URL(req.url)
        const categoryId = searchParams.get('categoryId') || undefined
        const colorId = searchParams.get('colorId') || undefined
        const sizeId = searchParams.get('sizeId') || undefined
        const isFeatured = searchParams.get('isFeatured')

        if(!params.storeId){
            return new NextResponse("Store is required", {status: 400})
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                colorId,
                categoryId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products)
    }
    catch(error){
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("Internal Server error", { status: 500 })
    }
}