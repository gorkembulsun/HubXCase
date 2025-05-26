/**
 * API response types and interfaces
 * Centralized type definitions for better type safety and maintainability
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface Category {
  id: number;
  title: string;
  image: {
    id: number;
    url: string;
    name: string;
  };
  rank: number;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
}

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface QuestionsState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

export interface AppState {
  searchQuery: string;
  isOnboardingCompleted: boolean;
}

// API endpoint types
export interface ApiEndpoints {
  CATEGORIES: string;
  QUESTIONS: string;
}

// Error handling types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
} 