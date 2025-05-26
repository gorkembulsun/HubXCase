/**
 * URL utility functions for handling external links
 * Provides safe URL validation and opening functionality
 */

import { Linking, Alert } from 'react-native';
import { API_ERRORS } from '../constants/api';

/**
 * Validates if a string is a valid URL format
   @param url 
   @returns 
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url.trim());
  } catch {
    return false;
  }
};

/**
 * Normalizes URL by adding protocol if missing
   @param url 
   @returns 
 */
export const normalizeUrl = (url: string): string => {
  const cleanUrl = url.trim();
  
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    return `https://${cleanUrl}`;
  }
  
  return cleanUrl;
};

/**
 * Safely opens an external URL with error handling
   @param url 
   @param onError 
 */
export const openExternalUrl = async (
  url: string,
  onError?: (error: string) => void
): Promise<void> => {
  try {
    console.log('Attempting to open URL:', url);
    
    if (!isValidUrl(url)) {
      const errorMessage = `${API_ERRORS.INVALID_URL}: ${url}`;
      console.error(errorMessage);
      onError?.(errorMessage);
      Alert.alert('Error', errorMessage);
      return;
    }
    
    const normalizedUrl = normalizeUrl(url);
    console.log('Normalized URL:', normalizedUrl);
    
    const canOpen = await Linking.canOpenURL(normalizedUrl);
    console.log('URL can be opened:', canOpen);
    
    if (canOpen) {
      await Linking.openURL(normalizedUrl);
    } else {
      // Fallback: try to open anyway as canOpenURL sometimes returns false positives
      console.log('Attempting fallback URL opening...');
      try {
        await Linking.openURL(normalizedUrl);
      } catch (fallbackError) {
        const errorMessage = `Cannot open URL: ${normalizedUrl}`;
        console.error('Fallback failed:', fallbackError);
        onError?.(errorMessage);
        Alert.alert('Error', errorMessage);
      }
    }
  } catch (error) {
    const errorMessage = `Failed to open URL: ${url}`;
    console.error('URL opening error:', error);
    onError?.(errorMessage);
    Alert.alert('Error', errorMessage);
  }
}; 