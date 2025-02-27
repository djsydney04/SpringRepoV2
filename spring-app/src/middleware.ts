import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );
  
  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedRoutes = [
    '/activities/new',
    '/activities/saved',
    '/profile',
    '/chat',
  ];

  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );

  // Check auth status for protected routes
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect logged in users away from auth pages
  if (session && (
    req.nextUrl.pathname.startsWith('/auth/login') || 
    req.nextUrl.pathname.startsWith('/auth/signup')
  )) {
    return NextResponse.redirect(new URL('/activities', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/activities/:path*',
    '/profile/:path*',
    '/auth/:path*',
    '/chat/:path*',
  ],
}; 