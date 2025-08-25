import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import HeaderBar from '@/components/HeaderBar'
import FooterLegal from '@/components/FooterLegal'
import { 
  Settings, 
  Send, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Brain, 
  Mic, 
  Globe, 
  Zap,
  FileText,
  Target,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: "Setup Interview",
      description: "Create your position profile, customize interview questions, and set evaluation criteria tailored to your role requirements.",
      icon: Settings,
      features: [
        "Custom question templates",
        "Role-specific criteria",
        "Difficulty adjustment",
        "Time limits & structure"
      ]
    },
    {
      number: 2,
      title: "Invite Candidates",
      description: "Send secure interview links to candidates. They can join the interview at their convenience within your specified timeframe.",
      icon: Send,
      features: [
        "Secure invitation links",
        "Flexible scheduling",
        "Email notifications",
        "Candidate portal access"
      ]
    },
    {
      number: 3,
      title: "AI Conducts Interview",
      description: "Our advanced AI interviewer conducts natural conversations, adapts questions based on responses, and captures everything automatically.",
      icon: MessageSquare,
      features: [
        "Natural conversation flow",
        "Real-time adaptation",
        "Automatic transcription",
        "Behavioral analysis"
      ]
    },
    {
      number: 4,
      title: "Review & Analyze",
      description: "Get comprehensive AI insights, detailed performance scores, and data-driven recommendations to make informed hiring decisions.",
      icon: BarChart3,
      features: [
        "Performance scoring",
        "Skill assessment",
        "Candidate comparison",
        "Detailed reports"
      ]
    }
  ]

  const features = [
    {
      icon: MessageSquare,
      title: "Real-time AI Conversation",
      description: "Natural, human-like interactions that adapt to candidate responses and maintain engaging dialogue throughout the interview."
    },
    {
      icon: Brain,
      title: "Adaptive Questioning",
      description: "Smart question selection based on candidate answers, ensuring optimal assessment depth for each individual."
    },
    {
      icon: FileText,
      title: "Automatic Transcription",
      description: "Complete interview transcripts with timestamps, speaker identification, and key moment highlights."
    },
    {
      icon: Target,
      title: "Performance Scoring",
      description: "Comprehensive scoring across technical skills, communication, problem-solving, and role-specific competencies."
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Conduct interviews in multiple languages with native-level AI conversation capabilities."
    },
    {
      icon: Zap,
      title: "ATS Integration",
      description: "Seamlessly integrate with your existing applicant tracking system for streamlined workflow management."
    }
  ]

  const technologies = [
    {
      icon: Brain,
      title: "Advanced NLP Models",
      description: "State-of-the-art natural language processing for human-like conversation and deep understanding."
    },
    {
      icon: Mic,
      title: "Speech Recognition & Synthesis",
      description: "High-accuracy voice processing with real-time transcription and natural speech generation."
    },
    {
      icon: Users,
      title: "Behavioral Analysis",
      description: "Advanced algorithms analyze communication patterns, confidence levels, and behavioral indicators."
    },
    {
      icon: CheckCircle2,
      title: "Bias Detection & Mitigation",
      description: "Built-in fairness protocols ensure objective evaluation and reduce unconscious hiring bias."
    }
  ]

  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background">
        <HeaderBar />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="container max-w-6xl mx-auto text-center">
              <Badge variant="outline" className="mb-6">
                How It Works
              </Badge>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
                How WhiteKitty Works
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Experience the future of hiring with our AI-powered interview platform. 
                From setup to insights, discover how WhiteKitty transforms your recruitment process 
                into an efficient, fair, and data-driven experience.
              </p>
            </div>
          </section>

          {/* Step-by-Step Process */}
          <section className="py-20 px-4">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold mb-4">
                  Four Simple Steps to Better Hiring
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our streamlined process takes you from job posting to hiring decision in record time, 
                  with AI handling the heavy lifting at every stage.
                </p>
              </div>

              <div className="space-y-24">
                {steps.map((step, index) => (
                  <div key={step.number} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}>
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                          {step.number}
                        </div>
                        <Badge variant="outline" className="text-sm">
                          Step {step.number}
                        </Badge>
                      </div>
                      <h3 className="text-3xl font-display font-bold">
                        {step.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {step.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                        <CardContent className="text-center space-y-6">
                          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                            <step.icon className="w-12 h-12 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xl font-display font-semibold">
                              {step.title} Demo
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              Interactive preview coming soon
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="py-20 px-4 bg-muted/30">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold mb-4">
                  Powerful Features for Modern Hiring
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every feature is designed to make your hiring process more efficient, 
                  accurate, and fair while providing deep insights into candidate capabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-display">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Behind It */}
          <section className="py-20 px-4">
            <div className="container max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold mb-4">
                  The Technology Behind WhiteKitty
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Built on cutting-edge AI and machine learning technologies, 
                  WhiteKitty delivers enterprise-grade performance with human-like interaction quality.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {technologies.map((tech, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <tech.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-display font-semibold">
                          {tech.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Process Flow Visualization */}
          <section className="py-20 px-4 bg-muted/30">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold mb-4">
                  Your Interview Journey
                </h2>
                <p className="text-lg text-muted-foreground">
                  From candidate invitation to final decision, every step is optimized for success.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {['Setup', 'Invite', 'Interview', 'Analyze'].map((step, index) => (
                  <div key={step} className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mb-4 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <h4 className="font-display font-semibold text-lg mb-2">{step}</h4>
                    <div className="w-12 h-1 bg-primary rounded-full"></div>
                    {index < 3 && (
                      <ArrowRight className="w-6 h-6 text-muted-foreground mt-8 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 px-4">
            <div className="container max-w-4xl mx-auto text-center">
              <Card className="p-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-display font-bold">
                    Ready to Transform Your Hiring?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Join hundreds of companies already using WhiteKitty to make better hiring decisions. 
                    Start your free trial today and experience the future of interviews.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="text-lg px-8 py-3">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                      Schedule Demo
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Setup in 5 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>14-day free trial</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <FooterLegal />
      </div>
      <Toaster />
    </ClerkProvider>
  )
}