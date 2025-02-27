import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

// Import our screens
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import CreateScreen from './src/screens/CreateScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Home') {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
              } else if (route.name === 'Explore') {
                iconName = focused ? 'albums' : 'albums-outline';
              } else if (route.name === 'Create') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else {
                iconName = 'help-circle-outline';
              }

              return <Ionicons name={iconName} size={24} color={color} />;
            },
            tabBarActiveTintColor: '#5A6B47',
            tabBarInactiveTintColor: '#c4c4c4',
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: '#e1e1e1',
              backgroundColor: 'white',
              height: 60,
              paddingTop: 8,
              paddingBottom: 8,
            },
            tabBarLabel: () => null, // Hide labels
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              tabBarItemStyle: {
                alignItems: 'center',
              },
            }}
          />
          <Tab.Screen 
            name="Explore" 
            component={ExploreScreen}
            options={{
              tabBarItemStyle: {
                alignItems: 'center',
              },
            }}
          />
          <Tab.Screen 
            name="Create" 
            component={CreateScreen} 
            options={{
              tabBarItemStyle: {
                alignItems: 'center',
              },
            }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
              tabBarItemStyle: {
                alignItems: 'center',
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
} 