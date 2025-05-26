import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import appTheme from '../../theme/appTheme';
import { IMAGES } from '../../constants/images';

const { sw, sh, sf, COLORS, FONTS } = appTheme;

interface PremiumBannerProps {
  onPress?: () => void;
  notificationCount?: number;
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({ 
  onPress, 
  notificationCount = 1 
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image 
          source={IMAGES.ICONS.MAIL}
          style={styles.iconImage}
          resizeMode="cover"
        />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.titleWrapper}>
            {/* Subtle glow effect behind the text */}
            <LinearGradient
              colors={[
                'rgba(145, 111, 43, 0.64)', 
                'rgba(192, 155, 80, 0.23)', 
                'rgba(228, 175, 70, 0.56)', 
                'rgba(228, 181, 86, 0.85)'
              ]}
              start={{ x: 2.0, y: 1.0 }}
              end={{ x: 0.0, y: 5.0 }}
              style={styles.titleGlow}
            />
            <Text style={styles.title}>FREE Premium Available</Text>
            <Text style={styles.subtitle}>Tap to upgrade your account!</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: sh(64),
    marginHorizontal: sw(24),
    backgroundColor: '#24201A',
    borderRadius: 12,
    padding: sw(16),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sh(24),
    overflow: 'hidden',
  },
  iconContainer: {
    marginRight: sw(16),
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: sw(40),
    height: sh(40),
  },
  iconImage: {
    width: sw(48),
    height: sh(48),
  },
  badge: {
    position: 'absolute',
    top: sh(-2),
    right: sw(-2),
    backgroundColor: 'rgba(232, 44, 19, 0.9)',
    borderRadius: sw(8),
    width: sw(15),
    height: sw(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: sf(10),
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  titleWrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  titleGlow: {
    position: 'absolute',
    top: -sh(100),
    left: -sw(100),
    right: sw(-100),
    bottom: -sh(100),
    borderRadius: sw(14),
    opacity: 0.2,
  },
  title: {
    fontSize: sf(17),
    fontFamily: FONTS.sfProText,
    fontWeight: '700',
    letterSpacing: -0.32,
    color: '#E6C990',
    backgroundColor: 'transparent',
    position: 'relative',
    zIndex: 1,
  },
  subtitle: {
    fontSize: sf(13),
    fontFamily: FONTS.sfProText,
    fontWeight: '400',
    color: '#FFDE9C',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: sw(8),
    paddingRight: sw(20),
  },
  arrowIcon: {
    color: '#E6C990',
    fontSize: sf(34),
    marginTop: sh(-13),
  },
});

export default PremiumBanner; 