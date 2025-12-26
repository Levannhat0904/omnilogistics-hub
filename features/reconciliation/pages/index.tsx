import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { ThemedView } from '@shared/components/themed-view';
import { Button } from '@shared/components/ui/button';
import { Colors, NeutralColors } from '@shared/constants/colors';
import { Spacing } from '@shared/constants/layout';

import {
  type HistoryRecord,
  type Order,
  ReconciledCard,
  SummaryCard,
  TabBar,
  TabContent,
  type TabType,
} from '../components';

const pendingAmount = 73000000;
const reviewingAmount = 55000000;
const reconciledAmount = 207000000;
const cycleCount = 2;

const orders: Order[] = [
  {
    code: 'ORD-001',
    trip: 'TRIP-001',
    customer: 'Nguyễn Văn A',
    date: '26/12/2025',
    payment: 'Tiền mặt',
    amount: 2000000,
  },
  {
    code: 'ORD-003',
    trip: 'TRIP-002',
    customer: 'Lê Văn C',
    date: '26/12/2025',
    payment: 'Tiền mặt',
    amount: 3800000,
  },
  {
    code: 'ORD-005',
    trip: 'TRIP-003',
    customer: 'Trần Thị D',
    date: '25/12/2025',
    payment: 'Tiền mặt',
    amount: 1500000,
  },
];

const historyRecords: HistoryRecord[] = [
  {
    id: 'REC-001',
    date: '23/12/2025',
    status: 'approved',
    paymentCount: 5,
    amount: 12500000,
    approvedBy: 'Kế toán Lê Văn B',
  },
  {
    id: 'REC-002',
    date: '16/12/2025',
    status: 'approved',
    paymentCount: 8,
    amount: 25800000,
    approvedBy: 'Kế toán Nguyễn Thị C',
  },
  {
    id: 'REC-003',
    date: '09/12/2025',
    status: 'approved',
    paymentCount: 3,
    amount: 8700000,
    approvedBy: 'Kế toán Lê Văn B',
  },
];

const formatCurrency = (value: number) => `${value.toLocaleString('vi-VN')} đ`;

export default function ReconciliationPage() {
  const [activeTab, setActiveTab] = useState<TabType>('pending');

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary */}
        <View style={styles.summaryRow}>
          <SummaryCard
            type="warning"
            icon="card-outline"
            label="Chưa nộp"
            amount={pendingAmount}
          />
          <SummaryCard
            type="info"
            icon="time-outline"
            label="Chờ duyệt"
            amount={reviewingAmount}
          />
        </View>

        {/* Reconciled */}
        <ReconciledCard amount={reconciledAmount} cycleCount={cycleCount} />

        {/* Tab */}
        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingCount={orders.length}
        />

        {/* Tab Content */}
        <TabContent
          activeTab={activeTab}
          orders={orders}
          historyRecords={historyRecords}
        />

        {/* CTA */}
        {activeTab === 'pending' && (
          <View style={styles.ctaWrapper}>
            <Button
              title={`Gửi đối soát (${formatCurrency(pendingAmount)})`}
              fullWidth
            />
            <ThemedText style={styles.helperText}>
            Gửi yêu cầu đối soát tiền thu hộ với công ty
          </ThemedText>
        </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  ctaWrapper: {
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  helperText: {
    textAlign: 'center',
    color: NeutralColors.gray400,
    fontSize: 14,
  },
});
