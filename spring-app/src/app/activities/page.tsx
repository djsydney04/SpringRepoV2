import React from 'react';
import { ActivityFeed } from '@/components/Activity/ActivityFeed';

export default function ActivitiesPage() {
  return (
    <div className="mx-auto h-[calc(100vh-8rem)] max-w-md px-4 py-6">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
        Discover Activities
      </h1>
      <ActivityFeed />
    </div>
  );
} 