import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
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

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  // Icon mapping for each route
  const getIconSource = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return require('../assets/tabBarComponent/homeicon.png');
      case 'Diagnose':
        return require('../assets/tabBarComponent/healthcare.png');
      case 'Scan':
        return require('../assets/tabBarComponent/Scan_button.png');
      case 'MyGarden':
        return require('../assets/tabBarComponent/leaficon.png');
      case 'Profile':
        return require('../assets/tabBarComponent/profileicon.png');
      default:
        return require('../assets/tabBarComponent/homeicon.png');
    }
  };

  // Label mapping for each route
  const getLabel = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Diagnose':
        return 'Diagnose';
      case 'Scan':
        return 'Scan';
      case 'MyGarden':
        return 'My Garden';
      case 'Profile':
        return 'Profile';
      default:
        return routeName;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.tabBarContainer}>
        <View style={styles.leftTabsContainer}> 
          {state.routes.slice(0, 2).map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabBarButton
                key={route.key}
                label={getLabel(route.name)}
                iconSource={getIconSource(route.name)}
                onPress={onPress}
                isFocused={isFocused}
              />
            );
          })}
        </View>

        {/* Scan Button (middle) */}
        {state.routes[2] && (
          <TabBarButton
            label={getLabel(state.routes[2].name)}
            iconSource={getIconSource(state.routes[2].name)}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: state.routes[2].key,
                canPreventDefault: true,
              });

              if (!event.defaultPrevented) {
                navigation.navigate(state.routes[2].name);
              }
            }}
            isScanButton
          />
        )}
        
        <View style={styles.rightTabsContainer}>
          {state.routes.slice(3, 5).map((route, index) => {
            const actualIndex = index + 3;
            const isFocused = state.index === actualIndex;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TabBarButton
                key={route.key}
                label={getLabel(route.name)}
                iconSource={getIconSource(route.name)}
                onPress={onPress}
                isFocused={isFocused}
              />
            );
          })}
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