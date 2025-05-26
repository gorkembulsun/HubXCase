import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
interface AppState {
  isOnboardingCompleted: boolean;
  currentScreen: string;
  isLoading: boolean;
  networkStatus: 'online' | 'offline';
  searchQuery: string;
  selectedCategory: string | null;
  scanHistory: ScanResult[];
  favorites: string[]; 
  recentSearches: string[];
}

export interface ScanResult {
  id: string;
  plantName: string;
  confidence: number;
  imageUri: string;
  timestamp: number;
  details?: {
    scientificName?: string;
    family?: string;
    description?: string;
  };
}

// Initial state
const initialState: AppState = {
  isOnboardingCompleted: false,
  currentScreen: 'Onboarding',
  isLoading: false,
  networkStatus: 'online',
  searchQuery: '',
  selectedCategory: null,
  scanHistory: [],
  favorites: [],
  recentSearches: [],
};

// App slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.isOnboardingCompleted = action.payload;
    },
    setCurrentScreen: (state, action: PayloadAction<string>) => {
      state.currentScreen = action.payload;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNetworkStatus: (state, action: PayloadAction<'online' | 'offline'>) => {
      state.networkStatus = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    addScanResult: (state, action: PayloadAction<ScanResult>) => {
      state.scanHistory.unshift(action.payload); // Add to beginning
      // Keep only last 50 scans
      if (state.scanHistory.length > 50) {
        state.scanHistory = state.scanHistory.slice(0, 50);
      }
    },
    removeScanResult: (state, action: PayloadAction<string>) => {
      state.scanHistory = state.scanHistory.filter(scan => scan.id !== action.payload);
    },
    clearScanHistory: (state) => {
      state.scanHistory = [];
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.recentSearches.includes(query)) {
        state.recentSearches.unshift(query);
        // Keep only last 10 searches
        if (state.recentSearches.length > 10) {
          state.recentSearches = state.recentSearches.slice(0, 10);
        }
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
  },
});

export const {
  setOnboardingCompleted,
  setCurrentScreen,
  setAppLoading,
  setNetworkStatus,
  setSearchQuery,
  setSelectedCategory,
  addScanResult,
  removeScanResult,
  clearScanHistory,
  addToFavorites,
  removeFromFavorites,
  addRecentSearch,
  clearRecentSearches,
} = appSlice.actions;

export default appSlice.reducer; 