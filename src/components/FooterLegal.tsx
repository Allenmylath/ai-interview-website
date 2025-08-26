import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

interface Link {
  label: string;
  href: string;
}

interface BadgeInfo {
  label: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube';
  href: string;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

interface FooterLegalProps {
  logoText: string;
  tagline: string;
  links: Link[];
  badges?: BadgeInfo[];
  socialLinks?: SocialLink[];
  contactInfo?: ContactInfo;
  companyName?: string;
  legalText?: string;
}

const getSocialIcon = (platform: SocialLink['platform']) => {
  const iconProps = { size: 18, className: "transition-colors duration-200" };
  
  switch (platform) {
    case 'facebook':
      return <Facebook {...iconProps} />;
    case 'twitter':
      return <Twitter {...iconProps} />;
    case 'linkedin':
      return <Linkedin {...iconProps} />;
    case 'instagram':
      return <Instagram {...iconProps} />;
    case 'youtube':
      return <Youtube {...iconProps} />;
    default:
      return null;
  }
};

export const FooterLegal: React.FC<FooterLegalProps> = ({
  logoText,
  tagline,
  links = [],
  badges = [],
  socialLinks = [],
  contactInfo,
  companyName,
  legalText = "All rights reserved."
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Logo and Company Info */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {logoText}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  {tagline}
                </p>
              </div>

              {/* Contact Information */}
              {contactInfo && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Contact
                  </h4>
                  <div className="space-y-2">
                    {contactInfo.email && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Mail size={16} />
                        <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                          {contactInfo.email}
                        </a>
                      </div>
                    )}
                    {contactInfo.phone && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Phone size={16} />
                        <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                          {contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {contactInfo.address && (
                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                        <span>{contactInfo.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Follow Us
                  </h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-all duration-200 hover:scale-105"
                      >
                        {getSocialIcon(social.platform)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-6">
              {links && links.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Quick Links
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
                    {links.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Badges */}
            {badges && badges.length > 0 && (
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant={badge.variant || "secondary"}
                        className="text-xs px-2 py-1 bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {badge.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <p>
                © {currentYear} {companyName || logoText}. {legalText}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};