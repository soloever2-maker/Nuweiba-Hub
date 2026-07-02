import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, StyleSheet, Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from '@/constants/theme';
import { useLanguage } from '@/hooks/useLanguage';
import { CAMPS, CampTag } from '@/data/camps';
import { CampCard, SearchBar, FilterChips } from '@/components';
import { Header } from '@/components';
import { MaterialIcons } from '@expo/vector-icons';

type SortKey = 'price' | 'rating' | 'newest';
type AreaFilter = 'all' | 'north' | 'tarabin' | 'rasshitan' | 'south';

const TAG_FILTERS: CampTag[] = ['budget', 'chill', 'premium', 'party', 'family', 'beachfront'];
const AREA_OPTIONS: AreaFilter[] = ['all', 'north', 'tarabin', 'rasshitan', 'south'];

export default function CampsScreen() {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useLanguage();

  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<CampTag[]>([]);
  const [area, setArea] = useState<AreaFilter>('all');
  const [sort, setSort] = useState<SortKey>('rating');

  const tagChips = TAG_FILTERS.map((tag) => ({
    key: tag,
    label: t(`filter${tag.charAt(0).toUpperCase() + tag.slice(1)}` as any),
  }));

  const areaChips = AREA_OPTIONS.map((a) => ({
    key: a,
    label: t(`area${a.charAt(0).toUpperCase() + a.slice(1)}` as any),
  }));

  const sortChips: { key: SortKey; label: string }[] = [
    { key: 'price', label: t('sortPrice') },
    { key: 'rating', label: t('sortRating') },
    { key: 'newest', label: t('sortNewest') },
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag as CampTag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag as CampTag]
    );
  };

  const filteredCamps = useMemo(() => {
    let result = CAMPS.filter((camp) => {
      const name = camp.nameEn.toLowerCase() + ' ' + camp.nameAr;
      const matchSearch = !search || name.includes(search.toLowerCase());
      const matchTags = selectedTags.length === 0 || selectedTags.some((t) => camp.tags.includes(t));
      const matchArea = area === 'all' || camp.area === area;
      return matchSearch && matchTags && matchArea;
    });

    if (sort === 'price') result = [...result].sort((a, b) => a.priceMin - b.priceMin);
    else if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    else result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return result;
  }, [search, selectedTags, area, sort]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <Header />

      <FlatList
        data={filteredCamps}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => <CampCard camp={item} index={index} />}
        ListHeaderComponent={
          <View>
            <View style={[styles.titleSection, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
              <Text style={[styles.title, { textAlign: isRTL ? 'right' : 'left' }]}>{t('campsTitle')}</Text>
              <Text style={styles.subtitle}>{t('campsSubtitle')}</Text>
            </View>

            <View style={styles.searchWrapper}>
              <SearchBar
                value={search}
                onChangeText={setSearch}
                placeholder={t('searchPlaceholder')}
                isRTL={isRTL}
              />
            </View>

            <Text style={[styles.filterLabel, { textAlign: isRTL ? 'right' : 'left', paddingHorizontal: Spacing.md }]}>
              🏷️ {t('filterBudget')} & {t('filterChill')}
            </Text>
            <FilterChips
              chips={tagChips}
              selected={selectedTags}
              onToggle={toggleTag}
              isRTL={isRTL}
            />

            <Text style={[styles.filterLabel, { textAlign: isRTL ? 'right' : 'left', paddingHorizontal: Spacing.md, marginTop: Spacing.sm }]}>
              📍 {t('areaAll')}
            </Text>
            <FilterChips
              chips={areaChips}
              selected={[area]}
              onToggle={(key) => setArea(key as AreaFilter)}
              isRTL={isRTL}
            />

            <FilterChips
              chips={sortChips}
              selected={[sort]}
              onToggle={(key) => setSort(key as SortKey)}
              isRTL={isRTL}
            />

            <Text style={[styles.resultCount, { textAlign: isRTL ? 'right' : 'left' }]}>
              {filteredCamps.length} {t('campsTitle')}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={64} color={Colors.textMuted} />
            <Text style={styles.emptyText}>{t('noResults')}</Text>
            <Pressable
              style={styles.resetBtn}
              onPress={() => {
                setSearch('');
                setSelectedTags([]);
                setArea('all');
              }}
            >
              <Text style={styles.resetText}>{t('resetFilters')}</Text>
            </Pressable>
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
  searchWrapper: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  filterLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  resultCount: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    gap: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.lg,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  resetBtn: {
    backgroundColor: Colors.ocean,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  resetText: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.sm,
  },
});
