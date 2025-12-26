import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { ThemedView } from '@shared/components/themed-view';
import { Colors, NeutralColors, PrimaryColors } from '@shared/constants/colors';
import { Radius, Spacing } from '@shared/constants/layout';

import { NotificationCard, type Notification } from '../components';

// Mock data
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'shipment',
    title: 'Chuyến mới được giao',
    message: 'Bạn được giao chuyến TRIP-001 với 3 đơn hàng',
    time: '10 phút trước',
    isRead: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Thanh toán đã xác nhận',
    message: 'Đơn hàng ORD-456 đã được xác nhận thanh toán',
    time: '1 giờ trước',
    isRead: false,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Nhắc nhở đối soát',
    message: 'Bạn có 2 khoản thu cần nộp về công ty',
    time: '3 giờ trước',
    isRead: true,
  },
  {
    id: '4',
    type: 'route',
    title: 'Cập nhật lộ trình',
    message: 'Lộ trình chuyến TRIP-002 đã được cập nhật',
    time: 'Hôm qua',
    isRead: true,
  },
  {
    id: '6',
    type: 'shipment',
    title: 'Hoàn thành giao hàng',
    message: 'Chuyến TRIP-003 đã hoàn thành 5/5 đơn hàng',
    time: 'Hôm qua',
    isRead: true,
  },
    {
    id: '7',
    type: 'shipment',
    title: 'Hoàn thành giao hàng',
    message: 'Chuyến TRIP-003 đã hoàn thành 5/5 đơn hàng',
    time: 'Hôm qua',
    isRead: true,
  },  {
    id: '8',
    type: 'shipment',
    title: 'Hoàn thành giao hàng',
    message: 'Chuyến TRIP-003 đã hoàn thành 5/5 đơn hàng',
    time: 'Hôm qua',
    isRead: true,
  },  {
    id: '9',
    type: 'shipment',
    title: 'Hoàn thành giao hàng',
    message: 'Chuyến TRIP-003 đã hoàn thành 5/5 đơn hàng',
    time: 'Hôm qua',
    isRead: true,
  },  {
    id: '10',
    type: 'shipment',
    title: 'Hoàn thành giao hàng',
    message: 'Chuyến TRIP-003 đã hoàn thành 5/5 đơn hàng',
    time: 'Hôm qua',
    isRead: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    Alert.alert(
      'Đánh dấu đã đọc',
      'Bạn có muốn đánh dấu tất cả thông báo là đã đọc?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng ý',
          onPress: () => {
            setNotifications((prev) =>
              prev.map((n) => ({ ...n, isRead: true }))
            );
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerTop}>
          {unreadCount > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleMarkAllAsRead}
              style={styles.badge}
            >
              <Ionicons name="notifications" size={14} color={PrimaryColors.primary} />
              <ThemedText type="defaultSemiBold" style={styles.badgeText}>
                {unreadCount} mới
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Notification List */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onPress={() => {
              // Mark single notification as read
              setNotifications((prev) =>
                prev.map((n) =>
                  n.id === notification.id ? { ...n, isRead: true } : n
                )
              );
            }}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerSection: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: PrimaryColors.primaryLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  badgeText: {
    color: PrimaryColors.primary,
    fontSize: 13,
  },
  list: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.md,
  },
  section: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  sectionTitle: {
    color: NeutralColors.gray500,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
});
