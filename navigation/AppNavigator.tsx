import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from '../src/screens/onboarding'; // Corrected path
// import Onboarding1Screen from '../src/screens/Onboarding1Screen'; // Corrected path - REMOVED
// import Onboarding2Screen from '../src/screens/Onboarding2Screen'; // Onboarding2Screen import edildi - REMOVED
import HomePage from '../src/screens/HomePage'; // Import HomePage
import DiagnoseScreen from '../src/screens/DiagnoseScreen';
import ScanScreen from '../src/screens/ScanScreen';
import MyGardenScreen from '../src/screens/MyGardenScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import CustomTabBar from '../src/components/CustomTabBar';

export type RootStackParamList = {
  Onboarding: undefined; // No parameters expected for Onboarding screen
  // Onboarding1: undefined; // Added new screen to param list - REMOVED
  // Onboarding2: undefined; // Onboarding2 rotası eklendi - REMOVED
  MainTabs: undefined;
  // Add other screens here as your app grows
  // Example: Home: { userId: string };
};

export type TabParamList = {
  Home: undefined;
  Diagnose: undefined;
  Scan: undefined;
  MyGarden: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Diagnose" component={DiagnoseScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="MyGarden" component={MyGardenScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }} // Hide header for onboarding screen
        />
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 
 