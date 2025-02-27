import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase credentials
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Type definitions for our database schema
export type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
  location?: string;
  interests?: string[];
  created_at: string;
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  host_id: string;
  start_time: string;
  location: string;
  image_url?: string;
  created_at: string;
};

export type Participant = {
  id: string;
  activity_id: string;
  user_id: string;
  joined_at: string;
};

export type Message = {
  id: string;
  activity_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}; 