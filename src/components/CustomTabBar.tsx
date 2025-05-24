import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import appTheme from '../theme/appTheme';

const { sw, sh, sf, COLORS, FONTS } = appTheme;

// Figma specified dimensions and positions
const FIGMA_TAB_BAR_HEIGHT = 84;
const FIGMA_ICON_SIZE = 25;
const FIGMA_SCAN_BUTTON_WIDTH = 74;
const FIGMA_SCAN_BUTTON_HEIGHT = 64;
const FIGMA_SCAN_BUTTON_X_POSITION = 150.5; // (375 - 74) / 2, close to Figma's 151
const FIGMA_ICON_TOP_PADDING = 6;
const FIGMA_LABEL_FONT_SIZE = 10;
const FIGMA_TAB_ITEM_WIDTH = 74; // Approximate width of each tab item area

// Scaled dimensions
const TAB_BAR_HEIGHT = sh(FIGMA_TAB_BAR_HEIGHT);
const ICON_SIZE = sh(FIGMA_ICON_SIZE);
const SCAN_ICON_CONTAINER_WIDTH = sw(FIGMA_SCAN_BUTTON_WIDTH);
const SCAN_ICON_CONTAINER_HEIGHT = sh(FIGMA_SCAN_BUTTON_HEIGHT);

interface TabBarButtonProps {
  label: string;
  iconSource: any;
  onPress: () => void;
  isFocused?: boolean;
  isScanButton?: boolean;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({ label, iconSource, onPress, isFocused, isScanButton }) => {
  if (isScanButton) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.scanButtonContainer}>
        <Image source={iconSource} style={styles.scanIcon} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <Image 
        source={iconSource} 
        style={[
          styles.icon, 
          { tintColor: isFocused ? COLORS.primary : COLORS.textInactiveTab }
        ]} 
        resizeMode="contain" 
      />
      <Text style={[styles.label, { color: isFocused ? COLORS.primary : COLORS.textInactiveTab }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomTabBar = () => {
  const handleHomePress = () => console.log('Home pressed');
  const handleDiagnosePress = () => console.log('Diagnose pressed');
  const handleScanPress = () => console.log('Scan pressed');
  const handleMyGardenPress = () => console.log('My Garden pressed');
  const handleProfilePress = () => console.log('Profile pressed');

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.tabBarContainer}>
        <View style={styles.leftTabsContainer}> 
          <TabBarButton 
            label="Home" 
            iconSource={require('../assets/tabBarComponent/homeicon.png')} 
            onPress={handleHomePress} 
            isFocused
          />
          <TabBarButton 
            label="Diagnose" 
            iconSource={require('../assets/tabBarComponent/healthcare.png')} 
            onPress={handleDiagnosePress} 
          />
        </View>

        <TabBarButton 
            label="Scan"
            iconSource={require('../assets/tabBarComponent/Scan_button.png')}
            onPress={handleScanPress} 
            isScanButton
        />
        
        <View style={styles.rightTabsContainer}>
          <TabBarButton 
            label="My Garden" 
            iconSource={require('../assets/tabBarComponent/leaficon.png')} 
            onPress={handleMyGardenPress} 
          />
          <TabBarButton 
            label="Profile" 
            iconSource={require('../assets/tabBarComponent/profileicon.png')} 
            onPress={handleProfilePress} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: COLORS.tabBarBackground,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarContainer: {
    height: TAB_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    borderTopWidth: 0.5,
    borderTopColor: COLORS.tabBarBorder,
  },
  leftTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  rightTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: sh(FIGMA_ICON_TOP_PADDING),
    width: sw(FIGMA_TAB_ITEM_WIDTH),
    height: '100%',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginBottom: sh(4),
  },
  label: {
    fontSize: sf(FIGMA_LABEL_FONT_SIZE),
    fontFamily: FONTS.rubikRegular,
    textAlign: 'center',
  },
  scanButtonContainer: {
    position: 'absolute',
    left: sw(FIGMA_SCAN_BUTTON_X_POSITION),
    bottom: sh(43),
    width: SCAN_ICON_CONTAINER_WIDTH,
    height: SCAN_ICON_CONTAINER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  scanIcon: {
    width: '100%',
    height: '100%',
  },
});

export default CustomTabBar; 