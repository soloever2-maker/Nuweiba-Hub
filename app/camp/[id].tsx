import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable, Linking, Dimensions, FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { CAMPS, CampAmenity } from '@/data/camps';
import { Badge, StarRating, CampCard } from '@/components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AMENITY_CONFIG: Record<CampAmenity, { icon: keyof typeof MaterialIcons.glyphMap; labelKey: string }> = {
  wifi: { icon: 'wifi', labelKey: 'amenityWifi' },
  electricity: { icon: 'flash-on', labelKey: 'amenityElectricity' },
  shower: { icon: 'shower', labelKey: 'amenityShower' },
  snorkeling: { icon: 'scuba-diving', labelKey: 'amenitySnorkeling' },
  parking: { icon: 'local-parking', labelKey: 'amenityParking' },
  beachAccess: { icon: 'beach-access', labelKey: 'amenityBeachAccess' },
  restaurant: { icon: 'restaurant', labelKey: 'amenityRestaurant' },
  ac: { icon: 'ac-unit', labelKey: 'amenityAC' },
};

const AREA_LABELS: Record<string, { en: string; ar: string }> = {
  north: { en: 'North Nuweiba', ar: 'شمال نويبع' },
  tarabin: { en: 'Tarabin', ar: 'طرابين' },
  rasshitan: { en: 'Ras Shitan', ar: 'رأس شيطان' },
  south: { en: 'South Nuweiba', ar: 'جنوب نويبع' },
};

