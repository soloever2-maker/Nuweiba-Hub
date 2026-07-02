import React, { useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, Linking, StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { CAMPS } from '@/data/camps';
import { TRANSPORT } from '@/data/transport';
import { SERVICES } from '@/data/services';
import { CampCard, SearchBar, Header } from '@/components';

const CATEGORY_ITEMS = [
  { key: 'camps', icon: 'night-shelter', route: '/camps', color: Colors.ocean, bg: '#E3F2FD' },
  { key: 'transport', icon: 'directions-bus', route: '/transport', color: Colors.sunset, bg: '#FFF3E0' },
  { key: 'services', icon: 'medical-services', route: '/services', color: Colors.error, bg: '#FFEBEE' },
  { key: 'activities', icon: 'snorkeling', route: '/camps', color: Colors.palm, bg: '#E8F5E9' },
] as const;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [search, setSearch] = useState('');

  const featuredCamps = CAMPS.filter((c) => c.isFeatured);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Header transparent />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <Image
            source={require('@/assets/images/hero-nuweiba.jpg')}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={['rgba(11,61,94,0.35)', 'rgba(11,61,94,0.7)']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.heroContent, { paddingTop: insets.top + 64 }]}>
            <Text style={[styles.heroTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
              🌊 {t('exploreNuweiba')}
            </Text>
            <Text style={[styles.heroSubtitle, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t('heroSubtitle')}
            </Text>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder={t('searchPlaceholder')}
              isRTL={isRTL}
              style={styles.searchBar}
            />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={[styles.statsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <StatItem value={String(CAMPS.length)} label={t('campsCount')} icon="night-shelter" />
          <StatItem value={String(TRANSPORT.length)} label={t('transportCount')} icon="directions-bus" />
          <StatItem value={String(SERVICES.length)} label={t('servicesCount')} icon="medical-services" />
        </View>

        {/* Category Grid */}
        <View style={styles.section}>
          <SectionHeader title={t('categoryCamps')} onViewAll={undefined} />
          <View style={styles.categoryGrid}>
            {CATEGORY_ITEMS.map((item) => (
              <Pressable
                key={item.key}
                style={({ pressed }) => [
                  styles.categoryCard,
                  { backgroundColor: item.bg },
                  pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] },
                ]}
                onPress={() => router.push(item.route as any)}
              >
                <MaterialIcons name={item.icon as any} size={32} color={item.color} />
                <Text style={[styles.categoryLabel, { color: item.color, textAlign: 'center' }]}>
                  {t(`category${item.key.charAt(0).toUpperCase() + item.key.slice(1)}` as any)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Featured Camps */}
        <View style={styles.section}>
          <SectionHeader
            title={t('featuredCamps')}
            onViewAll={() => router.push('/camps')}
            isRTL={isRTL}
            viewAllLabel={t('viewAll')}
          />
          <View style={styles.featuredScroll}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                paddingHorizontal: Spacing.md,
                gap: Spacing.md,
              }}
            >
              {featuredCamps.map((camp) => (
                <CampCard key={camp.id} camp={camp} horizontal style={{ width: 240 }} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* WhatsApp Community */}
        <View style={[styles.section, { paddingHorizontal: Spacing.md }]}>
          <Pressable
            style={({ pressed }) => [styles.whatsappBtn, pressed && { opacity: 0.85 }]}
            onPress={() => Linking.openURL('https://wa.me/+201000000000')}
          >
            <View style={styles.whatsappIcon}>
              <MaterialIcons name="chat" size={24} color={Colors.white} />
            </View>
            <View style={[styles.whatsappText, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
              <Text style={styles.whatsappTitle}>{t('joinCommunity')}</Text>
              <Text style={styles.whatsappSub}>{t('whatsappCommunity')}</Text>
            </View>
            <MaterialIcons
              name={isRTL ? 'chevron-left' : 'chevron-right'}
              size={24}
              color={Colors.white}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function StatItem({ value, label, icon }: { value: string; label: string; icon: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SectionHeader({
  title,
  onViewAll,
  isRTL,
  viewAllLabel,
}: {
  title: string;
  onViewAll?: () => void;
  isRTL?: boolean;
  viewAllLabel?: string;
}) {
  return (
    <View style={[styles.sectionHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
      <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>{title}</Text>
      {onViewAll ? (
        <Pressable onPress={onViewAll}>
          <Text style={styles.viewAll}>{viewAllLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  hero: {
    height: 320,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  heroTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: Spacing.xs,
  },
  searchBar: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: 'transparent',
  },
  statsRow: {
    backgroundColor: Colors.night,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.sand,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.tabBarInactive,
    fontWeight: FontWeight.medium,
    textAlign: 'center',
  },
  section: {
    paddingTop: Spacing.lg,
  },
  sectionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.night,
  },
  viewAll: {
    fontSize: FontSize.sm,
    color: Colors.ocean,
    fontWeight: FontWeight.semibold,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  categoryCard: {
    width: '47%',
    aspectRatio: 1.6,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  categoryLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
  },
  featuredScroll: {
    minHeight: 300,
  },
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadows.md,
  },
  whatsappIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappText: {
    flex: 1,
    gap: 2,
  },
  whatsappTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  whatsappSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
  },
});
