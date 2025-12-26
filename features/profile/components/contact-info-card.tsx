import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { NeutralColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';

interface ContactInfo {
  vehiclePlate: string;
  phone: string;
  email: string;
}

interface ContactInfoCardProps {
  info: ContactInfo;
}

export function ContactInfoCard({ info }: ContactInfoCardProps) {
  return (
    <Card style={styles.infoCard}>
      <View style={styles.infoRow}>
        <View style={styles.infoLeft}>
          <Ionicons name="car-outline" size={IconSize.md} color={NeutralColors.gray500} />
          <ThemedText type="body">Thông tin xe</ThemedText>
        </View>
        <ThemedText type="defaultSemiBold" style={styles.infoValue}>
          {info.vehiclePlate}
        </ThemedText>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <View style={styles.infoLeft}>
          <Ionicons name="call-outline" size={IconSize.md} color={NeutralColors.gray500} />
          <ThemedText type="body">Số điện thoại</ThemedText>
        </View>
        <ThemedText type="defaultSemiBold" style={styles.infoValue}>
          {info.phone}
        </ThemedText>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <View style={styles.infoLeft}>
          <Ionicons name="mail-outline" size={IconSize.md} color={NeutralColors.gray500} />
          <ThemedText type="body">Email</ThemedText>
        </View>
        <ThemedText type="defaultSemiBold" style={styles.infoValue}>
          {info.email}
        </ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
    gap: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  infoValue: {
    color: NeutralColors.gray700,
  },
  divider: {
    height: 1,
    backgroundColor: NeutralColors.gray100,
  },
});
