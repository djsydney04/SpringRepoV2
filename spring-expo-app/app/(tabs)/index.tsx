import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Spring</Text>
          <Text style={styles.subtitle}>Social Activities Platform</Text>
          
          <View style={styles.featureContainer}>
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Discover Activities</Text>
              <Text style={styles.featureText}>
                Find activities that match your interests with our intuitive swipe interface.
              </Text>
            </View>
            
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Connect with Others</Text>
              <Text style={styles.featureText}>
                Join activities and chat with participants in real-time.
              </Text>
            </View>
            
            <View style={styles.feature}>
              <Text style={styles.featureTitle}>Create Your Own</Text>
              <Text style={styles.featureText}>
                Host activities and invite others to join your social events.
              </Text>
            </View>
          </View>
          
          <View style={styles.startButton}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f46e5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
  },
  featureContainer: {
    width: '100%',
    marginVertical: 20,
  },
  feature: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  startButton: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#4f46e5',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
