import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/UI/Button';
import { useUserStore } from '@/store/useUserStore';
import { useActivityStore } from '@/store/useActivityStore';

const activitySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(3, 'Location is required'),
  start_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  image_url: z.string().url('Must be a valid URL').optional(),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

export const ActivityForm: React.FC = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { addActivity } = useActivityStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      start_time: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDThh:mm
      image_url: '',
    },
  });
  
  const onSubmit = async (data: ActivityFormValues) => {
    if (!user) {
      setError('You must be logged in to create an activity');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { data: activityData, error } = await supabase
        .from('activities')
        .insert({
          ...data,
          host_id: user.id,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      if (activityData) {
        // Add to local store
        addActivity(activityData);
        
        // Navigate to the activity detail page
        router.push(`/activities/${activityData.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the activity');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Activity</h1>
        <p className="mt-2 text-gray-600">
          Share details about your activity so others can join.
        </p>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            type="text"
            {...register('location')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.location && (
            <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
            Date & Time
          </label>
          <input
            id="start_time"
            type="datetime-local"
            {...register('start_time')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.start_time && (
            <p className="mt-1 text-xs text-red-600">{errors.start_time.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
            Image URL (optional)
          </label>
          <input
            id="image_url"
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register('image_url')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.image_url && (
            <p className="mt-1 text-xs text-red-600">{errors.image_url.message}</p>
          )}
        </div>
      </div>
      
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2"
        >
          {isSubmitting ? 'Creating...' : 'Create Activity'}
        </Button>
      </div>
    </form>
  );
}; 