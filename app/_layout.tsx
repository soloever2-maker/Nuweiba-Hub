import { AlertProvider } from '@/components/ui/AlertProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function RootLayout() {
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
