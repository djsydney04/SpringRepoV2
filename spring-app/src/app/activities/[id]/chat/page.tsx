import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ChatRoom } from '@/components/Chat/ChatRoom';
import { Activity } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

async function getActivity(id: string): Promise<Activity | null> {
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
  
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
  
  return data as Activity;
}

export default async function ActivityChatPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const activity = await getActivity(params.id);
  
  if (!activity) {
    notFound();
  }
  
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-sm">
        <Link 
          href={`/activities/${params.id}`} 
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Back to Activity
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">Chat: {activity.title}</h1>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ChatRoom activityId={params.id} />
      </div>
    </div>
  );
} 