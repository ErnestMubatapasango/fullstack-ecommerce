"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import {zodResolver}  from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";


const formSchema = z.object({
    name: z.string().min(1)
})


export const StoreModal = () => {
    const storeModal = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        //resolver is suppose to help with form validation
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })
     const onSubmit = async(values: z.infer<typeof formSchema>) => {
        console.log(values)
     }
   
    return(
        <Modal
            title="Create store"
            description="Add a new stoe to manage products and categories"
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
                                            <Input placeholder="E comm" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                
                            />
                            <div className="pt-6 flex justify-end items-center gap-2">
                                <Button onClick={storeModal.onClose} variant={"outline"}>Cancel</Button>            
                                <Button>Submit</Button>   
                            </div>
                        </form>
                                 
                    </Form>
               </div>
            </div>
        </Modal>
    )
}