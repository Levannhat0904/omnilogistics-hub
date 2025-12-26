import React from 'react';

import { TabBar as SharedTabBar, type TabItem } from '@shared/components/ui';
import { Spacing } from '@shared/constants/layout';

export type TabType = 'today' | 'history' | 'calendar';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem<TabType>[] = [
    {
      key: 'today',
      label: 'Hôm nay',
      icon: 'car-outline',
    },
    {
      key: 'history',
      label: 'Lịch sử',
      icon: 'time-outline',
    },
    {
      key: 'calendar',
      label: 'Lịch',
      icon: 'calendar-outline',
    },
  ];

  return (
    <SharedTabBar
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={onTabChange}
      gap={Spacing.xl}
    />
  );
};
