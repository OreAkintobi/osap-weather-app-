# Weather App

## Overview

This Weather App is a mobile application built using React Native and Expo. It allows users to check the current weather conditions of any location, switch between different weather services, and experience the app in different themes. The app is optimized for performance with dynamic imports, and it includes a suite of unit tests to ensure robustness.

## Features

- **Weather Information:** Fetch real-time weather data for any location.
- **Service Switching:** Toggle between two weather services (Service A and Service B) to get weather data.
- **Theming:** Support for multiple themes with easy switching between them.
- **Dynamic Imports:** Lazy loading of components to optimize performance.
- **Form Validation:** Simple validation for location input to prevent incorrect data fetching.
- **Testing:** A comprehensive test suite using Jest and React Testing Library.

## Getting Started

### Prerequisites

Ensure you have the following installed on your development environment:

- Node.js
- Yarn or npm
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

   or

   ```bash
   npm install
   ```

3. **Add environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   EXPO_PUBLIC_OPENWEATHER_API_API_KEY=your_api_key_for_service_a
   EXPO_PUBLIC_WEATHER_API_API_KEY=your_api_key_for_service_b
   ```

   Replace `your_api_key_for_service_a` and `your_api_key_for_service_b` with your API keys for the weather services you are using. If you need API keys, you can create them from [OpenWeatherMap](https://openweathermap.org/api) and [WeatherAPI](https://www.weatherapi.com/) or use mine (provided with email).

4. **Start the development server:**

   ```bash
   npx expo start
   ```

5. **Run the app on Expo Go:**

   - Install the Expo Go app on your Android or iOS device.
   - Scan the QR code displayed in your terminal or browser to load the app on your device.

### Project Structure

- **`src/components`**: Contains reusable UI components like `WeatherDisplay`, `LocationInput`, `ThemedButton`, `ThemedText`, and `ThemedView`.
- **`src/hooks`**: Custom hooks like `useWeather` and `useTheme` that manage weather data and theming respectively.
- **`src/services`**: Services that handle API calls to different weather providers.
- **`src/utils`**: Utility functions for tasks like input validation and error handling.
- **`src/constants`**: Theme definitions and other constants used throughout the app.
- **`__tests__`**: Unit tests for components, hooks, services, and utilities.

### Running Tests

This project includes a comprehensive set of unit tests. To run the tests:

1. **Run the tests:**

   ```bash
   yarn test
   ```

   or

   ```bash
   npm test
   ```

   There are a couple of options to run the tests as seen in the package.json file

2. **Test Coverage:**

   View the test coverage report generated after running the tests. The report is located in the `coverage/` directory, which is included in the `.gitignore` file.

### What This Project Can Do

- **Real-time Weather Data**: Fetches and displays current weather conditions for any location.
- **Service Switching**: Users can switch between two different weather services to compare data.
- **Dynamic Imports**: The app uses dynamic imports to lazy load components like `WeatherDisplay`, optimizing performance by loading components only when needed.
- **Theming**: The app supports multiple themes, which can be toggled dynamically. The theming is managed through a context provider, ensuring that the theme is consistent across all components.
- **Validation**: The location input is validated to ensure that users enter a valid location, reducing errors in data fetching.

### Future Improvements

If I had more time and scope, I would work on the following enhancements:

- **Refactors**: I would have liked to do the following:
  - Refactor the `WeatherService` classes so that `normalizeResponse` is private, and it is only exposing the final data to the user.
  - Add more modularity to the `HomeScreen` file (app/index.tsx) by making just 2/3 components and THEN making those components available in the screen.
  - Add more dynamic importing and lazy loading to the app.
  - Remove incidences of `any` in the codebase (would have liked to do this, but did not complete refactor to `WeatherService` classes).
- **Offline Mode**: Implementing caching and offline capabilities so users can access previously fetched weather data even without an internet connection.
- **Expanded Test Coverage**: Increasing the test coverage, particularly for edge cases and error handling scenarios.
- **Animation and Transitions**: Adding subtle animations and transitions to improve the user experience, especially during theme switching and data fetching.
- **Enhanced Error Handling**: Providing more detailed error messages and fallback UI components in case of failed API requests or other issues.
- **Localization**: Adding support for multiple languages to make the app accessible to a wider audience.
- **User Preferences**: Storing user preferences such as the last searched location and selected theme, so they are remembered between sessions.
- **API Key Management**: Implementing a more secure way to handle API keys, perhaps integrating with a secure vault or environment-specific key management.
