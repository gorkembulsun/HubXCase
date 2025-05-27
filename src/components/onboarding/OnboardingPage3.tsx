import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ScrollView,
} from 'react-native';
import appTheme from '../../theme/appTheme';
import { IMAGES } from '../../constants/images';

const { sw, sh, sf, COLORS, FONTS, TYPOGRAPHY, SIZING } = appTheme;

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

interface OnboardingPage3Props {
  onNext: () => void;
  onSkip: () => void;
}

const mock = [1, 1, 1]; // Moved mock data here as it's only used in Page 3

const OnboardingPage3: React.FC<OnboardingPage3Props> = ({ onNext, onSkip }) => {
  const [selectedOption, setSelectedOption] = useState('1Year');

  return (
    <View style={styles.page3_container}>
      <ImageBackground
        source={IMAGES.ONBOARDING.PLANT_3}
        style={styles.page3_imageBackground}
        resizeMode="cover"
      >
        <TouchableOpacity onPress={onSkip} style={styles.page3_closeButtonContainer}>
          <View style={styles.page3_closeButtonBackground}>
            <Text style={styles.page3_closeButtonText}>✕</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.page3_textContainer}>
          <Text style={styles.page3_premiumTitle}><Text style={{ fontWeight: 'bold', fontSize: sf(30) }}>PlantApp</Text> Premium</Text>
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

        <TouchableOpacity style={styles.page3_tryFreeButton} onPress={onNext}>
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

const styles = StyleSheet.create({
  page3_container: {
    flex: 1,
  },
  page3_imageBackground: {
    height: sh(500),
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
    height: sw(24),
    borderRadius: sw(12),
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page3_badge: {
    position: 'absolute',
    top: -1,
    right: -1,
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
  page3_featureIcon: {},
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
});

export default OnboardingPage3; 