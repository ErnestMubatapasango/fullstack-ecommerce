"use client"

import { ImagePlus, Trash } from 'lucide-react';
import React from 'react'
import { Button } from './button';
import Image from 'next/image';
import {CldUploadWidget} from 'next-cloudinary'

interface ImageUploadProps {
    disabled?: boolean; //optional boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}


const ImageUpload: React.FC<ImageUploadProps> = ({disabled, onChange, onRemove, value}) => {

    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    if(!isMounted){
        return null
    }

  return (
    <div>
        <div className='flex mb-4  items-center gap-4'>
            {value.map(url => {
               return( 
               <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                    <div className='z-10 absolute top-2 right-2' >
                        <Button type='button' variant="destructive" onClick={() => onRemove(url)} size="icon">
                            <Trash className='h-4 w-4'/>
                        </Button>
                    </div>
                    <Image
                        src={url}
                        alt='image'
                        fill
                        className='object-cover'
                    />
                </div>
               )
            })}   
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset="jgoj5ldk">
            {({open}) => {
                const onOpen = () => {
                    open();
                }

                return (
                    <Button
                        type='button'
                        disabled={disabled}
                        variant='secondary'
                        onClick={onOpen}
                        className='gap-2'
                    >
                        <ImagePlus className='h-4 w-4' />
                        Add an Image
                    </Button>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload