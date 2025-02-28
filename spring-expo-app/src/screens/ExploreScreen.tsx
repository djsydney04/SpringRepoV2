import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');
// Reduce card height to better center it
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;
// Bottom tab bar height (approximately)
const BOTTOM_BAR_HEIGHT = 70;
// Top bar height (approximately)
const TOP_BAR_HEIGHT = 60;

// Shift the card up by reducing the vertical margin on top
const VERTICAL_MARGIN = (height - CARD_HEIGHT - TOP_BAR_HEIGHT - BOTTOM_BAR_HEIGHT) / 3;

// Sample activities data
const ACTIVITIES = [
  {
    id: '1',
    title: 'Hike Through the Marin Headlands',
    host: 'Adam',
    hostAvatar: 'A',
    location: 'Marin Headlands, CA',
    date: 'This Weekend',
    participants: '1-5 People',
    description: 'Anybody want to come for a hike in the Marin headlands on Friday?...',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '2',
    title: 'Beach Volleyball',
    host: 'Sarah',
    hostAvatar: 'S',
    location: 'Ocean Beach, SF',
    date: 'Saturday',
    participants: '6-10 People',
    description: 'Looking for people to join our beach volleyball game this weekend!',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '3',
    title: 'Coffee & Conversation',
    host: 'Michael',
    hostAvatar: 'M',
    location: 'Downtown Cafe, SF',
    date: 'Sunday Morning',
    participants: '2-8 People',
    description: 'Join us for coffee and great conversation about books, movies, and more!',
    image: 'https://images.unsplash.com/photo-1509042239860-f0ca3bf6d889?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '4',
    title: 'Sunset Yoga',
    host: 'Emma',
    hostAvatar: 'E',
    location: 'Baker Beach',
    date: 'Friday Evening',
    participants: '5-15 People',
    description: 'Relaxing yoga session as the sun sets over the Pacific. All levels welcome!',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

interface Activity {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  location: string;
  date: string;
  participants: string;
  description: string;
  image: string;
}

export default function ExploreScreen() {
  const [index, setIndex] = useState(0);
  const [joinedActivities, setJoinedActivities] = useState<string[]>([]);
  const swiperRef = useRef<Swiper<Activity>>(null);
  const [progressStep, setProgressStep] = useState(0);

  const handleSwipeRight = (cardIndex: number) => {
    const activity = ACTIVITIES[cardIndex];
    setJoinedActivities([...joinedActivities, activity.id]);
    
    // Show a confirmation that user joined the activity
    Alert.alert(
      "Activity Joined!",
      `You've joined "${activity.title}" with ${activity.host}`,
      [{ text: "OK" }]
    );
  };

  // Function to handle photo change on right side click
  const handleNextPhoto = () => {
    // Go to next card
    if (swiperRef.current) {
      swiperRef.current.swipeLeft();
    }
    // Update progress indicator
    setProgressStep(progressStep === 0 ? 1 : 0);
  };

  const renderCard = (activity: Activity) => {
    return (
      <View style={styles.card}>
        <ImageBackground
          source={{ uri: activity.image }}
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
          resizeMode="cover"
        >
          {/* Dark gradient overlay to make text more visible */}
          <View style={styles.gradientOverlay}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, index % 2 === 0 ? styles.progressBarActive : styles.progressBarInactive]} />
              <View style={[styles.progressBar, index % 2 === 1 ? styles.progressBarActive : styles.progressBarInactive]} />
            </View>

            {/* Right side clickable area to change photo */}
            <TouchableOpacity 
              style={styles.rightClickArea} 
              onPress={handleNextPhoto}
              activeOpacity={0.8}
            />

            {/* Content with no white background */}
            <View style={styles.content}>
              {/* Title with text shadow for better visibility */}
              <Text style={styles.title}>{activity.title}</Text>

              {/* Host info and details with text shadow */}
              <View style={styles.infoContainer}>
                <View style={styles.hostRow}>
                  <Text style={styles.hostText}>Hosted By {activity.host}</Text>
                  <View style={styles.hostAvatar}>
                    <Text style={styles.hostAvatarText}>{activity.hostAvatar}</Text>
                  </View>
                </View>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={20} color="#fff" />
                    <Text style={styles.detailText}>{activity.location}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Ionicons name="people-outline" size={20} color="#fff" />
                    <Text style={styles.detailText}>{activity.participants}</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={20} color="#fff" />
                    <Text style={styles.detailText}>{activity.date}</Text>
                  </View>
                </View>
                
                <Text style={styles.description}>{activity.description}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Top Bar */}
      <SafeAreaView>
        <View style={styles.topBar}>
          <TouchableOpacity>
            <Ionicons name="menu-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={ACTIVITIES}
          renderCard={renderCard}
          onSwiped={setIndex}
          onSwipedRight={handleSwipeRight}
          cardIndex={index}
          backgroundColor="transparent"
          stackSize={2}
          infinite
          animateCardOpacity
          cardVerticalMargin={VERTICAL_MARGIN}
          cardHorizontalMargin={(width - CARD_WIDTH) / 2}
          stackSeparation={15}
          overlayLabels={{
            left: {
              title: 'PASS',
              style: {
                label: {
                  backgroundColor: 'transparent',
                  borderColor: '#E74C3C',
                  color: '#E74C3C',
                  borderWidth: 1,
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginLeft: 30,
                  marginTop: 30
                }
              }
            },
            right: {
              title: 'JOIN',
              style: {
                label: {
                  backgroundColor: 'transparent',
                  borderColor: '#5A6B47',
                  color: '#5A6B47',
                  borderWidth: 1,
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginRight: 30,
                  marginTop: 30
                }
              }
            }
          }}
        />
      </View>
      
      {/* Removed our custom bottom tab bar since it's duplicating the one from the Tab.Navigator */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  swiperContainer: {
    flex: 1,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backgroundImage: {
    flex: 1,
  },
  backgroundImageStyle: {
    borderRadius: 20,
  },
  gradientOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // Dark overlay to make text visible
    borderRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 6,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: '#fff',
  },
  progressBarInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  rightClickArea: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: CARD_WIDTH / 2,
    height: CARD_HEIGHT,
    zIndex: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  infoContainer: {
    marginTop: 'auto',
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hostText: {
    fontSize: 18,
    color: 'white',
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#5A6B47',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostAvatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  // Removed bottomTabContainer and bottomTabBar styles since we no longer use the custom bottom tab bar
}); 