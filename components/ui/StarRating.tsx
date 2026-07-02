import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
}

export const StarRating = memo(({ rating, reviewCount, size = 14, showCount = true }: StarRatingProps) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="star" size={size} color={Colors.warning} />
      <Text style={[styles.rating, { fontSize: size }]}>{rating.toFixed(1)}</Text>
      {showCount && reviewCount !== undefined ? (
        <Text style={[styles.count, { fontSize: size - 2 }]}>({reviewCount})</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    color: Colors.textPrimary,
    fontWeight: FontWeight.semibold,
    marginLeft: Spacing.xs / 2,
  },
  count: {
    color: Colors.textMuted,
    fontWeight: FontWeight.regular,
    marginLeft: 2,
  },
});
