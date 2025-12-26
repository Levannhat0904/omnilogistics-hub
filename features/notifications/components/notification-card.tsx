import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { NeutralColors, PrimaryColors, StatusColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';

export type NotificationType = 'shipment' | 'payment' | 'reminder' | 'route';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationCardProps {
  notification: Notification;
  onPress?: () => void;
}

const TYPE_CONFIG: Record<
  NotificationType,
  {
    icon: keyof typeof Ionicons.glyphMap;
    activeColor: string;
    activeBg: string;
  }
> = {
  shipment: {
    icon: 'cube',
    activeColor: PrimaryColors.primary,
    activeBg: PrimaryColors.primaryLight,
  },
  payment: {
    icon: 'checkmark-circle',
    activeColor: StatusColors.success,
    activeBg: StatusColors.successLight,
  },
  reminder: {
    icon: 'notifications',
    activeColor: StatusColors.warning,
    activeBg: StatusColors.warningLight,
  },
  route: {
    icon: 'map',
    activeColor: StatusColors.info,
    activeBg: StatusColors.infoLight,
  },
};

export function NotificationCard({ notification, onPress }: NotificationCardProps) {
  const isUnread = !notification.isRead;
  const config = TYPE_CONFIG[notification.type];

  const iconColor = isUnread ? config.activeColor : NeutralColors.gray400;
  const iconBgColor = isUnread ? config.activeBg : NeutralColors.gray100;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.card, isUnread && styles.cardUnread]}
    >
      {/* Icon Container with gradient-like effect */}
      <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
        <Ionicons name={config.icon} size={IconSize.lg} color={iconColor} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.title, isUnread && styles.titleUnread]}
            numberOfLines={1}
          >
            {notification.title}
          </ThemedText>
          {isUnread && <View style={[styles.unreadDot, { backgroundColor: config.activeColor }]} />}
        </View>

        <ThemedText type="body" style={styles.message} numberOfLines={2}>
          {notification.message}
        </ThemedText>

        <View style={styles.footer}>
          <Ionicons name="time-outline" size={14} color={NeutralColors.gray400} />
          <ThemedText type="caption" style={styles.time}>
            {notification.time}
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    gap: Spacing.lg,
    backgroundColor: NeutralColors.white,
    // Subtle shadow
    shadowColor: NeutralColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardUnread: {
    backgroundColor: '#fefefe',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: NeutralColors.gray700,
  },
  titleUnread: {
    color: NeutralColors.gray900,
  },
  message: {
    color: NeutralColors.gray500,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
  time: {
    color: NeutralColors.gray400,
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
