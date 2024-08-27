import React from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { useWeather, useTheme } from '@/src/hooks';
import { LocationInput, ThemedButton, ThemedText } from '@/src/components';
import { validateLocation } from '@/src/utils';

const WeatherDisplay = React.lazy(
  () => import('../src/components/WeatherDisplay')
);

const HomeScreen = () => {
  const {
    location,
    weatherData,
    setLocation,
    setService,
    service,
    loading,
    fetchWeather,
  } = useWeather();
  const { currentTheme } = useTheme();

  const onHandleSubmit = () => {
    if (!validateLocation(location)) {
      alert('Invalid location');
      return;
    }

    fetchWeather(location);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: currentTheme.background },
      ]}
    >
      <ThemedText type="title" style={styles.header}>
        Weather App
      </ThemedText>

      <LocationInput
        location={location}
        onLocationChange={setLocation}
        style={styles.locationInput}
      />

      <ThemedButton
        onPress={onHandleSubmit}
        type="primary"
        style={styles.button}
      >
        Get Weather
      </ThemedButton>

      <ThemedText type="subtitle" style={styles.serviceText}>
        Current Weather Service: {service}
      </ThemedText>

      <ThemedButton
        type="primary"
        onPress={() => setService(service === 'A' ? 'B' : 'A')}
        style={styles.button}
      >
        Toggle Service
      </ThemedButton>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={currentTheme.primary} />
        </View>
      )}
      {weatherData && !loading && (
        <WeatherDisplay data={weatherData} service={service} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    textAlign: 'center',
  },
  locationInput: {
    marginBottom: 16,
  },
  serviceText: {
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    marginVertical: 8,
  },
  loadingContainer: {
    justifyContent: 'center',
    paddingVertical: 48,
  },
});

export default HomeScreen;
