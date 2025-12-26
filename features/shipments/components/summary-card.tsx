import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { Colors, PrimaryColors, StatusColors } from '@shared/constants/colors';
import { Spacing } from '@shared/constants/layout';

type SummaryCardType = 'today' | 'completed' | 'in-progress';

interface SummaryCardProps {
  type: SummaryCardType;
  value: number;
  label: string;
}

const getCardStyles = (type: SummaryCardType) => {
  switch (type) {
    case 'today':
      return {
        backgroundColor: PrimaryColors.primaryLight,
        valueColor: PrimaryColors.primary,
      };
    case 'completed':
      return {
        backgroundColor: StatusColors.successLight,
        valueColor: StatusColors.success,
      };
    case 'in-progress':
      return {
        backgroundColor: StatusColors.orangeLight,
        valueColor: StatusColors.orange,
      };
  }
};

export const SummaryCard: React.FC<SummaryCardProps> = ({ type, value, label }) => {
  const { backgroundColor, valueColor } = getCardStyles(type);

  return (
    <Card
      style={styles.card}
      backgroundColor={backgroundColor}
      padding={Spacing.lg}
      borderRadius={12}
    >
      <ThemedText style={[styles.value, { color: valueColor }]} type="value">
        {value}
      </ThemedText>
      <ThemedText style={styles.label} type="caption">
        {label}
      </ThemedText>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: 14,
    color: Colors.foreground,
    fontWeight: '500',
  },
});

