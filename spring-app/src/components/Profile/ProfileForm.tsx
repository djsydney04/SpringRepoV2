import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';
import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/UI/Button';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  location: z.string().optional(),
  avatar_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  interests: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileForm: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
      location: user?.location || '',
      avatar_url: user?.avatar_url || '',
      interests: user?.interests ? user.interests.join(', ') : '',
    },
  });
  
  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      setError('You must be logged in to update your profile');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Process interests from comma-separated string to array
      const interestsArray = data.interests
        ? data.interests.split(',').map((interest) => interest.trim()).filter(Boolean)
        : [];
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          location: data.location || null,
          avatar_url: data.avatar_url || null,
          interests: interestsArray,
        })
        .eq('id', user.id);
        
      if (error) {
        throw error;
      }
      
      // Update the user in the store
      setUser({
        ...user,
        username: data.username,
        location: data.location || undefined,
        avatar_url: data.avatar_url || undefined,
        interests: interestsArray,
      });
      
      // Navigate back to profile
      router.push('/profile');
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating your profile');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/auth/login');
    } catch (error: any) {
      setError(error.message || 'Error signing out');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <p className="mt-2 text-gray-600">
          Update your personal information and preferences.
        </p>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="City, State"
            {...register('location')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.location && (
            <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700">
            Profile Picture URL
          </label>
          <input
            id="avatar_url"
            type="url"
            placeholder="https://example.com/avatar.jpg"
            {...register('avatar_url')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.avatar_url && (
            <p className="mt-1 text-xs text-red-600">{errors.avatar_url.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
            Interests (comma-separated)
          </label>
          <input
            id="interests"
            type="text"
            placeholder="hiking, photography, cooking"
            {...register('interests')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.interests && (
            <p className="mt-1 text-xs text-red-600">{errors.interests.message}</p>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2"
        >
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={handleSignOut}
          className="w-full py-2"
        >
          Sign Out
        </Button>
      </div>
    </form>
  );
}; 