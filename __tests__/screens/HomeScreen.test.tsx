import { render } from '@testing-library/react-native';

import HomeScreen from '@/app/index';
import { ThemedText } from '../../src/components/ThemedText';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { findByText } = render(<HomeScreen />);

    findByText('Toggle Service');
  });

  test('HomeScreen renders correctly', () => {
    const tree = render(<HomeScreen />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
