import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import HeaderBar from '@/components/HeaderBar'
import FooterLegal from '@/components/FooterLegal'
import { VideoCallApp } from '@/components/VideoCallApp'

export default function MockInterviewPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background">
        <HeaderBar />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-12 px-4">
            <div className="container max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
                AI Mock Interview
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
                Practice your interview skills with our advanced AI interviewer. Get real-time feedback 
                and improve your performance in a realistic interview environment.
              </p>
            </div>
          </section>

          {/* Video Call App Section */}
          <section className="px-4 pb-12">
            <div className="container max-w-7xl mx-auto">
              <VideoCallApp />
            </div>
          </section>
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
      <Toaster />
    </ClerkProvider>
  )
}
