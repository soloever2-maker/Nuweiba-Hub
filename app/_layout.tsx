import { useEffect } from 'react';
import { AlertProvider } from '@/components/ui/AlertProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    MaterialIcons: 'https://cdn.jsdelivr.net/npm/react-native-vector-icons@10.2.0/Fonts/MaterialIcons.ttf',
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  return (
    <AlertProvider>
      <SafeAreaProvider>
        <LanguageProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="camp/[id]"
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
          </Stack>
        </LanguageProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
