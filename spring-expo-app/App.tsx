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
                return <Ionicons name={iconName} size={31} color="#303030" />;
              } else if (route.name === 'Explore') {
                iconName = focused ? 'albums' : 'albums-outline';
                // Rotate the explore icon 90 degrees to the left
                return (
                  <View style={{ transform: [{ rotate: '-90deg' }] }}>
                    <Ionicons name={iconName} size={31} color="#303030" />
                  </View>
                );
              } else if (route.name === 'Create') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                return <Ionicons name={iconName} size={31} color="#303030" />;
              } else {
                iconName = 'help-circle-outline';
                return <Ionicons name={iconName} size={31} color="#303030" />;
              }
            },
            tabBarActiveTintColor: '#303030', // Changed from #5A6B47 to #303030
            tabBarInactiveTintColor: '#303030', // Also setting inactive color to #303030
            tabBarStyle: {
              borderTopWidth: 1,
              borderTopColor: '#e1e1e1',
              backgroundColor: 'white',
              height: 72, // Increased by 10%
              paddingTop: 9, // Increased by 10%
              paddingBottom: 9, // Increased by 10%
              justifyContent: 'space-between',
            },
            tabBarLabel: () => null, // Hide labels
          })}
        >
          {/* My Activities (Left) - Swapped position */}
          <Tab.Screen 
            name="MyActivities" 
            component={HomeScreen}
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
          
          {/* Create/Hosted Activities (Right) - Swapped position */}
          <Tab.Screen 
            name="Create" 
            component={CreateScreen}
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