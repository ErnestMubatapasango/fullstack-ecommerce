"use client"

import React from 'react'
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}
const AlertModal: React.FC<AlertModalProps> = ({isOpen, onClose, onConfirm, loading}) => {

    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

  return (
    <Modal
        title='Are you sure?'
        description='This action cannot be undone.'
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className='flex justify-end gap-5'>
            <Button variant='outline' disabled={loading} className='' onClick={onClose}>
                Cancel
            </Button>
            <Button variant='destructive' disabled={loading} onClick={onConfirm}>
                Continue
            </Button>
        </div>
    </Modal>
    
  )
}

export default AlertModal