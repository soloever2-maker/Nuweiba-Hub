import { useEffect } from 'react';
import { AlertProvider } from '@/components/ui/AlertProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    ...MaterialIcons.font,
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

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
