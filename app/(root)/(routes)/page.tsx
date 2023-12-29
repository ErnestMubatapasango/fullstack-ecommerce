"use client";

// import { Modal } from "@/components/ui/modal";

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import React from "react";


export default function Home() {
  
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  React.useEffect(() => {
    if(!isOpen){
      onOpen() 
    }
  }, [isOpen, onOpen])

  return null;
  // return (
  //   <div>
  //     {/* <Modal title="Test" description="desc" isOpen onClose={() => {}}>
  //       Children
  //     </Modal>
  //   */}
  //   <UserButton afterSignOutUrl="" />
  //   </div>
   
  // )
}
