import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ThemeProvider } from '../../src/components/ThemeProvider';
import { ThemeContext } from '../../src/hooks';
import { themes } from '../../src/constants';

describe('ThemeProvider', () => {
  it('should provide the default theme', () => {
    let theme;

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => {
            theme = value.currentTheme;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(theme).toEqual(themes.A);
  });

  it('should toggle the theme', () => {
    let theme;
    let toggleTheme;

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(value) => {
            theme = value.currentTheme;
            toggleTheme = value.toggleTheme;
            return null;
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(theme).toEqual(themes.A);

    act(() => {
      toggleTheme!();
    });

    expect(theme).toEqual(themes.B);

    act(() => {
      toggleTheme!();
    });
    expect(theme).toEqual(themes.A);
  });
});
