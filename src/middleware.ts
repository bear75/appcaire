import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
  ],

  async afterAuth(auth, req) {
    // Handle security headers
    const response = auth.isPublicRoute ? NextResponse.next() : undefined;

    if (response) {
      // Add security headers
      response.headers.set(
        'Content-Security-Policy',
        'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\';',
      );
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set(
        'Referrer-Policy',
        'strict-origin-when-cross-origin',
      );
    }

    // If the user is logged in and trying to access a public route
    if (auth.userId && auth.isPublicRoute) {
      const dashboard = new URL('/dashboard', req.url);
      return NextResponse.redirect(dashboard);
    }

    // If the user is not logged in and trying to access a private route
    if (!auth.userId && !auth.isPublicRoute) {
      const signIn = new URL('/sign-in', req.url);
      return NextResponse.redirect(signIn);
    }

    // Allow the request to proceed with security headers
    const nextResponse = NextResponse.next();
    nextResponse.headers.set(
      'Content-Security-Policy',
      'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\';',
    );
    nextResponse.headers.set('X-Frame-Options', 'DENY');
    nextResponse.headers.set('X-Content-Type-Options', 'nosniff');
    nextResponse.headers.set(
      'Referrer-Policy',
      'strict-origin-when-cross-origin',
    );

    return nextResponse;
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
