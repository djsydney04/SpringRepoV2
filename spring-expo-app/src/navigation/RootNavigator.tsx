import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/userStore';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

// Auth Stack
const Auth = createStackNavigator();
const AuthStack = () => (
  <Auth.Navigator screenOptions={{ headerShown: false }}>
    <Auth.Screen name="Login" component={LoginScreen} />
  </Auth.Navigator>
);

// Main Tab Navigator
const Tab = createBottomTabNavigator();
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Create') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        }

        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4f46e5',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen 
      name="Create" 
      component={HomeScreen} // Replace with CreateActivityScreen when available
      options={{ tabBarLabel: 'Create Activity' }}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Root Navigator
const Root = createStackNavigator();
export const RootNavigator = () => {
  const { isAuthenticated, setUser, setAuthenticated, setLoading } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if user is signed in
    const checkUser = async () => {
      setLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (session?.user) {
          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError && profileError.code !== 'PGRST116') {
            throw profileError;
          }
          
          // If profile exists, set it in the store
          if (profile) {
            setUser(profile);
          } else {
            // Create profile if not exists
            const newProfile = {
              id: session.user.id,
              username: session.user.email?.split('@')[0] || 'User',
              created_at: new Date().toISOString(),
            };
            
            const { data: newProfileData, error: newProfileError } = await supabase
              .from('profiles')
              .insert(newProfile)
              .select()
              .single();
              
            if (newProfileError) {
              throw newProfileError;
            }
            
            setUser(newProfileData);
          }
          
          setAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Fetch or create profile
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profile) {
            setUser(profile);
          }
          
          setAuthenticated(true);
        } else if (event === 'SIGNED_OUT') {
          setAuthenticated(false);
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isInitialized) {
    // You could show a splash screen here
    return null;
  }

  return (
    <NavigationContainer>
      <Root.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Root.Screen name="Main" component={MainTabs} />
        ) : (
          <Root.Screen name="Auth" component={AuthStack} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}; 