export default function CampDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, language, isRTL } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  const camp = CAMPS.find((c) => c.id === id);
  if (!camp) {
    return (
      <View style={styles.notFound}>
        <Text>{t('noResults')}</Text>
      </View>
    );
  }

  const name = language === 'ar' ? camp.nameAr : camp.nameEn;
  const description = language === 'ar' ? camp.descriptionAr : camp.descriptionEn;
  const area = language === 'ar' ? AREA_LABELS[camp.area]?.ar : AREA_LABELS[camp.area]?.en;

  const similarCamps = CAMPS.filter(
    (c) => c.id !== camp.id && (c.area === camp.area || c.tags.some((t) => camp.tags.includes(t)))
  ).slice(0, 3);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hi! I want to book at ${camp.nameEn}. Please let me know the availability.`
    );
    Linking.openURL(`https://wa.me/${camp.whatsapp.replace(/\D/g, '')}?text=${msg}`);
  };

  return (
    <View style={styles.root}>
      {/* Image Gallery */}
      <View style={styles.gallery}>
        <FlatList
          data={camp.images}
          keyExtractor={(_, i) => String(i)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            setActiveImage(index);
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: SCREEN_WIDTH, height: 300 }}
              contentFit="cover"
              transition={200}
            />
          )}
        />
        {/* Dots */}
        <View style={styles.dots}>
          {camp.images.map((_, i) => (
            <View key={i} style={[styles.dot, i === activeImage ? styles.dotActive : styles.dotInactive]} />
          ))}
        </View>
        {/* Back button */}
        <Pressable
          style={[styles.backBtn, { top: insets.top + Spacing.sm }]}
          onPress={() => router.back()}
          hitSlop={8}
        >
          <MaterialIcons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={22} color={Colors.white} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header Info */}
        <View style={[styles.section, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <View style={[styles.areaBadge, { alignSelf: isRTL ? 'flex-end' : 'flex-start' }]}>
            <MaterialIcons name="place" size={14} color={Colors.sunset} />
            <Text style={styles.areaText}>{area}</Text>
          </View>
          <Text style={[styles.campName, { textAlign: isRTL ? 'right' : 'left' }]}>{name}</Text>
          <StarRating rating={camp.rating} reviewCount={camp.reviewCount} size={16} />

          <View style={[styles.tagsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            {camp.tags.map((tag) => (
              <Badge
                key={tag}
                label={t(`filter${tag.charAt(0).toUpperCase() + tag.slice(1)}` as any)}
                variant={tag}
                size="md"
              />
            ))}
          </View>

          <View style={[styles.priceBlock, { alignSelf: isRTL ? 'flex-end' : 'flex-start' }]}>
            <Text style={styles.priceLabel}>{t('priceRange')}</Text>
            <Text style={styles.priceValue}>
              {camp.priceMin}–{camp.priceMax} {t('egp')}{t('perNight')}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={[styles.descText, { textAlign: isRTL ? 'right' : 'left', lineHeight: 26 }]}>
            {description}
          </Text>
        </View>

        {/* Amenities */}
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left' }]}>
            {t('amenitiesTitle')}
          </Text>
          <View style={[styles.amenitiesGrid, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            {camp.amenities.map((amenity) => {
              const config = AMENITY_CONFIG[amenity];
              if (!config) return null;
              return (
                <View key={amenity} style={styles.amenityItem}>
                  <View style={styles.amenityIcon}>
                    <MaterialIcons name={config.icon} size={20} color={Colors.ocean} />
                  </View>
                  <Text style={styles.amenityLabel}>{t(config.labelKey as any)}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Similar Camps */}
        {similarCamps.length > 0 ? (
          <>
            <View style={styles.divider} />
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { textAlign: isRTL ? 'right' : 'left', marginBottom: Spacing.md }]}>
                {t('similarCamps')}
              </Text>
              {similarCamps.map((c) => (
                <View key={c.id} style={{ marginBottom: Spacing.md }}>
                  <CampCard camp={c} />
                </View>
              ))}
            </View>
          </>
        ) : null}
      </ScrollView>

      {/* Sticky CTAs */}
      <View style={[styles.ctaBar, { paddingBottom: insets.bottom + Spacing.sm }]}>
        <Pressable
          style={({ pressed }) => [styles.ctaBtn, styles.ctaWa, pressed && { opacity: 0.85 }]}
          onPress={handleWhatsApp}
        >
          <MaterialIcons name="chat" size={18} color={Colors.white} />
          <Text style={styles.ctaBtnText} numberOfLines={1}>{t('bookWhatsApp')}</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.ctaBtn, styles.ctaMaps, pressed && { opacity: 0.85 }]}
          onPress={() => Linking.openURL(camp.mapsLink)}
        >
          <MaterialIcons name="place" size={18} color={Colors.ocean} />
          <Text style={[styles.ctaBtnText, { color: Colors.ocean }]} numberOfLines={1}>{t('openMaps')}</Text>
        </Pressable>

        {camp.bookingLink ? (
          <Pressable
            style={({ pressed }) => [styles.ctaBtn, styles.ctaBook, pressed && { opacity: 0.85 }]}
            onPress={() => Linking.openURL(camp.bookingLink!)}
          >
            <MaterialIcons name="open-in-new" size={18} color={Colors.white} />
            <Text style={styles.ctaBtnText} numberOfLines={1}>{t('viewBooking')}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery: {
    height: 300,
    position: 'relative',
  },
  dots: {
    position: 'absolute',
    bottom: Spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.white,
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  backBtn: {
    position: 'absolute',
    left: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: BorderRadius.full,
    padding: Spacing.sm,
  },
  scroll: {
    flex: 1,
  },
  section: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  areaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.sunset + '18',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  areaText: {
    fontSize: FontSize.sm,
    color: Colors.sunset,
    fontWeight: FontWeight.semibold,
  },
  campName: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.night,
    lineHeight: 38,
  },
  tagsRow: {
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  priceBlock: {
    backgroundColor: Colors.ocean + '12',
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.ocean + '30',
  },
  priceLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  priceValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.extrabold,
    color: Colors.ocean,
  },
  divider: {
    height: 8,
    backgroundColor: Colors.background,
  },
  descText: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.night,
  },
  amenitiesGrid: {
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  amenityItem: {
    alignItems: 'center',
    gap: Spacing.xs,
    width: 72,
  },
  amenityIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.ocean + '12',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.ocean + '22',
  },
  amenityLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: FontWeight.medium,
  },
  ctaBar: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    ...Shadows.lg,
  },
  ctaBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm + 4,
    borderRadius: BorderRadius.md,
  },
  ctaWa: {
    backgroundColor: '#25D366',
    flex: 2,
  },
  ctaMaps: {
    backgroundColor: Colors.ocean + '12',
    borderWidth: 1.5,
    borderColor: Colors.ocean + '44',
    flex: 1,
  },
  ctaBook: {
    backgroundColor: Colors.sunset,
    flex: 1,
  },
  ctaBtnText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
});
