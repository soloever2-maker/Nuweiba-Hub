import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { SERVICES, Service } from '@/data/services';
import { ServiceCard, EmergencyBanner, Header } from '@/components';

type ServiceType = 'all' | Service['type'];

const SERVICE_TABS: { key: ServiceType; iconKey: keyof typeof MaterialIcons.glyphMap }[] = [
  { key: 'all', iconKey: 'apps' },
  { key: 'hospital', iconKey: 'local-hospital' },
  { key: 'pharmacy', iconKey: 'local-pharmacy' },
  { key: 'atm', iconKey: 'local-atm' },
  { key: 'market', iconKey: 'shopping-cart' },
  { key: 'gas', iconKey: 'local-gas-station' },
];

export default function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();
  const [activeType, setActiveType] = useState<ServiceType>('all');

  const filtered = activeType === 'all' ? SERVICES : SERVICES.filter((s) => s.type === activeType);

  const tabLabels: Record<ServiceType, string> = {
    all: t('all'),
    hospital: t('tabHospitals'),
    pharmacy: t('tabPharmacies'),
    atm: t('tabATMs'),
    market: t('tabMarkets'),
    gas: t('tabGas'),
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Header />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={[styles.titleSection, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
              <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>{t('servicesTitle')}</Text>
              <Text style={styles.subtitle}>{t('servicesSubtitle')}</Text>
            </View>

            <View style={{ paddingHorizontal: Spacing.md }}>
              <EmergencyBanner />
            </View>

            {/* Type Tabs */}
            <View style={styles.tabsWrapper}>
              <View style={[styles.tabsScroll, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                {SERVICE_TABS.map((tab) => (
                  <Pressable
                    key={tab.key}
                    style={[styles.tab, activeType === tab.key ? styles.tabActive : styles.tabInactive]}
                    onPress={() => setActiveType(tab.key)}
                  >
                    <MaterialIcons
                      name={tab.iconKey}
                      size={16}
                      color={activeType === tab.key ? Colors.white : Colors.textSecondary}
                    />
                    <Text style={[styles.tabText, activeType === tab.key ? styles.tabTextActive : styles.tabTextInactive]}>
                      {tabLabels[tab.key]}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text style={[styles.countText, { textAlign: isRTL ? 'right' : 'left' }]}>
              {filtered.length} {t('servicesTitle')}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: Spacing.md }}>
            <ServiceCard service={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>{t('noResults')}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.night,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  tabsWrapper: {
    marginBottom: Spacing.sm,
  },
  tabsScroll: {
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
  },
  tabActive: {
    backgroundColor: Colors.ocean,
    borderColor: Colors.ocean,
  },
  tabInactive: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  tabText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  tabTextActive: {
    color: Colors.white,
  },
  tabTextInactive: {
    color: Colors.textSecondary,
  },
  countText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  listContent: {
    paddingBottom: 32,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
});
