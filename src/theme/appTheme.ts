import { Dimensions } from 'react-native';

// --- Screen Dimensions (from onboarding.tsx for sw, sh, sf consistency) ---
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// --- Scaling Constants and Helper Functions (from onboarding.tsx) ---
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

const scaleW = screenWidth / DESIGN_WIDTH;
const scaleH = screenHeight / DESIGN_HEIGHT;

export const sw = (size: number) => size * scaleW;
export const sh = (size: number) => size * scaleH;
export const sf = (size: number) => size * Math.min(scaleW, scaleH);
// --- End Scaling ---

export const COLORS = {
  primary: '#28AF6E',
  textDark: '#13231B',
  textLight: 'rgba(19, 35, 27, 0.7)',
  textLighter: 'rgba(89, 113, 101, 0.7)',
  textInactiveTab: '#979798',
  paginationDotInactive: '#D9D9D9',
  white: '#FFFFFF',
  backgroundLight: '#FDFFFE',
  backgroundOverlay: 'rgba(250, 250, 250, 0.7)',
  tabBarBackground: 'rgba(255, 255, 255, 0.92)',
  tabBarBorder: 'rgba(19, 35, 27, 0.1)',
  scanButtonGradientStart: '#28AF6E',
  scanButtonGradientEnd: '#2CCC80',
  scanButtonStroke: 'rgba(255, 255, 255, 0.24)',
  // Add other common colors if any
};

export const FONTS = {
  rubikRegular: 'Rubik-Regular',
  rubikBold: 'Rubik-Bold',
  sfProText: 'SF Pro Text', // Used for regular and fontWeight: '700'
  sfProTextBold: 'SFProText-Bold', // Specifically for Page 2 button, if it's a distinct font file
};

export const TYPOGRAPHY = {
  // Pre-scaled font sizes
  fontSize28: sf(28),
  fontSize16: sf(16),
  fontSize15: sf(15),
  fontSize11: sf(11),

  // Line heights (can be specific or multipliers)
  lineHeight22: sh(22),
  lineHeight15: sh(15),
  // ... add more as needed

  // Letter spacing
  letterSpacing007: 0.07, // Example, check if scaled or absolute
  letterSpacingNegative024: -0.24, // Example
};

export const SIZING = {
  borderRadiusMedium: sw(12),
  // ... other common size constants
};

export const commonStyles = {
  // Example of a truly common style, if applicable
  // centerContent: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
};

// It's good practice to export all theme parts together
const appTheme = {
  COLORS,
  FONTS,
  TYPOGRAPHY,
  SIZING,
  sw,
  sh,
  sf,
  commonStyles,
};

export default appTheme; 