import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { Service } from '@/data/services';
import { useLanguage } from '@/hooks/useLanguage';

interface ServiceCardProps {
  service: Service;
}

const typeConfig: Record<Service['type'], { icon: keyof typeof MaterialIcons.glyphMap; color: string }> = {
  hospital: { icon: 'local-hospital', color: Colors.error },
  pharmacy: { icon: 'local-pharmacy', color: Colors.palm },
  atm: { icon: 'local-atm', color: Colors.ocean },
  market: { icon: 'shopping-cart', color: Colors.sunset },
  gas: { icon: 'local-gas-station', color: '#F59E0B' },
};

export const ServiceCard = memo(({ service }: ServiceCardProps) => {
  const { language, isRTL, t } = useLanguage();
  const config = typeConfig[service.type];
  const name = language === 'ar' ? service.nameAr : service.nameEn;
  const area = language === 'ar' ? service.areaAr : service.area;

  return (
    <View style={[styles.card, isRTL ? styles.cardRTL : {}]}>
      <View style={[styles.topRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={[styles.iconBox, { backgroundColor: config.color + '18' }]}>
          <MaterialIcons name={config.icon} size={24} color={config.color} />
        </View>
        <View style={[styles.info, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text style={[styles.name, { textAlign: isRTL ? 'right' : 'left' }]}>{name}</Text>
          <Text style={styles.area}>📍 {area}</Text>
        </View>
        {service.isOpen24h ? (
          <View style={styles.badge24}>
            <Text style={styles.badge24Text}>{t('open24h')}</Text>
          </View>
        ) : (
          <View style={styles.hoursBadge}>
            <Text style={styles.hoursText}>{service.openHours}</Text>
          </View>
        )}
      </View>

      <View style={styles.divider} />

      <View style={[styles.actions, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        {service.phone ? (
          <Pressable
            style={({ pressed }) => [styles.btn, styles.callBtn, pressed && { opacity: 0.8 }]}
            onPress={() => Linking.openURL(`tel:${service.phone}`)}
          >
            <MaterialIcons name="phone" size={16} color={Colors.white} />
            <Text style={styles.btnText}>{t('call')}</Text>
          </Pressable>
        ) : null}
        <Pressable
          style={({ pressed }) => [styles.btn, styles.mapsBtn, pressed && { opacity: 0.8 }]}
          onPress={() => Linking.openURL(service.mapsLink)}
        >
          <MaterialIcons name="place" size={16} color={Colors.ocean} />
          <Text style={[styles.btnText, { color: Colors.ocean }]}>{t('openMaps')}</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  cardRTL: {},
  topRow: {
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  area: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  badge24: {
    backgroundColor: Colors.palm + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  badge24Text: {
    fontSize: FontSize.xs,
    color: Colors.palm,
    fontWeight: FontWeight.bold,
  },
  hoursBadge: {
    backgroundColor: Colors.sandLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  hoursText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginBottom: Spacing.sm,
  },
  actions: {
    gap: Spacing.sm,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    flex: 1,
  },
  callBtn: {
    backgroundColor: Colors.sunset,
  },
  mapsBtn: {
    backgroundColor: Colors.ocean + '12',
    borderWidth: 1.5,
    borderColor: Colors.ocean + '44',
  },
  btnText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
});
