/**
 * Categories Slice Tests
 * Comprehensive test suite for Redux categories slice
 */

import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import categoriesReducer, {
  fetchCategories,
  clearCategories,
  setCategoriesError,
  clearCategoriesError,
} from '../categoriesSlice';
import { API_ENDPOINTS, API_ERRORS } from '../../../constants/api';
import { RootState, AppDispatch } from '../../../store/store'; 
import { Category } from '../../../types'; 

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Define mockCategories outside the describe block
const mockCategories: Category[] = [
  {
    id: 1,
    title: 'Indoor Plants',
    image: {
      id: 1,
      url: 'https://example.com/indoor.jpg',
      name: 'indoor-plants',
    },
    rank: 1,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'Outdoor Plants',
    image: {
      id: 2,
      url: 'https://example.com/outdoor.jpg',
      name: 'outdoor-plants',
    },
    rank: 2,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

// Helper function to setup the store for tests
const setupStore = () => {
  const store = configureStore({
    reducer: {
      categories: categoriesReducer,
    },
  });
  return store;
};

describe('Categories Slice', () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = store.getState().categories;
      expect(state).toEqual({
        categories: [],
        loading: false,
        error: null,
      });
    });
  });

  describe('Synchronous Actions', () => {
    describe('clearCategories', () => {
      it('should clear categories and error', () => {
       
        store.dispatch(setCategoriesError('Some error'));
        
        
        store.dispatch(clearCategories());
        
        const state = store.getState().categories;
        expect(state.categories).toEqual([]);
        expect(state.error).toBeNull();
      });
    });

    describe('setCategoriesError', () => {
      it('should set error message', () => {
        const errorMessage = 'Test error message';
        store.dispatch(setCategoriesError(errorMessage));
        
        const state = store.getState().categories;
        expect(state.error).toBe(errorMessage);
      });
    });

    describe('clearCategoriesError', () => {
      it('should clear error message', () => {
       
        store.dispatch(setCategoriesError('Some error'));
        store.dispatch(clearCategoriesError());
        
        const state = store.getState().categories;
        expect(state.error).toBeNull();
      });
    });
  });

  describe('Async Actions - fetchCategories', () => {
    describe('Successful fetch', () => {
      it('should fetch categories successfully', async () => {
        const mockResponse = {
          data: {
            data: mockCategories,
          },
        };
        mockedAxios.get.mockResolvedValue(mockResponse);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.loading).toBe(false);
        expect(state.categories).toEqual(mockCategories);
        expect(state.error).toBeNull();
        expect(mockedAxios.get).toHaveBeenCalledWith(
          API_ENDPOINTS.CATEGORIES,
          { timeout: 10000 }
        );
      });

      it('should handle empty response data', async () => {
        const mockResponse = {
          data: {
            data: [],
          },
        };
        mockedAxios.get.mockResolvedValue(mockResponse);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.categories).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
      });
    });

    describe('Loading states', () => {
      it('should set loading to true when fetch starts', () => {
        const mockPromise = new Promise(() => {}); 
        mockedAxios.get.mockReturnValue(mockPromise as any);

        store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
      });

      it('should set loading to false when fetch completes', async () => {
        const mockResponse = {
          data: {
            data: mockCategories,
          },
        };
        mockedAxios.get.mockResolvedValue(mockResponse);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.loading).toBe(false);
      });

      it('should set loading to false when fetch fails', async () => {
        mockedAxios.get.mockRejectedValue(new Error('Network error'));

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.loading).toBe(false);
      });
    });

    describe('Error handling', () => {
      it('should handle invalid response format', async () => {
        const mockResponse = {
          data: null, 
        };
        mockedAxios.get.mockResolvedValue(mockResponse);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Invalid response format');
        expect(state.categories).toEqual([]);
      });

      it('should handle network timeout', async () => {
        const timeoutError = new Error('timeout');
        timeoutError.name = 'AxiosError';
        (timeoutError as any).code = 'ECONNABORTED';
        (timeoutError as any).isAxiosError = true;
        mockedAxios.isAxiosError.mockReturnValue(true);
        mockedAxios.get.mockRejectedValue(timeoutError);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.error).toBe(API_ERRORS.TIMEOUT_ERROR);
      });

      it('should handle network connection error', async () => {
        const networkError = new Error('Network Error');
        networkError.name = 'AxiosError';
        (networkError as any).isAxiosError = true;
        (networkError as any).response = undefined;
        mockedAxios.isAxiosError.mockReturnValue(true);
        mockedAxios.get.mockRejectedValue(networkError);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.error).toBe(API_ERRORS.NETWORK_ERROR);
      });

      it('should handle server error with custom message', async () => {
        const serverError = new Error('Server Error');
        serverError.name = 'AxiosError';
        (serverError as any).isAxiosError = true;
        (serverError as any).response = {
          data: {
            message: 'Custom server error message',
          },
        };
        mockedAxios.isAxiosError.mockReturnValue(true);
        mockedAxios.get.mockRejectedValue(serverError);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.error).toBe('Custom server error message');
      });

      it('should handle server error without custom message', async () => {
        const serverError = new Error('Server Error');
        serverError.name = 'AxiosError';
        (serverError as any).isAxiosError = true;
        (serverError as any).response = {
          data: {},
        };
        mockedAxios.isAxiosError.mockReturnValue(true);
        mockedAxios.get.mockRejectedValue(serverError);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.error).toBe('Failed to fetch categories');
      });

      it('should handle unknown error', async () => {
        const unknownError = new Error('Unknown error');
        mockedAxios.isAxiosError.mockReturnValue(false);
        mockedAxios.get.mockRejectedValue(unknownError);

        await store.dispatch(fetchCategories());

        const state = store.getState().categories;
        expect(state.error).toBe(API_ERRORS.UNKNOWN_ERROR);
      });
    });

    describe('Console logging', () => {
      it('should log errors to console', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const error = new Error('Test error');
        mockedAxios.get.mockRejectedValue(error);

        await store.dispatch(fetchCategories());

        expect(consoleSpy).toHaveBeenCalledWith('Categories fetch error:', error);
        consoleSpy.mockRestore();
      });
    });
  });

  describe('State persistence', () => {
    it('should maintain state across multiple actions', async () => {
      
      store.dispatch(setCategoriesError('Initial error'));
      
      // Fetch categories successfully
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              title: 'Test Category',
              image: { id: 1, url: 'test.jpg', name: 'test' },
              rank: 1,
              createdAt: '2023-01-01T00:00:00Z',
              updatedAt: '2023-01-01T00:00:00Z',
            },
          ],
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);
      
      await store.dispatch(fetchCategories());
      
      const state = store.getState().categories;
      expect(state.categories).toHaveLength(1);
      expect(state.error).toBeNull(); 
      expect(state.loading).toBe(false);
    });
  });

  describe('Edge cases', () => {
    it('should handle concurrent fetch requests', async () => {
      const mockResponse = {
        data: {
          data: mockCategories,
        },
      };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const promises = [
        store.dispatch(fetchCategories()),
        store.dispatch(fetchCategories()),
        store.dispatch(fetchCategories()),
      ];

      await Promise.all(promises);

      const state = store.getState().categories;
      expect(state.categories).toEqual(mockCategories);
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
    });
  });
}); 