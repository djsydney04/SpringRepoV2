import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { 
  UserIcon, 
  CalendarIcon, 
  MapPinIcon, 
  ChatBubbleLeftIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { formatDate } from '@/lib/utils';
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
          // This is a read-only function in server components
        },
        remove(name: string, options: any) {
          // This is a read-only function in server components
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

async function getParticipantCount(activityId: string): Promise<number> {
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
          // This is a read-only function in server components
        },
        remove(name: string, options: any) {
          // This is a read-only function in server components
        }
      } 
    }
  );
  
  const { count, error } = await supabase
    .from('participants')
    .select('*', { count: 'exact', head: true })
    .eq('activity_id', activityId);
    
  if (error) {
    console.error('Error fetching participant count:', error);
    return 0;
  }
  
  return count || 0;
}

export default async function ActivityDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const activity = await getActivity(params.id);
  
  if (!activity) {
    notFound();
  }
  
  const participantCount = await getParticipantCount(activity.id);
  
  return (
    <div className="mx-auto max-w-2xl pb-16">
      {/* Back button */}
      <div className="sticky top-16 z-10 bg-white p-4 shadow-sm">
        <Link 
          href="/activities" 
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="mr-2 h-5 w-5" />
          Back to Activities
        </Link>
      </div>
      
      {/* Activity image */}
      <div className="relative h-64 w-full sm:h-80">
        {activity.image_url ? (
          <Image
            src={activity.image_url}
            alt={activity.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">{activity.title}</h1>
          </div>
        )}
      </div>
      
      {/* Activity details */}
      <div className="p-6">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">{activity.title}</h1>
        
        <div className="mb-6 space-y-3">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="mr-2 h-5 w-5" />
            <span>{formatDate(activity.start_time)}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="mr-2 h-5 w-5" />
            <span>{activity.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <UserIcon className="mr-2 h-5 w-5" />
            <span>Hosted by {activity.host_id}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{participantCount} {participantCount === 1 ? 'participant' : 'participants'}</span>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">About this activity</h2>
          <p className="whitespace-pre-line text-gray-700">{activity.description}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="mb-2 flex items-center text-xl font-semibold text-gray-900">
            <ChatBubbleLeftIcon className="mr-2 h-5 w-5" />
            Group Chat
          </h2>
          <Link href={`/activities/${activity.id}/chat`} className="text-indigo-600 hover:text-indigo-800">
            Join the conversation →
          </Link>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 flex bg-white p-4 shadow-lg sm:sticky sm:left-auto sm:right-auto sm:mt-8 sm:shadow-none">
          <button className="flex-1 rounded-md bg-indigo-600 py-3 text-white hover:bg-indigo-700">
            Join Activity
          </button>
        </div>
      </div>
    </div>
  );
} 