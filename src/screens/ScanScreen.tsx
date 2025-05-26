import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import appTheme from '../theme/appTheme';

const { sw, sh, sf, COLORS, FONTS } = appTheme;

const ScanScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scan Plant</Text>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sw(24),
  },
  title: {
    fontSize: sf(24),
    fontFamily: FONTS.rubikBold,
    color: '#13231B',
    marginBottom: sh(16),
  },
 
});

export default ScanScreen; 