/**
 * Onboarding Screen
 * Multi-step onboarding flow with plant identification introduction
 * Refactored to use centralized image constants and improved code organization
 * Uses AsyncStorage to track completion and prevent re-showing
 */

import React, { useEffect, useState, ReactNode } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import appTheme from '../theme/appTheme';
import Dots from 'react-native-dots-pagination';
import { IMAGES } from '../constants/images';

// Import new components
import {
  OnboardingPage0,
  OnboardingPage1,
  OnboardingPage2,
  OnboardingPage3,
} from '../components/onboarding';

// --- Scaling Helper Functions and Theme Constants ---
const { sw, sh, sf, COLORS, FONTS, TYPOGRAPHY, SIZING } = appTheme;

// --- Constants ---
const ONBOARDING_COMPLETED_KEY = '@onboarding_completed';

// --- Type Definitions ---
type UnifiedOnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

/**
 * Unified Onboarding Screen Component
 * Handles all onboarding steps in a single component with AsyncStorage persistence
 */
const UnifiedOnboardingScreen = ({
  navigation,
}: UnifiedOnboardingScreenProps) => {
  // --- State ---
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      if (completed === 'true') {
        navigation.replace('MainTabs');
        return;
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
      navigation.replace('MainTabs');
    }
  };

  // --- Handlers ---
  const handlePage0Next = () => setCurrentPage(1);
  const handlePage1Next = () => setCurrentPage(2);
  const handlePage2Next = () => setCurrentPage(3);
  const handlePage3Next = () => {
    console.log("Completing onboarding and navigating to main app");
    completeOnboarding();
  };

  const handleSkipOnboarding = () => {
    console.log("Skipping onboarding");
    completeOnboarding();
  };

  // --- Effects ---
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    console.log('currentPage', currentPage);
  }, [currentPage]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  /**
   * Renders pagination dots for pages 1-3
   */
  const renderPagination = (buttonContainerBottomOffset: number): ReactNode | null => {
    if (currentPage === 0) return null;
    const dotRowHeight = sh(8);
    const gapBelowButton = sh(48);
    const calculatedDotsBottom = sh(buttonContainerBottomOffset) - gapBelowButton - dotRowHeight;

    return (
      <View style={[styles.paginationContainer, { bottom: calculatedDotsBottom }]}>
        <Dots
          length={3}
          active={currentPage -1}
          activeColor={COLORS.textDark}
          passiveColor={COLORS.paginationDotInactive}
          activeDotWidth={sh(10)}
          activeDotHeight={sh(10)}
          passiveDotWidth={sh(8)}
          passiveDotHeight={sh(8)}
        />
      </View>
    );
  };

  
  let pageContent;
  if (currentPage === 0) {
    pageContent = <OnboardingPage0 onNext={handlePage0Next} />;
  } else if (currentPage === 1) {
    pageContent = <OnboardingPage1 onNext={handlePage1Next} renderPagination={renderPagination} />;
  } else if (currentPage === 2) {
    pageContent = <OnboardingPage2 onNext={handlePage2Next} renderPagination={renderPagination} />;
  } else {
    pageContent = <OnboardingPage3 onNext={handlePage3Next} onSkip={handleSkipOnboarding} />;
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      {pageContent}
    </View>
  );
};

// --- Styles ---

// Common button style
const baseButtonStyle: ViewStyle = {
  height: sh(56),
  backgroundColor: COLORS.primary,
  borderRadius: SIZING.borderRadiusMedium,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const baseButtonTextStyle: TextStyle = {
  color: COLORS.white,
  fontSize: TYPOGRAPHY.fontSize15,
  fontFamily: FONTS.sfProText,
  fontWeight: '700',
  lineHeight: sh(24),
  letterSpacing: TYPOGRAPHY.letterSpacingVeryTight,
};

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
  },
  loadingText: {
    fontSize: sf(16),
    fontFamily: FONTS.rubikRegular,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
});

export default UnifiedOnboardingScreen;
