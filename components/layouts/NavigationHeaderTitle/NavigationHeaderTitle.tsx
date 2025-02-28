import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { usePropxTheme } from '@/providers';

const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
  },
});

export default function NavigationHeaderTitle() {
  const { theme } = usePropxTheme()

  return <Text style={{ fontSize: 20, color: theme.colors.text, fontWeight: 'bold' }}>! Bet !</Text>;
}
