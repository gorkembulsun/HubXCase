/**
 * Category Card Component
 * Displays individual category items in a grid layout
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import appTheme from '../../theme/appTheme';
import { Category } from '../../types/api';

const { sw, sh, sf, FONTS, COLORS } = appTheme;

interface CategoryCardProps {
  category: Category;
  onPress?: (category: Category) => void;
  isFullWidth?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  onPress, 
  isFullWidth = false 
}) => {
  const handlePress = () => {
    onPress?.(category);
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        isFullWidth && styles.fullWidthContainer
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: category.image.url }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {category.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width - sw(48) - sw(11)) / 2,
    height: sh(152),
    backgroundColor: '#F4F6F6',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(41, 187, 137, 0.18)',
    padding: sw(16),
    marginBottom: sh(16),
    overflow: 'hidden',
  },
  fullWidthContainer: {
    width: Dimensions.get('window').width - sw(48),
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: sw(143),
    height: sh(151),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: sf(16),
    fontFamily: FONTS.rubikBold,
    fontWeight: '500',
    color: COLORS.textDark,
    lineHeight: 21,
    letterSpacing: -0.32,
  },
});

export default CategoryCard; 