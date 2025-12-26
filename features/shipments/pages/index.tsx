import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { ThemedView } from '@shared/components/themed-view';
import { Colors, StatusColors } from '@shared/constants/colors';
import { Spacing } from '@shared/constants/layout';

import { DatePickerModal } from '@shared/components/ui';
import { DateFilter, SummaryCard, TabBar, TripCard, type TabType } from '../components';
import { mockTrips } from '../data/mock-trips';
import type { DriverTrip } from '../types';

const getTodayTrips = (trips: DriverTrip[]) => {
  const today = format(new Date(), 'dd/MM/yyyy');
  return trips.filter(
    (trip) =>
      trip.scheduledDate === today &&
      (trip.status === 'ASSIGNED' || trip.status === 'LOADED')
  );
};

const getCompletedTrips = (trips: DriverTrip[]) => {
  return trips.filter((trip) => trip.status === 'COMPLETED');
};

const getInProgressTrips = (trips: DriverTrip[]) => {
  return trips.filter(
    (trip) => trip.status === 'ASSIGNED' || trip.status === 'LOADED'
  );
};

const getHistoryTrips = (trips: DriverTrip[]) => {
  return trips.filter((trip) => trip.status === 'COMPLETED');
};

const getCalendarTrips = (trips: DriverTrip[]) => {
  return trips.filter((trip) => trip.status === 'PENDING');
};

export default function ShipmentsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const todayTrips = useMemo(() => getTodayTrips(mockTrips), []);
  const completedTrips = useMemo(() => getCompletedTrips(mockTrips), []);
  const inProgressTrips = useMemo(() => getInProgressTrips(mockTrips), []);

  const displayedTrips = useMemo(() => {
    switch (activeTab) {
      case 'today':
        return todayTrips;
      case 'history':
        return getHistoryTrips(mockTrips);
      case 'calendar':
        return getCalendarTrips(mockTrips);
      default:
        return [];
    }
  }, [activeTab, todayTrips]);

  const currentDate = format(new Date(), "EEEE, dd/MM/yyyy", { locale: vi });
  const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText style={styles.title} type="title">
              Chuyến hàng của bạn
            </ThemedText>
            <View style={styles.dateRow}>
              <ThemedText style={styles.date} type="body">
                {formattedDate}
              </ThemedText>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <ThemedText style={styles.statusText} type="caption">
                  Online
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <SummaryCard
            type="today"
            value={todayTrips.length}
            label="Hôm nay"
          />
          <SummaryCard
            type="completed"
            value={completedTrips.length}
            label="Hoàn tất"
          />
          <SummaryCard
            type="in-progress"
            value={inProgressTrips.length}
            label="Đang thực hiện"
          />
        </View>

        {/* Tab Bar */}
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Date Filter */}
        {activeTab === 'calendar' && (
          <View style={styles.filterContainer}>
            <DateFilter
              date={selectedDate}
              onPress={openDatePicker}
            />
            <DatePickerModal
              visible={showDatePicker}
              date={selectedDate}
              onClose={() => setShowDatePicker(false)}
              onChange={setSelectedDate}
            />
          </View>
        )}

        {/* Trip List */}
        <View style={styles.tripList}>
          {displayedTrips.length > 0 ? (
            displayedTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onPress={() => {
                  // TODO: Navigate to trip detail
                  console.log('Navigate to trip:', trip.id);
                }}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <ThemedText style={styles.emptyText} type="body">
                Không có chuyến hàng nào
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingBottom: Spacing.lg,
  },
  headerContent: {
    gap: Spacing.sm,
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: '700',
    color: Colors.foreground,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 14,
    color: Colors.foreground,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: StatusColors.success,
  },
  statusText: {
    fontSize: 14,
    color: StatusColors.success,
    fontWeight: '500',
  },
  content: {
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  tripList: {
    marginTop: Spacing.lg,
  },
  filterContainer: {
    marginTop: Spacing.md,
  },
  emptyState: {
    paddingVertical: Spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.mutedForeground,
  },
});
