"use client"

import { useState, useEffect } from 'react'
import { Menu, X, User, Settings, LogOut, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SignInButton, SignUpButton, useUser, useClerk } from '@clerk/nextjs'
import { toast } from 'sonner'

interface HeaderBarProps {
  onStartInterview?: () => void
  className?: string
}

export default function HeaderBar({ onStartInterview, className }: HeaderBarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleStartInterview = () => {
    if (onStartInterview) {
      onStartInterview()
    } else if (isSignedIn) {
      toast.success('Starting new interview...')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      setIsMobileMenuOpen(false)
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const navItems = [
    { label: 'Product', href: '/product' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 transition-shadow duration-200 ${
        isScrolled ? 'shadow-sm' : ''
      } ${className || ''}`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold font-display">W</span>
            </div>
            <span className="text-xl font-bold font-display text-foreground">WhiteKitty</span>
          </div>
          <div className="hidden sm:block text-sm text-muted-foreground border-l pl-3 ml-1">
            AI-powered interview practice
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Start Interview Button */}
          {isSignedIn ? (
            <Button
              size="sm"
              onClick={handleStartInterview}
              className="hidden sm:flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Interview
            </Button>
          ) : (
            <SignUpButton mode="modal">
              <Button
                size="sm"
                className="hidden sm:flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Start Interview
              </Button>
            </SignUpButton>
          )}

          {/* Auth Area */}
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  My Interviews
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">
                  Get started
                </Button>
              </SignUpButton>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="border-t pt-6">
                  {/* Mobile Start Interview */}
                  {isSignedIn ? (
                    <Button
                      onClick={() => {
                        handleStartInterview()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full mb-4 flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Start Interview
                    </Button>
                  ) : (
                    <SignUpButton mode="modal">
                      <Button
                        className="w-full mb-4 flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Play className="h-4 w-4" />
                        Start Interview
                      </Button>
                    </SignUpButton>
                  )}

                  {/* Mobile Auth */}
                  {isSignedIn ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {user?.firstName || 'User'}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user?.emailAddresses[0]?.emailAddress}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        My Interviews
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <SignUpButton mode="modal">
                        <Button
                          className="w-full"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Get started
                        </Button>
                      </SignUpButton>
                      <SignInButton mode="modal">
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Log in
                        </Button>
                      </SignInButton>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}