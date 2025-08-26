import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Back to home link */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white/80 hover:bg-white backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Main content container */}
      <div className="relative w-full max-w-md mx-auto">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4 border border-gray-100">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WK
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your WhiteKitty account</p>
        </div>

        {/* Sign in component container */}
        <div className="relative">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20" />
          
          {/* Sign in component */}
          <div className="relative p-8">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none border-none p-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium transition-colors duration-200",
                  socialButtonsBlockButtonText: "font-medium",
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500 text-sm",
                  formFieldInput: "bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-colors duration-200",
                  formFieldLabel: "text-gray-700 font-medium",
                  formButtonPrimary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl",
                  footerActionLink: "text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200",
                  identityPreviewText: "text-gray-700",
                  identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
                  formResendCodeLink: "text-blue-600 hover:text-blue-700",
                  otpCodeFieldInput: "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20",
                  alertClerkError: "text-red-600 bg-red-50 border-red-200",
                  formFieldWarning: "text-amber-600",
                  formFieldSuccessText: "text-green-600"
                },
                layout: {
                  socialButtonsPlacement: "top",
                  showOptionalFields: true
                }
              }}
              redirectUrl="/"
              signUpUrl="/signup"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Loading overlay for better UX */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300" id="loading-overlay" />
    </div>
  );
}