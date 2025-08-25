import { ChevronDown, ChevronRight, Book, Users, User, Code, Puzzle, Settings, Search, Menu, X, FileText, ExternalLink } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import HeaderBar from '@/components/HeaderBar'
import FooterLegal from '@/components/FooterLegal'

const navigationSections = [
  {
    title: 'Getting Started',
    icon: Book,
    items: [
      { title: 'Quick Start Guide', href: '#quick-start' },
      { title: 'Account Setup', href: '#account-setup' },
      { title: 'First Interview Setup', href: '#first-interview' },
      { title: 'Best Practices', href: '#best-practices' }
    ]
  },
  {
    title: 'For Recruiters',
    icon: Users,
    items: [
      { title: 'Creating Interview Templates', href: '#templates' },
      { title: 'Managing Candidates', href: '#managing-candidates' },
      { title: 'Reviewing Results', href: '#reviewing-results' },
      { title: 'Team Collaboration', href: '#team-collaboration' },
      { title: 'Integration Setup', href: '#integration-setup' }
    ]
  },
  {
    title: 'For Candidates',
    icon: User,
    items: [
      { title: 'Taking an Interview', href: '#taking-interview' },
      { title: 'Technical Requirements', href: '#tech-requirements' },
      { title: 'Tips for Success', href: '#success-tips' },
      { title: 'Troubleshooting', href: '#troubleshooting' }
    ]
  },
  {
    title: 'API Documentation',
    icon: Code,
    items: [
      { title: 'Authentication', href: '#authentication' },
      { title: 'Endpoints Overview', href: '#endpoints' },
      { title: 'Webhook Setup', href: '#webhooks' },
      { title: 'Rate Limits', href: '#rate-limits' },
      { title: 'Examples', href: '#api-examples' }
    ]
  },
  {
    title: 'Integrations',
    icon: Puzzle,
    items: [
      { title: 'ATS Integrations', href: '#ats-integrations' },
      { title: 'SSO Setup', href: '#sso-setup' },
      { title: 'Slack/Teams Notifications', href: '#notifications' },
      { title: 'Export Options', href: '#export-options' }
    ]
  },
  {
    title: 'Advanced Features',
    icon: Settings,
    items: [
      { title: 'Custom AI Models', href: '#custom-ai' },
      { title: 'White-label Setup', href: '#white-label' },
      { title: 'Analytics & Reporting', href: '#analytics' },
      { title: 'Compliance Features', href: '#compliance' }
    ]
  }
]

