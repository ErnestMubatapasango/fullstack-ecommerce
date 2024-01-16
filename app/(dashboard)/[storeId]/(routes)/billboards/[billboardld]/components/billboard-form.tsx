"use client"
import React from 'react'
import Heading from '@/components/ui/heading'
import { Billboard } from '@prisma/client'
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
import { ApiAlert } from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use.origin'
import ImageUpload from '@/components/ui/image-upload'


type BillboardFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

interface BillboardFormProps {
    initialData: Billboard | null
}
const BillBoardForm: React.FC<BillboardFormProps> = ({initialData}) => {

    const [open, setOpen] = React.useState(false) //this is going to control the alert modal
    const [loading, setLoading] = React.useState(false)
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const title = initialData? "Edit Billboard" : "Create Billboard"
    const description = initialData ? "Edit a billboard": "Add a new billboard"
    const toastMessage = initialData ? "Billboard updated" :"Billboard created"
    const action = initialData ? "Save changes" : "Create"

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
    })

    const onSubmit = async(data: BillboardFormValues) => {

        try{
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            }
            else{
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }
            toast.success(`${toastMessage}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
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
            await axios.delete(`/api/${params.storeId}/${params.billboardId}`)
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
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
                <div className='pt-4'>
                    <FormField 
                        control={form.control}
                        name='imageUrl'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                        value={field.value ? [field.value] : []} 
                                        onRemove={() => field.onChange("")}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <div className='grid grid-cols-3 gap-8'>
                    <FormField 
                        control={form.control}
                        name='label'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Billboard name" {...field} />
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

export default BillBoardForm