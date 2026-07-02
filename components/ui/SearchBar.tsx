import React, { memo } from 'react';
import { View, TextInput, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, Shadows } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isRTL?: boolean;
  onClear?: () => void;
  style?: ViewStyle;
}

export const SearchBar = memo(({ value, onChangeText, placeholder, isRTL, onClear, style }: SearchBarProps) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialIcons
        name="search"
        size={20}
        color={Colors.textMuted}
        style={isRTL ? styles.iconRight : styles.iconLeft}
      />
      <TextInput
        style={[styles.input, isRTL ? styles.inputRTL : styles.inputLTR]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        textAlign={isRTL ? 'right' : 'left'}
      />
      {value.length > 0 ? (
        <Pressable onPress={onClear ?? (() => onChangeText(''))} hitSlop={8}>
          <MaterialIcons name="close" size={18} color={Colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
    order: 2,
  },
  input: {
    flex: 1,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    padding: 0,
  },
  inputLTR: {},
  inputRTL: {
    marginRight: Spacing.sm,
  },
});
