import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Activity details
const ACTIVITY = {
  id: '1',
  title: 'Hike Through the Marin Headlands',
  host: 'Adam',
  hostAvatar: 'A',
  location: 'Marin Headlands, CA',
  date: 'This Weekend',
  participants: '1-5 People',
  description: 'Anybody want to come for a hike in the Marin headlands on Friday?...',
  image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
};

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageBackground 
          source={{ uri: ACTIVITY.image }} 
          style={styles.heroImage}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="filter-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="person-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.heroContent}>
              <Text style={styles.activityTitle}>{ACTIVITY.title}</Text>
              
              <View style={styles.hostInfo}>
                <View style={styles.hostSection}>
                  <Text style={styles.hostLabel}>Hosted By {ACTIVITY.host}</Text>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{ACTIVITY.hostAvatar}</Text>
                  </View>
                </View>
                
                <View style={styles.metaInfo}>
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={16} color="white" />
                    <Text style={styles.metaText}>{ACTIVITY.location}</Text>
                  </View>
                  
                  <View style={styles.metaItem}>
                    <Ionicons name="people-outline" size={16} color="white" />
                    <Text style={styles.metaText}>{ACTIVITY.participants}</Text>
                  </View>
                  
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={16} color="white" />
                    <Text style={styles.metaText}>{ACTIVITY.date}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        
        <View style={styles.contentSection}>
          <Text style={styles.description}>{ACTIVITY.description}</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <Text style={styles.primaryButtonText}>Join Activity</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
              <Text style={styles.secondaryButtonText}>Message Host</Text>
            </TouchableOpacity>
          </View>
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
    flexGrow: 1,
  },
  heroImage: {
    height: 500,
    width: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 24,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: {
    paddingBottom: 24,
  },
  activityTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  hostInfo: {
    marginBottom: 16,
  },
  hostSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hostLabel: {
    fontSize: 18,
    color: 'white',
    marginRight: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5A6B47',
  },
  metaInfo: {
    rowGap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  contentSection: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  actionButtons: {
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#5A6B47',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#F0F0F0',
  },
  secondaryButtonText: {
    color: '#5A6B47',
    fontSize: 16,
    fontWeight: '600',
  },
}); 