const contentSections = [
  {
    id: 'quick-start',
    title: 'Quick Start Guide',
    category: 'Getting Started',
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Get up and running with WhiteKitty.it AI interview platform in minutes.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mt-1">1</div>
            <div>
              <h4 className="font-semibold">Create Your Account</h4>
              <p className="text-sm text-muted-foreground">Sign up with your email or use Google/GitHub authentication.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mt-1">2</div>
            <div>
              <h4 className="font-semibold">Set Up Your First Interview</h4>
              <p className="text-sm text-muted-foreground">Choose from pre-built templates or create custom questions.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mt-1">3</div>
            <div>
              <h4 className="font-semibold">Invite Candidates</h4>
              <p className="text-sm text-muted-foreground">Send interview invitations and track candidate progress.</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Code Example</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`// Initialize WhiteKitty SDK
import { WhiteKitty } from '@whitekitty/sdk'

const client = new WhiteKitty({
  apiKey: 'your-api-key',
  environment: 'production'
})

// Create an interview
const interview = await client.interviews.create({
  title: 'Frontend Developer Interview',
  template: 'frontend-react',
  duration: 30
})`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 'templates',
    title: 'Creating Interview Templates',
    category: 'For Recruiters',
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Build reusable interview templates to standardize your hiring process across teams and roles.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Template Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium">Basic Information</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Template name and description</li>
                  <li>• Duration and difficulty level</li>
                  <li>• Role and department tags</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium">Question Categories</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Technical skills assessment</li>
                  <li>• Behavioral questions</li>
                  <li>• Coding challenges</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">Pro Tip</Badge>
          <span className="text-sm text-muted-foreground">Use our AI-powered question suggestions based on job descriptions.</span>
        </div>
      </div>
    )
  },
  {
    id: 'taking-interview',
    title: 'Taking an Interview',
    category: 'For Candidates',
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Everything you need to know about participating in a WhiteKitty.it AI interview.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Before You Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Stable internet connection (minimum 5 Mbps)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Chrome, Firefox, or Safari browser</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Working microphone and camera</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Quiet, well-lit environment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Interview Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <h5 className="font-medium">System Check (2 minutes)</h5>
                <p className="text-sm text-muted-foreground">Test your camera, microphone, and internet connection.</p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <h5 className="font-medium">AI Introduction (1 minute)</h5>
                <p className="text-sm text-muted-foreground">Meet your AI interviewer and review the process.</p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <h5 className="font-medium">Interview Questions (20-45 minutes)</h5>
                <p className="text-sm text-muted-foreground">Answer questions naturally - the AI adapts to your responses.</p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <h5 className="font-medium">Wrap-up (2 minutes)</h5>
                <p className="text-sm text-muted-foreground">Review your responses and submit your interview.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 'authentication',
    title: 'Authentication',
    category: 'API Documentation',
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Secure API authentication using API keys and OAuth 2.0 for WhiteKitty.it platform.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">API Key Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`curl -X GET "https://api.whitekitty.it/v1/interviews" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json"`}</code>
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">OAuth 2.0 Flow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h5 className="font-medium">1. Authorization Request</h5>
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                <code>GET https://api.whitekitty.it/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI</code>
              </pre>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium">2. Token Exchange</h5>
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                <code>{`POST https://api.whitekitty.it/oauth/token
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "code": "AUTH_CODE",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET"
}`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 'ats-integrations',
    title: 'ATS Integrations',
    category: 'Integrations',
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Connect WhiteKitty.it with your existing Applicant Tracking System for seamless workflow integration.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Greenhouse</CardTitle>
              <Badge variant="secondary" className="w-fit">Popular</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Sync candidates, trigger interviews, and push results automatically.</p>
              <Button variant="outline" size="sm" className="w-full">
                View Setup Guide
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Lever</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Native integration with real-time candidate synchronization.</p>
              <Button variant="outline" size="sm" className="w-full">
                View Setup Guide
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Workday</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Enterprise-grade integration with advanced security features.</p>
              <Button variant="outline" size="sm" className="w-full">
                View Setup Guide
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generic Webhook Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              For ATS systems not listed above, use our webhook integration to connect any platform.
            </p>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`{
  "event": "interview.completed",
  "candidate_id": "cand_12345",
  "interview_id": "int_67890",
  "score": 8.5,
  "summary": "Strong technical skills...",
  "timestamp": "2024-01-15T10:30:00Z"
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    )
  },
  {
    id: 'custom-ai',
    title: 'Custom AI Models',
    category: 'Advanced Features',
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Train and deploy custom AI models tailored to your specific industry, role requirements, and company culture.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Model Training Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">1</div>
                <div>
                  <h5 className="font-medium">Data Collection</h5>
                  <p className="text-sm text-muted-foreground">Provide historical interview data, job descriptions, and successful candidate profiles.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">2</div>
                <div>
                  <h5 className="font-medium">Model Training</h5>
                  <p className="text-sm text-muted-foreground">Our AI team fine-tunes the model using your specific requirements and industry standards.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">3</div>
                <div>
                  <h5 className="font-medium">Testing & Validation</h5>
                  <p className="text-sm text-muted-foreground">Comprehensive testing with sample interviews to ensure accuracy and fairness.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">4</div>
                <div>
                  <h5 className="font-medium">Deployment</h5>
                  <p className="text-sm text-muted-foreground">Deploy your custom model to production with monitoring and continuous improvement.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-accent p-4 rounded-lg">
          <h5 className="font-medium mb-2">Enterprise Feature</h5>
          <p className="text-sm text-muted-foreground">
            Custom AI models are available for Enterprise customers. Contact our sales team to learn more about pricing and implementation timelines.
          </p>
        </div>
      </div>
    )
  }
]

export default function DocsPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background">
        <HeaderBar />
        
        <div className="flex">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 bg-sidebar border-r border-sidebar-border">
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search docs..." 
                  className="pl-9 bg-sidebar-accent border-sidebar-border"
                />
              </div>

              {/* Navigation Sections */}
              <nav className="space-y-2">
                {navigationSections.map((section) => (
                  <div key={section.title} className="space-y-1">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-sidebar-foreground">
                      <section.icon className="w-4 h-4" />
                      {section.title}
                    </div>
                    <div className="ml-6 space-y-1">
                      {section.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-1.5 text-sm text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent rounded-md transition-colors"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:ml-64">
            <div className="px-4 py-6 lg:px-8">
              {/* Mobile Header */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Documentation</h1>
                  <Button variant="outline" size="sm">
                    <Menu className="w-4 h-4" />
                  </Button>
                </div>
                <Separator className="mt-4" />
              </div>

              {/* Breadcrumb */}
              <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <span>Docs</span>
                <ChevronRight className="w-4 h-4" />
                <span>Getting Started</span>
              </div>

              {/* Content Sections */}
              <div className="max-w-4xl space-y-12">
                {contentSections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {section.category}
                        </Badge>
                        <h2 className="text-3xl font-bold tracking-tight">
                          {section.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <div className="prose prose-gray max-w-none">
                      {section.content}
                    </div>

                    {/* Feedback Section */}
                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Was this section helpful?
                        </p>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            👍 Yes
                          </Button>
                          <Button variant="outline" size="sm">
                            👎 No
                          </Button>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {/* Table of Contents - Right Sidebar */}
              <div className="hidden xl:block fixed right-8 top-32 w-64">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground mb-3">On this page</h4>
                  <nav className="space-y-1">
                    {contentSections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </main>
        </div>

        <FooterLegal />
      </div>
      <Toaster />
    </ClerkProvider>
  )
}