"use client"
import React from 'react'
import Heading from '@/components/ui/heading'
import { Store } from '@prisma/client'
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

interface SettingsFormProps {
    initialData: Store
}

type SettingsFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    name: z.string().min(1)
})

const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {

    const [open, setOpen] = React.useState(false) //this is going to control the alert modal
    const [loading, setLoading] = React.useState(false)
    const params = useParams()
    const router = useRouter()

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async(data: SettingsFormValues) => {
        try{
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            toast.success("Store updated successfully")
            router.refresh()
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
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success("Store has been deleted successfully")
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
                title="Settings"
                description="Manage store preferences"
            />
            <Button variant="destructive" size="icon" disabled={loading} onClick={() => setOpen(true)}>
                <Trash className='h-4 w-4'/>
            </Button>
        </div>
        <Separator />

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                <div className='grid grid-cols-3 gap-8 pt-5'>
                    <FormField 
                        control={form.control}
                        name='name'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <Button disabled={loading} type='submit' className='ml-auto'>
                    Save changes
                </Button>
            </form>

        </Form>
    </>
  
  )
}

export default SettingsForm