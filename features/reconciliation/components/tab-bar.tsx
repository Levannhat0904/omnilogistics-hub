import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { InteractiveColors, NeutralColors, PrimaryColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';

export type TabType = 'pending' | 'history';

interface TabItem {
  key: TabType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  count?: number;
}

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingCount?: number;
}

const INACTIVE_COLOR = NeutralColors.gray400;

export function TabBar({ activeTab, onTabChange, pendingCount = 0 }: TabBarProps) {
  const tabs: TabItem[] = [
    {
      key: 'pending',
      label: `Chưa nộp${pendingCount > 0 ? ` (${pendingCount})` : ''}`,
      icon: 'document-text-outline',
    },
    {
      key: 'history',
      label: 'Lịch sử',
      icon: 'cash-outline',
    },
  ];

  return (
    <View style={styles.tabRow}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const color = isActive ? PrimaryColors.primary : INACTIVE_COLOR;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onTabChange(tab.key)}
            style={[styles.tabItem, isActive && styles.tabActive]}
          >
            <Ionicons name={tab.icon} size={IconSize.md} color={color} />
            <ThemedText
              type={isActive ? 'defaultSemiBold' : 'caption'}
              style={isActive ? { color: PrimaryColors.primary } : undefined}
            >
              {tab.label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    backgroundColor: InteractiveColors.tabInactive,
  },
  tabActive: {
    backgroundColor: InteractiveColors.tabActive,
    borderWidth: 1,
    borderColor: PrimaryColors.primary,
  },
});
