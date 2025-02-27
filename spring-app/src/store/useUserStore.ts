import { create } from 'zustand';
import { Profile } from '@/lib/supabaseClient';

interface UserState {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: Profile | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
})); 