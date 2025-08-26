import Link from 'next/link'
import { Brain, MessageSquare, Video, TrendingUp, PlayCircle, Target, ArrowRight, CheckCircle } from 'lucide-react'
import { HeaderBar } from '@/components/HeaderBar'
import { FooterLegal } from '@/components/FooterLegal'

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Interviews",
      description: "Advanced AI generates contextual questions tailored to your role and experience level, providing realistic interview scenarios.",
      highlights: [
        "Smart question generation",
        "Real-time analysis", 
        "Adaptive difficulty"
      ]
    },
    {
      icon: MessageSquare,
      title: "Real-time Feedback",
      description: "Get instant performance insights with detailed scoring across communication, technical skills, and problem-solving abilities.",
      highlights: [
        "Instant performance insights",
        "Detailed scoring metrics",
        "Communication analysis"
      ]
    },
    {
      icon: Video,
      title: "Multi-format Support",
      description: "Practice across various interview formats including technical coding challenges, behavioral questions, and system design.",
      highlights: [
        "Technical coding interviews",
        "Behavioral assessments",
        "System design challenges"
      ]
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your improvement over time with comprehensive analytics that identify strengths and areas for development.",
      highlights: [
        "Performance analytics",
        "Skill improvement tracking",
        "Historical comparisons"
      ]
    },
    {
      icon: PlayCircle,
      title: "Interview Recording",
      description: "Review your interview sessions with detailed playback and analysis to understand exactly where you can improve.",
      highlights: [
        "Session playback",
        "Detailed analysis",
        "Performance breakdowns"
      ]
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Receive custom learning paths and skill recommendations based on your performance and career goals.",
      highlights: [
        "Custom learning paths",
        "Skill recommendations",
        "Career-focused guidance"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeaderBar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              AI-Powered Interview
              <span className="block">Platform Features</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform your interview preparation with cutting-edge AI technology designed to simulate real interview experiences and accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/interviews"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Start Your First Interview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/pricing"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Ace Your Interview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines artificial intelligence with proven interview techniques to give you the competitive edge you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {feature.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How WhiteKitty Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform guides you through every step of your interview preparation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Focus</h3>
              <p className="text-gray-600">
                Select your target role and interview type. Our AI customizes questions based on your specific needs and experience level.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Practice & Learn</h3>
              <p className="text-gray-600">
                Engage with AI-generated questions and receive real-time feedback on your responses, body language, and communication skills.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed analytics and follow personalized recommendations to accelerate your growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Interview Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs with WhiteKitty's AI-powered interview preparation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/interviews"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Start Free Interview
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/signup"
              className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <FooterLegal />
    </div>
  )
}