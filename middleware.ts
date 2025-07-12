import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Create route matchers for public and ignored routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/api/clerk-webhook',
  '/api/drive-activity/notification',
  '/api/payment/success'
])

const isIgnoredRoute = createRouteMatcher([
  '/api/auth/callback/discord',
  '/api/auth/callback/notion',
  '/api/auth/callback/slack',
  '/api/flow',
  '/api/cron/wait'
])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req) || isIgnoredRoute(req)) {
    return NextResponse.next()
  }

  // For all other routes, check authentication
  const { userId, redirectToSignIn } = await auth()
  if (!userId) {
    return redirectToSignIn()
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

// https://www.googleapis.com/auth/userinfo.email
// https://www.googleapis.com/auth/userinfo.profile
// https://www.googleapis.com/auth/drive.activity.readonly
// https://www.googleapis.com/auth/drive.metadata
// https://www.googleapis.com/auth/drive.readonly