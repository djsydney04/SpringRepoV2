import { create } from 'zustand';
import { Activity } from '@/lib/supabaseClient';

interface ActivityState {
  activities: Activity[];
  currentActivity: Activity | null;
  isLoading: boolean;
  setActivities: (activities: Activity[] | ((current: Activity[]) => Activity[])) => void;
  setCurrentActivity: (activity: Activity | null) => void;
  setLoading: (isLoading: boolean) => void;
  addActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  removeActivity: (activityId: string) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  currentActivity: null,
  isLoading: true,
  setActivities: (activities) => set((state) => ({
    activities: typeof activities === 'function' ? activities(state.activities) : activities
  })),
  setCurrentActivity: (activity) => set({ currentActivity: activity }),
  setLoading: (isLoading) => set({ isLoading }),
  addActivity: (activity) => 
    set((state) => ({ activities: [...state.activities, activity] })),
  updateActivity: (activity) => 
    set((state) => ({ 
      activities: state.activities.map(a => 
        a.id === activity.id ? activity : a
      ) 
    })),
  removeActivity: (activityId) => 
    set((state) => ({ 
      activities: state.activities.filter(a => a.id !== activityId) 
    })),
})); 