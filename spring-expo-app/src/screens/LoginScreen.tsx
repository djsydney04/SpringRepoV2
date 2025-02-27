import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { AuthForm } from '../components/Auth/AuthForm';

export const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>Spring</Text>
        <Text style={styles.tagline}>
          Find and join social activities with like-minded people
        </Text>
      </View>

      <View style={styles.formContainer}>
        <AuthForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  tagline: {
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
  },
}); 