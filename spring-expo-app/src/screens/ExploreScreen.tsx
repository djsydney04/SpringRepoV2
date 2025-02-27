import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Sample activity data
const ACTIVITIES = [
  {
    id: '1',
    title: 'Hiking Adventure',
    location: 'Mountain Trail Park',
    date: 'Saturday, June 15',
    participants: 8,
  },
  {
    id: '2',
    title: 'Beach Volleyball',
    location: 'Ocean Beach',
    date: 'Sunday, June 16',
    participants: 12,
  },
  {
    id: '3',
    title: 'Book Club Meeting',
    location: 'Central Library',
    date: 'Tuesday, June 18',
    participants: 6,
  },
  {
    id: '4',
    title: 'Photography Workshop',
    location: 'Downtown Art Center',
    date: 'Wednesday, June 19',
    participants: 15,
  },
  {
    id: '5',
    title: 'Yoga in the Park',
    location: 'Sunset Park',
    date: 'Thursday, June 20',
    participants: 10,
  },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Activities</Text>
      </View>
      
      <FlatList
        data={ACTIVITIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <View style={styles.activityDetails}>
              <Text style={styles.activityLocation}>{item.location}</Text>
              <Text style={styles.activityDate}>{item.date}</Text>
              <Text style={styles.activityParticipants}>
                {item.participants} {item.participants === 1 ? 'participant' : 'participants'}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 8,
  },
  activityDetails: {
    gap: 4,
  },
  activityLocation: {
    fontSize: 16,
    color: '#666',
  },
  activityDate: {
    fontSize: 14,
    color: '#888',
  },
  activityParticipants: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
}); 