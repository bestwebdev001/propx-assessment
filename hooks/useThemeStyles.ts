import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { usePropxTheme } from '@/providers';

export const useThemedStyles = (styles: any) => {
  const { theme } = usePropxTheme(); // Get the current theme

  const themedStyles = useMemo(() => {
    return StyleSheet.create(
      Object.keys(styles).reduce((acc, key) => {
        acc[key] = typeof styles[key] === 'function'
          ? styles[key](theme)
          : styles[key];
        return acc;
      }, {} as Record<string, any>)
    );
  }, [theme]);

  return themedStyles;
};
