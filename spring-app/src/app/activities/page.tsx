import React from 'react';
import { ActivityFeed } from '@/components/Activity/ActivityFeed';

export default function ActivitiesPage() {
  return (
    <div className="h-[calc(100vh-8rem)] p-4">
      <h1 className="mb-4 text-center text-xl font-bold">Discover Activities</h1>
      <div className="flex flex-col items-center">
        <ActivityFeed />
      </div>
    </div>
  );
} 