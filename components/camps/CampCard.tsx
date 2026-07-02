import React, { memo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle, Animated } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
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
  index?: number;
}

const AREA_LABELS: Record<string, { en: string; ar: string }> = {
  north: { en: 'North Nuweiba', ar: 'شمال نويبع' },
  tarabin: { en: 'Tarabin', ar: 'طرابين' },
  rasshitan: { en: 'Ras Shitan', ar: 'رأس شيطان' },
  south: { en: 'South Nuweiba', ar: 'جنوب نويبع' },
};

export const CampCard = memo(({ camp, style, horizontal, index = 0 }: CampCardProps) => {
  const router = useRouter();
  const { language, isRTL, t } = useLanguage();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const name = language === 'ar' ? camp.nameAr : camp.nameEn;
  const area = language === 'ar' ? AREA_LABELS[camp.area]?.ar : AREA_LABELS[camp.area]?.en;

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }], flex: horizontal ? undefined : 1 }}>
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
            transition={300}
            placeholder={{ blurhash: 'LGF5?xYk^6#M@-5c,1J5@[or[Q6.' }}
          />
          {/* Gradient overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(11,61,94,0.55)']}
            style={styles.imageGradient}
          />
          {/* Price badge on image */}
          <View style={[styles.priceBadge, isRTL ? { left: Spacing.sm } : { right: Spacing.sm }]}>
            <Text style={styles.priceBadgeText}>
              {camp.priceMin} {t('egp')}
            </Text>
          </View>
          {camp.isFeatured ? (
            <View style={[styles.featuredBadge, isRTL ? { right: Spacing.sm } : { left: Spacing.sm }]}>
              <Text style={styles.featuredText}>⭐</Text>
            </View>
          ) : null}
          {/* Rating on image */}
          <View style={styles.ratingOverlay}>
            <StarRating rating={camp.rating} reviewCount={camp.reviewCount} size={12} />
          </View>
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

          <View style={[styles.tagsRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            {camp.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} label={t(`filter${tag.charAt(0).toUpperCase() + tag.slice(1)}` as any)} variant={tag as CampTag} size="sm" />
            ))}
          </View>
        </View>
      </Pressable>
    </Animated.View>
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
    width: 260,
    flexDirection: 'column',
  },
  imageWrapperV: {
    width: '100%',
    aspectRatio: 4 / 3,
    position: 'relative',
  },
  imageWrapperH: {
    width: '100%',
    height: 150,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  priceBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  priceBadgeText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.extrabold,
    color: Colors.ocean,
  },
  featuredBadge: {
    position: 'absolute',
    top: Spacing.sm,
    backgroundColor: 'rgba(216,90,48,0.9)',
    borderRadius: BorderRadius.full,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredText: {
    fontSize: 13,
  },
  ratingOverlay: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: Spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  content: {
    padding: Spacing.sm + 2,
    gap: 3,
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
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  tagsRow: {
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: 2,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
});
