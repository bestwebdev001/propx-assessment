import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
// import { useColorScheme } from 'react-native';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const PropxDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: '#ffffff',
  },
};

const PropxLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
  },
};

interface PropxThemeProviderProps {
  children: ReactNode;
}

export const PropxThemeProvider: React.FC<PropxThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(PropxDarkTheme);

  // TODO: Update base on the client requirement
  // const systemTheme = useColorScheme();

  // useEffect(() => {
  //   if (systemTheme === 'dark') {
  //     setTheme(PropxDarkTheme);
  //   } else {
  //     setTheme(PropxLightTheme);
  //   }
  // }, [systemTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === PropxDarkTheme ? PropxLightTheme : PropxDarkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the Propx theme
export const usePropxTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('usePropxTheme must be used within a PropxThemeProvider');
  }
  return context;
};
