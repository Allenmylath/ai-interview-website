"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MessageSquare, Target, Clock, Zap, Users, ArrowRight, Play } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export const HeroQuickStart: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "AI-Powered Feedback",
      description: "Get instant, personalized feedback on your responses, body language, and communication skills."
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Industry-Specific Questions",
      description: "Practice with questions tailored to your target role and industry for maximum relevance."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Real-Time Analysis",
      description: "Receive immediate insights on your performance with detailed scoring and improvement suggestions."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Confidence Building",
      description: "Build interview confidence through repeated practice in a safe, judgment-free environment."
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "This platform helped me land my dream job! The AI feedback was incredibly accurate and helped me improve my technical explanations.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager at Microsoft",
      content: "The industry-specific questions were spot-on. I felt completely prepared for every interview I had.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Data Scientist at Meta",
      content: "The real-time feedback helped me identify and fix my nervous habits. Game-changer for interview prep!",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-accent/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        {/* Hero Content */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-300 hover:bg-primary/15">
            <Zap className="h-4 w-4" />
            AI-Powered Interview Training
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Master Your Next
            <span className="text-primary block">Interview</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Practice with AI-powered mock interviews, get instant feedback, and build the confidence you need to land your dream job. Join thousands who've already succeeded.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 group"
            >
              Start Free Practice
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-6 text-lg font-semibold border-2 hover:bg-accent transition-all duration-300 group"
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>50,000+ interviews practiced</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>4.9/5 average rating</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full" />
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>85% success rate</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Success Stories
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how our AI-powered platform has helped professionals land their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-card-foreground mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-border/50 pt-4">
                    <p className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Ready to Ace Your Next Interview?
              </h3>
              <p className="text-muted-foreground mb-6 text-lg">
                Join thousands of professionals who've already improved their interview skills with our AI platform.
              </p>
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 group"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • Start practicing in 30 seconds
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};