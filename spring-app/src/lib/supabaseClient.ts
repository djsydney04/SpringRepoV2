import { createClient } from '@supabase/supabase-js';

// Environment variables are set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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