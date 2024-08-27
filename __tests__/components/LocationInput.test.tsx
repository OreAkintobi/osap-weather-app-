import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { LocationInput } from '../../src/components';

const mockProps = {
  location: 'New York',
  onLocationChange: jest.fn(),
  style: {},
};

describe('LocationInput Component', () => {
  it('matches the snapshot', () => {
    const { toJSON } = render(<LocationInput {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should change the text value', () => {
    const { getByDisplayValue } = render(<LocationInput {...mockProps} />);
    const input = getByDisplayValue('New York');
    fireEvent.changeText(input, 'Los Angeles');
    expect(mockProps.onLocationChange).toHaveBeenCalledWith('Los Angeles');
  });
});
