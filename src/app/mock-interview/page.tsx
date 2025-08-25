import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import HeaderBar from '@/components/HeaderBar'
import FooterLegal from '@/components/FooterLegal'
import { VideoCallApp } from '@/components/VideoCallApp'
import { PipecatClient } from "@pipecat-ai/client-js"
import { PipecatClientProvider, PipecatClientAudio } from "@pipecat-ai/client-react"

// Create PipecatClient instance
const pipecatClient = new PipecatClient({
  transport: {
    create: () => ({
      // WebSocket transport configuration
      type: "websocket",
    }),
  },
})

export default function MockInterviewPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background" suppressHydrationWarning>
        <HeaderBar />
        
        <main className="pt-20">
          {/* Video Call App Section */}
          <section className="px-4 pb-12">
            <div className="container max-w-7xl mx-auto">
              <PipecatClientProvider client={pipecatClient}>
                <PipecatClientAudio />
                <VideoCallApp />
              </PipecatClientProvider>
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