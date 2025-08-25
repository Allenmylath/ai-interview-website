import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import HeaderBar from "@/components/HeaderBar"
import FooterLegal from "@/components/FooterLegal"

const pricingTiers = [
  {
    name: "Starter",
    price: "$29",
    period: "month",
    description: "Perfect for individuals and small teams getting started with AI interviews",
    features: [
      "Up to 50 interviews per month",
      "Basic performance analytics",
      "Standard question templates",
      "Email support",
      "Real-time transcription",
      "Basic reporting"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "month",
    description: "Ideal for growing companies that need advanced features and priority support",
    features: [
      "Up to 500 interviews per month",
      "Advanced analytics & insights",
      "Custom question sets",
      "Priority support",
      "Custom branding",
      "API integrations",
      "Advanced reporting",
      "Team collaboration tools"
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations requiring unlimited scale and white-label solutions",
    features: [
      "Unlimited interviews",
      "White-label solution",
      "Dedicated account manager",
      "API access & webhooks",
      "Custom integrations",
      "SSO & advanced security",
      "SLA guarantees",
      "Custom analytics dashboard"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle."
  },
  {
    question: "What happens if I exceed my interview limit?",
    answer: "If you exceed your monthly interview limit, you'll be notified and can either upgrade your plan or purchase additional interviews at a per-use rate."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 14-day free trial for all new accounts. No credit card required to get started."
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees or hidden costs. You only pay the monthly subscription fee for your chosen plan."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Starter plans include email support, Professional plans get priority support, and Enterprise customers receive dedicated account management with guaranteed response times."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time. We also offer a 30-day money-back guarantee if you're not satisfied with our service."
  }
]

export default function PricingPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-background">
        <HeaderBar />
        
        <main className="container mx-auto px-4 py-16">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Pricing Plans
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing designed to grow with your team. Start your AI-powered interview journey today with our comprehensive platform.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative ${tier.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-display mb-2">{tier.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.price !== "Custom" && <span className="text-muted-foreground">/{tier.period}</span>}
                  </div>
                  <CardDescription className="text-base">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={tier.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Money-back guarantee */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-accent rounded-lg">
              <Check className="w-5 h-5 text-primary mr-2" />
              <span className="text-sm font-medium">30-day money-back guarantee on all plans</span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 p-8 bg-muted rounded-lg">
            <h3 className="text-2xl font-display font-bold mb-4">
              Ready to transform your hiring process?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of companies using WhiteKitty.it to conduct smarter, more efficient interviews with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Start Free Trial</Button>
              <Button variant="outline" size="lg">Schedule Demo</Button>
            </div>
          </div>
        </main>

        <FooterLegal />
      </div>
      <Toaster />
    </ClerkProvider>
  )
}