"use client"


import * as z from 'zod'
import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import {zodResolver}  from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {toast} from "react-hot-toast"




const formSchema = z.object({
    name: z.string().min(1) //minimum of characters need to name a form
})


export const StoreModal = () => {
    const storeModal = useStoreModal()
    const [loading, setLoading] = React.useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        //resolver is suppose to help with form validation using zod
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

     const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true);
            const response = await axios.post('/api/stores', values)
            console.log(response.data )
            window.location.assign(`/${response.data.id}`)
            toast.success("Store created successfully")
        }
        catch(error){
            console.log(error);
            toast.error("Error creating store")
        }
        finally{
            setLoading(false);
        }
     }
   
    return(
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
               <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            {/**the field prop */}
                                            <Input  disabled={loading} placeholder="E comm" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                
                            />
                            <div className="pt-6 flex justify-end items-center gap-2">
                                <Button disabled={loading} onClick={storeModal.onClose} variant={"outline"}>Cancel</Button>            
                                <Button disabled={loading} type="submit">Submit</Button>   
                            </div>
                        </form>
                                 
                    </Form>
               </div>
            </div>
        </Modal>
    )
}