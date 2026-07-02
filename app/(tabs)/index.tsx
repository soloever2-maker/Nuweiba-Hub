import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, Linking, StatusBar, Animated,
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
  const heroFade = useRef(new Animated.Value(0)).current;
  const statsSlide = useRef(new Animated.Value(30)).current;
  const statsFade = useRef(new Animated.Value(0)).current;

  const featuredCamps = CAMPS.filter((c) => c.isFeatured);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(heroFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(statsFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(statsSlide, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Header transparent />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Hero Section */}
        <Animated.View style={[styles.hero, { opacity: heroFade }]}>
          <Image
            source={require('@/assets/images/hero-nuweiba.jpg')}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
            transition={300}
          />
          <LinearGradient
            colors={['rgba(11,61,94,0.2)', 'rgba(11,61,94,0.75)']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.heroContent, { paddingTop: insets.top + 72 }]}>
            <Text style={[styles.heroTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
              {t('exploreNuweiba')}
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
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View
          style={[
            styles.statsRow,
            { flexDirection: isRTL ? 'row-reverse' : 'row', opacity: statsFade, transform: [{ translateY: statsSlide }] },
          ]}
        >
          <StatItem value={CAMPS.length} label={t('campsCount')} icon="night-shelter" color={Colors.ocean} />
          <View style={styles.statDivider} />
          <StatItem value={TRANSPORT.length} label={t('transportCount')} icon="directions-bus" color={Colors.sunset} />
          <View style={styles.statDivider} />
          <StatItem value={SERVICES.length} label={t('servicesCount')} icon="medical-services" color={Colors.error} />
        </Animated.View>

        {/* Category Grid */}
        <View style={styles.section}>
          <SectionHeader title={t('categoryCamps')} isRTL={isRTL} />
          <View style={styles.categoryGrid}>
            {CATEGORY_ITEMS.map((item, i) => (
              <Pressable
                key={item.key}
                style={({ pressed }) => [
                  styles.categoryCard,
                  { backgroundColor: item.bg },
                  pressed && { opacity: 0.85, transform: [{ scale: 0.96 }] },
                ]}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.categoryIconWrap, { backgroundColor: item.color + '22' }]}>
                  <MaterialIcons name={item.icon as any} size={28} color={item.color} />
                </View>
                <Text style={[styles.categoryLabel, { color: item.color }]}>
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              paddingHorizontal: Spacing.md,
              gap: Spacing.md,
            }}
          >
            {featuredCamps.map((camp, i) => (
              <CampCard key={camp.id} camp={camp} horizontal index={i} style={{ width: 260 }} />
            ))}
          </ScrollView>
        </View>

        {/* WhatsApp Community */}
        <View style={[styles.section, { paddingHorizontal: Spacing.md }]}>
          <Pressable
            style={({ pressed }) => [styles.whatsappBtn, pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] }]}
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

function StatItem({ value, label, icon, color }: { value: number; label: string; icon: string; color: string }) {
  const countAnim = useRef(new Animated.Value(0)).current;
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    countAnim.addListener(({ value: v }) => setDisplayVal(Math.round(v)));
    Animated.timing(countAnim, {
      toValue: value,
      duration: 800,
      delay: 500,
      useNativeDriver: false,
    }).start();
    return () => countAnim.removeAllListeners();
  }, [value]);

  return (
    <View style={styles.statItem}>
      <MaterialIcons name={icon as any} size={20} color={color} style={{ marginBottom: 2 }} />
      <Text style={[styles.statValue, { color }]}>{displayVal}</Text>
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
        <Pressable onPress={onViewAll} style={styles.viewAllBtn}>
          <Text style={styles.viewAll}>{viewAllLabel}</Text>
          <MaterialIcons name={isRTL ? 'chevron-left' : 'chevron-right'} size={16} color={Colors.ocean} />
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
    height: 340,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  heroTitle: {
    fontSize: FontSize.xxxl + 2,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.88)',
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
  searchBar: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: 'transparent',
  },
  statsRow: {
    backgroundColor: Colors.night,
    paddingVertical: Spacing.md + 4,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
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
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
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
  categoryIconWrap: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.md + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
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
