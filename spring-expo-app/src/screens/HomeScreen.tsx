import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Type definition for activity
interface Activity {
  id: string;
  title: string;
  host: string;
  time: string;
  image: string;
}

// Sample activity data
const THIS_WEEKEND_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Biking @ Golden Gate Bridge',
    host: 'Brad',
    time: 'Friday @ 9AM',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const NEXT_WEEK_ACTIVITIES: Activity[] = [
  {
    id: '2',
    title: 'Tennis @ Lisa & Douglas Goldman Tennis Center',
    host: 'Thomas',
    time: 'Monday @ 5PM',
    image: 'https://images.unsplash.com/photo-1622279457486-28f895fe1c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Climbing @ Mission Cliffs',
    host: 'Sarah',
    time: 'Wednesday @ 7PM',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomeScreen() {
  const renderActivityCard = (activity: Activity) => (
    <TouchableOpacity key={activity.id} style={styles.activityCard}>
      <ImageBackground
        source={{ uri: activity.image }}
        style={styles.activityImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.activityOverlay}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <View style={styles.activityDetails}>
            <View style={styles.hostContainer}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{activity.host.charAt(0)}</Text>
              </View>
              <Text style={styles.hostText}>Hosted by {activity.host}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Ionicons name="calendar-outline" size={14} color="white" />
              <Text style={styles.timeText}>{activity.time}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Activities</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Weekend</Text>
          {THIS_WEEKEND_ACTIVITIES.map(renderActivityCard)}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Week</Text>
          {NEXT_WEEK_ACTIVITIES.map(renderActivityCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5A6B47', // Green color from the design
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  activityCard: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 12,
  },
  activityOverlay: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  activityDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5A6B47',
  },
  hostText: {
    fontSize: 12,
    color: 'white',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: 'white',
    marginLeft: 4,
  },
  shareButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 