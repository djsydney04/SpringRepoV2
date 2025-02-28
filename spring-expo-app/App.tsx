import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Platform } from 'react-native';

// Import our screens
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import CreateScreen from './src/screens/CreateScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 72,
              paddingTop: 9,
              paddingBottom: 9,
              borderTopWidth: 0, // Remove top border
              backgroundColor: '#fff',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                },
                android: {
                  elevation: 8,
                },
              }),
            },
            tabBarShowLabel: true,
            tabBarActiveTintColor: '#303030',
            tabBarInactiveTintColor: '#B5B5B5',
          }}
        >
          <Tab.Screen
            name="MyActivities"
            component={HomeScreen}
            options={{
              tabBarLabel: 'My Activities',
              tabBarIcon: ({ focused, color }) => (
                <Ionicons 
                  name={focused ? "bookmark" : "bookmark-outline"} 
                  size={26} 
                  color={color} 
                />
              ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{
              tabBarLabel: 'Explore',
              tabBarIcon: ({ color }) => (
                <View style={{ transform: [{ rotate: '90deg' }] }}>
                  <Ionicons name="albums-outline" size={33} color={color} />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Create"
            component={CreateScreen}
            options={{
              tabBarLabel: 'Create',
              tabBarIcon: ({ focused, color }) => (
                <MaterialIcons
                  name="add-box"
                  size={30}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
} 