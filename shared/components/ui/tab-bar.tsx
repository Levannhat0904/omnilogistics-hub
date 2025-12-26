/**
 * TabBar Component
 * Reusable tab bar component
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { InteractiveColors, NeutralColors, PrimaryColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';

export interface TabItem<T extends string = string> {
  key: T;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  count?: number;
}

interface TabBarProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  gap?: number;
}

/**
 * TabBar Component
 */
export function TabBar<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  gap = Spacing.lg,
}: TabBarProps<T>) {
  const renderTab = (tab: TabItem<T>, isActive: boolean) => {
    const color = isActive ? PrimaryColors.primary : NeutralColors.gray400;
    const label = tab.count !== undefined ? `${tab.label}${tab.count > 0 ? ` (${tab.count})` : ''}` : tab.label;

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
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { gap }]}>
      {tabs.map((tab) => renderTab(tab, activeTab === tab.key))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
