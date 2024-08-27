import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type TouchableOpacityProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/src/hooks';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: 'primary' | 'secondary';
  textStyle?: TextStyle;
  style?: ViewStyle;
};

export function ThemedButton({
  style,
  textStyle,
  type = 'primary',
  ...rest
}: ThemedButtonProps) {
  const { currentTheme } = useTheme();

  const backgroundColor =
    type === 'primary'
      ? currentTheme.buttonBackground
      : currentTheme.background;

  const textColor = currentTheme.buttonText;

  return (
    <TouchableOpacity
      style={[
        styles.baseButton,
        { backgroundColor },
        type === 'secondary' && {
          borderColor: currentTheme.accent,
          borderWidth: 1,
        },
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.baseText, { color: textColor }, textStyle]}>
        {rest.children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  baseText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'VarelaRound_400Regular',
  },
});
