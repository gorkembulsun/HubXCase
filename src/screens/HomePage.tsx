/**
 * HomePage Screen
 * Main dashboard screen displaying plant categories, questions, and premium features
 * Refactored for better maintainability and code organization
 */

import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import appTheme from '../theme/appTheme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCategories } from '../store/slices/categoriesSlice';
import { fetchQuestions } from '../store/slices/questionsSlice';
import { setSearchQuery } from '../store/slices/appSlice';
import { openExternalUrl } from '../utils';
import { Category, Question } from '../types';

// Components
import {
  SearchHeader,
  PremiumBanner,
  QuestionCard,
  CategoryCard,
} from '../components/home';

const { sw, sh, sf, COLORS, FONTS } = appTheme;

/**
 * HomePage Component
 * Displays the main dashboard with search, premium banner, questions, and categories
 */
const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Redux state selectors
  const { categories, loading: categoriesLoading } = useAppSelector(state => state.categories);
  const { questions, loading: questionsLoading } = useAppSelector(state => state.questions);
  const { searchQuery } = useAppSelector(state => state.app);
  
  const isLoading = categoriesLoading || questionsLoading;

  
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchQuestions());
  }, [dispatch]);

  
  const handleSearchChange = useCallback((text: string) => {
    dispatch(setSearchQuery(text));
  }, [dispatch]);

  
  const handleQuestionPress = useCallback(async (uri: string) => {
    await openExternalUrl(uri, (error) => {
      console.error('Question URL error:', error);
    });
  }, []);

  
  const handlePremiumPress = useCallback(() => {
    Alert.alert(
      'Premium Features',
      'Upgrade to premium to unlock all features!',
      [{ text: 'OK' }]
    );
  }, []);

  /**
   * Handle category card press
   */
  const handleCategoryPress = useCallback((category: Category) => {
    console.log('Category pressed:', category.title);
    // TODO: Navigate to category detail screen
  }, []);

 
  const renderQuestionsSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Get Started</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollView}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        {questions.map((question: Question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onPress={handleQuestionPress}
          />
        ))}
      </ScrollView>
    </View>
  );

 
  const renderCategoriesSection = () => (
    <View style={styles.categoriesContainer}>
      {categories.map((category, index) => {
        const isLastItem = index === categories.length - 1;
        const isFullWidth = isLastItem && categories.length % 2 !== 0;
        
        return (
          <CategoryCard
            key={category.id}
            category={category}
            onPress={handleCategoryPress}
            isFullWidth={isFullWidth}
          />
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
     
      <View style={styles.backgroundOverlay} />
      
      {/* Main content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <View style={styles.premiumBannerContainer}>
          <PremiumBanner onPress={handlePremiumPress} />
        </View>

        {renderQuestionsSection()}
        {renderCategoriesSection()}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F6F6F6D6',
    opacity: 0.96,
    zIndex: -1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: sh(24),
  },
  sectionContainer: {
    marginBottom: sh(24),
  },
  sectionTitle: {
    fontSize: sf(15),
    fontFamily: FONTS.rubikBold,
    fontWeight: '500',
    color: COLORS.textDark,
    marginBottom: sh(16),
    marginHorizontal: sw(24),
  },
  horizontalScrollView: {
    paddingLeft: sw(24),
  },
  horizontalScrollContent: {
    paddingRight: sw(24),
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: sw(24),
    justifyContent: 'space-between',
  },
  premiumBannerContainer: {
    marginTop: sh(24),
  },
  bottomSpacing: {
    height: sh(120),
  },
});

export default HomePage; 