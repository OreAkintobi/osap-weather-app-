import { createContext, useContext } from 'react';
import { Theme } from '@/src/types';
import { themes } from '@/src/constants';

interface ThemeContextType {
  currentTheme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: themes.A,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
