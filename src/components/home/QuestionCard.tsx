/**
 * Question Card Component
 * Displays individual question items in the "Get Started" section
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import appTheme from '../../theme/appTheme';
import { Question } from '../../types/api';

const { sw, sh, sf, FONTS } = appTheme;

interface QuestionCardProps {
  question: Question;
  onPress: (uri: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onPress }) => {
  const handlePress = () => {
    onPress(question.uri);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: question.image_uri }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {question.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sw(240),
    height: sh(164),
    marginRight: sw(10),
  },
  imageContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: sw(14),
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    fontSize: sf(15),
    fontFamily: FONTS.rubikBold,
    fontWeight: '500',
    color: 'white',
    lineHeight: 20,
    letterSpacing: -0.24,
  },
});

export default QuestionCard; 