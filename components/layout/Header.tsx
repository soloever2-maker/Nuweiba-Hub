import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
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
            <MaterialIcons
              name={isRTL ? 'arrow-forward' : 'arrow-back'}
              size={22}
              color={transparent ? Colors.white : Colors.textPrimary}
            />
          </Pressable>
        ) : (
          <View style={[styles.logo, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Text style={[styles.logoEmoji]}>🌊</Text>
            <View>
              <Text style={[styles.logoName, { color: transparent ? Colors.white : Colors.night }]}>
                {t('appName')}
              </Text>
              <Text style={[styles.logoTagline, { color: transparent ? 'rgba(255,255,255,0.7)' : Colors.textMuted }]}>
                {t('appTagline')}
              </Text>
            </View>
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
          <Pressable
            onPress={toggleLanguage}
            style={({ pressed }) => [
              styles.langBtn,
              transparent ? styles.langBtnTransparent : styles.langBtnSolid,
              pressed && { opacity: 0.8 },
            ]}
            hitSlop={8}
          >
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
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoEmoji: {
    fontSize: FontSize.xxl,
  },
  logoName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    letterSpacing: -0.3,
  },
  logoTagline: {
    fontSize: FontSize.xs - 1,
    fontWeight: FontWeight.medium,
    marginTop: -2,
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  langBtnSolid: {
    backgroundColor: Colors.ocean + '12',
    borderColor: Colors.ocean + '44',
  },
  langBtnTransparent: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.35)',
  },
  langText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  backBtn: {
    padding: Spacing.sm,
  },
});
