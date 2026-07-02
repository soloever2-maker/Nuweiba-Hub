import React, { memo } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, FontSize, FontWeight, BorderRadius, Spacing } from '@/constants/theme';

type BadgeVariant = 'budget' | 'chill' | 'premium' | 'party' | 'family' | 'beachfront' | 'primary' | 'success' | 'warning' | 'error' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  budget: { bg: '#E8F5E9', text: Colors.tagBudget },
  chill: { bg: '#E3F2FD', text: Colors.tagChill },
  premium: { bg: '#FBE9E7', text: Colors.tagPremium },
  party: { bg: '#FFF3E0', text: Colors.tagParty },
  family: { bg: '#F3E5F5', text: Colors.tagFamily },
  beachfront: { bg: '#E0F4F4', text: Colors.tagBeachfront },
  primary: { bg: Colors.oceanLight + '22', text: Colors.ocean },
  success: { bg: Colors.palm + '22', text: Colors.palm },
  warning: { bg: Colors.warning + '22', text: Colors.warning },
  error: { bg: Colors.error + '22', text: Colors.error },
  neutral: { bg: Colors.sandDark + '44', text: Colors.textSecondary },
};

export const Badge = memo(({ label, variant = 'neutral', size = 'sm', style }: BadgeProps) => {
  const colors = variantStyles[variant];
  return (
    <View
      style={[
        styles.base,
        size === 'sm' ? styles.sm : styles.md,
        { backgroundColor: colors.bg },
        style,
      ]}
    >
      <Text style={[styles.text, size === 'sm' ? styles.textSm : styles.textMd, { color: colors.text }]}>
        {label}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  sm: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  text: {
    fontWeight: FontWeight.semibold,
  },
  textSm: {
    fontSize: FontSize.xs,
  },
  textMd: {
    fontSize: FontSize.sm,
  },
});
