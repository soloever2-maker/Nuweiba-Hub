import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { TRANSPORT, TransportOption } from '@/data/transport';
import { TransportCard } from '@/components';
import { Header } from '@/components';

type TabType = 'bus' | 'taxi' | 'boat';

const TABS: TabType[] = ['bus', 'taxi', 'boat'];

export default function TransportScreen() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('bus');

  const filtered = TRANSPORT.filter((item) => item.type === activeTab);

  const tabLabels: Record<TabType, string> = {
    bus: t('tabBuses'),
    taxi: t('tabTaxis'),
    boat: t('tabBoats'),
  };
  const tabIcons: Record<TabType, keyof typeof MaterialIcons.glyphMap> = {
    bus: 'directions-bus',
    taxi: 'local-taxi',
    boat: 'directions-boat',
  };

  const tips = [t('tip1'), t('tip2'), t('tip3'), t('tip4')];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Title */}
        <View style={[styles.titleSection, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>{t('transportTitle')}</Text>
          <Text style={styles.subtitle}>{t('transportSubtitle')}</Text>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              style={[styles.tab, activeTab === tab ? styles.tabActive : styles.tabInactive]}
              onPress={() => setActiveTab(tab)}
            >
              <MaterialIcons
                name={tabIcons[tab]}
                size={18}
                color={activeTab === tab ? Colors.white : Colors.textSecondary}
              />
              <Text style={[styles.tabText, activeTab === tab ? styles.tabTextActive : styles.tabTextInactive]}>
                {tabLabels[tab]}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Cards */}
        <View style={styles.cards}>
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <MaterialIcons name="explore-off" size={48} color={Colors.textMuted} />
              <Text style={styles.emptyText}>{t('noResults')}</Text>
            </View>
          ) : (
            filtered.map((item) => <TransportCard key={item.id} transport={item} />)
          )}
        </View>

        {/* Travel Tips */}
        <View style={styles.tipsCard}>
          <View style={[styles.tipsHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <MaterialIcons name="lightbulb" size={20} color={Colors.sunset} />
            <Text style={[styles.tipsTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{t('tipsTitle')}</Text>
          </View>
          {tips.map((tip, i) => (
            <View key={i} style={[styles.tipRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <View style={styles.tipDot} />
              <Text style={[styles.tipText, { textAlign: isRTL ? 'right' : 'left', flex: 1 }]}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: Spacing.md,
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
  tabsRow: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: 4,
    gap: 4,
    ...Shadows.sm,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  tabActive: {
    backgroundColor: Colors.ocean,
  },
  tabInactive: {
    backgroundColor: Colors.transparent,
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
  cards: {
    paddingHorizontal: Spacing.md,
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
  tipsCard: {
    margin: Spacing.md,
    backgroundColor: '#FFFBF0',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.sandDark + '60',
    gap: Spacing.sm,
  },
  tipsHeader: {
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  tipsTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.night,
    flex: 1,
  },
  tipRow: {
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.sunset,
    marginTop: 7,
  },
  tipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
