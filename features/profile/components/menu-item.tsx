import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { NeutralColors, StatusColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  variant?: 'default' | 'danger';
}

export function MenuItem({ icon, label, onPress, variant = 'default' }: MenuItemProps) {
  const isDanger = variant === 'danger';
  const color = isDanger ? StatusColors.destructive : NeutralColors.gray500;

  if (isDanger) {
    return (
      <TouchableOpacity style={styles.dangerButton} activeOpacity={0.7} onPress={onPress}>
        <Ionicons name={icon} size={IconSize.md} color={color} />
        <ThemedText type="defaultSemiBold" style={{ color }}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  }

  return (
    <Card style={styles.menuCard}>
      <TouchableOpacity style={styles.menuRow} activeOpacity={0.7} onPress={onPress}>
        <Ionicons name={icon} size={IconSize.md} color={color} />
        <ThemedText type="body" style={styles.menuLabel}>{label}</ThemedText>
        <Ionicons name="chevron-forward" size={IconSize.md} color={NeutralColors.gray400} />
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  menuCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuLabel: {
    flex: 1,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
  },
});
