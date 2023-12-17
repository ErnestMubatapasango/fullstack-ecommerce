"use client";

// import { Modal } from "@/components/ui/modal";

import { useStoreModal } from "@/hooks/use-store-modal";
import React from "react";


export default function Home() {
  
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  React.useEffect(() => {
    if(!isOpen){
      onOpen() 
    }
  }, [isOpen, onOpen])
  return (
    <div>
      {/* <Modal title="Test" description="desc" isOpen onClose={() => {}}>
        Children
      </Modal>
    */}
    </div>
   
  )
}
