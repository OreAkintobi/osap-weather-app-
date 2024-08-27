import React from 'react';
import { Text, type TextProps, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from '@/src/hooks';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'subtitle';
  style?: TextStyle;
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const { currentTheme } = useTheme();

  const color = currentTheme.text;

  return (
    <Text
      style={[
        { color, fontFamily: 'VarelaRound_400Regular' },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'subtitle' && styles.subtitle,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
});

export default ThemedText;
