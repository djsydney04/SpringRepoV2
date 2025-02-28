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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Explore" // Set the initial route to be the Explore/Swipe screen
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'MyActivities') {
                iconName = focused ? 'bookmark' : 'bookmark-outline';
              } else if (route.name === 'Explore') {
                iconName = focused ? 'albums' : 'albums-outline';
              } else if (route.name === 'Create') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else {
                iconName = 'help-circle-outline';
              }

              return <Ionicons name={iconName} size={28} color={color} />;
            },
            tabBarActiveTintColor: '#5A6B47',
            tabBarInactiveTintColor: '#c4c4c4',
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: '#e1e1e1',
              backgroundColor: 'white',
              height: 65,
              paddingTop: 8,
              paddingBottom: 8,
              justifyContent: 'space-between',
            },
            tabBarLabel: () => null, // Hide labels
          })}
        >
          {/* Create/Hosted Activities (Left) */}
          <Tab.Screen 
            name="Create" 
            component={CreateScreen} 
            options={{
              tabBarItemStyle: {
                alignItems: 'center',
              },
            }}
          />
          
          {/* Swipe Activities (Center/Main) */}
          <Tab.Screen 
            name="Explore" 
            component={ExploreScreen}
            options={{
              tabBarItemStyle: {
                alignItems: 'center',
              },
            }}
          />
          
          {/* My Activities (Right) */}
          <Tab.Screen 
            name="MyActivities" 
            component={HomeScreen} // Using HomeScreen for now as My Activities screen
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