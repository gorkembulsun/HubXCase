import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Question, QuestionsState } from '../../types/api';
import { API_ENDPOINTS, API_CONFIG, API_ERRORS } from '../../constants/api';

// Initial state
const initialState: QuestionsState = {
  questions: [],
  loading: false,
  error: null,
};

/**
 * Async thunk for fetching plant-related questions from API
 * Includes proper error handling and timeout configuration
 */
export const fetchQuestions = createAsyncThunk<
  Question[],
  void,
  { rejectValue: string }
>(
  'questions/fetchQuestions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.QUESTIONS, {
        timeout: API_CONFIG.TIMEOUT,
      });
      
      if (!response.data) {
        return rejectWithValue('Invalid response format');
      }
      
      return response.data;
    } catch (error) {
      console.error('Questions fetch error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          return rejectWithValue(API_ERRORS.TIMEOUT_ERROR);
        }
        if (!error.response) {
          return rejectWithValue(API_ERRORS.NETWORK_ERROR);
        }
        return rejectWithValue(error.response.data?.message || 'Failed to fetch questions');
      }
      
      return rejectWithValue(API_ERRORS.UNKNOWN_ERROR);
    }
  }
);


const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    /**
     * Clears all questions from state
     */
    clearQuestions: (state) => {
      state.questions = [];
      state.error = null;
    },
    
   
    setQuestionsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    
    
    clearQuestionsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
        state.error = null;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || API_ERRORS.UNKNOWN_ERROR;
      });
  },
});

export const { 
  clearQuestions, 
  setQuestionsError, 
  clearQuestionsError 
} = questionsSlice.actions;

export default questionsSlice.reducer; 