import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/employee(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role as string | undefined;
console.log(role)
  if (isProtectedRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');
    const isEmployee = req.nextUrl.pathname.startsWith('/employee');

    if (isDashboard && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/user', req.url));
    }

    if (isEmployee && role !== 'employee' && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/user', req.url));
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};