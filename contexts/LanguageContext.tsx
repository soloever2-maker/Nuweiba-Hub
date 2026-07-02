import React, { createContext, useState, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from '@/locales/en';
import { ar } from '@/locales/ar';

export type Language = 'en' | 'ar';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  t: (key: keyof Translations) => string;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  rtlStyle: { textAlign: 'right' | 'left'; writingDirection: 'rtl' | 'ltr' };
  flexDir: 'row' | 'row-reverse';
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'nuweiba_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');

  const loadLanguage = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ar') {
        setLanguageState(saved);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    loadLanguage();
  }, [loadLanguage]);

  const setLanguage = useCallback(async (lang: Language) => {
    setLanguageState(lang);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, setLanguage]);

  const t = useCallback(
    (key: keyof Translations): string => {
      const translations = language === 'ar' ? ar : en;
      return translations[key] ?? key;
    },
    [language]
  );

  const isRTL = language === 'ar';
  const rtlStyle = {
    textAlign: isRTL ? ('right' as const) : ('left' as const),
    writingDirection: isRTL ? ('rtl' as const) : ('ltr' as const),
  };
  const flexDir = isRTL ? ('row-reverse' as const) : ('row' as const);

  return (
    <LanguageContext.Provider
      value={{ language, isRTL, t, toggleLanguage, setLanguage, rtlStyle, flexDir }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
