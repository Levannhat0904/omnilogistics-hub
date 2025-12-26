import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { Colors, NeutralColors, PrimaryColors } from '@shared/constants/colors';
import { Radius, Spacing } from '@shared/constants/layout';

interface DateFilterProps {
  date: Date;
  onPress?: () => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ date, onPress }) => {
  const isToday = (d: Date) => {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const formattedDate = format(date, "EEEE, dd/MM/yyyy", { locale: vi });
  // Capitalize first letter
  const displayedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.leftContent}>
        <Ionicons name="calendar-outline" size={20} color={PrimaryColors.primary} />
        <ThemedText style={styles.dateText}>{displayedDate}</ThemedText>
        {isToday(date) && (
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>Hôm nay</ThemedText>
          </View>
        )}
      </View>
      <Ionicons name="chevron-down" size={20} color={NeutralColors.gray500} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg, // Assuming lg is appropriate, maybe md (12 in image looks like md or lg)
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: NeutralColors.gray200, // Border appears in screenshot? Hard to tell, but usually safer to add a light border or shadow. The image shows a very subtle border or shadow. Let's stick with subtle border.
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.foreground,
  },
  badge: {
    backgroundColor: PrimaryColors.primaryLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  badgeText: {
    fontSize: 12,
    color: PrimaryColors.primary,
    fontWeight: '600',
  },
});
