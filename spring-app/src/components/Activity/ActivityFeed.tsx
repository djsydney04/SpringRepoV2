import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, supabase } from '@/lib/supabaseClient';
import { ActivityCard } from './ActivityCard';
import { useActivityStore } from '@/store/useActivityStore';

export const ActivityFeed: React.FC = () => {
  const router = useRouter();
  const { activities, setActivities, setCurrentActivity, isLoading, setLoading } = useActivityStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        if (data) {
          setActivities(data as Activity[]);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivities();
    
    // Subscribe to real-time updates for new activities
    const subscription = supabase
      .channel('activities-channel')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'activities' 
        },
        (payload) => {
          setActivities((currentActivities: Activity[]) => [
            payload.new as Activity,
            ...currentActivities
          ]);
        }
      )
      .subscribe();
      
    return () => {
      subscription.unsubscribe();
    };
  }, [setActivities, setLoading]);
  
  const handleSwipeLeft = () => {
    setDirection('left');
    // Skip this activity - could log to Supabase if needed
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex < activities.length - 1 ? prevIndex + 1 : prevIndex
      );
      setDirection(null);
    }, 300);
  };
  
  const handleSwipeRight = async () => {
    setDirection('right');
    
    // Add user as participant in the activity
    if (activities[currentIndex]) {
      try {
        const { error } = await supabase
          .from('participants')
          .insert({
            activity_id: activities[currentIndex].id,
            // This should be the current user's ID from auth
            user_id: 'placeholder-user-id', 
            joined_at: new Date().toISOString()
          });
          
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Error joining activity:', error);
      }
    }
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex < activities.length - 1 ? prevIndex + 1 : prevIndex
      );
      setDirection(null);
    }, 300);
  };
  
  const handleSwipeUp = () => {
    if (activities[currentIndex]) {
      // Set current activity and navigate to details page
      setCurrentActivity(activities[currentIndex]);
      router.push(`/activities/${activities[currentIndex].id}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (activities.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4 text-center">
        <h3 className="mb-2 text-xl font-semibold">No activities found</h3>
        <p className="text-gray-600">
          There are no activities available right now. Why not create one?
        </p>
        <button
          onClick={() => router.push('/activities/new')}
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Create Activity
        </button>
      </div>
    );
  }
  
  const currentActivity = activities[currentIndex];
  
  return (
    <div className="flex h-full flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {currentActivity && (
          <motion.div
            key={currentActivity.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
              y: direction === 'up' ? -300 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <ActivityCard
              activity={currentActivity}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSwipeUp={handleSwipeUp}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {currentIndex >= activities.length && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold">No more activities</h3>
          <p className="text-gray-600">Check back later for more events!</p>
        </div>
      )}
    </div>
  );
}; 