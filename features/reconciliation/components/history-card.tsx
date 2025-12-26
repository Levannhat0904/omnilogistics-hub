import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { NeutralColors, PrimaryColors, StatusColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';

export interface HistoryRecord {
  id: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  paymentCount: number;
  amount: number;
  approvedBy: string;
}

interface HistoryCardProps {
  record: HistoryRecord;
  onPress?: () => void;
}

const formatCurrency = (value: number) => `${value.toLocaleString('vi-VN')} đ`;

export function HistoryCard({ record, onPress }: HistoryCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <ThemedText type="title">{record.date}</ThemedText>
          <View style={styles.statusBadge}>
            <Ionicons
              name="checkmark-circle"
              size={IconSize.sm}
              color={StatusColors.success}
            />
            <ThemedText
              type="defaultSemiBold"
              style={{ color: StatusColors.success }}
            >
              Đã duyệt
            </ThemedText>
          </View>
        </View>
        <View style={styles.content}>
          <View>
            <ThemedText type="body">
              {record.paymentCount} khoản thanh toán
            </ThemedText>
            <ThemedText type="caption">
              Duyệt bởi: {record.approvedBy}
            </ThemedText>
          </View>
          <View style={styles.amountRow}>
            <ThemedText
              type="value"
              style={{ color: PrimaryColors.primary }}
            >
              {formatCurrency(record.amount)}
            </ThemedText>
            <Ionicons
              name="chevron-forward"
              size={IconSize.lg}
              color={NeutralColors.gray400}
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
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
    marginBottom: Spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    backgroundColor: StatusColors.successLight,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
});
