import { useCallback } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  VarelaRound_400Regular,
} from '@expo-google-fonts/varela-round';
import { ThemeProvider } from '@/src/components';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="index" />
          </Stack>
        </ThemeProvider>
      </View>
    );
  }
}
