"use client"

import React from 'react'
import { PopoverTrigger } from '@/components/ui/popover'
import { Store } from '@prisma/client'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'

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
    const currentStore = items.find(item => item.id === params.storeId);

    const [open, setOpen] = React.useState(false)
    //switch between the stores
    function onStoreSelect(store: {value: string, label: string}){
        setOpen(false)
        router.push(`/${store.value}`)
    }
    
  return (

    <div>
        Switch
    </div>
  )
}
