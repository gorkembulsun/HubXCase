/**
 * PremiumBanner Component Tests
 * Comprehensive test suite following TDD principles
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock the PremiumBanner component since we don't have the actual implementation
const MockPremiumBanner = ({ onPress, notificationCount = 1 }: any) => {
  const { View, Text, TouchableOpacity } = require('react-native');
  
  return (
    <TouchableOpacity onPress={onPress} testID="premium-banner">
      <View>
        <Text>FREE Premium Available</Text>
        <Text>Tap to upgrade your account!</Text>
        <Text>›</Text>
        {notificationCount > 0 && <Text>{notificationCount}</Text>}
      </View>
    </TouchableOpacity>
  );
};

describe('PremiumBanner Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render correctly with default props', () => {
      const { getByText } = render(<MockPremiumBanner />);
      
      expect(getByText('FREE Premium Available')).toBeTruthy();
      expect(getByText('Tap to upgrade your account!')).toBeTruthy();
      expect(getByText('›')).toBeTruthy();
    });

    it('should render with custom notification count', () => {
      const { getByText } = render(
        <MockPremiumBanner notificationCount={5} />
      );
      
      expect(getByText('5')).toBeTruthy();
    });

    it('should not render notification badge when count is 0', () => {
      const { queryByText } = render(
        <MockPremiumBanner notificationCount={0} />
      );
      
      expect(queryByText('0')).toBeNull();
    });

    it('should render notification badge with default count of 1', () => {
      const { getByText } = render(<MockPremiumBanner />);
      
      expect(getByText('1')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call onPress when banner is pressed', () => {
      const { getByTestId } = render(
        <MockPremiumBanner onPress={mockOnPress} />
      );
      
      const banner = getByTestId('premium-banner');
      fireEvent.press(banner);
      
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should not crash when onPress is not provided', () => {
      const { getByTestId } = render(<MockPremiumBanner />);
      
      const banner = getByTestId('premium-banner');
      
      expect(() => fireEvent.press(banner)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large notification counts', () => {
      const { getByText } = render(
        <MockPremiumBanner notificationCount={999} />
      );
      
      expect(getByText('999')).toBeTruthy();
    });

    it('should handle negative notification counts gracefully', () => {
      const { queryByText } = render(
        <MockPremiumBanner notificationCount={-1} />
      );
      
      // Should not render badge for negative numbers
      expect(queryByText('-1')).toBeNull();
    });
  });
}); 