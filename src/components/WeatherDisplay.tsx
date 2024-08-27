import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WeatherData } from '@/src/types';
import { useTheme } from '@/src/hooks/useTheme';
import { ThemedText } from './ThemedText';

interface WeatherDisplayProps {
  data: WeatherData;
  service: 'A' | 'B';
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  data,
  service,
}) => {
  const { currentTheme } = useTheme();

  // Themed styles for the component
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: currentTheme.background,
      borderRadius: 8,
      shadowColor: currentTheme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: currentTheme.text,
      marginBottom: 8,
    },
    item: {
      fontSize: 16,
      color: currentTheme.text,
      marginBottom: 4,
    },
    serviceIndicator: {
      fontSize: 14,
      fontWeight: 'bold',
      color: currentTheme.primary,
      marginBottom: 12,
    },
  });

  return (
    <View style={styles.container}>
      <ThemedText style={styles.serviceIndicator}>
        Current Service: {service}
      </ThemedText>
      <ThemedText style={styles.header}>
        Location: {data.locationName}
      </ThemedText>
      {data.epochTime && (
        <ThemedText style={styles.item}>
          Date & Time: {new Date(data.epochTime * 1000).toLocaleString()}
        </ThemedText>
      )}
      <ThemedText style={styles.item}>Condition: {data.condition}</ThemedText>
      {data.temperature && (
        <View>
          <ThemedText style={styles.item}>
            Current Temperature: {data.temperature.current}°C
          </ThemedText>
          <ThemedText style={styles.item}>
            High Temperature: {data.temperature.high}°C
          </ThemedText>
        </View>
      )}
    </View>
  );
};

export default WeatherDisplay;
