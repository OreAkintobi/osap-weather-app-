import React from 'react';
import { render } from '@testing-library/react-native';
import { WeatherDisplay } from '../../src/components/WeatherDisplay';
import { useTheme } from '../../src/hooks/useTheme';

jest.mock('../../src/hooks/useTheme', () => ({
  useTheme: jest.fn().mockReturnValue({
    currentTheme: {
      background: '#fff',
      text: '#000',
      primary: 'orange',
    },
  }),
}));

describe('WeatherDisplay Component', () => {
  it('should match the snapshot', () => {
    const mockData = {
      locationName: 'New York',
      epochTime: 1724759069,
      condition: 'Clear',
      temperature: {
        current: 32,
        high: 35,
      },
    };

    const { toJSON } = render(<WeatherDisplay data={mockData} service="A" />);

    expect(toJSON()).toMatchSnapshot();
  });
});
