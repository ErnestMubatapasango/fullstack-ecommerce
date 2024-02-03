"use client"
import React from 'react'
import Heading from '@/components/ui/heading'
import { Size } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'





const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizeFormValues = z.infer<typeof formSchema>

interface SizeFormProps {
    initialData: Size | null
}

const SizeForm: React.FC<SizeFormProps> = ({initialData}) => {

    const [open, setOpen] = React.useState(false) //this is going to control the alert modal
    const [loading, setLoading] = React.useState(false)
    const params = useParams()
    const router = useRouter()

    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    })
    console.log(initialData)

    const title = initialData ? "Edit Size" : "Create Size"
    const description = initialData ? "Edit a Size": "Add a new Size"
    const toastMessage = initialData ? "Size updated" :"Size created"
    const action = initialData ? "Save changes" : "Create"

    const onSubmit = async(data: SizeFormValues) => {

        try{
            setLoading(true)

            if(initialData){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`,data)
            }
            else{
                await axios.post(`/api/${params.storeId}/sizes`, data)
            }
            router.push(`/${params.storeId}/sizes`)
            router.refresh()
            toast.success(toastMessage)
        }
        catch(error){
            toast.error("Something went wrong")
        }
        finally{
            setLoading(false)
        }
    }

    const onDelete = async() => {
        try{
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.push(`/${params.storeId}/sizes`)
            router.refresh()
            toast.success("Billboard has been deleted successfully")
        }
        catch(error){
            toast.error("You need to delete the products and categories first")
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
        <div className="flex items-center justify-between pb-2">
            <Heading 
                title={title}
                description={description}
            />
            {initialData && (
                <Button variant="destructive" size="icon" disabled={loading} onClick={() => setOpen(true)}>
                    <Trash className='h-4 w-4'/>
                </Button>
            )}
           
        </div>
        <Separator />

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full pb-3'>
                  
                <div className='grid grid-cols-3 gap-8'>
                    <FormField 
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Size name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                      <FormField 
                        control={form.control}
                        name='value'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Size name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type='submit' className='ml-auto'>
                    {action}
                </Button>
            </form>

        </Form>
        <Separator />
    </>
  
  )
}

export default SizeForm