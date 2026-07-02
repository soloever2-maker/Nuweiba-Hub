import React, { memo } from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadows } from '@/constants/theme';
import { TransportOption } from '@/data/transport';
import { useLanguage } from '@/hooks/useLanguage';

interface TransportCardProps {
  transport: TransportOption;
}

export const TransportCard = memo(({ transport }: TransportCardProps) => {
  const { language, isRTL, t } = useLanguage();

  const companyName = language === 'ar' ? transport.companyNameAr : transport.companyName;
  const routeFrom = language === 'ar' ? transport.routeFromAr : transport.routeFrom;
  const routeTo = language === 'ar' ? transport.routeToAr : transport.routeTo;
  const duration = language === 'ar' ? transport.durationAr : transport.duration;
  const notes = language === 'ar' ? transport.notesAr : transport.notes;

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi, I want to book a ${transport.companyName} trip from ${transport.routeFrom} to ${transport.routeTo}`);
    Linking.openURL(`https://wa.me/${transport.whatsapp.replace(/\D/g, '')}?text=${msg}`);
  };

  return (
    <View style={[styles.card, isRTL ? styles.cardRTL : {}]}>
      <View style={[styles.header, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <View style={[styles.iconWrapper, { backgroundColor: getTypeColor(transport.type) + '20' }]}>
          <MaterialIcons name={getTypeIcon(transport.type)} size={22} color={getTypeColor(transport.type)} />
        </View>
        <View style={[styles.headerText, { alignItems: isRTL ? 'flex-end' : 'flex-start' }]}>
          <Text style={[styles.company, { textAlign: isRTL ? 'right' : 'left' }]}>{companyName}</Text>
          <View style={[styles.route, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Text style={styles.routeText}>{routeFrom}</Text>
            <MaterialIcons name={isRTL ? 'arrow-back' : 'arrow-forward'} size={14} color={Colors.sunset} />
            <Text style={styles.routeText}>{routeTo}</Text>
          </View>
        </View>
        <Text style={styles.price}>
          {transport.priceMin}–{transport.priceMax} {t('egp')}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={[styles.timesRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Text style={[styles.label, { textAlign: isRTL ? 'right' : 'left' }]}>{t('departureTimes')}:</Text>
        <View style={[styles.chips, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          {transport.times.map((time) => (
            <View key={time} style={styles.timeChip}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.durationRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <MaterialIcons name="access-time" size={14} color={Colors.textMuted} />
        <Text style={styles.durationText}>{duration}</Text>
      </View>

      {notes ? (
        <Text style={[styles.notes, { textAlign: isRTL ? 'right' : 'left' }]}>{notes}</Text>
      ) : null}

      <Pressable
        style={({ pressed }) => [styles.waBtn, pressed && { opacity: 0.8 }]}
        onPress={handleWhatsApp}
      >
        <MaterialIcons name="chat" size={16} color={Colors.white} />
        <Text style={styles.waBtnText}>{t('bookWhatsApp')}</Text>
      </Pressable>
    </View>
  );
});

function getTypeIcon(type: TransportOption['type']): keyof typeof MaterialIcons.glyphMap {
  switch (type) {
    case 'bus': return 'directions-bus';
    case 'taxi': return 'local-taxi';
    case 'boat': return 'directions-boat';
  }
}

function getTypeColor(type: TransportOption['type']): string {
  switch (type) {
    case 'bus': return Colors.ocean;
    case 'taxi': return Colors.sunset;
    case 'boat': return Colors.tagBeachfront;
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  cardRTL: {},
  header: {
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: 3,
  },
  company: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  route: {
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  routeText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.ocean,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginBottom: Spacing.sm,
  },
  timesRow: {
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  chips: {
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  timeChip: {
    backgroundColor: Colors.sandLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeText: {
    fontSize: FontSize.sm,
    color: Colors.night,
    fontWeight: FontWeight.semibold,
  },
  durationRow: {
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  durationText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  notes: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  waBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: '#25D366',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm + 2,
  },
  waBtnText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
});
