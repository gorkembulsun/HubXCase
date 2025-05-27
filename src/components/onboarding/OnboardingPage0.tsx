import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
  StatusBar,
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

interface OnboardingPage0Props {
  onNext: () => void;
}

const OnboardingPage0: React.FC<OnboardingPage0Props> = ({ onNext }) => {
  return (
    <ImageBackground
      source={IMAGES.ONBOARDING.BACKGROUND}
      style={styles.page0_container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.page0_safeArea}>
        <View style={styles.page0_statusBar} />
        <View style={styles.page0_contentContainer}>
          <Text style={styles.page0_title}>
            Welcome to <Text style={styles.page0_titleBold}>PlantApp</Text>
          </Text>
          <Text style={styles.page0_subtitle}>
            Identify more sthan 3000+ plants and{'\n'}88% accuracy.
          </Text>
        </View>
        <View style={styles.page0_plantContainer}>
          <Image
            source={IMAGES.ONBOARDING.PLANT}
            style={styles.page0_plantImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.page0_bottomSection}>
          <TouchableOpacity
            style={styles.page0_getStartedButton}
            onPress={onNext}
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

const styles = StyleSheet.create({
  page0_container: {
    flex: 1,
  },
  page0_safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  page0_statusBar: {},
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
    height: sh(540),
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
});

export default OnboardingPage0; 