"use client"

import { useState, useEffect } from 'react'
import { ClerkProvider, useUser } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import HeaderBar from '@/components/HeaderBar'
import HeroQuickStart from '@/components/HeroQuickStart'
import InterviewStudio from '@/components/InterviewStudio'
import CandidateDashboard from '@/components/CandidateDashboard'
import FooterLegal from '@/components/FooterLegal'
import { toast } from 'sonner'

type ViewMode = 'hero' | 'interview' | 'dashboard'
type UserRole = 'candidate' | 'recruiter' | 'admin'

interface CandidateInfo {
  name: string
  email: string
}

function MainApp() {
  const { isSignedIn, user } = useUser()
  const [currentView, setCurrentView] = useState<ViewMode>('hero')
  const [userRole, setUserRole] = useState<UserRole>('candidate')
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo | null>(null)

  // Determine user role based on Clerk user metadata
  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.publicMetadata?.role as UserRole || 'candidate'
      setUserRole(role)
      
      // Auto-switch to appropriate view for authenticated users
      if (currentView === 'hero') {
        setCurrentView(role === 'candidate' ? 'dashboard' : 'interview')
      }
    }
  }, [isSignedIn, user, currentView])

  // Event listeners for view switching
  useEffect(() => {
    const handleStartInterview = (event: CustomEvent) => {
      if (isSignedIn) {
        setCandidateInfo(event.detail?.candidateInfo || null)
        setCurrentView('interview')
        toast.success('Starting interview...')
      } else {
        toast.error('Please sign in to start an interview')
      }
    }

    const handleStartDemo = () => {
      setCandidateInfo({ name: 'Demo Candidate', email: 'demo@example.com' })
      setCurrentView('interview')
      toast.success('Demo interview started')
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
  }, [isSignedIn])

  const handleStartInterview = () => {
    if (isSignedIn) {
      setCurrentView('interview')
    }
  }

  const handleViewDashboard = () => {
    setCurrentView('dashboard')
  }

  const handleBackToHero = () => {
    setCurrentView('hero')
    setCandidateInfo(null)
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
                
                {/* Quick navigation for authenticated users */}
                {isSignedIn && (
                  <div className="flex gap-4 justify-center lg:justify-start">
                    <button
                      onClick={() => setCurrentView('interview')}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Go to Interview Studio →
                    </button>
                    <button
                      onClick={() => setCurrentView('dashboard')}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View Dashboard →
                    </button>
                  </div>
                )}
              </div>
              
              {/* Right Column - Preview/Workspace */}
              <div className="lg:sticky lg:top-24">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Quick Preview</h3>
                  {isSignedIn ? (
                    <CandidateDashboard 
                      candidateId={user?.id}
                      isRecruiter={userRole === 'recruiter' || userRole === 'admin'}
                      className="space-y-4"
                    />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="mb-4">Sign in to see your interview history and analytics</p>
                      <div className="h-32 bg-muted/20 rounded border-2 border-dashed border-muted flex items-center justify-center">
                        <span className="text-sm">Dashboard Preview</span>
                      </div>
                    </div>
                  )}
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

        {currentView === 'dashboard' && (
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">
                  {userRole === 'candidate' ? 'My Interviews' : 'Candidate Dashboard'}
                </h1>
                <p className="text-muted-foreground">
                  {userRole === 'candidate' 
                    ? 'Track your interview progress and performance'
                    : 'Manage and review candidate interviews'
                  }
                </p>
              </div>
              <button
                onClick={handleBackToHero}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
            
            <CandidateDashboard 
              candidateId={user?.id}
              isRecruiter={userRole === 'recruiter' || userRole === 'admin'}
            />
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

export default function HomePage() {
  return (
    <ClerkProvider>
      <MainApp />
      <Toaster />
    </ClerkProvider>
  )
}