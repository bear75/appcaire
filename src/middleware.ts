import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in',
    '/sign-up',
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
  ],
  afterAuth(auth, req) {
    // Handle authenticated users trying to access public routes
    if (auth.userId) {
      // If user is signed in and trying to access auth pages, redirect to dashboard
      if (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up' || req.nextUrl.pathname === '/') {
        const dashboard = new URL('/dashboard', req.url);
        return NextResponse.redirect(dashboard);
      }
    } else {
      // If user is not signed in and trying to access protected pages, redirect to sign in
      const isAuthRoute = req.nextUrl.pathname.startsWith('/dashboard');
      if (isAuthRoute) {
        const signIn = new URL('/sign-in', req.url);
        return NextResponse.redirect(signIn);
      }
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
