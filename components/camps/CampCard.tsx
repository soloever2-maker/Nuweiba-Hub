import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { Camp, CampTag } from '@/data/camps';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { useLanguage } from '@/hooks/useLanguage';

interface CampCardProps {
  camp: Camp;
  style?: ViewStyle;
  horizontal?: boolean;
}

const AREA_LABELS: Record<string, { en: string; ar: string }> = {
  north: { en: 'North Nuweiba', ar: 'شمال نويبع' },
  tarabin: { en: 'Tarabin', ar: 'طرابين' },
  rasshitan: { en: 'Ras Shitan', ar: 'رأس شيطان' },
  south: { en: 'South Nuweiba', ar: 'جنوب نويبع' },
};

export const CampCard = memo(({ camp, style, horizontal }: CampCardProps) => {
  const router = useRouter();
  const { language, isRTL, t } = useLanguage();

  const name = language === 'ar' ? camp.nameAr : camp.nameEn;
  const area = language === 'ar' ? AREA_LABELS[camp.area]?.ar : AREA_LABELS[camp.area]?.en;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        horizontal ? styles.horizontal : styles.vertical,
        pressed && styles.pressed,
        style,
      ]}
      onPress={() => router.push(`/camp/${camp.id}`)}
    >
      <View style={horizontal ? styles.imageWrapperH : styles.imageWrapperV}>
        <Image
          source={{ uri: camp.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {camp.isFeatured ? (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>⭐</Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.content, isRTL ? styles.contentRTL : {}]}>
        <Text style={[styles.name, { textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={1}>
          {name}
        </Text>

        <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Text style={styles.area} numberOfLines={1}>
            📍 {area}
          </Text>
        </View>

        <View style={[styles.row, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <StarRating rating={camp.rating} reviewCount={camp.reviewCount} />
        </View>

        <View style={[styles.tagsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          {camp.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} label={t(`filter${tag.charAt(0).toUpperCase() + tag.slice(1)}` as any)} variant={tag as CampTag} size="sm" />
          ))}
        </View>

        <View style={[styles.priceRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Text style={styles.price}>
            {t('from')} {camp.priceMin} {t('egp')}
          </Text>
          <Text style={styles.priceNight}>{t('perNight')}</Text>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.md,
  },
  vertical: {
    flex: 1,
  },
  horizontal: {
    width: 240,
    flexDirection: 'column',
  },
  imageWrapperV: {
    width: '100%',
    aspectRatio: 4 / 3,
    position: 'relative',
  },
  imageWrapperH: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.sunset,
    borderRadius: BorderRadius.full,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredText: {
    fontSize: 14,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  contentRTL: {
    alignItems: 'flex-end',
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  row: {
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  area: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  tagsRow: {
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: 2,
  },
  priceRow: {
    alignItems: 'baseline',
    gap: 3,
    marginTop: Spacing.xs,
  },
  price: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.ocean,
  },
  priceNight: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
});
