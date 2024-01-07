"use client"
import React from 'react'
import Heading from '@/components/ui/heading'
import { Store } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'


interface SettingsFormProps {
    initialData: Store
}

const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {

  return (
    <>
      <div className="flex items-center justify-between pb-2">
            <Heading 
                title="Settings"
                description="Manage store preferences"
            />
            <Button variant="destructive" size="icon" onClick={() => {}}>
                <Trash className='h-4 w-4'/>
            </Button>
        </div>
        <Separator />
    </>
  
  )
}

export default SettingsForm