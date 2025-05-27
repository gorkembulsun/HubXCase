import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Platform,
} from 'react-native';
import appTheme from '../../theme/appTheme';
import { IMAGES } from '../../constants/images';
import Dots from 'react-native-dots-pagination';

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

interface OnboardingPage1Props {
  onNext: () => void;
  renderPagination: (buttonContainerBottomOffset: number) => ReactNode | null;
}

const OnboardingPage1: React.FC<OnboardingPage1Props> = ({ onNext, renderPagination }) => {
  return (
    <View style={styles.page1_container}>
      <View style={styles.page1_figmaBackgroundLayer} />
      <SafeAreaView style={styles.page1_safeArea}>
        <View style={styles.page1_statusBar} />
        <View style={styles.page1_titleSection}>
          <Text style={styles.page1_titleText}>
            Take a photo to <Text style={styles.page1_titleTextBold}>identify</Text>{'\n'}
            the plant!
          </Text>
          <Image
            source={IMAGES.ONBOARDING.BRUSH_STROKE}
            style={styles.page1_brushStrokeImage}
            resizeMode="cover" // Original was cover
          />
        </View>
        <View style={styles.page1_phoneImageContainer}>
          <Image
            source={IMAGES.ONBOARDING.PHONE}
            style={styles.page1_phoneImage}
            resizeMode="contain"
          />
        </View>
        {renderPagination(89)}
        <View style={styles.page1_buttonSection}>
          <TouchableOpacity
            style={styles.page1_continueButton}
            onPress={onNext}
          >
            <Text style={styles.page1_continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    right: sw(-15),
    marginTop: sh(14),
    width: sw(136),
    height: sh(14),
    resizeMode: 'cover', 
  } as ImageStyle,
  page1_phoneImageContainer: {},
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
});

export default OnboardingPage1; 