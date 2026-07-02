import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from '@/constants/theme';
import { useLanguage } from '@/hooks/useLanguage';

export const EmergencyBanner = memo(() => {
  const { t, isRTL } = useLanguage();

  const numbers = [
    { key: 'police', number: '122', icon: 'local-police' as const },
    { key: 'ambulance', number: '123', icon: 'local-hospital' as const },
    { key: 'fire', number: '180', icon: 'local-fire-department' as const },
  ];

  return (
    <View style={styles.banner}>
      <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <MaterialIcons name="warning" size={18} color={Colors.error} />
        <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>
          {t('emergencyTitle')}
        </Text>
      </View>
      <View style={[styles.numbers, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        {numbers.map(({ key, number, icon }) => (
          <Pressable
            key={key}
            style={({ pressed }) => [styles.numCard, pressed && { opacity: 0.8 }]}
            onPress={() => Linking.openURL(`tel:${number}`)}
          >
            <MaterialIcons name={icon} size={20} color={Colors.error} />
            <Text style={styles.numLabel}>{t(key as any)}</Text>
            <Text style={styles.num}>{number}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1.5,
    borderColor: Colors.error + '44',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  header: {
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.error,
    flex: 1,
  },
  numbers: {
    gap: Spacing.sm,
  },
  numCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: Colors.error + '22',
  },
  numLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },
  num: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.extrabold,
    color: Colors.error,
  },
});
