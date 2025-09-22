"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveSignupData, type SignupFormData } from "@/lib/firestore"
import { cn } from "@/lib/utils"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  role: 'local' | 'cafe'
}

export function SignupModal({ isOpen, onClose, role }: SignupModalProps) {
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [message, setMessage] = React.useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setEmail("")
      setMessage(null)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage({
        type: 'error',
        text: 'Please enter your email address'
      })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const formData: SignupFormData = {
        email: email.trim(),
        role
      }

      await saveSignupData(formData)
      
      setMessage({
        type: 'success',
        text: role === 'local' 
          ? 'You\'re on the list! We\'ll notify you when Local Drip launches in Denver.'
          : 'Thanks for your interest! We\'ll be in touch about partnership opportunities.'
      })
      
      // Clear form after successful submission
      setEmail("")
      
      // Close modal after a brief delay to show success message
      setTimeout(() => {
        onClose()
      }, 2000)
      
    } catch (error) {
      console.error('Signup error:', error)
      
      let errorMessage = 'Something went wrong. Please try again.'
      
      if (error instanceof Error) {
        if (error.message === 'Email already registered') {
          errorMessage = 'Déjà brew — that email\'s already signed up! YAY!'
        } else {
          errorMessage = error.message
        }
      }
      
      setMessage({
        type: 'error',
        text: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonColor = () => {
    return role === 'local' ? 'bg-accent1 hover:bg-accent1/90' : 'bg-accent2 hover:bg-accent2/90'
  }

  const getRoleDisplayName = () => {
    return role === 'local' ? 'Local' : 'Café'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[425px] w-[95vw] max-w-[95vw] sm:w-full bg-secondary border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-describedby="signup-description"
      >
        <DialogHeader>
          <DialogTitle className="text-primary text-lg sm:text-xl font-semibold">
            {role === 'local' ? 'Get Early Access' : 'Partner with Local Drip'}
          </DialogTitle>
          <DialogDescription id="signup-description" className="text-primary/80 text-sm sm:text-base">
            {role === 'local' 
              ? 'Be among the first to discover and order from Denver\'s best independent cafés.'
              : 'Join our network of local cafés and reach more customers without the hefty fees.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label 
              htmlFor="email" 
              className="text-primary font-medium text-sm sm:text-base"
            >
              Email Address <span className="text-red-600" aria-label="required">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="border-primary/20 focus:border-primary focus:ring-primary focus:ring-2 focus:ring-offset-0 text-primary placeholder:text-primary/50 text-sm sm:text-base"
              required
              aria-required="true"
              aria-invalid={message?.type === 'error' ? 'true' : 'false'}
              aria-describedby={message ? 'form-message' : undefined}
            />
          </div>

          {message && (
            <div
              id="form-message"
              role={message.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
              className={cn(
                "p-3 rounded-md text-sm font-medium",
                message.type === 'success' 
                  ? "bg-green-50 text-green-800 border border-green-200" 
                  : "bg-red-50 text-red-800 border border-red-200"
              )}
            >
              {message.text}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="border-primary/20 text-primary hover:bg-primary/5 focus:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !email.trim()}
              className={cn(
                "text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary order-1 sm:order-2",
                getButtonColor(),
                role === 'local' ? 'focus:ring-accent1' : 'focus:ring-accent2'
              )}
              aria-describedby="submit-button-description"
            >
              {isLoading ? 'Signing up...' : (role === 'local' ? 'Get Early Access' : 'Partner with Us')}
            </Button>
          </div>
          <div className="sr-only">
            <p id="submit-button-description">
              {isLoading 
                ? 'Please wait while we process your signup' 
                : (role === 'local' 
                    ? 'Click to get early access to Local Drip' 
                    : 'Click to partner with Local Drip'
                  )
              }
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}