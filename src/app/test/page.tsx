"use client"

import { useState } from "react"
import { SignupModal } from "@/components/SignupModal"
import { Button } from "@/components/ui/button"

export default function TestPage() {
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false)
  const [isCafeModalOpen, setIsCafeModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-primary mb-8">Test SignupModal</h1>
        
        <Button 
          onClick={() => setIsLocalModalOpen(true)}
          className="w-full bg-accent1 hover:bg-accent1/90 text-white"
        >
          Test Local Modal
        </Button>
        
        <Button 
          onClick={() => setIsCafeModalOpen(true)}
          className="w-full bg-accent2 hover:bg-accent2/90 text-white"
        >
          Test Café Modal
        </Button>
      </div>

      <SignupModal
        isOpen={isLocalModalOpen}
        onClose={() => setIsLocalModalOpen(false)}
        role="local"
      />

      <SignupModal
        isOpen={isCafeModalOpen}
        onClose={() => setIsCafeModalOpen(false)}
        role="cafe"
      />
    </div>
  )
}