/**
 * API configuration and endpoints
 * Centralized API constants for better maintainability
 */

export const API_CONFIG = {
  BASE_URL: 'https://dummy-api-jtg6bessta-ey.a.run.app',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  CATEGORIES: `${API_CONFIG.BASE_URL}/getCategories`,
  QUESTIONS: `${API_CONFIG.BASE_URL}/getQuestions`,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const API_ERRORS = {
  NETWORK_ERROR: 'Network connection failed',
  TIMEOUT_ERROR: 'Request timeout',
  UNKNOWN_ERROR: 'An unknown error occurred',
  INVALID_URL: 'Invalid URL format',
} as const; 