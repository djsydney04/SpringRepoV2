import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
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
  
  let { hosting, participating } = await getUserActivities(profile.id);
  
  // If there are no activities, add sample activities for demonstration
  if (hosting.length === 0) {
    const sampleDates = [
      new Date().toISOString(),
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days later
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days later
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week later
      new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days later
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks later
    ];
    
    hosting = [
      {
        id: 'sample-1',
        title: 'Weekend Hiking Trip',
        description: 'A fun hiking trip to explore local trails and enjoy nature together.',
        host_id: profile.id,
        start_time: sampleDates[1],
        location: 'Mountain View Trail',
        image_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-2',
        title: 'Board Game Night',
        description: 'Join us for a fun evening of board games and snacks. All levels welcome!',
        host_id: profile.id,
        start_time: sampleDates[0],
        location: 'Community Center',
        image_url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-3',
        title: 'Photography Workshop',
        description: 'Learn the basics of photography and explore creative techniques in this interactive workshop.',
        host_id: profile.id,
        start_time: sampleDates[2],
        location: 'Arts District',
        image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-4',
        title: 'Cooking Class: Italian Cuisine',
        description: 'Learn to cook authentic Italian dishes and enjoy a delicious meal together.',
        host_id: profile.id,
        start_time: sampleDates[3],
        location: 'Culinary Studio',
        image_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-5',
        title: 'Yoga in the Park',
        description: 'Outdoor yoga session for all levels. Bring your own mat and enjoy the sunshine!',
        host_id: profile.id,
        start_time: sampleDates[4],
        location: 'Central Park',
        image_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-6',
        title: 'Tech Meetup: AI and Machine Learning',
        description: 'Networking event for tech enthusiasts interested in artificial intelligence and machine learning.',
        host_id: profile.id,
        start_time: sampleDates[5],
        location: 'Innovation Hub',
        image_url: 'https://images.unsplash.com/photo-1531482615713-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      }
    ];
  }
  
  if (participating.length === 0) {
    participating = [
      {
        id: 'sample-join-1',
        title: 'Book Club Meeting',
        description: 'Join our monthly book club discussion on the latest bestseller.',
        host_id: 'other-user-1',
        start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Local Library',
        image_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-join-2',
        title: 'Outdoor Movie Night',
        description: 'Watch classic films under the stars. Snacks and drinks provided!',
        host_id: 'other-user-2',
        start_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Community Garden',
        image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-join-3',
        title: 'Beach Cleanup Volunteer Day',
        description: 'Help clean our local beaches and protect marine wildlife.',
        host_id: 'other-user-3',
        start_time: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Seaside Beach',
        image_url: 'https://images.unsplash.com/photo-1528187348056-76aa86c00fbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-join-4',
        title: 'Street Food Festival',
        description: 'Experience diverse cuisines from around the world at this exciting food festival.',
        host_id: 'other-user-4',
        start_time: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Downtown Plaza',
        image_url: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-join-5',
        title: 'Mountain Biking Adventure',
        description: 'Join a group of mountain biking enthusiasts for an exciting trail ride. All skill levels welcome!',
        host_id: 'other-user-5',
        start_time: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Eagle Ridge Trails',
        image_url: 'https://images.unsplash.com/photo-1576858574144-9ae0f4a58624?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      },
      {
        id: 'sample-join-6',
        title: 'Art Gallery Opening Night',
        description: 'Exclusive invitation to the opening night of a new contemporary art exhibition with refreshments and artist talks.',
        host_id: 'other-user-6',
        start_time: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Modern Art Center',
        image_url: 'https://images.unsplash.com/photo-1531889236320-35bcb7d1a5ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        created_at: new Date().toISOString(),
      }
    ];
  }
  
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <Link 
          href="/profile/edit" 
          className="flex items-center rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          <Image
            src="/MenuAssets/person.fill.svg"
            alt="Edit"
            width={16}
            height={16}
            className="mr-2 h-4 w-4"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
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
              <Image
                src="/MenuAssets/rectangle.stack.svg"
                alt="Location"
                width={20}
                height={20}
                className="mr-2 h-5 w-5"
              />
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
          
          <div className="max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
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
                        <Image
                          src="/MenuAssets/slider.horizontal.3.svg"
                          alt="Date"
                          width={16}
                          height={16}
                          className="mr-1 h-4 w-4"
                        />
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
        
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Activities You're Joining</h2>
          
          <div className="max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
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
                        <Image
                          src="/MenuAssets/slider.horizontal.3.svg"
                          alt="Date"
                          width={16}
                          height={16}
                          className="mr-1 h-4 w-4"
                        />
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
    </div>
  );
} 