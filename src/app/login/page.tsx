"use client";

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 backdrop-blur-3xl"></div>
        
        {/* Main content */}
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">WhiteKitty</h1>
            </Link>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Sign in form */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <SignIn 
              redirectUrl="/dashboard"
              signUpUrl="/sign-up"
              appearance={{
                elements: {
                  formButtonPrimary: 
                    "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
                  card: "shadow-none bg-transparent",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: 
                    "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm normal-case",
                  formFieldInput: 
                    "bg-white/80 border border-gray-300 text-sm",
                  footerActionLink: 
                    "text-blue-600 hover:text-blue-700 text-sm"
                }
              }}
            />
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up here
              </Link>
            </p>
          </div>

          <div className="text-center mt-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}