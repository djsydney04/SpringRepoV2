import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle,
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';
import { 
  GestureDetector, 
  Gesture, 
  GestureHandlerRootView 
} from 'react-native-gesture-handler';
import { Activity } from '../../lib/supabase';
import { formatDate } from '../../lib/utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

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
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = Math.min(0, event.translationY); // Only allow upward swipe
    })
    .onEnd((event) => {
      // Handle swipe right
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH);
        onSwipeRight();
      }
      // Handle swipe left 
      else if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH);
        onSwipeLeft();
      }
      // Handle swipe up
      else if (translateY.value < -SWIPE_THRESHOLD) {
        translateY.value = withSpring(-SCREEN_WIDTH);
        onSwipeUp();
      }
      // Return to center
      else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${translateX.value / 20}deg` },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, cardStyle]}>
          <View style={styles.imageContainer}>
            {activity.image_url ? (
              <Image
                source={{ uri: activity.image_url }}
                style={styles.image}
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>{activity.title}</Text>
              </View>
            )}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{activity.title}</Text>
            </View>
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <Text style={styles.detailIcon}>🗓️</Text>
              <Text style={styles.detailText}>{formatDate(activity.start_time)}</Text>
            </View>
            
            <View style={styles.detail}>
              <Text style={styles.detailIcon}>📍</Text>
              <Text style={styles.detailText}>{activity.location}</Text>
            </View>
            
            <View style={styles.detail}>
              <Text style={styles.detailIcon}>👤</Text>
              <Text style={styles.detailText}>Hosted by {activity.host_id}</Text>
            </View>
            
            <Text style={styles.description} numberOfLines={3}>
              {activity.description}
            </Text>
          </View>
          
          <View style={styles.swipeHelp}>
            <Text style={styles.swipeHelpText}>Swipe left to skip</Text>
            <Text style={styles.swipeHelpText}>Swipe right to join</Text>
            <Text style={styles.swipeHelpText}>Swipe up for details</Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_WIDTH * 1.5,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    height: '50%',
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 16,
    flex: 1,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
  },
  description: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  swipeHelp: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  swipeHelpText: {
    fontSize: 12,
    color: '#9ca3af',
  },
}); 