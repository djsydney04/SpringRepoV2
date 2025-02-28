import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  // State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Prepare images array from either image_urls or single image_url
  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    if (activity.image_urls && activity.image_urls.length > 0) {
      setImages(activity.image_urls);
    } else if (activity.image_url) {
      setImages([activity.image_url]);
    } else {
      setImages([]);
    }
  }, [activity]);

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
  
  // Function to handle tapping on the left side of the image
  const handleLeftTap = () => {
    if (images.length <= 1) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  // Function to handle tapping on the right side of the image
  const handleRightTap = () => {
    if (images.length <= 1) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
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
        {images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex]}
              alt={activity.title}
              fill
              className="object-cover"
            />
            
            {/* Left tap area */}
            <div 
              className="absolute top-0 left-0 z-10 h-full w-1/4 cursor-pointer"
              onClick={handleLeftTap}
            />
            
            {/* Right tap area */}
            <div 
              className="absolute top-0 right-0 z-10 h-full w-1/4 cursor-pointer"
              onClick={handleRightTap}
            />
            
            {/* Image indicator pills - only show if there are multiple images */}
            {images.length > 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
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
          <Image
            src="/MenuAssets/slider.horizontal.3.svg"
            alt="Calendar"
            width={20}
            height={20}
            className="mr-2 h-5 w-5"
          />
          <span>{formatDate(activity.start_time)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Image
            src="/MenuAssets/rectangle.stack.svg"
            alt="Location"
            width={20}
            height={20}
            className="mr-2 h-5 w-5"
          />
          <span>{activity.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Image
            src="/MenuAssets/person.fill.svg"
            alt="Host"
            width={20}
            height={20}
            className="mr-2 h-5 w-5"
          />
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