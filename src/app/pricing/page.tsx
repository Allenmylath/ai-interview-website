import { HeaderBar } from "@/components/HeaderBar"
import { FooterLegal } from "@/components/FooterLegal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, Star, ArrowRight, Shield, Clock, Users, Zap, MessageCircle, BarChart3, Globe, HeadphonesIcon } from "lucide-react"

interface PricingTier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
  popular?: boolean
  customPricing?: boolean
}

interface FAQItem {
  question: string
  answer: string
}

interface TestimonialItem {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "month",
    description: "Perfect for getting started with interview practice",
    features: [
      "3 practice interviews per month",
      "Basic AI feedback",
      "Limited question bank (50+ questions)",
      "Standard video quality",
      "Email support",
      "Progress tracking"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline"
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    description: "Ideal for serious job seekers and career advancement",
    features: [
      "Unlimited practice interviews",
      "Advanced AI feedback & scoring",
      "Full question bank (500+ questions)",
      "HD video recording",
      "Performance analytics dashboard",
      "Industry-specific scenarios",
      "Priority email support",
      "Mock interview scheduling",
      "Resume review integration"
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "default",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Tailored solutions for teams and organizations",
    features: [
      "Everything in Pro",
      "Team management dashboard",
      "Custom integrations & API",
      "Dedicated success manager",
      "24/7 priority support",
      "Custom branding",
      "Advanced analytics & reporting",
      "Bulk user management",
      "SSO integration",
      "Custom question banks"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary",
    customPricing: true
  }
]

const faqs: FAQItem[] = [
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle."
  },
  {
    question: "Is there a free trial for the Pro plan?",
    answer: "Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start your trial."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay by invoice."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely! You can change your plan at any time from your account settings. Changes will be prorated and reflected in your next billing cycle."
  },
  {
    question: "Do you offer discounts for students or non-profits?",
    answer: "Yes, we offer special pricing for students with valid .edu email addresses and registered non-profit organizations. Contact us for details."
  },
  {
    question: "What's included in the money-back guarantee?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund within the first 30 days of your subscription."
  }
]

const testimonials: TestimonialItem[] = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    content: "WhiteKitty helped me land my dream job at Google. The AI feedback was incredibly detailed and helped me improve my technical communication skills.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager",
    company: "Microsoft",
    content: "The unlimited practice sessions in the Pro plan were game-changing. I felt completely confident going into my interviews.",
    rating: 5
  },
  {
    name: "Emily Thompson",
    role: "Data Scientist",
    company: "Netflix",
    content: "The industry-specific scenarios perfectly prepared me for real interview situations. Worth every penny!",
    rating: 5
  }
]

const comparisonFeatures = [
  { feature: "Practice Interviews", free: "3 per month", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Question Bank", free: "50+ questions", pro: "500+ questions", enterprise: "Custom + 500+" },
  { feature: "AI Feedback", free: "Basic", pro: "Advanced", enterprise: "Advanced + Custom" },
  { feature: "Video Quality", free: "Standard", pro: "HD", enterprise: "HD" },
  { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Enterprise" },
  { feature: "Support", free: "Email", pro: "Priority Email", enterprise: "24/7 + Success Manager" },
  { feature: "Team Management", free: "❌", pro: "❌", enterprise: "✅" },
  { feature: "Custom Integrations", free: "❌", pro: "❌", enterprise: "✅" },
  { feature: "SSO Integration", free: "❌", pro: "❌", enterprise: "✅" }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your interview success. Start free, upgrade anytime.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              30-day money-back guarantee
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-600" />
              No setup fees
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={tier.name} 
                className={`relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  tier.popular ? 'border-blue-600 shadow-md scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {!tier.customPricing && <span className="text-muted-foreground">/{tier.period}</span>}
                  </div>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button 
                    variant={tier.buttonVariant} 
                    className="w-full"
                    size="lg"
                  >
                    {tier.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
            <p className="text-muted-foreground">See what's included in each plan</p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full bg-background rounded-lg border">
              <div className="grid grid-cols-4 gap-4 p-6 border-b font-semibold">
                <div>Features</div>
                <div className="text-center">Free</div>
                <div className="text-center">Pro</div>
                <div className="text-center">Enterprise</div>
              </div>
              
              {comparisonFeatures.map((row, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 p-6 border-b last:border-b-0">
                  <div className="font-medium">{row.feature}</div>
                  <div className="text-center text-sm">{row.free}</div>
                  <div className="text-center text-sm">{row.pro}</div>
                  <div className="text-center text-sm">{row.enterprise}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Loved by Job Seekers</h2>
            <p className="text-muted-foreground">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Zap className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="font-semibold mb-2">Instant Access</h3>
              <p className="text-sm text-muted-foreground">Start practicing immediately after signup</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">Your data is encrypted and never shared</p>
            </div>
            <div className="flex flex-col items-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-semibold mb-2">Proven Results</h3>
              <p className="text-sm text-muted-foreground">85% of users report improved confidence</p>
            </div>
            <div className="flex flex-col items-center">
              <HeadphonesIcon className="h-8 w-8 text-orange-600 mb-3" />
              <h3 className="font-semibold mb-2">Expert Support</h3>
              <p className="text-sm text-muted-foreground">Get help from our interview specialists</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful candidates who've used WhiteKitty to land their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-black">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-black">
              <MessageCircle className="mr-2 h-4 w-4" />
              Talk to Sales
            </Button>
          </div>
          <div className="mt-8 text-sm opacity-75">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </div>
        </div>
      </section>

      <FooterLegal />
    </div>
  )
}