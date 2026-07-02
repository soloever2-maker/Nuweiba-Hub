import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { useLanguage } from '@/hooks/useLanguage';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
  transparent?: boolean;
}

export const Header = memo(({ showBack, onBack, title, transparent }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const { t, toggleLanguage, language, isRTL } = useLanguage();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + Spacing.sm },
        transparent ? styles.transparent : styles.solid,
      ]}
    >
      <View style={[styles.inner, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        {showBack ? (
          <Pressable onPress={onBack} style={styles.backBtn} hitSlop={8}>
            <Text style={[styles.backText, { color: transparent ? Colors.white : Colors.textPrimary }]}>
              {isRTL ? '→' : '←'}
            </Text>
          </Pressable>
        ) : (
          <View style={styles.logo}>
            <Text style={[styles.logoText, { color: transparent ? Colors.white : Colors.night }]}>
              🌊
            </Text>
            <Text style={[styles.logoName, { color: transparent ? Colors.white : Colors.night }]}>
              {t('appName')}
            </Text>
          </View>
        )}

        {title ? (
          <Text
            style={[
              styles.title,
              { color: transparent ? Colors.white : Colors.textPrimary, textAlign: 'center' },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : null}

        <View style={styles.actions}>
          <Pressable onPress={toggleLanguage} style={styles.langBtn} hitSlop={8}>
            <Text style={[styles.langText, { color: transparent ? Colors.white : Colors.ocean }]}>
              {language === 'ar' ? t('switchToEn') : t('switchToAr')}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    zIndex: 10,
  },
  transparent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  solid: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    ...Shadows.sm,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  logoText: {
    fontSize: FontSize.xl,
  },
  logoName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  title: {
    flex: 1,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    marginHorizontal: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  langBtn: {
    backgroundColor: Colors.ocean + '18',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.ocean + '44',
  },
  langText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  backBtn: {
    padding: Spacing.sm,
  },
  backText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
});
