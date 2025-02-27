import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase, Activity } from '../../lib/supabase';
import { ActivityCard } from './ActivityCard';
import { useActivityStore } from '../../store/activityStore';
import { useUserStore } from '../../store/userStore';

export const ActivityFeed: React.FC = () => {
  const navigation = useNavigation<any>();
  const { activities, setActivities, setCurrentActivity, isLoading, setLoading } = useActivityStore();
  const { user } = useUserStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
    const channel = supabase
      .channel('public:activities')
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
      supabase.removeChannel(channel);
    };
  }, [setActivities, setLoading]);
  
  const handleSwipeLeft = () => {
    // Skip this activity - could log to Supabase if needed
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex < activities.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 300);
  };
  
  const handleSwipeRight = async () => {
    // Add user as participant in the activity
    if (activities[currentIndex] && user) {
      try {
        const { error } = await supabase
          .from('participants')
          .insert({
            activity_id: activities[currentIndex].id,
            user_id: user.id,
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
    }, 300);
  };
  
  const handleSwipeUp = () => {
    if (activities[currentIndex]) {
      // Set current activity and navigate to details page
      setCurrentActivity(activities[currentIndex]);
      navigation.navigate('ActivityDetails', { id: activities[currentIndex].id });
    }
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }
  
  if (activities.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No activities found</Text>
        <Text style={styles.emptyText}>
          There are no activities available right now. Why not create one?
        </Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateActivity')}
        >
          <Text style={styles.createButtonText}>Create Activity</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const currentActivity = activities[currentIndex];
  
  return (
    <View style={styles.container}>
      {currentActivity ? (
        <ActivityCard
          activity={currentActivity}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onSwipeUp={handleSwipeUp}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No more activities</Text>
          <Text style={styles.emptyText}>Check back later for more events!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
}); 