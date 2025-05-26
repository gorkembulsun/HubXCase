/**
 * Centralized image asset paths for better maintainability
 * All image imports should use these constants instead of direct require() calls
 */

export const IMAGES = {
  // Home screen assets
  HOME: {
    BACKGROUND: require('../assets/images/home/Homebackground.png'),
  },
  
  // Icon assets
  ICONS: {
    MAIL: require('../assets/images/icons/mail.png'),
    FASTER: require('../assets/images/icons/fastericon.png'),
    UNLIMITED: require('../assets/images/icons/unlimitedicon.png'),
  },
  
  // Onboarding assets
  ONBOARDING: {
    BACKGROUND: require('../assets/images/onboarding/onboarding_background.png'),
    BACKGROUND_FULL: require('../assets/images/onboarding/onboarding_background_full.png'),
    PLANT: require('../assets/images/onboarding/onboarding_plant.png'),
    PLANT_3: require('../assets/images/onboarding/plant3.png'),
    PLANT_SECTION: require('../assets/images/onboarding/plant_section.png'),
    // Onboarding1 subfolder assets
    BRUSH_STROKE: require('../assets/images/onboarding1/brush_stroke.png'),
    PHONE: require('../assets/images/onboarding1/phone.png'),
    LEAFS: require('../assets/images/onboarding1/leafs.png'),
    BRUSH: require('../assets/images/onboarding1/brush.png'),
  },
  
  // Common assets
  COMMON: {
    FLAT_IPHONE: require('../assets/images/common/Flat_iphone.png'),
    ARTWORK: require('../assets/images/common/Artwork.png'),
  },
} as const;

export type ImageKeys = keyof typeof IMAGES;
export type HomeImageKeys = keyof typeof IMAGES.HOME;
export type IconImageKeys = keyof typeof IMAGES.ICONS;
export type OnboardingImageKeys = keyof typeof IMAGES.ONBOARDING;
export type CommonImageKeys = keyof typeof IMAGES.COMMON; 