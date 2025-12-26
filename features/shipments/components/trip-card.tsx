import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { Colors, NeutralColors, PrimaryColors, StatusColors } from '@shared/constants/colors';
import { Spacing } from '@shared/constants/layout';
import { formatCurrency } from '@shared/utils';

import type { DriverTrip } from '../types';

interface TripCardProps {
  trip: DriverTrip;
  onPress?: () => void;
}

const getStatusInfo = (status: DriverTrip['status']) => {
  switch (status) {
    case 'ASSIGNED':
      return {
        label: 'Đã gán',
        color: StatusColors.infoLight,
        textColor: StatusColors.info,
      };
    case 'LOADED':
      return {
        label: 'Đã bốc hàng',
        color: StatusColors.orangeLight,
        textColor: StatusColors.orange,
      };
    case 'COMPLETED':
      return {
        label: 'Hoàn tất',
        color: StatusColors.successLight,
        textColor: StatusColors.success,
      };
    case 'PENDING':
      return {
        label: 'Chờ xử lý',
        color: NeutralColors.gray200,
        textColor: NeutralColors.gray600,
      };
  }
};

export const TripCard: React.FC<TripCardProps> = ({ trip, onPress }) => {
  const statusInfo = getStatusInfo(trip.status);

  return (
    <Card
      pressable={!!onPress}
      onPress={onPress}
      style={styles.card}
      variant="outlined"
      borderRadius={12}
      padding={Spacing.lg}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="car" size={24} color={PrimaryColors.primary} />
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <ThemedText style={styles.tripCode} type="subtitle">
                {trip.code}
              </ThemedText>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusInfo.color },
                ]}
              >
                <ThemedText
                  style={[styles.statusText, { color: statusInfo.textColor }]}
                  type="caption"
                >
                  {statusInfo.label}
                </ThemedText>
              </View>
            </View>
            <View style={styles.metaRow}>
              <ThemedText style={styles.vehiclePlate} type="body">
                {trip.vehiclePlate}
              </ThemedText>
              {trip.role === 'primary' && (
                <View
                  style={[
                    styles.roleBadge,
                    { backgroundColor: PrimaryColors.primaryLight },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.roleText,
                      { color: PrimaryColors.primary },
                    ]}
                    type="caption"
                  >
                    Tài xế chính
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
        </View>
        {onPress && (
          <Ionicons
            name="chevron-forward"
            size={20}
            color={NeutralColors.gray400}
          />
        )}
      </View>

      <View style={styles.routeRow}>
        <Ionicons name="location" size={16} color={StatusColors.success} />
        <ThemedText style={styles.route} type="body">
          {trip.route}
        </ThemedText>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Ionicons
            name="cube-outline"
            size={16}
            color={NeutralColors.gray500}
          />
          <ThemedText style={styles.infoText} type="body">
            {trip.orderCount} đơn hàng
          </ThemedText>
        </View>
        <View style={styles.infoItem}>
          <Ionicons
            name="time-outline"
            size={16}
            color={NeutralColors.gray500}
          />
          <ThemedText style={styles.infoText} type="body">
            {trip.estimatedTime}
          </ThemedText>
        </View>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.footerLabel} type="body">
          Tổng thu
        </ThemedText>
        <ThemedText style={styles.footerAmount} type="value">
          {formatCurrency(trip.totalAmount)}
        </ThemedText>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.lg,
    borderColor: PrimaryColors.primaryLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: Spacing.md,
  },
  headerInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  tripCode: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.foreground,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  vehiclePlate: {
    fontSize: 14,
    color: Colors.foreground,
  },
  roleBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  route: {
    fontSize: 14,
    color: Colors.foreground,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  infoText: {
    fontSize: 14,
    color: Colors.foreground,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: NeutralColors.gray200,
  },
  footerLabel: {
    fontSize: 14,
    color: Colors.foreground,
  },
  footerAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: StatusColors.info,
  },
});

