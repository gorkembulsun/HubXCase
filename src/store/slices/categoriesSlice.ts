import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category, CategoriesState, ApiError } from '../../types/api';
import { API_ENDPOINTS, API_CONFIG, API_ERRORS } from '../../constants/api';

// Initial state
const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

/**
 * Async thunk for fetching plant categories from API
 * Includes proper error handling and timeout configuration
 */
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.CATEGORIES, {
        timeout: API_CONFIG.TIMEOUT,
      });
      
      if (!response.data?.data) {
        return rejectWithValue('Invalid response format');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('Categories fetch error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          return rejectWithValue(API_ERRORS.TIMEOUT_ERROR);
        }
        if (!error.response) {
          return rejectWithValue(API_ERRORS.NETWORK_ERROR);
        }
        return rejectWithValue(error.response.data?.message || 'Failed to fetch categories');
      }
      
      return rejectWithValue(API_ERRORS.UNKNOWN_ERROR);
    }
  }
);

/**
 * Categories slice with improved error handling and state management
 */
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    /**
     * Clears all categories from state
     */
    clearCategories: (state) => {
      state.categories = [];
      state.error = null;
    },
    
    /**
     * Sets a custom error message
     */
    setCategoriesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    
    /**
     * Resets the error state
     */
    clearCategoriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || API_ERRORS.UNKNOWN_ERROR;
      });
  },
});

export const { 
  clearCategories, 
  setCategoriesError, 
  clearCategoriesError 
} = categoriesSlice.actions;

export default categoriesSlice.reducer; 