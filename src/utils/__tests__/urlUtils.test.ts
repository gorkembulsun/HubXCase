/**
 * URL Utils Tests
 * Comprehensive test suite for URL utility functions
 */

// Mock React Native modules first
jest.mock('react-native', () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn(),
  },
  Alert: {
    alert: jest.fn(),
  },
}));

import { Linking, Alert } from 'react-native';
import { isValidUrl, normalizeUrl, openExternalUrl } from '../urlUtils';

const mockLinking = Linking as jest.Mocked<typeof Linking>;
const mockAlert = Alert as jest.Mocked<typeof Alert>;

describe('URL Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      const validUrls = [
        'https://example.com',
        'http://example.com',
        'https://www.example.com',
        'example.com',
        'www.example.com',
      ];

      validUrls.forEach(url => {
        expect(isValidUrl(url)).toBe(true);
      });
    });

    it('should return false for invalid URLs', () => {
      const invalidUrls = [
        '',
        ' ',
        'not-a-url',
        'javascript:alert("xss")',
      ];

      invalidUrls.forEach(url => {
        expect(isValidUrl(url)).toBe(false);
      });
    });

    it('should handle edge cases', () => {
      expect(isValidUrl('  https://example.com  ')).toBe(true);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl(null as any)).toBe(false);
      expect(isValidUrl(undefined as any)).toBe(false);
    });
  });

  describe('normalizeUrl', () => {
    it('should not modify URLs that already have protocol', () => {
      const url = 'https://example.com';
      expect(normalizeUrl(url)).toBe(url);
    });

    it('should add https protocol to URLs without protocol', () => {
      expect(normalizeUrl('example.com')).toBe('https://example.com');
      expect(normalizeUrl('www.example.com')).toBe('https://www.example.com');
    });

    it('should handle edge cases', () => {
      expect(normalizeUrl('  example.com  ')).toBe('https://example.com');
      expect(normalizeUrl('')).toBe('https://');
    });
  });

  describe('openExternalUrl', () => {
    it('should open valid URL when canOpenURL returns true', async () => {
      mockLinking.canOpenURL.mockResolvedValue(true);
      mockLinking.openURL.mockResolvedValue(true);

      await openExternalUrl('https://example.com');

      expect(mockLinking.canOpenURL).toHaveBeenCalledWith('https://example.com');
      expect(mockLinking.openURL).toHaveBeenCalledWith('https://example.com');
      expect(mockAlert.alert).not.toHaveBeenCalled();
    });

    it('should show alert for invalid URLs', async () => {
      const mockOnError = jest.fn();

      await openExternalUrl('invalid-url', mockOnError);

      expect(mockAlert.alert).toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
      mockLinking.canOpenURL.mockRejectedValue(new Error('Network error'));
      const mockOnError = jest.fn();

      await openExternalUrl('https://example.com', mockOnError);

      expect(mockAlert.alert).toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalled();
    });
  });
}); 