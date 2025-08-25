"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, Shield, Globe } from "lucide-react"
import { toast } from "sonner"

interface FooterLegalProps {
  className?: string
  logoText?: string
  tagline?: string
  year?: number
  links?: Array<{ label: string; href: string }>
  badges?: Array<{ label: string; variant?: "default" | "secondary" }>
  region?: "EU" | "US" | "EU/US"
}

export default function FooterLegal({
  className = "",
  logoText = "WhiteKitty",
  tagline = "Beautiful, fast, and secure web solutions",
  year = new Date().getFullYear(),
  links = [
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" }
  ],
  badges = [
    { label: "GDPR Compliant", variant: "secondary" as const },
    { label: "SOC 2 Type II", variant: "default" as const }
  ],
  region = "EU/US"
}: FooterLegalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    
    try {
      // Mock API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Successfully subscribed to newsletter!")
      setEmail("")
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className={`bg-card border-t border-border py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Logo & Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-foreground">
                {logoText}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {tagline}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              © {year} {logoText}. All rights reserved.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-wrap gap-4 lg:flex-col lg:gap-3">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column - Badges & Newsletter */}
          <div className="space-y-6">
            {/* Compliance Badges */}
            <div className="space-y-3">
              <h4 className="text-sm font-display font-semibold text-foreground">
                Security & Compliance
              </h4>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, index) => (
                  <Badge 
                    key={index} 
                    variant={badge.variant}
                    className="text-xs"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {badge.label}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs">
                  <Globe className="w-3 h-3 mr-1" />
                  Hosted in {region}
                </Badge>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="text-sm font-display font-semibold text-foreground">
                Stay Updated
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-sm flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="sm" 
                    disabled={isLoading}
                    className="shrink-0"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    {isLoading ? "..." : "Subscribe"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get updates on new features and releases.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}