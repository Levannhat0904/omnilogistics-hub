import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { NeutralColors, PrimaryColors } from '@shared/constants/colors';
import { Radius, Spacing } from '@shared/constants/layout';

interface StatsRowProps {
  completedTrips: number;
  onTimeRate: number;
  rating: number;
}

export function StatsRow({ completedTrips, onTimeRate, rating }: StatsRowProps) {
  return (
    <View style={styles.statsContainer}>
      <Card style={styles.statCard}>
        <ThemedText type="title" style={[styles.statValue, { color: PrimaryColors.primary }]}>
          {completedTrips}
        </ThemedText>
        <ThemedText type="caption" style={styles.statLabel}>
          Chuyến hoàn thành
        </ThemedText>
      </Card>
      <Card style={styles.statCard}>
        <ThemedText type="title" style={[styles.statValue, { color: '#16a34a' }]}>
          {onTimeRate}%
        </ThemedText>
        <ThemedText type="caption" style={styles.statLabel}>
          Đúng hẹn
        </ThemedText>
      </Card>
      <Card style={styles.statCard}>
        <ThemedText type="title" style={[styles.statValue, { color: '#f59e0b' }]}>
          {rating}
        </ThemedText>
        <ThemedText type="caption" style={styles.statLabel}>
          Đánh giá
        </ThemedText>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    color: NeutralColors.gray500,
    textAlign: 'center',
  },
});
