/**
 * Application Theme Configuration
 * Centralized design system with consistent scaling, colors, fonts, and spacing
 */

import { Dimensions } from 'react-native';

// --- Screen Dimensions and Scaling ---
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Design constants based on iPhone X dimensions
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const scaleW = screenWidth / DESIGN_WIDTH;
const scaleH = screenHeight / DESIGN_HEIGHT;

/**
 * Scale width, height, fontsize proportionally
 */
export const sw = (size: number): number => size * scaleW;


export const sh = (size: number): number => size * scaleH;


export const sf = (size: number): number => size * Math.min(scaleW, scaleH);

// --- Color Palette ---
export const COLORS = {
  // Primary colors
  primary: '#28AF6E',
  primaryLight: '#2CCC80',
  
  // Text colors
  textDark: '#13231B',
  textLight: 'rgba(19, 35, 27, 0.7)',
  textLighter: 'rgba(89, 113, 101, 0.7)',
  textInactiveTab: '#979798',
  
  // Background colors
  white: '#FFFFFF',
  backgroundLight: '#FDFFFE',
  backgroundOverlay: 'rgba(250, 250, 250, 0.7)',
  
  // Component specific colors
  tabBarBackground: '#FFFFFF',
  tabBarBorder: 'rgba(19, 35, 27, 0.1)',
  paginationDotInactive: '#D9D9D9',
  
  // Gradient colors
  scanButtonGradientStart: '#28AF6E',
  scanButtonGradientEnd: '#2CCC80',
  scanButtonStroke: 'rgba(255, 255, 255, 0.24)',
  
  // Premium colors
  premiumGold: '#E6C990',
  premiumGoldLight: '#FFDE9C',
  premiumDark: '#24201A',
  
  // Status colors
  error: 'rgba(232, 44, 19, 0.9)',
  success: '#28AF6E',
  warning: '#FFA500',
  
  // Border colors
  borderLight: 'rgba(60, 60, 67, 0.1)',
  borderMedium: 'rgba(60, 60, 67, 0.25)',
  categoryBorder: 'rgba(41, 187, 137, 0.18)',
} as const;

// --- Typography ---
export const FONTS = {
  // Rubik font family
  rubikRegular: 'Rubik-Regular',
  rubikBold: 'Rubik-Bold',
  rubikMediumItalic: 'Rubik-MediumItalic',
  rubikExtraBoldItalic: 'Rubik-ExtraBoldItalic',
  
  // SF Pro Text family
  sfProText: 'SF Pro Text',
  sfProTextBold: 'SFProText-Bold',
} as const;

// --- Typography Scale ---
export const TYPOGRAPHY = {
  
  fontSize28: sf(28),
  fontSize24: sf(24),
  fontSize17: sf(17),
  fontSize16: sf(16),
  fontSize15: sf(15),
  fontSize13: sf(13),
  fontSize11: sf(11),
  fontSize10: sf(10),
  
  
  lineHeight22: sh(22),
  lineHeight21: sh(21),
  lineHeight20: sh(20),
  lineHeight15: sh(15),
  
  
  letterSpacingTight: -0.32,
  letterSpacingNormal: 0.07,
  letterSpacingLoose: 0.035,
  letterSpacingVeryTight: -0.24,
} as const;

// --- Spacing and Sizing ---
export const SIZING = {
 
  borderRadiusSmall: sw(8),
  borderRadiusMedium: sw(12),
  borderRadiusLarge: sw(16),
  
  
  paddingXS: sw(4),
  paddingS: sw(8),
  paddingM: sw(16),
  paddingL: sw(24),
  paddingXL: sw(32),
  
  // Component specific sizes
  tabBarHeight: sh(83),
  searchBarHeight: sh(44),
  premiumBannerHeight: sh(64),
  categoryCardHeight: sh(152),
  questionCardHeight: sh(164),
  questionCardWidth: sw(240),
  
  
  iconXS: sf(16),
  iconS: sf(20),
  iconM: sf(24),
  iconL: sf(32),
  iconXL: sf(48),
} as const;

// --- Common Styles ---
export const commonStyles = {
  centerContent: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardStyle: {
    backgroundColor: COLORS.white,
    borderRadius: SIZING.borderRadiusMedium,
    padding: SIZING.paddingM,
  },
} as const;


const appTheme = {
  COLORS,
  FONTS,
  TYPOGRAPHY,
  SIZING,
  sw,
  sh,
  sf,
  commonStyles,
} as const;

export default appTheme; 