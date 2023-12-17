"use client";


import { Modal } from "@/components/ui/modal";




export default function Home() {
  return (
    <div>
      <Modal title="Test" description="desc" isOpen onClose={() => {}}>
        Children
      </Modal>
   
    </div>
   
  )
}
