"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, Sparkles, Shield, Users, Zap } from 'lucide-react'
import { toast } from 'sonner'

interface FormData {
  name: string
  email: string
}

interface FormErrors {
  name?: string
  email?: string
}

export default function HeroQuickStart() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isCreatingCandidate, setIsCreatingCandidate] = useState(false)
  const [isDemoLoading, setIsDemoLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleStartInterview = () => {
    // Check if user is authenticated (this would need to be implemented with actual auth)
    const isAuthenticated = typeof window !== 'undefined' && document.cookie.includes('__session')
    
    if (isAuthenticated) {
      // Emit custom event for authenticated users
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('start-interview', {
          detail: { candidateInfo: formData.name && formData.email ? formData : null }
        }))
      }
    } else {
      // Trigger Clerk SignUp flow - this requires ClerkProvider to be set up
      toast.error('Please sign up to start an interview')
    }
  }

  const handleTryDemo = async () => {
    setIsDemoLoading(true)
    
    try {
      // Simulate API call to start demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Demo started! Opening Interview Studio...')
      
      // Emit event to open Interview Studio with demo data
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('start-demo-interview'))
      }
    } catch (error) {
      toast.error('Failed to start demo. Please try again.')
    } finally {
      setIsDemoLoading(false)
    }
  }

  const handleCreateAndInterview = async () => {
    if (!validateForm()) return
    
    setIsCreatingCandidate(true)
    
    try {
      // Simulate candidate creation API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      toast.success(`Candidate ${formData.name} created successfully!`)
      
      // Emit event to start interview with new candidate
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('start-interview', {
          detail: { candidateInfo: formData }
        }))
      }
      
      // Reset form
      setFormData({ name: '', email: '' })
    } catch (error) {
      toast.error('Failed to create candidate. Please try again.')
    } finally {
      setIsCreatingCandidate(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 tracking-tight">
              AI-led candidate interviews, <span className="text-primary">simplified.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conduct intelligent, consistent interviews with AI assistance. Save time, reduce bias, and make better hiring decisions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Primary Actions */}
            <div className="space-y-4">
              <Button 
                onClick={handleStartInterview}
                size="lg" 
                className="w-full h-12 text-base font-semibold"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start a live interview
              </Button>
              
              <Button 
                onClick={handleTryDemo}
                variant="outline" 
                size="lg" 
                className="w-full h-12 text-base"
                disabled={isDemoLoading}
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                {isDemoLoading ? 'Starting demo...' : 'Try demo'}
              </Button>
            </div>

            {/* Quick Candidate Creation */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-foreground mb-3">
                Quick candidate setup
              </div>
              
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="Candidate name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
                
                <Button 
                  onClick={handleCreateAndInterview}
                  variant="secondary" 
                  className="w-full"
                  disabled={isCreatingCandidate}
                >
                  <Users className="mr-2 h-4 w-4" />
                  {isCreatingCandidate ? 'Creating...' : 'Create & interview'}
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="border-t border-border pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  <Zap className="mr-1 h-3 w-3" />
                  Fast Setup
                </Badge>
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  <Shield className="mr-1 h-3 w-3" />
                  SOC 2 Compliant
                </Badge>
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  <Users className="mr-1 h-3 w-3" />
                  10k+ Interviews
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                🔒 Enterprise-grade privacy & security
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}