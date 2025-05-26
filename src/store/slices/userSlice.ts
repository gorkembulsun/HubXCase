import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  isPremium: boolean;
  preferences: {
    notifications: boolean;
    language: string;
    theme: 'light' | 'dark';
  };
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
      if (state.user) {
        state.user.preferences = { ...state.user.preferences, ...action.payload };
      }
    },
    setPremiumStatus: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.isPremium = action.payload;
      }
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  updateUser,
  updateUserPreferences,
  setPremiumStatus,
  setUserLoading,
  setUserError,
  logout,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer; 