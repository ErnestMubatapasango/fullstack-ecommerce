"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { UserButton } from "@clerk/nextjs";



export default function Home() {
  return (
    <div>
      <Modal title="Test" description="desc" isOpen onClose={() => {}}>
        Children
      </Modal>
      {/* <UserButton afterSignOutUrl="/"/> */}
    </div>
   
  )
}
