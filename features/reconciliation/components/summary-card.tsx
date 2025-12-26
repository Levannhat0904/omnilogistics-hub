import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { StatusColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';
import { formatCurrency } from '@shared/utils';

interface SummaryCardProps {
  type: 'warning' | 'info';
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  amount: number;
}



export function SummaryCard({ type, icon, label, amount }: SummaryCardProps) {
  const color = type === 'warning' ? StatusColors.warning : StatusColors.info;

  return (
    <Card style={StyleSheet.flatten([styles.card, { borderColor: color }])}>
      <View style={styles.header}>
        <Ionicons name={icon} size={IconSize.lg} color={color} />
        <ThemedText type="caption">{label}</ThemedText>
      </View>
      <ThemedText type="value" style={{ color }} numberOfLines={1}>
        {formatCurrency(amount)}
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
});
