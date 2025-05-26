/**
 * API Constants Tests
 * Tests for API configuration and constants
 */

import { API_ENDPOINTS, API_CONFIG, API_ERRORS } from '../api';

describe('API Constants', () => {
  describe('API_CONFIG', () => {
    it('should have correct base URL', () => {
      expect(API_CONFIG.BASE_URL).toBe('https://dummy-api-jtg6bessta-ey.a.run.app');
    });

    it('should have correct timeout value', () => {
      expect(API_CONFIG.TIMEOUT).toBe(10000);
    });

    it('should have retry attempts configured', () => {
      expect(API_CONFIG.RETRY_ATTEMPTS).toBe(3);
    });
  });

  describe('API_ENDPOINTS', () => {
    it('should have categories endpoint', () => {
      expect(API_ENDPOINTS.CATEGORIES).toBe('https://dummy-api-jtg6bessta-ey.a.run.app/getCategories');
    });

    it('should have questions endpoint', () => {
      expect(API_ENDPOINTS.QUESTIONS).toBe('https://dummy-api-jtg6bessta-ey.a.run.app/getQuestions');
    });
  });

  describe('API_ERRORS', () => {
    it('should have network error message', () => {
      expect(API_ERRORS.NETWORK_ERROR).toBe('Network connection failed');
    });

    it('should have timeout error message', () => {
      expect(API_ERRORS.TIMEOUT_ERROR).toBe('Request timeout');
    });

    it('should have unknown error message', () => {
      expect(API_ERRORS.UNKNOWN_ERROR).toBe('An unknown error occurred');
    });

    it('should have invalid URL error message', () => {
      expect(API_ERRORS.INVALID_URL).toBe('Invalid URL format');
    });
  });

  describe('Constants validation', () => {
    it('should have all required config values', () => {
      const requiredConfig = ['BASE_URL', 'TIMEOUT', 'RETRY_ATTEMPTS'];
      requiredConfig.forEach(config => {
        expect(API_CONFIG).toHaveProperty(config);
      });
    });

    it('should have all required endpoints', () => {
      const requiredEndpoints = ['CATEGORIES', 'QUESTIONS'];
      requiredEndpoints.forEach(endpoint => {
        expect(API_ENDPOINTS).toHaveProperty(endpoint);
        expect(typeof API_ENDPOINTS[endpoint as keyof typeof API_ENDPOINTS]).toBe('string');
      });
    });

    it('should have all required error messages', () => {
      const requiredErrors = ['NETWORK_ERROR', 'TIMEOUT_ERROR', 'UNKNOWN_ERROR', 'INVALID_URL'];
      requiredErrors.forEach(error => {
        expect(API_ERRORS).toHaveProperty(error);
        expect(typeof API_ERRORS[error as keyof typeof API_ERRORS]).toBe('string');
        expect(API_ERRORS[error as keyof typeof API_ERRORS].length).toBeGreaterThan(0);
      });
    });
  });
}); 