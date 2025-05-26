/**
 * Search Header Component
 * Contains greeting text and search input with background image
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import appTheme from '../../theme/appTheme';
import { IMAGES } from '../../constants/images';

const { sw, sh, sf, COLORS, FONTS } = appTheme;

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  greeting?: string;
  subGreeting?: string;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  onSearchChange,
  greeting = "Hi, plant lover!",
  subGreeting = "Good Afternoon! ⛅"
}) => {
  return (
    <ImageBackground 
      source={IMAGES.HOME.BACKGROUND} 
      style={styles.container}
      resizeMode="contain"
      imageStyle={styles.backgroundImageStyle}
    >
      <View style={styles.overlay}>
        <SafeAreaView>
          <View style={styles.statusBarSpace} />
          
          {/* Greeting Section */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>{greeting}</Text>
            <Text style={styles.greetingSubtext}>{subGreeting}</Text>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchIconContainer}>
              <FontAwesome name="search" size={sf(24)} color="#ABABAB" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for plants"
              placeholderTextColor="#AFAFAF"
              value={searchQuery}
              onChangeText={onSearchChange}
            />
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  backgroundImageStyle: {
    width: '100%',
    height: sh(270),
    position: 'absolute',
    right: 0,
    opacity: 0.8,
  },
  overlay: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.1)',
  },
  statusBarSpace: {
    height: Platform.OS === 'ios' ? 0 : sh(24),
  },
  greetingContainer: {
    paddingHorizontal: sw(24),
    marginTop: sh(0),
    marginBottom: sh(12),
  },
  greetingText: {
    fontSize: sf(16),
    fontFamily: FONTS.rubikRegular,
    color: COLORS.textDark,
    letterSpacing: 0.07,
    marginBottom: sh(6),
  },
  greetingSubtext: {
    fontSize: sf(24),
    fontFamily: FONTS.rubikBold,
    fontWeight: '500',
    color: COLORS.textDark,
    letterSpacing: 0.035,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    marginHorizontal: sw(24),
    marginBottom: sh(16),
    borderRadius: 12,
    borderWidth: 0.2,
    borderColor: 'rgba(60, 60, 67, 0.25)',
    height: sh(44),
  },
  searchIconContainer: {
    paddingLeft: sw(16),
    paddingRight: sw(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: sf(15.5),
    fontFamily: FONTS.rubikRegular,
    color: COLORS.textDark,
    paddingRight: sw(16),
  },
});

export default SearchHeader; 