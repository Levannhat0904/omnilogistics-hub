import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/shared/constants/theme';
import { AuthGuard } from '@shared/components/auth-guard';
import { HapticTab } from '@shared/components/haptic-tab';
import { Header } from '@shared/components/header';
import { IconSymbol } from '@shared/components/ui/icon-symbol';
import { useColorScheme } from '@shared/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthGuard>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        header: () => <Header />,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 13, // Font size cho tab bar title
        },
      }}>
      <Tabs.Screen
        name="(shipments)"
        options={{
          title: 'Chuyến hàng',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="truck.box" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(reconciliation)"
        options={{
          title: 'Đối soát',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="doc.text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(notifications)"
        options={{
          title: 'Thông báo',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="person" color={color} />,
        }}
      />
    </Tabs>
    </AuthGuard>
  );
}
