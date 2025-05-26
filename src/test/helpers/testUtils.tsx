/**
 * Test Utilities
 * Reusable test helpers and custom render functions
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Mock reducers for testing
const mockCategoriesReducer = (state = { categories: [], loading: false, error: null }, action: any) => state;
const mockQuestionsReducer = (state = { questions: [], loading: false, error: null }, action: any) => state;
const mockAppReducer = (state = { searchQuery: '', isOnboardingCompleted: true }, action: any) => state;

// Mock store configuration
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      categories: mockCategoriesReducer,
      questions: mockQuestionsReducer,
      app: mockAppReducer,
    },
    preloadedState: initialState,
  });
};

// Custom render function with Redux Provider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: any;
  store?: any;
}

const customRender = (
  ui: ReactElement,
  {
    initialState = {},
    store = createMockStore(initialState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock data factories
export const createMockCategory = (overrides = {}) => ({
  id: 1,
  title: 'Test Category',
  image: {
    id: 1,
    url: 'https://test.com/image.jpg',
    name: 'test-image',
  },
  rank: 1,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockQuestion = (overrides = {}) => ({
  id: 1,
  title: 'Test Question',
  subtitle: 'Test Subtitle',
  image_uri: 'https://test.com/question.jpg',
  uri: 'https://test.com/article',
  order: 1,
  ...overrides,
});

export const createMockNavigationProp = () => ({
  navigate: jest.fn(),
  replace: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  setParams: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  canGoBack: jest.fn().mockReturnValue(true),
  isFocused: jest.fn().mockReturnValue(true),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  setOptions: jest.fn(),
  reset: jest.fn(),
  getParent: jest.fn(),
  getState: jest.fn(),
  getId: jest.fn(),
});

export const createMockRouteProp = (params = {}) => ({
  key: 'test-route',
  name: 'TestScreen',
  params,
});

// Wait for async operations
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

// Re-export everything from testing library
export * from '@testing-library/react-native';
export { customRender as render }; 