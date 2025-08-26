"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderBarProps {
  isSignedIn?: boolean;
  userEmail?: string;
  onStartInterview: () => void;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export const HeaderBar = ({
  isSignedIn = false,
  userEmail,
  onStartInterview,
  onSignIn,
  onSignOut
}: HeaderBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleStartInterview = useCallback(() => {
    onStartInterview();
    closeMobileMenu();
  }, [onStartInterview, closeMobileMenu]);

  const handleSignIn = useCallback(() => {
    router.push('/login');
    closeMobileMenu();
  }, [router, closeMobileMenu]);

  const handleSignOut = useCallback(() => {
    onSignOut?.();
    closeMobileMenu();
  }, [onSignOut, closeMobileMenu]);

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            <div className="text-2xl font-bold text-primary">
              WhiteKitty
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleStartInterview}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Interview
            </Button>

            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="truncate max-w-32">{userEmail}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={handleSignIn}
                className="font-medium"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="py-4 space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 rounded-md mx-2 font-medium"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="px-4 pt-4 border-t border-border space-y-4">
                <Button
                  onClick={handleStartInterview}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-all duration-200 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  Start Interview
                </Button>

                {isSignedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground px-2">
                      <User className="h-4 w-4" />
                      <span className="truncate">{userEmail}</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleSignIn}
                    className="w-full font-medium"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};