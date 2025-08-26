# Vercel Deployment Guide

A comprehensive guide for deploying your Next.js application to Vercel with best practices, troubleshooting, and optimization strategies.

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:

### Required Software
- **Node.js** (version 18.17 or later)
- **Git** (for repository management)
- **Vercel CLI** (optional but recommended)

# Install Vercel CLI globally
npm install -g vercel
### Project Requirements
- ✅ Next.js project with `package.json`
- ✅ Git repository (GitHub, GitLab, or Bitbucket)
- ✅ Valid `next.config.js` (if custom configuration needed)
- ✅ Environment variables documented
- ✅ Database connections configured (if applicable)

### Vercel Account
- Create a free account at [vercel.com](https://vercel.com)
- Connect your Git provider (GitHub recommended)

## 🚀 Step-by-Step Deployment

### Method 1: Git Integration (Recommended)

1. **Push your code to a Git repository**
   git add .
   git commit -m "Initial commit"
   git push origin main
   2. **Import project to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Select your Git provider
   - Choose your repository
   - Click "Import"

3. **Configure project settings**
   {
     "name": "your-app-name",
     "framework": "nextjs",
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "devCommand": "npm run dev"
   }
   4. **Deploy**
   - Click "Deploy"
   - Wait for build completion
   - Your app is live! 🎉

### Method 2: Vercel CLI

1. **Login to Vercel**
   vercel login
   2. **Deploy from project root**
   # First deployment
   vercel

   # Production deployment
   vercel --prod
   3. **Follow interactive prompts**
   - Set up project name
   - Configure build settings
   - Set environment variables

## 🔧 Environment Variables Setup

### Adding Environment Variables

#### Via Vercel Dashboard
1. Go to Project Settings → Environment Variables
2. Add variables for each environment:
   - **Development** (`vercel dev`)
   - **Preview** (branch deployments)
   - **Production** (main branch)

#### Via Vercel CLI
# Add production environment variable
vercel env add VARIABLE_NAME production

# Add to all environments
vercel env add VARIABLE_NAME
### Common Environment Variables

# Database
DATABASE_URL=postgresql://username:password@host:port/database
REDIS_URL=redis://localhost:6379

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# API Keys
STRIPE_SECRET_KEY=sk_live_...
OPENAI_API_KEY=sk-...
RESEND_API_KEY=re_...

# App Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
### Environment Variable Best Practices

1. **Use `NEXT_PUBLIC_` prefix** for client-side variables
2. **Never commit secrets** to your repository
3. **Use different values** for development/production
4. **Document all variables** in your README

## ⚙️ Build Configuration

### Next.js Configuration (`next.config.js`)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client']
  },
  
  // Image optimization
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif']
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
### Vercel Configuration (`vercel.json`)

{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.js": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/proxy/(.*)",
      "destination": "https://external-api.com/$1"
    }
  ]
}
## 🔍 Troubleshooting Common Issues

### Build Failures

#### TypeScript Errors
# Error: Type checking failed
# Solution: Fix TypeScript errors or skip type checking
{
  "typescript": {
    "ignoreBuildErrors": true
  }
}
#### Missing Dependencies
# Error: Module not found
# Solution: Ensure all dependencies are in package.json
npm install missing-package
#### Memory Issues
# Error: JavaScript heap out of memory
# Solution: Add to package.json scripts
"build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
### Runtime Errors

#### Environment Variables Not Found
// Check if variables are properly set
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL ? '✅ Set' : '❌ Missing'
});
#### API Route Issues
// Ensure proper HTTP methods
export async function GET(request) {
  return Response.json({ message: 'Hello World' });
}

// Not: export default function handler(req, res) { ... }
### Database Connection Issues

#### Prisma Configuration
// lib/prisma.js
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
#### Connection Pooling
# Use connection pooling for better performance
DATABASE_URL="postgresql://user:pass@host:port/db?pgbouncer=true&connection_limit=1"
## ⚡ Performance Optimization

### Image Optimization

import Image from 'next/image';

// Optimized images
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
### Code Splitting

// Dynamic imports for code splitting
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('../components/Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false
});
### Bundle Analysis

# Add to package.json
"analyze": "ANALYZE=true npm run build"

# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer
### Caching Strategy

// Static page with revalidation
export async function generateStaticParams() {
  return [
    { slug: 'post-1' },