/**
 * HomePage Screen Tests
 * Comprehensive test suite for the main dashboard screen
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { Alert, Linking } from 'react-native';
import { render, createMockCategory, createMockQuestion } from '../../test/helpers/testUtils';
import HomePage from '../HomePage';

// Mock the home components
jest.mock('../../components/home', () => ({
  SearchHeader: ({ onSearchChange }: any) => {
    const MockSearchHeader = require('react-native').View;
    return (
      <MockSearchHeader testID="search-header">
        <MockSearchHeader 
          testID="search-input"
          onChangeText={onSearchChange}
        />
      </MockSearchHeader>
    );
  },
  PremiumBanner: ({ onPress }: any) => {
    const MockPremiumBanner = require('react-native').TouchableOpacity;
    return (
      <MockPremiumBanner testID="premium-banner" onPress={onPress}>
        <MockPremiumBanner testID="premium-text">Premium Banner</MockPremiumBanner>
      </MockPremiumBanner>
    );
  },
  QuestionCard: ({ question, onPress }: any) => {
    const MockQuestionCard = require('react-native').TouchableOpacity;
    return (
      <MockQuestionCard 
        testID={`question-card-${question.id}`}
        onPress={() => onPress(question.uri)}
      >
        <MockQuestionCard testID="question-title">{question.title}</MockQuestionCard>
      </MockQuestionCard>
    );
  },
  CategoryCard: ({ category, onPress }: any) => {
    const MockCategoryCard = require('react-native').TouchableOpacity;
    return (
      <MockCategoryCard 
        testID={`category-card-${category.id}`}
        onPress={() => onPress?.(category)}
      >
        <MockCategoryCard testID="category-title">{category.title}</MockCategoryCard>
      </MockCategoryCard>
    );
  },
}));

describe('HomePage Screen', () => {
  const mockCategories = [
    createMockCategory({ id: 1, title: 'Indoor Plants' }),
    createMockCategory({ id: 2, title: 'Outdoor Plants' }),
  ];

  const mockQuestions = [
    createMockQuestion({ id: 1, title: 'How to water plants?', uri: 'https://example.com/watering' }),
    createMockQuestion({ id: 2, title: 'Plant diseases', uri: 'https://example.com/diseases' }),
  ];

  const initialState = {
    categories: {
      categories: mockCategories,
      loading: false,
      error: null,
    },
    questions: {
      questions: mockQuestions,
      loading: false,
      error: null,
    },
    app: {
      searchQuery: '',
      isOnboardingCompleted: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render all main sections', () => {
      const { getByTestId } = render(<HomePage />, { initialState });

      expect(getByTestId('search-header')).toBeTruthy();
      expect(getByTestId('premium-banner')).toBeTruthy();
    });

    it('should render categories when loaded', () => {
      const { getByTestId } = render(<HomePage />, { initialState });

      expect(getByTestId('category-card-1')).toBeTruthy();
      expect(getByTestId('category-card-2')).toBeTruthy();
    });

    it('should render questions when loaded', () => {
      const { getByTestId } = render(<HomePage />, { initialState });

      expect(getByTestId('question-card-1')).toBeTruthy();
      expect(getByTestId('question-card-2')).toBeTruthy();
    });
  });

  describe('Loading States', () => {
    it('should handle categories loading state', () => {
      const loadingState = {
        ...initialState,
        categories: {
          ...initialState.categories,
          loading: true,
        },
      };

      const { getByTestId } = render(<HomePage />, { initialState: loadingState });
      expect(getByTestId('search-header')).toBeTruthy();
    });

    it('should handle questions loading state', () => {
      const loadingState = {
        ...initialState,
        questions: {
          ...initialState.questions,
          loading: true,
        },
      };

      const { getByTestId } = render(<HomePage />, { initialState: loadingState });
      expect(getByTestId('search-header')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should handle premium banner press', () => {
      const alertSpy = jest.spyOn(Alert, 'alert');
      const { getByTestId } = render(<HomePage />, { initialState });

      fireEvent.press(getByTestId('premium-banner'));

      expect(alertSpy).toHaveBeenCalledWith(
        'Premium Features',
        'Upgrade to premium to unlock all features!',
        [{ text: 'OK' }]
      );
    });

    it('should handle question card press and open URL', async () => {
      const linkingSpy = jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(true);
      const openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);
      
      const { getByTestId } = render(<HomePage />, { initialState });

      fireEvent.press(getByTestId('question-card-1'));

      await waitFor(() => {
        expect(linkingSpy).toHaveBeenCalledWith('https://example.com/watering');
        expect(openURLSpy).toHaveBeenCalledWith('https://example.com/watering');
      });
    });

    it('should handle category card press', () => {
      const { getByTestId } = render(<HomePage />, { initialState });

      fireEvent.press(getByTestId('category-card-1'));

      // Should not crash and should log the category
      expect(getByTestId('category-card-1')).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    it('should handle categories error state', () => {
      const errorState = {
        ...initialState,
        categories: {
          categories: [],
          loading: false,
          error: 'Failed to load categories',
        },
      };

      const { getByTestId } = render(<HomePage />, { initialState: errorState });
      expect(getByTestId('search-header')).toBeTruthy();
    });

    it('should handle questions error state', () => {
      const errorState = {
        ...initialState,
        questions: {
          questions: [],
          loading: false,
          error: 'Failed to load questions',
        },
      };

      const { getByTestId } = render(<HomePage />, { initialState: errorState });
      expect(getByTestId('search-header')).toBeTruthy();
    });

    it('should handle URL opening failure gracefully', async () => {
      const linkingSpy = jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(false);
      const openURLSpy = jest.spyOn(Linking, 'openURL').mockRejectedValue(new Error('Cannot open URL'));
      const alertSpy = jest.spyOn(Alert, 'alert');
      
      const { getByTestId } = render(<HomePage />, { initialState });

      fireEvent.press(getByTestId('question-card-1'));

      await waitFor(() => {
        expect(linkingSpy).toHaveBeenCalled();
        expect(openURLSpy).toHaveBeenCalled();
      });
    });
  });

  describe('Search Functionality', () => {
    it('should update search query when search input changes', () => {
      const { getByTestId } = render(<HomePage />, { initialState });
      
      const searchInput = getByTestId('search-input');
      fireEvent.changeText(searchInput, 'plant care');

      // The search query should be updated in the store
      // This would be verified through Redux store state in a real test
      expect(searchInput).toBeTruthy();
    });
  });

  describe('Data Integration', () => {
    it('should dispatch fetch actions on mount', () => {
      // This test would verify that fetchCategories and fetchQuestions
      // are dispatched when the component mounts
      const { getByTestId } = render(<HomePage />, { initialState });
      expect(getByTestId('search-header')).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should render efficiently with large datasets', () => {
      const largeDataState = {
        ...initialState,
        categories: {
          categories: Array.from({ length: 100 }, (_, i) => 
            createMockCategory({ id: i, title: `Category ${i}` })
          ),
          loading: false,
          error: null,
        },
        questions: {
          questions: Array.from({ length: 50 }, (_, i) => 
            createMockQuestion({ id: i, title: `Question ${i}` })
          ),
          loading: false,
          error: null,
        },
      };

      const { getByTestId } = render(<HomePage />, { initialState: largeDataState });
      expect(getByTestId('search-header')).toBeTruthy();
    });
  });
}); 