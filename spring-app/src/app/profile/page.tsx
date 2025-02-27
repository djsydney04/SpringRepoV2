import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { 
  PencilIcon, 
  CalendarIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';
import { Profile } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

async function getUserProfile(): Promise<Profile | null> {
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
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return null;
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();
    
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return data as Profile;
}

async function getUserActivities(userId: string) {
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
  
  // Get activities the user has created
  const { data: hostingData, error: hostingError } = await supabase
    .from('activities')
    .select('*')
    .eq('host_id', userId)
    .order('start_time', { ascending: true });
    
  if (hostingError) {
    console.error('Error fetching hosted activities:', hostingError);
    return { hosting: [], participating: [] };
  }
  
  // Get activities the user is participating in
  const { data: participatingData, error: participatingError } = await supabase
    .from('participants')
    .select('activity_id')
    .eq('user_id', userId);
    
  if (participatingError) {
    console.error('Error fetching participated activities:', participatingError);
    return { hosting: hostingData || [], participating: [] };
  }
  
  const activityIds = participatingData.map((p) => p.activity_id);
  
  if (activityIds.length === 0) {
    return { hosting: hostingData || [], participating: [] };
  }
  
  const { data: activitiesData, error: activitiesError } = await supabase
    .from('activities')
    .select('*')
    .in('id', activityIds)
    .order('start_time', { ascending: true });
    
  if (activitiesError) {
    console.error('Error fetching activities:', activitiesError);
    return { hosting: hostingData || [], participating: [] };
  }
  
  return {
    hosting: hostingData || [],
    participating: activitiesData || [],
  };
}

export default async function ProfilePage() {
  const profile = await getUserProfile();
  
  if (!profile) {
    redirect('/auth/login');
  }
  
  const { hosting, participating } = await getUserActivities(profile.id);
  
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <Link 
          href="/profile/edit" 
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit Profile
        </Link>
      </div>
      
      <div className="mb-8 flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 sm:h-32 sm:w-32">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.username}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-indigo-600">
              {profile.username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-semibold text-gray-900">{profile.username}</h2>
          
          {profile.location && (
            <div className="mt-2 flex items-center justify-center text-gray-600 sm:justify-start">
              <MapPinIcon className="mr-2 h-5 w-5" />
              <span>{profile.location}</span>
            </div>
          )}
          
          {profile.interests && profile.interests.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-900">Interests</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Activities You're Hosting</h2>
          
          {hosting.length === 0 ? (
            <p className="text-gray-600">You aren't hosting any activities yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {hosting.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/activities/${activity.id}`}
                  className="block overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
                >
                  <div className="h-32 bg-indigo-600">
                    {activity.image_url && (
                      <img
                        src={activity.image_url}
                        alt={activity.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      <span>
                        {new Date(activity.start_time).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Activities You're Joining</h2>
          
          {participating.length === 0 ? (
            <p className="text-gray-600">You haven't joined any activities yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {participating.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/activities/${activity.id}`}
                  className="block overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
                >
                  <div className="h-32 bg-indigo-600">
                    {activity.image_url && (
                      <img
                        src={activity.image_url}
                        alt={activity.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                    
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      <span>
                        {new Date(activity.start_time).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 