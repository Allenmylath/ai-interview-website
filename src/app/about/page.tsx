import { HeaderBar } from '@/components/HeaderBar'
import { FooterLegal } from '@/components/FooterLegal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Shield, Zap, Award, User, Brain, Lock, Rocket, Users, Target, TrendingUp, CheckCircle, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Revolutionizing Interview Preparation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              WhiteKitty empowers job seekers worldwide with AI-driven interview coaching, 
              personalized feedback, and comprehensive preparation tools that transform 
              interview anxiety into confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">500K+</div>
                <div className="text-sm text-muted-foreground">Interviews Conducted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">180+</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  WhiteKitty was born from a simple observation: talented individuals 
                  were being overlooked not because they lacked skills, but because 
                  they struggled with interview performance. Our founders, having 
                  experienced this firsthand in their careers, recognized the gap 
                  between technical competence and interview success.
                </p>
                <p>
                  In 2023, we set out to democratize interview preparation by combining 
                  cutting-edge AI technology with proven coaching methodologies. What 
                  started as a passion project has grown into a platform trusted by 
                  hundreds of thousands of professionals worldwide.
                </p>
                <p>
                  Today, WhiteKitty continues to evolve, incorporating the latest 
                  advances in machine learning and natural language processing to 
                  provide increasingly personalized and effective interview preparation.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <Brain className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">AI-Powered</div>
                  <div className="text-sm text-muted-foreground">Smart Coaching</div>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">Global Reach</div>
                  <div className="text-sm text-muted-foreground">Worldwide Access</div>
                </div>
                <div className="text-center">
                  <Target className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">Personalized</div>
                  <div className="text-sm text-muted-foreground">Tailored Prep</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-2" />
                  <div className="font-semibold">Proven Results</div>
                  <div className="text-sm text-muted-foreground">95% Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            To democratize interview preparation by making world-class coaching 
            accessible to everyone, regardless of their background, location, or 
            financial circumstances. We believe that with the right preparation 
            and confidence, anyone can succeed in their dream job interview.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">We envision a world where...</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-medium">Equal Opportunity</div>
                <div className="text-sm text-muted-foreground">Interview skills don't determine career potential</div>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-medium">Confidence Building</div>
                <div className="text-sm text-muted-foreground">Everyone can showcase their true abilities</div>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-medium">Career Success</div>
                <div className="text-sm text-muted-foreground">Talent meets opportunity effectively</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We continuously push the boundaries of AI technology to create 
                  more effective and personalized learning experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Quality interview preparation should be available to everyone, 
                  regardless of their circumstances or background.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We strive for the highest standards in everything we do, 
                  from product development to customer support.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We operate with transparency, honesty, and respect for our 
                  users' privacy and trust in our platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform leverages cutting-edge AI and machine learning to deliver 
              personalized, effective interview preparation experiences.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>AI Interview Coach</CardTitle>
                <CardDescription>
                  Advanced natural language processing analyzes your responses and 
                  provides detailed, actionable feedback on content, delivery, and structure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Lock className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Enterprise-grade security with end-to-end encryption ensures your 
                  practice sessions and personal data remain completely private.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Rocket className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Adaptive Learning</CardTitle>
                <CardDescription>
                  Machine learning algorithms adapt to your progress and learning style, 
                  creating increasingly personalized preparation paths.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border">
            <h3 className="text-xl font-semibold mb-6 text-center">Technology Stack Highlights</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Natural Language Processing</Badge>
                <p className="text-sm text-muted-foreground">Advanced NLP for speech analysis</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Machine Learning</Badge>
                <p className="text-sm text-muted-foreground">Personalized learning algorithms</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Real-time Analytics</Badge>
                <p className="text-sm text-muted-foreground">Instant performance insights</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">Cloud Infrastructure</Badge>
                <p className="text-sm text-muted-foreground">Scalable, reliable platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of engineers, designers, and career experts are passionate 
              about helping you succeed in your career journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle>Sarah Chen</CardTitle>
                <CardDescription>CEO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Former Meta engineering manager with 10+ years in tech. Passionate about 
                  democratizing career opportunities through technology.
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">Stanford CS</Badge>
                  <Badge variant="outline">Ex-Meta</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle>David Rodriguez</CardTitle>
                <CardDescription>CTO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  AI/ML expert with PhD in Computer Science. Previously led AI teams at 
                  Google and Microsoft, specializing in natural language processing.
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">MIT PhD</Badge>
                  <Badge variant="outline">Ex-Google</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle>Emily Johnson</CardTitle>
                <CardDescription>Head of Product</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Product strategy leader with experience at Spotify and Airbnb. 
                  Expert in user experience design and growth optimization.
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">Berkeley MBA</Badge>
                  <Badge variant="outline">Ex-Spotify</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle>Michael Park</CardTitle>
                <CardDescription>Lead AI Engineer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Machine learning researcher specializing in conversational AI. 
                  Previously at OpenAI and Tesla, building intelligent systems.
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">Carnegie Mellon</Badge>
                  <Badge variant="outline">Ex-OpenAI</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle>Lisa Thompson</CardTitle>
                <CardDescription>Career Coach Lead</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Certified career coach with 15+ years helping professionals land 
                  dream jobs. Former HR director at Fortune 500 companies.
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">ICF Certified</Badge>
                  <Badge variant="outline">15+ Years</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <CardTitle>Alex Kim</CardTitle>
                <CardDescription>Head of Engineering</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Full-stack engineer and architect with expertise in scalable systems. 
                  Previously built infrastructure at Uber and Netflix.
                </p>
                <div className="mt-4">
                  <Badge variant="outline" className="mr-2">Georgia Tech</Badge>
                  <Badge variant="outline">Ex-Uber</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Metrics */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that reflect our commitment to your success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="text-4xl font-bold text-purple-600 mb-2">500K+</div>
                <CardTitle className="text-lg">Mock Interviews</CardTitle>
                <CardDescription>Conducted across all industries and experience levels</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <CardTitle className="text-lg">Success Rate</CardTitle>
                <CardDescription>Users report improved interview performance</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="text-4xl font-bold text-green-600 mb-2">180+</div>
                <CardTitle className="text-lg">Countries</CardTitle>
                <CardDescription>Global reach serving users worldwide</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow bg-white">
              <CardHeader>
                <div className="text-4xl font-bold text-orange-600 mb-2">4.9</div>
                <CardTitle className="text-lg">User Rating</CardTitle>
                <CardDescription>Average satisfaction score from our community</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">75%</div>
              <div className="text-muted-foreground">Job Offer Rate</div>
              <div className="text-sm text-muted-foreground mt-1">Within 30 days of using WhiteKitty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">40%</div>
              <div className="text-muted-foreground">Salary Increase</div>
              <div className="text-sm text-muted-foreground mt-1">Average improvement after preparation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-muted-foreground">AI Availability</div>
              <div className="text-sm text-muted-foreground mt-1">Practice anytime, anywhere</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Companies</h2>
            <p className="text-xl text-muted-foreground">
              Our users have successfully interviewed at top companies worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    "WhiteKitty helped me land my dream job at Google. The AI feedback 
                    was incredibly detailed and helped me improve my communication skills 
                    dramatically."
                  </p>
                  <div className="font-semibold">Jessica M.</div>
                  <div className="text-sm text-muted-foreground">Software Engineer at Google</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    "The personalized coaching and mock interviews gave me the confidence 
                    I needed. I received multiple offers and negotiated a 30% salary increase."
                  </p>
                  <div className="font-semibold">David L.</div>
                  <div className="text-sm text-muted-foreground">Product Manager at Microsoft</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">Companies where our users have been hired:</p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <div className="font-semibold">Google</div>
              <div className="font-semibold">Microsoft</div>
              <div className="font-semibold">Amazon</div>
              <div className="font-semibold">Meta</div>
              <div className="font-semibold">Apple</div>
              <div className="font-semibold">Netflix</div>
              <div className="font-semibold">Tesla</div>
              <div className="font-semibold">Spotify</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Interview Skills?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join hundreds of thousands of professionals who have successfully prepared 
            for their dream job interviews with WhiteKitty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              View Careers
            </Button>
          </div>
          <div className="mt-8 text-center">
            <p className="text-purple-100 text-sm">
              Questions? Contact us at{' '}
              <Link href="mailto:hello@whitekitty.com" className="text-white underline hover:no-underline">
                hello@whitekitty.com
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FooterLegal />
    </div>
  )
}