import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface LocationInputProps {
  location: string;
  onLocationChange: (text: string) => void;
  style?: any;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  location,
  onLocationChange,
  style,
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder="Enter location"
      value={location}
      onChangeText={onLocationChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'VarelaRound_400Regular',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 8,
  },
});
