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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import appTheme from '../theme/appTheme';
import CustomTabBar from '../components/CustomTabBar';
import Dots from 'react-native-dots-pagination';

// --- Scaling Helper Functions and Theme Constants ---
const { sw, sh, sf, COLORS, FONTS, TYPOGRAPHY, SIZING } = appTheme;

// --- Type Definitions ---
type UnifiedOnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

// --- Main Component ---
const UnifiedOnboardingScreen = ({
  navigation,
}: UnifiedOnboardingScreenProps) => {
  // --- State ---
  const [currentPage, setCurrentPage] = useState(0);

  // --- Handlers ---
  const handlePage0Next = () => setCurrentPage(1);
  const handlePage1Next = () => setCurrentPage(2);
  const handlePage2Next = () => setCurrentPage(3);
  const handlePage3Next = () => {
    console.log("Navigate to main app from page 3");
    // Example: navigation.navigate('Home');
  };

  // --- Effects ---
  useEffect(() => {
    console.log('currentPage', currentPage);
  }, [currentPage]);

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
  const renderPage0 = () => {
    return (
      <ImageBackground
        source={require('../assets/images/onboarding_background.png')}
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
              source={require('../assets/images/onboarding_plant.png')}
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
              source={require('../assets/images/onboarding1/brush_stroke.png')}
              style={styles.page1_brushStrokeImage}
              resizeMode="cover"
            />
          </View>

          {/* Phone Image Section*/}
          <View style={styles.page1_phoneImageContainer}>
            <Image
              source={require('../assets/images/onboarding1/phone.png')}
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

  const renderPage2 = () => {
    return (
      <>
        <ImageBackground
          source={require('../assets/images/onboarding1/leafs.png')}
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
                source={require('../assets/images/onboarding1/brush.png')}
                resizeMode="contain"
                style={styles.page2_brushImage}
              />
            </View>

            {/* Artwork Image */}
            <Image
              source={require('../assets/images/Artwork.png')}
              resizeMode="contain"
              style={styles.page2_artworkImage}
            />

            {/* Flat iPhone Image */}
            <Image
              source={require('../assets/images/Flat_iphone.png')}
              resizeMode="contain"
              style={styles.page2_flatIphoneImage}
            />

            {renderPagination(85)}

            {/* Continue Button - This will now be above the TabBar if TabBar is outside SafeArea */}
            {/* Or adjust layout if TabBar should be part of this screen's content flow */}
            <TouchableOpacity
              style={styles.page2_continueButton} // Ensure this button is positioned correctly with the new tab bar
              onPress={handlePage2Next}
            >
              <Text style={styles.page2_continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
        {/* CustomTabBar added here, outside the ImageBackground and SafeAreaView of Page 2 content */}
        {/* This ensures it appears at the bottom of the screen, potentially overlaying if not handled */}
        {/* For it to be at the very bottom and respect safe areas, its own safeAreaContainer helps */}
      </>
    );
  };

  const renderPage3 = () => {
    return (
      <View style={{flex: 1,}}>
        <ImageBackground
          source={require('../assets/images/plant3.png')}
          style={styles.page3_imageBackground}
          resizeMode="cover"
        >
          <View style={styles.page3_textContainer}>
            <Text style={styles.page3_premiumTitle}>PlantApp Premium</Text>
            <Text style={styles.page3_premiumSubtitle}>Access All Features</Text>
            <ScrollView style={styles.page3_scrollView} horizontal>
              <View style={styles.page3_scrollViewItemWrapper}>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
        <View style={styles.page3_bottomContentArea}>
        <View style={styles.page3_optionButton}>
          <Text style={styles.page3_optionButtonText}>Option 1</Text>
          <View style={styles.page3_optionButtonCircle} />
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
      {pageContent}
      {/* {currentPage === 2 && <CustomTabBar />} */}
      {/* The above line is commented out to hide CustomTabBar */}
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
  letterSpacing: TYPOGRAPHY.letterSpacingNegative024,
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
    letterSpacing: TYPOGRAPHY.letterSpacing007,
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
    letterSpacing: TYPOGRAPHY.letterSpacing007,
  },
  page0_plantContainer: {
    width: sw(375),
    height: sh(499),
    alignSelf: 'center',
    alignItems: 'center',
  },
  page0_plantImage: {
    width: sw(375),
    height: sh(499),
    resizeMode: 'contain',
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
    letterSpacing: TYPOGRAPHY.letterSpacing007,
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
    
    top: sh(59),
    left: sw(24),
    alignSelf: 'flex-start',
    height: sh(66),
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
    
  },
  page1_titleTextBold: {
    fontFamily: FONTS.rubikBold,
    fontWeight: '800',
  },
  page1_brushStrokeImage: {
    position: 'absolute',
    marginTop: sh(10),
    width: 141,
    height: sh(29),
    resizeMode: 'contain',
  } as ImageStyle,
  page1_phoneImageContainer: {
  },
  page1_phoneImage: {
    height: sh(700),
    width: sw(375),
    position: 'absolute',
    top: 25,
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
  page3_imageBackground: {
    flex: 0.6,
  },
  page3_textContainer: {
    top: 235,
    marginLeft: 24,
    marginTop: 47
  
    
  },
  page3_premiumTitle: {
    color: COLORS.white,
    fontSize: 30,
    fontFamily: FONTS.rubikBold,
    fontWeight: '700',
   
  },
  page3_premiumSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 17,
    fontFamily: FONTS.rubikRegular,
    marginTop: sh(4),
  },
  page3_bottomContentArea: {
    flex: 0.4,
    backgroundColor: '#101E17',
    paddingHorizontal: sw(24),
  },
  page3_getStartedButton: {
    ...baseButtonStyle,
    marginBottom: sh(0),
  },
  page3_getStartedButtonText: {
    ...baseButtonTextStyle,
  },
  page3_scrollView: {
    position: 'absolute',
    top: sh(250-24-130),
    zIndex: 10,
  },
  page3_scrollViewItemWrapper: {
    width: sw(156),
    height: sh(130),
    backgroundColor: '#24342c',
    borderRadius: 14,
  },
  page3_optionButton: {
    position: 'absolute',
    bottom: sh(250),
    left: sw(24),
    right: sw(24),
    borderWidth: 0.5,
    borderColor: '#FFFFFF4D',
    marginTop: 3,
    height: 60,
    backgroundColor: '#FFFFFF0D',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  page3_optionButtonText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FONTS.rubikRegular,
  },
  page3_optionButtonCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default UnifiedOnboardingScreen;
