import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Spacing } from '@shared/constants/layout';

import { HistoryCard, type HistoryRecord } from './history-card';
import { HistoryDetailSheet } from './history-detail-sheet';
import { OrderCard, type Order } from './order-card';
import { type TabType } from './tab-bar';

interface TabContentProps {
  activeTab: TabType;
  orders: Order[];
  historyRecords: HistoryRecord[];
}

export function TabContent({ activeTab, orders, historyRecords }: TabContentProps) {
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const handleHistoryPress = (record: HistoryRecord) => {
    setSelectedRecord(record);
    setSheetVisible(true);
  };

  const handleCloseSheet = () => {
    setSheetVisible(false);
    setSelectedRecord(null);
  };

  if (activeTab === 'pending') {
    return (
      <View style={styles.list}>
        {orders.map((order) => (
          <OrderCard key={order.code} order={order} />
        ))}
      </View>
    );
  }

  return (
    <>
      <View style={styles.list}>
        {historyRecords.map((record) => (
          <HistoryCard
            key={record.id}
            record={record}
            onPress={() => handleHistoryPress(record)}
          />
        ))}
      </View>
      <HistoryDetailSheet
        visible={sheetVisible}
        onClose={handleCloseSheet}
        record={selectedRecord}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.lg,
  },
});
