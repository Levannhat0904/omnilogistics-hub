import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { BottomSheet } from '@shared/components/ui/bottom-sheet';
import { BorderColors, NeutralColors, PrimaryColors, StatusColors } from '@shared/constants/colors';
import { Radius, Spacing } from '@shared/constants/layout';

import { type HistoryRecord } from './history-card';

interface HistoryDetailSheetProps {
  visible: boolean;
  onClose: () => void;
  record: HistoryRecord | null;
}

const formatCurrency = (value: number) => `${value.toLocaleString('vi-VN')} đ`;

const STATUS_LABELS: Record<HistoryRecord['status'], string> = {
  approved: 'Đã duyệt',
  pending: 'Chờ duyệt',
  rejected: 'Từ chối',
};

const STATUS_COLORS: Record<HistoryRecord['status'], string> = {
  approved: StatusColors.success,
  pending: StatusColors.warning,
  rejected: StatusColors.destructive,
};

const STATUS_BG_COLORS: Record<HistoryRecord['status'], string> = {
  approved: StatusColors.successLight,
  pending: StatusColors.warningLight,
  rejected: StatusColors.destructiveLight,
};

export function HistoryDetailSheet({ visible, onClose, record }: HistoryDetailSheetProps) {
  if (!record) return null;

  const statusColor = STATUS_COLORS[record.status];
  const statusBgColor = STATUS_BG_COLORS[record.status];

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Chi tiết đối soát">
      <View style={styles.container}>
        {/* Ngày gửi */}
        <View style={styles.row}>
          <ThemedText type="body" style={styles.label}>Ngày gửi</ThemedText>
          <ThemedText type="defaultSemiBold">{record.date} 12:37</ThemedText>
        </View>

        {/* Trạng thái */}
        <View style={styles.row}>
          <ThemedText type="body" style={styles.label}>Trạng thái</ThemedText>
          <View style={[styles.statusBadge, { backgroundColor: statusBgColor }]}>
            <ThemedText type="defaultSemiBold" style={{ color: statusColor }}>
              {STATUS_LABELS[record.status]}
            </ThemedText>
          </View>
        </View>

        {/* Số khoản */}
        <View style={styles.row}>
          <ThemedText type="body" style={styles.label}>Số khoản</ThemedText>
          <ThemedText type="defaultSemiBold">{record.paymentCount}</ThemedText>
        </View>

        {/* Tổng tiền */}
        <View style={styles.row}>
          <ThemedText type="body" style={styles.label}>Tổng tiền</ThemedText>
          <ThemedText type="value" style={{ color: PrimaryColors.primary }}>
            {formatCurrency(record.amount)}
          </ThemedText>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Duyệt lúc */}
        <View style={styles.row}>
          <ThemedText type="body" style={styles.label}>Duyệt lúc</ThemedText>
          <ThemedText type="defaultSemiBold">{record.date} 12:37</ThemedText>
        </View>

        {/* Duyệt bởi */}
        <View style={styles.row}>
          <ThemedText type="body" style={styles.label}>Duyệt bởi</ThemedText>
          <ThemedText type="defaultSemiBold">{record.approvedBy}</ThemedText>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.lg,
    paddingTop: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: NeutralColors.gray500,
  },
  statusBadge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  divider: {
    height: 1,
    backgroundColor: BorderColors.border,
    marginVertical: Spacing.sm,
  },
});
