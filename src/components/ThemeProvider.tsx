import React, { useState, ReactNode } from 'react';
import { Theme } from '@/src/types';
import { themes } from '@/src/constants';
import { ThemeContext } from '@/src/hooks';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.A);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.A ? themes.B : themes.A);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
