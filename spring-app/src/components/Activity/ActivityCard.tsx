import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Activity } from '@/lib/supabaseClient';
import { formatDate } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
}) => {
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } }
  ) => {
    const swipeThreshold = 100;
    
    if (info.offset.x > swipeThreshold) {
      onSwipeRight();
    } else if (info.offset.x < -swipeThreshold) {
      onSwipeLeft();
    } else if (info.offset.y < -swipeThreshold) {
      onSwipeUp();
    }
  };

  return (
    <motion.div
      className="relative h-[70vh] w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-2/3 relative">
        {activity.image_url ? (
          <Image
            src={activity.image_url}
            alt={activity.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{activity.title}</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{activity.title}</h2>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="h-5 w-5 mr-2" />
          <span>{formatDate(activity.start_time)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <span>{activity.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <UserIcon className="h-5 w-5 mr-2" />
          <span>Hosted by {activity.host_id}</span>
        </div>
        
        <p className="text-gray-700 line-clamp-3">{activity.description}</p>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 px-4">
        <div className="text-xs text-gray-500">Swipe left to skip</div>
        <div className="text-xs text-gray-500">Swipe right to join</div>
        <div className="text-xs text-gray-500">Swipe up for details</div>
      </div>
    </motion.div>
  );
}; 