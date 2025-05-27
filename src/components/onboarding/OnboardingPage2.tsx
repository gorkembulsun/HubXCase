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

interface OnboardingPage2Props {
  onNext: () => void;
  renderPagination: (buttonContainerBottomOffset: number) => ReactNode | null;
}

const OnboardingPage2: React.FC<OnboardingPage2Props> = ({ onNext, renderPagination }) => {
  return (
    <>
      <ImageBackground
        source={IMAGES.ONBOARDING.LEAFS}
        style={styles.page2_imageBackground}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.page2_safeArea}>
          <View style={styles.page2_headerTextContainer}>
            <View>
              <Text style={styles.page2_headerText}>
                Get plant <Text style={styles.page2_headerTextBold}>care guides</Text>
              </Text>
            </View>
            <Image
              source={IMAGES.ONBOARDING.BRUSH}
              resizeMode="contain"
              style={styles.page2_brushImage}
            />
          </View>
          <Image
            source={IMAGES.COMMON.ARTWORK}
            resizeMode="contain"
            style={styles.page2_artworkImage}
          />
          <Image
            source={IMAGES.COMMON.FLAT_IPHONE}
            resizeMode="contain"
            style={styles.page2_flatIphoneImage}
          />
          {renderPagination(85)}
          <TouchableOpacity
            style={styles.page2_continueButton}
            onPress={onNext}
          >
            <Text style={styles.page2_continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  page2_imageBackground: {
    flex: 1,
  } as ImageStyle,
  page2_safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? sh(47) : 0,
  },
  page2_headerTextContainer: {
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
    alignSelf: 'flex-end',
    width: sw(152),
    height: sh(13),
    resizeMode: 'cover', // Original was cover
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
});

export default OnboardingPage2; 