import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { InteractiveColors, NeutralColors, PrimaryColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';
import { formatCurrency } from '@shared/utils';

export interface Order {
  code: string;
  trip: string;
  customer: string;
  date: string;
  payment: string;
  amount: number;
}

interface OrderCardProps {
  order: Order;
}



export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="title">{order.code}</ThemedText>
        <View style={styles.tripBadge}>
          <ThemedText
            type="defaultSemiBold"
            style={{ color: PrimaryColors.primary }}
          >
            {order.trip}
          </ThemedText>
        </View>
        <ThemedText
          type="value"
          style={{ marginLeft: 'auto', color: PrimaryColors.primary }}
        >
          {formatCurrency(order.amount)}
        </ThemedText>
      </View>
      <ThemedText type="body" style={{ marginBottom: Spacing.md }}>
        {order.customer}
      </ThemedText>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={IconSize.sm} color={NeutralColors.gray500} />
          <ThemedText type="caption">{order.date}</ThemedText>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="cash-outline" size={IconSize.sm} color={NeutralColors.gray500} />
          <ThemedText type="caption">{order.payment}</ThemedText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.xl,
    borderRadius: Radius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  tripBadge: {
    paddingHorizontal: 10,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    backgroundColor: InteractiveColors.indigoLight,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
