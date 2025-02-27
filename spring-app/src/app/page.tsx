import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

async function isLoggedIn() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { 
      cookies: { 
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          // Read-only in server components
        },
        remove(name: string, options: any) {
          // Read-only in server components
        }
      } 
    }
  );
  
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export default async function HomePage() {
  const loggedIn = await isLoggedIn();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Find your next</span>
              <span className="block text-purple-200">social adventure</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-indigo-100 sm:text-xl md:mt-5">
              Join activities, make friends, and create memorable experiences together.
            </p>
          </div>
          
          <div className="relative mx-auto w-full max-w-sm rounded-xl overflow-hidden shadow-2xl mb-8">
            {/* This would be better with a proper image */}
            <div className="h-96 bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
              <span className="text-6xl font-bold text-white/10">App Preview</span>
            </div>
          </div>
          
          <div className="mt-8 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link
                href={loggedIn ? '/activities' : '/auth/login'}
                className="flex w-full items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 md:py-4 md:px-10 md:text-lg"
              >
                {loggedIn ? 'Explore Activities' : 'Get Started'}
              </Link>
            </div>
            
            {!loggedIn && (
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  href="/auth/login"
                  className="flex w-full items-center justify-center rounded-md bg-indigo-100 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
          
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-indigo-500 p-2 w-12 h-12 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Discover Activities</h3>
              <p className="mt-2 text-indigo-100">Find activities that match your interests with our intuitive swipe interface.</p>
            </div>
            
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-indigo-500 p-2 w-12 h-12 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Host Events</h3>
              <p className="mt-2 text-indigo-100">Create and host your own activities, from hiking trips to book clubs.</p>
            </div>
            
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-indigo-500 p-2 w-12 h-12 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Connect</h3>
              <p className="mt-2 text-indigo-100">Chat with participants before, during, and after events to build connections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
