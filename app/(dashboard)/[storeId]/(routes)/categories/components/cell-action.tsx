"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {CategoryColumn } from "./column"
import { Button } from "@/components/ui/button"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import axios from "axios"
import AlertModal from "@/components/modals/alert-modal"


interface CellActionProps {
    data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Billboard ID has been copied to clipboard")
    }

    const router = useRouter()
    const params = useParams()

    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false)

    const onDelete = async() => {
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/categories/${data.id}`)
            router.push(`/${params.storeId}/categories`) 
            router.refresh()
            toast.success("Category has been deleted successfully")
        }
        catch(error){
            toast.error("You need to delete the products first")
        }
        finally{
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
           
            <AlertModal 
                isOpen={open}
                onClose={() => setOpen(false)}
                loading={loading}
                onConfirm={onDelete}
            />
        
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-8 p-0" >
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="w-4 h-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-1 cursor-pointer" onClick={()=> router.push(`/${params.storeId}/billboards/${data.id}`)}>
                            <Edit className="w-4 h-4" />
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-1 cursor-pointer" onClick={() => onCopy(data.id)}>
                            <Copy className="w-4 h-4" />
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-1 cursor-pointer" onClick={() => setOpen(true)} >
                            <Trash className="w-4 h-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    
                </DropdownMenu>
            </div>
        </>
    )
}