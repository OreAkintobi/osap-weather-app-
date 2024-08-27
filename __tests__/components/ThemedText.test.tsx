import * as React from 'react';
import { render } from '@testing-library/react-native';

import { ThemedText } from '../../src/components/ThemedText';

describe('<HomeScreen />', () => {
  test('ThemedText renders correctly', () => {
    const tree = render(<ThemedText>Some text</ThemedText>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
