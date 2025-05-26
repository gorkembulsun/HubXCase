/**
 * Onboarding Screen
 * Multi-step onboarding flow with plant identification introduction
 * Refactored to use centralized image constants and improved code organization
 * Uses AsyncStorage to track completion and prevent re-showing
 */

import React, { useEffect, useState } from 'react';
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
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import appTheme from '../theme/appTheme';
import CustomTabBar from '../components/CustomTabBar';
import Dots from 'react-native-dots-pagination';
import { IMAGES } from '../constants/images';

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
  const [selectedOption, setSelectedOption] = useState('1Year'); // Default to 1 Year
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Check if onboarding was already completed
   */
  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
      if (completed === 'true') {
        // Onboarding already completed, navigate to main app
        navigation.replace('MainTabs');
        return;
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Mark onboarding as completed and save to AsyncStorage
   */
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
      // Even if AsyncStorage fails, still navigate to main app
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

  // Show loading or nothing while checking onboarding status
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
  const renderPagination = (buttonContainerBottomOffset: number) => {
    if (currentPage === 0) return null;
    const dotRowHeight = sh(8);
    const gapBelowButton = sh(48);
    const calculatedDotsBottom = sh(buttonContainerBottomOffset) - gapBelowButton - dotRowHeight;

    return (
      <View style={[styles.paginationContainer, { bottom: calculatedDotsBottom }]}>
        <Dots
          length={4}
          active={currentPage - 1}
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

  // --- Render Functions for Each Page ---
  
  /**
   * Page 0: Welcome screen
   */
  const renderPage0 = () => {
    return (
      <ImageBackground
        source={IMAGES.ONBOARDING.BACKGROUND}
        style={styles.page0_container}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.page0_safeArea}>
          {/* Status Bar Placeholder */}
          <View style={styles.page0_statusBar} />

          {/* Content Section (Title and Subtitle) */}
          <View style={styles.page0_contentContainer}>
            <Text style={styles.page0_title}>
              Welcome to <Text style={styles.page0_titleBold}>PlantApp</Text>
            </Text>
            <Text style={styles.page0_subtitle}>
              Identify more sthan 3000+ plants and{'\n'}88% accuracy.
            </Text>
          </View>

          {/* Plant Image Section */}
          <View style={styles.page0_plantContainer}>
            <Image
              source={IMAGES.ONBOARDING.PLANT}
              style={styles.page0_plantImage}
              resizeMode="contain"
            />
          </View>

          {/* Bottom Section (Button and Terms) */}
          <View style={styles.page0_bottomSection}>
            <TouchableOpacity
              style={styles.page0_getStartedButton}
              onPress={handlePage0Next}
            >
              <Text style={styles.page0_getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
            <Text style={styles.page0_termsText}>
              By tapping next, you are agreeing to PlantID{'\n'}
              <Text style={styles.page0_termsLink}>Terms of Use</Text> &{' '}
              <Text style={styles.page0_termsLink}>Privacy Policy</Text>.
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  };

  /**
   * Page 1: Photo identification introduction
   */
  const renderPage1 = () => {
    return (
      <View style={styles.page1_container}>
        {/* Background Layer */}
        <View style={styles.page1_figmaBackgroundLayer} />

        <SafeAreaView style={styles.page1_safeArea}>
          {/* Status Bar Placeholder */}
          <View style={styles.page1_statusBar} />

          {/* Title Section */}
          <View style={styles.page1_titleSection}>
            <Text style={styles.page1_titleText}>
              Take a photo to <Text style={styles.page1_titleTextBold}>identify</Text>{'\n'}
              the plant!
            </Text>
            <Image
              source={IMAGES.ONBOARDING.BRUSH_STROKE}
              style={styles.page1_brushStrokeImage}
              resizeMode="cover"
            />
          </View>

          {/* Phone Image Section*/}
          <View style={styles.page1_phoneImageContainer}>
            <Image
              source={IMAGES.ONBOARDING.PHONE}
              style={styles.page1_phoneImage}
              resizeMode="contain"
            />
          </View>

          {renderPagination(89)}

          {/* Button Section */}
          <View style={styles.page1_buttonSection}>
            <TouchableOpacity
              style={styles.page1_continueButton}
              onPress={handlePage1Next}
            >
              <Text style={styles.page1_continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  };

  /**
   * Page 2: Plant care guides introduction
   */
  const renderPage2 = () => {
    return (
      <>
        <ImageBackground
          source={IMAGES.ONBOARDING.LEAFS}
          style={styles.page2_imageBackground}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.page2_safeArea}>
            {/* Header Text Container */}
            <View style={styles.page2_headerTextContainer}>
              {/* Header Text */}
              <View>
                <Text style={styles.page2_headerText}>
                  Get plant <Text style={styles.page2_headerTextBold}>care guides</Text>
                </Text>
              </View>
              {/* Brush Image */}
              <Image
                source={IMAGES.ONBOARDING.BRUSH}
                resizeMode="contain"
                style={styles.page2_brushImage}
              />
            </View>

            {/* Artwork Image */}
            <Image
              source={IMAGES.COMMON.ARTWORK}
              resizeMode="contain"
              style={styles.page2_artworkImage}
            />

            {/* Flat iPhone Image */}
            <Image
              source={IMAGES.COMMON.FLAT_IPHONE}
              resizeMode="contain"
              style={styles.page2_flatIphoneImage}
            />

            {renderPagination(85)}

            
            <TouchableOpacity
              style={styles.page2_continueButton}
              onPress={handlePage2Next}
            >
              <Text style={styles.page2_continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  };

  const mock = [1,1,1]

  /**
   * Page 3: Premium subscription page
   */
  const renderPage3 = () => {
    return (
      <View style={styles.page3_container}>
        <ImageBackground
          source={IMAGES.ONBOARDING.PLANT_3}
          style={styles.page3_imageBackground}
          resizeMode="cover"
        >
          <TouchableOpacity onPress={handleSkipOnboarding} style={styles.page3_closeButtonContainer}>
            <View style={styles.page3_closeButtonBackground}>
              <Text style={styles.page3_closeButtonText}>✕</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.page3_textContainer}>
            <Text style={styles.page3_premiumTitle}><Text style={{fontWeight: 'bold', fontSize: sf(30) }}>PlantApp</Text> Premium</Text>
            <Text style={styles.page3_premiumSubtitle}>Access All Features</Text>
          </View>
          
          <View style={styles.page3_scrollViewContainer}>
            <ScrollView style={styles.page3_scrollView} horizontal showsHorizontalScrollIndicator={false}>
              {mock.map((item, index) => (
                <TouchableOpacity key={index} style={styles.page3_scrollViewItemWrapper} onPress={() => console.log(`Feature card ${index} pressed`)}>
                  <View>
                    {index === 0 ? (
                      <Image source={IMAGES.ICONS.UNLIMITED} style={styles.page3_featureImage} />
                    ) : index === 1 ? (
                      <Image source={IMAGES.ICONS.FASTER} style={styles.page3_featureImage} />
                    ) : (
                      <Text style={styles.page3_featureIconText}>?</Text> // Default/fallback icon or text
                    )}
                  </View>
                  <Text style={styles.page3_featureTitle}>
                    {index === 0 ? 'Unlimited' : index === 1 ? 'Faster' : 'Advanced'}
                  </Text>
                  <Text style={styles.page3_featureSubtitle}>
                    {index === 0 ? 'Plant Identify' : index === 1 ? 'Process' : 'Features'}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ImageBackground>
        
        <View style={styles.page3_bottomContentArea}>
          <TouchableOpacity style={[styles.page3_optionButton, selectedOption === '1Month' && styles.page3_selectedOption]} onPress={() => setSelectedOption('1Month')}>
            <View style={[styles.page3_optionButtonCircle, selectedOption === '1Month' && styles.page3_selectedCircle]}>
              {selectedOption === '1Month' && <View style={styles.page3_selectedDot} />}
            </View>
            <View style={styles.page3_optionButtonTextContainer}>
              <Text style={styles.page3_optionButtonText}>1 Month</Text>
              <Text style={styles.page3_optionButtonSubText}>$2.99/month, auto renewable</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.page3_optionButton, selectedOption === '1Year' && styles.page3_selectedOption]} onPress={() => setSelectedOption('1Year')}>
            <View style={styles.page3_badge}>
              <Text style={styles.page3_badgeText}>Save 50%</Text>
            </View>
            <View style={[styles.page3_optionButtonCircle, selectedOption === '1Year' && styles.page3_selectedCircle]}>
              {selectedOption === '1Year' && <View style={styles.page3_selectedDot} />}
            </View>
            <View style={styles.page3_optionButtonTextContainer}>
              <Text style={styles.page3_optionButtonText}>1 Year</Text>
              <Text style={styles.page3_optionButtonSubText}>First 3 days free, then $529.99/year</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.page3_tryFreeButton} onPress={handlePage3Next}>
            <Text style={styles.page3_tryFreeButtonText}>Try free for 3 days</Text>
          </TouchableOpacity>
          
          <Text style={styles.page3_disclaimerText}>
            After the 3-day free trial period you'll be charged $529.99 per year unless you cancel before the trial expires. Yearly Subscription.
          </Text>
          
          <View style={styles.page3_linksContainer}>
            <Text style={styles.page3_linkText}>Terms</Text>
            <Text style={styles.page3_linkSeparator}> • </Text>
            <Text style={styles.page3_linkText}>Privacy</Text>
            <Text style={styles.page3_linkSeparator}> • </Text>
            <Text style={styles.page3_linkText}>Restore</Text>
          </View>
        </View>
      </View>
    );
  };

  // --- Conditional Rendering based on currentPage ---
  let pageContent;
  if (currentPage === 0) {
    pageContent = renderPage0();
  } else if (currentPage === 1) {
    pageContent = renderPage1();
  } else if (currentPage === 2) {
    pageContent = renderPage2();
  } else {
    pageContent = renderPage3();
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
  // --- Page 0 Styles ---
  page0_container: {
    flex: 1,
  },
  page0_safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  page0_statusBar: {
    
  },
  page0_contentContainer: {
    marginTop: sh(12),
    paddingHorizontal: sw(24),
    alignItems: 'flex-start',
  },
  page0_title: {
    fontSize: TYPOGRAPHY.fontSize28,
    color: COLORS.textDark,
    fontFamily: FONTS.rubikRegular,
    lineHeight: sh(33.18),
    letterSpacing: TYPOGRAPHY.letterSpacingNormal,
  },
  page0_titleBold: {
    fontFamily: FONTS.rubikBold,
    fontWeight: '700',
  },
  page0_subtitle: {
    fontSize: TYPOGRAPHY.fontSize16,
    color: COLORS.textLight,
    fontFamily: FONTS.rubikRegular,
    marginTop: sh(8),
    lineHeight: TYPOGRAPHY.lineHeight22,
    letterSpacing: TYPOGRAPHY.letterSpacingNormal,
  },
  page0_plantContainer: {
    width: sw(375),
    height: sh(499),
    alignSelf: 'center',
    alignItems: 'center',
  },
  page0_plantImage: {
    width: sw(600),
    height: sh(560),
    
  } as ImageStyle,
  page0_bottomSection: {
    marginHorizontal: sw(24),
    paddingBottom: sh(34),
    alignItems: 'center',
  },
  page0_getStartedButton: {
    ...baseButtonStyle,
    marginBottom: sh(20),
    
  },
  page0_getStartedButtonText: {
    ...baseButtonTextStyle,
  },
  page0_termsText: {
    fontSize: TYPOGRAPHY.fontSize11,
    color: COLORS.textLighter,
    fontFamily: FONTS.rubikRegular,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeight15,
    letterSpacing: TYPOGRAPHY.letterSpacingNormal,
  },
  page0_termsLink: {
    textDecorationLine: 'underline',
  },

  // --- Page 1 Styles ---
  page1_container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  page1_figmaBackgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.backgroundOverlay,
  },
  page1_safeArea: {
    flex: 1,
  },
  page1_statusBar: {
    height: Platform.OS === 'android' ? sh(47) : 0,
  },
  page1_titleSection: {
    left: sw(24),
    alignSelf: 'flex-start',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-end',
   

  },
  page1_titleText: {
    fontFamily: FONTS.rubikRegular,
    fontWeight: '500',
    fontSize: TYPOGRAPHY.fontSize28,
    color: COLORS.textDark,
    letterSpacing: sw(-1),
    zIndex: 10,
    
  },
  page1_titleTextBold: {
    fontFamily: FONTS.rubikBold,
    fontWeight: '800',
    
  },
  page1_brushStrokeImage: {
    position: 'absolute',
    right: sw(-26),
    marginTop: sh(14),
    width: (136),
    height: sh(12),
    resizeMode: 'contain',
  } as ImageStyle,
  page1_phoneImageContainer: {
  },
  page1_phoneImage: {
    height: sh(700),
    width: sw(375),
    position: 'absolute',
    top: sh(-30),
    alignSelf: 'center',
    resizeMode: 'contain',
    
  } as ImageStyle,
  page1_buttonSection: {
    position: 'absolute',
    left: sw(24),
    right: sw(24),
    height: sh(56),
    bottom: sh(89),
  },
  page1_continueButton: {
    ...baseButtonStyle,
  },
  page1_continueButtonText: {
    ...baseButtonTextStyle,
    lineHeight: sh(15 * 1.6),
    letterSpacing: sw(15 * -0.016),
  },

  // --- Page 2 Styles ---
  page2_imageBackground: {
    flex: 1,
  } as ImageStyle,
  page2_safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? sh(47) : 0,
  },
  page2_headerTextContainer: {
    position: 'relative',
    left: sw(24),
    alignSelf: 'flex-start',
  },
  page2_headerText: {
    fontSize: TYPOGRAPHY.fontSize28,
    fontFamily: FONTS.rubikRegular,
    color: COLORS.textDark,
    lineHeight: sf(28 * 1.2),
    letterSpacing: sw(-0.5),
    
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  page2_headerTextBold: {
    fontFamily: FONTS.rubikBold,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  page2_brushImage: {
    width: 152,
    height: sh(13),
    top: 3,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    resizeMode: 'contain',
  } as ImageStyle,
  page2_artworkImage: {
    position: 'absolute',
    top: sh(49),
    right: sw(18),
    width: sw(320),
    height: sh(400),
    zIndex: 1,
    resizeMode: 'contain',
  } as ImageStyle,
  page2_flatIphoneImage: {
    position: 'absolute',
    width: sw(261),
    height: sh(540),
    top: sh(187),
    alignSelf: 'center',
    resizeMode: 'contain',
  } as ImageStyle,
  page2_continueButton: {
    ...baseButtonStyle,
    position: 'absolute',
    bottom: sh(85),
    height: sh(58),
    width: sw(327),
    alignSelf: 'center',
  },
  page2_continueButtonText: {
    ...baseButtonTextStyle,
    fontFamily: FONTS.sfProTextBold,
    letterSpacing: sw(15 * -0.016),
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 5,
  },
  // --- Generic Page Styles (can be used for Page 3 or customized) ---
  // page3_container: {
  //   flex: 1,
  //   backgroundColor: COLORS.backgroundLight, // Example background
  // },
  page3_container: {
    flex: 1,
  },
  page3_imageBackground: {
    height: sh(500), // Fixed responsive height
    width: '100%',
  },
  page3_textContainer: {
    position: 'absolute',
    top: sh(280),
    left: sw(24),
    right: sw(24),
  },
  page3_premiumTitle: {
    color: COLORS.white,
    fontSize: sf(30),
    fontFamily: FONTS.rubikBold,
    fontWeight: '100',
  },
  page3_premiumSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: sf(17),
    fontFamily: FONTS.rubikRegular,
    marginTop: sh(8),
  },
  page3_bottomContentArea: {
    flex: 1,
    backgroundColor: '#101E17',
    paddingHorizontal: sw(20),
    paddingTop: sh(20),
  },
  page3_getStartedButton: {
    ...baseButtonStyle,
    marginBottom: sh(0),
  },
  page3_getStartedButtonText: {
    ...baseButtonTextStyle,
  },
  page3_scrollView: {
    flex: 1,
  },
  page3_scrollViewItemWrapper: {
    width: sw(156),
    height: sh(130),
    backgroundColor: '#24342c',
    borderRadius: 14,
    marginRight: sw(8),
    padding: sw(16),
   
  },
  page3_optionButton: {
    position: 'relative',
    zIndex: 10,
    borderWidth: 0.5,
    borderColor: '#FFFFFF4D',
    height: sh(60),
    backgroundColor: '#FFFFFF0D',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sw(16),
    marginBottom: sh(12),
  },
  page3_optionButtonText: {
    color: '#FFFFFF',
    fontSize: sf(16),
    fontFamily: FONTS.rubikRegular,
    fontWeight: '500',
   
  },
  page3_optionButtonSubText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: sf(12),
    fontFamily: FONTS.rubikRegular,
    marginTop: sh(2),
  },
  page3_optionButtonCircle: {
    width: sw(24),
    height: sw(24), // Use sw for both to keep it circular
    borderRadius: sw(12),
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page3_badge: {
    position: 'absolute',
    top: -1,
    right:-1,
    backgroundColor: '#28AF6E',
    paddingHorizontal: sw(8),
    paddingVertical: sh(4),
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 20,
    zIndex: 1,
  },
  page3_badgeText: {
    color: '#FFFFFF',
    fontSize: sf(12),
    fontFamily: FONTS.rubikRegular,
    fontWeight: '600',
  },
     page3_scrollViewContainer: {
     position: 'absolute',
     bottom: sh(0),
     left: sw(24),
     right: sw(24),
     height: sh(130),
   },
  page3_featureIcon: {
   
  },
  page3_featureIconText: {
    fontSize: sf(16),
    fontFamily: FONTS.rubikRegular,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  page3_featureTitle: {
    fontSize: sf(20),
    fontFamily: FONTS.rubikRegular,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: sh(8),
    letterSpacing: 0.38,
  },
  page3_featureSubtitle: {
    fontSize: sf(12),
    fontFamily: FONTS.rubikRegular,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  page3_selectedOption: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  page3_selectedCircle: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
     page3_optionButtonTextContainer: {
     flex: 1,
     marginLeft: sw(10),
   },
  page3_tryFreeButton: {
    ...baseButtonStyle,
    marginBottom: sh(20),
  },
  page3_tryFreeButtonText: {
    color: COLORS.white,
    fontSize: sf(16),
    fontFamily: FONTS.rubikRegular,
    fontWeight: '700',
    letterSpacing: TYPOGRAPHY.letterSpacingVeryTight,
  },
  page3_disclaimerText: {
    fontSize: sf(12),
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: FONTS.rubikRegular,
    textAlign: 'center',
    marginTop: sh(-8),
  },
  page3_linksContainer: {
    marginBottom: sh(21),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page3_linkText: {
    fontSize: sf(12),
    color: '#FFFFFF',
    fontFamily: FONTS.rubikRegular,
  },
  page3_linkSeparator: {
    fontSize: sf(12),
    color: '#FFFFFF',
    fontFamily: FONTS.rubikRegular,
    marginHorizontal: sw(4),
  },
    page3_selectedDot: {
     width: sw(8),
     height: sw(8),
     borderRadius: sw(8),
     backgroundColor: '#FFFFFF',
     alignSelf: 'center',
   },
  page3_featureImage: {
    width: sw(35),
    height: sh(38),
    resizeMode: 'cover',
  },
  page3_closeButtonContainer: {
    position: 'absolute',
    top: sh(50),
    right: sw(20),
    zIndex: 10,
  },
  page3_closeButtonBackground: {
    width: sw(30),
    height: sw(30),
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: sw(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  page3_closeButtonText: {
    color: '#FFFFFF',
    fontSize: sf(14),
    fontWeight: 'bold',
    lineHeight: sf(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: sf(16),
    fontFamily: FONTS.rubikRegular,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
});

export default UnifiedOnboardingScreen;
