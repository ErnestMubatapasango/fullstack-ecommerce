import { UserButton } from '@clerk/nextjs'
import React from 'react'
import {MainNav} from '@/components/main-nav'

const Navbar = () => {
  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-8'>
            <div>
                store switcher
            </div>
            <MainNav />
            <div className='ml-auto flex'>
                <UserButton  afterSignOutUrl='/'/>
             </div>
        </div>
       
    </div>
    
  )
}

export default Navbar