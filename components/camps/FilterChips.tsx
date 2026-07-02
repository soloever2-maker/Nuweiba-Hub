import React, { memo } from 'react';
import { ScrollView, Pressable, Text, StyleSheet, View } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from '@/constants/theme';

interface Chip {
  key: string;
  label: string;
}

interface FilterChipsProps {
  chips: Chip[];
  selected: string[];
  onToggle: (key: string) => void;
  isRTL?: boolean;
}

export const FilterChips = memo(({ chips, selected, onToggle, isRTL }: FilterChipsProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          isRTL ? styles.contentRTL : {},
        ]}
      >
        {chips.map((chip) => {
          const isSelected = selected.includes(chip.key);
          return (
            <Pressable
              key={chip.key}
              onPress={() => onToggle(chip.key)}
              style={[styles.chip, isSelected ? styles.chipSelected : styles.chipDefault]}
            >
              <Text style={[styles.label, isSelected ? styles.labelSelected : styles.labelDefault]}>
                {chip.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 44,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  contentRTL: {
    flexDirection: 'row-reverse',
  },
  chip: {
    height: 36,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  chipDefault: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.ocean,
    borderColor: Colors.ocean,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  labelDefault: {
    color: Colors.textSecondary,
  },
  labelSelected: {
    color: Colors.white,
  },
});
