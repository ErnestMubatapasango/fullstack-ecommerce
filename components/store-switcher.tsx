"use client"

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Store } from '@prisma/client'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface storeSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export default function StoreSwitcher({className, items}: storeSwitcherProps) {

    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedStoreItems = items?.map(item => ({
        label: item.name,
        value: item.id
    }))

    //currently displayed store
    const currentStore = formattedStoreItems?.find(item => item.value === params.storeId);

    const [open, setOpen] = React.useState(false)
    //switch between the stores
    function onStoreSelect(store: {value: string, label: string}){
        setOpen(false)
        router.push(`/${store.value}`)
    }
    
  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button 
            variant={'outline'} 
            size="sm" 
            role='combobox' 
            aria-expanded={open} 
            aria-label='Select a Store'
            className={cn('w-[220px] justify-between', className)}
            >
                <StoreIcon className='w-4 h-4 mr-2'/>
                {currentStore?.label}
                <ChevronsUpDown className='ml-auto opacity-50 w-4 h-4'/>
            </Button>
        </PopoverTrigger>

        <PopoverContent className='w-[220px] p-0'>
            <Command>
                <CommandList>
                    <CommandInput placeholder='Search store...'/>
                        <CommandEmpty className='p-2'>No store found</CommandEmpty>
                        <CommandGroup heading='Stores'>

                            {formattedStoreItems?.map(store => (
                                <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className='text-sm'>

                                    <StoreIcon className='mr-2 w-4 h-4'/>
                                    {store.label}
                                    <Check className={cn('ml-auto h-4 w-4', currentStore?.value === store.value ? "opacity-100" : "opacity-0")}/>

                                </CommandItem>
                            ))}

                        </CommandGroup>
                    
                </CommandList>
                
                <CommandSeparator />

                <CommandList>
                    <CommandGroup>
                        <CommandItem onSelect={() => {
                            //setOpen(false) 
                            storeModal.onOpen()
                        }} 
                            className='cursor-pointer'
                        >
                            <PlusCircle className='mr-2 opacity-60 w-5 h-5'/>
                            Create Store
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}
