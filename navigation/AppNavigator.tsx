import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../src/screens/onboarding'; // Corrected path
// import Onboarding1Screen from '../src/screens/Onboarding1Screen'; // Corrected path - REMOVED
// import Onboarding2Screen from '../src/screens/Onboarding2Screen'; // Onboarding2Screen import edildi - REMOVED
import HomePage from '../src/screens/HomePage'; // Import HomePage

export type RootStackParamList = {
  Onboarding: undefined; // No parameters expected for Onboarding screen
  // Onboarding1: undefined; // Added new screen to param list - REMOVED
  // Onboarding2: undefined; // Onboarding2 rotası eklendi - REMOVED
  HomePage: undefined; // Add HomePage
  // Add other screens here as your app grows
  // Example: Home: { userId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
          name="HomePage" 
          component={HomePage} 
          options={{ headerShown: false }} // Optionally hide header for HomePage
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 
 