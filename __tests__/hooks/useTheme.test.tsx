import React, { useState } from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ThemeContext, useTheme } from '@/src/hooks/useTheme';
import { Theme } from '@/src/types';

const mockThemes: Record<'A' | 'B', Theme> = {
  A: {
    background: '#fff',
    text: '#000',
    buttonBackground: '#007bff',
    buttonText: '#fff',
  } as Theme,
  B: {
    background: '#000',
    text: '#fff',
    buttonBackground: '#28a745',
    buttonText: '#000',
  } as Theme,
};

describe('useTheme Hook', () => {
  it('should provide default theme values', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeContext.Provider
          value={{
            currentTheme: mockThemes.A,
            toggleTheme: jest.fn(),
          }}
        >
          {children}
        </ThemeContext.Provider>
      ),
    });

    expect(result.current.currentTheme.background).toEqual(
      mockThemes.A.background
    );
  });

  it('should toggle theme when toggleTheme is called', () => {
    const toggleTheme = jest.fn();

    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <ThemeContext.Provider
          value={{
            currentTheme: mockThemes.A,
            toggleTheme,
          }}
        >
          {children}
        </ThemeContext.Provider>
      ),
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(toggleTheme).toHaveBeenCalled();
  });

  it('should update the theme when context value changes', () => {
    const TestWrapper = ({ children }: { children: React.ReactNode }) => {
      const [currentTheme, setCurrentTheme] = useState(mockThemes.A);

      const toggleTheme = () => {
        setCurrentTheme((prevTheme) =>
          prevTheme === mockThemes.A ? mockThemes.B : mockThemes.A
        );
      };

      return (
        <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    };

    const { result } = renderHook(() => useTheme(), {
      wrapper: TestWrapper,
    });

    expect(result.current.currentTheme.background).toEqual(
      mockThemes.A.background
    );

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.currentTheme.background).toEqual(
      mockThemes.B.background
    );

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.currentTheme.background).toEqual(
      mockThemes.A.background
    );
  });
});
