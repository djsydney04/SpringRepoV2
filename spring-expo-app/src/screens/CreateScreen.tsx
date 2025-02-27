import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Sample hosted activities data
interface HostedActivity {
  id: string;
  title: string;
  location: string;
  date: string;
  participants: number;
  requests: number;
  notifications: number;
  image: string;
}

const HOSTED_ACTIVITIES: HostedActivity[] = [
  {
    id: '1',
    title: 'Linda Mar Surf',
    location: 'Pacifica, CA',
    date: 'Monday Morning (August 27th)',
    participants: 3,
    requests: 2,
    notifications: 4,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Bouldering @ Stinson Beach',
    location: 'Stinson Beach, CA',
    date: 'Wednesday Afternoon (August 28th)',
    participants: 4,
    requests: 1,
    notifications: 3,
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Frisbee @ Crissy Field',
    location: 'Crissy Field, CA',
    date: 'Friday Afternoon (August 31st)',
    participants: 11,
    requests: 4,
    notifications: 15,
    image: 'https://images.unsplash.com/photo-1591806336026-f825d72071a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

export default function CreateScreen() {
  const renderHostedActivityCard = (activity: HostedActivity) => (
    <TouchableOpacity key={activity.id} style={styles.activityCard}>
      <ImageBackground 
        source={{ uri: activity.image }} 
        style={styles.activityImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.activityOverlay}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
          </View>
          
          <View style={styles.activityDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={14} color="white" />
              <Text style={styles.detailText}>{activity.location}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={14} color="white" />
              <Text style={styles.detailText}>{activity.date}</Text>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Ionicons name="people-outline" size={14} color="white" />
                <Text style={styles.statText}>{activity.participants} person</Text>
              </View>
              
              {activity.requests > 0 && (
                <View style={styles.stat}>
                  <Ionicons name="hourglass-outline" size={14} color="white" />
                  <Text style={styles.statText}>{activity.requests} Request{activity.requests !== 1 ? 's' : ''}</Text>
                </View>
              )}
            </View>
            
            {activity.notifications > 0 && (
              <View style={styles.notification}>
                <Ionicons name="notifications-outline" size={14} color="white" />
                <Text style={styles.notificationText}>{activity.notifications} New Notification{activity.notifications !== 1 ? 's' : ''}</Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create Activity</Text>
          <View style={styles.plusIconCircle}>
            <Ionicons name="add" size={20} color="#5A6B47" />
          </View>
        </TouchableOpacity>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hosted Activities</Text>
          {HOSTED_ACTIVITIES.map(renderHostedActivityCard)}
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
  createButton: {
    height: 120,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  plusIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5A6B47',
    marginBottom: 16,
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
  },
  imageStyle: {
    borderRadius: 12,
  },
  activityOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 12,
  },
  activityHeader: {
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  activityDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  notificationText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
}); 