"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { HeaderBar } from '@/components/HeaderBar'
import { HeroQuickStart } from '@/components/HeroQuickStart'
import { InterviewStudio } from '@/components/InterviewStudio'
import { CandidateDashboard } from '@/components/CandidateDashboard'
import { FooterLegal } from '@/components/FooterLegal'
import { toast } from 'sonner'

type ViewMode = 'hero' | 'interview'
type UserRole = 'candidate' | 'recruiter' | 'admin'

interface CandidateInfo {
  name: string
  email: string
}

export default function HomePage() {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const [currentView, setCurrentView] = useState<ViewMode>('hero')
  const [userRole, setUserRole] = useState<UserRole>('candidate')
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo | null>(null)

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isSignedIn && user) {
      router.push('/dashboard')
    }
  }, [isSignedIn, user, router])

  // Determine user role based on Clerk user metadata
  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.publicMetadata?.role as UserRole || 'candidate'
      setUserRole(role)
    }
  }, [isSignedIn, user])

  // Event listeners for view switching
  useEffect(() => {
    const handleStartInterview = (event: CustomEvent) => {
      // Open mock-interview page in new window
      window.open('/mock-interview', '_blank')
      toast.success('Opening interview in new window...')
    }

    const handleStartDemo = () => {
      // Open mock-interview page in new window for demo
      window.open('/mock-interview', '_blank')
      toast.success('Opening demo interview in new window...')
    }

    const handleOpenReadonly = (event: CustomEvent) => {
      setCurrentView('interview')
      toast.info('Opening interview in read-only mode')
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('start-interview', handleStartInterview as EventListener)
      window.addEventListener('start-demo-interview', handleStartDemo)
      document.addEventListener('open-interview-readonly', handleOpenReadonly as EventListener)

      return () => {
        window.removeEventListener('start-interview', handleStartInterview as EventListener)
        window.removeEventListener('start-demo-interview', handleStartDemo)
        document.removeEventListener('open-interview-readonly', handleOpenReadonly as EventListener)
      }
    }
  }, [])

  const handleStartInterview = () => {
    // Open mock-interview page in new window
    window.open('/mock-interview', '_blank')
  }

  const handleBackToHero = () => {
    setCurrentView('hero')
    setCandidateInfo(null)
  }

  // Show loading while redirecting authenticated users
  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderBar onStartInterview={handleStartInterview} />
      
      <main className="flex-1">
        {currentView === 'hero' && (
          <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Hero */}
              <div className="space-y-6">
                <HeroQuickStart />
              </div>
              
              {/* Right Column - Preview/Workspace */}
              <div className="lg:sticky lg:top-24">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Get Started</h3>
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-4">Sign in to access your personalized dashboard with interview history and analytics</p>
                    <div className="h-32 bg-muted/20 rounded border-2 border-dashed border-muted flex items-center justify-center">
                      <span className="text-sm">Dashboard Preview</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'interview' && (
          <div className="h-screen">
            <InterviewStudio />
          </div>
        )}
      </main>

      <FooterLegal 
        logoText="WhiteKitty"
        tagline="AI-powered interview practice platform"
        links={[
          { label: "Product", href: "/product" },
          { label: "How it works", href: "/how-it-works" },
          { label: "Pricing", href: "/pricing" },
          { label: "Docs", href: "/docs" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Contact", href: "/contact" }
        ]}
        badges={[
          { label: "SOC 2 Type II", variant: "default" },
          { label: "GDPR Compliant", variant: "secondary" }
        ]}
      />
    </div>
  )
}