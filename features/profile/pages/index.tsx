import React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

import { useLogout } from '@features/auth/hooks/use-auth';
import { ThemedView } from '@shared/components/themed-view';
import { Colors } from '@shared/constants/colors';
import { Spacing } from '@shared/constants/layout';

import {
  ContactInfoCard,
  MenuItem,
  ProfileHeader,
  StatsRow,
} from '../components';

// Mock data
const mockUser = {
  name: 'Phạm Minh Tài Xế',
  role: 'Tài xế',
  id: 'DRV-001',
  initials: 'PM',
  vehiclePlate: '51A-123.45',
  phone: '0912 345 678',
  email: 'driver@tms.vn',
  stats: {
    completedTrips: 156,
    onTimeRate: 98,
    rating: 4.8,
  },
};

export default function ProfilePage() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: () => logoutMutation.mutate(),
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader user={mockUser} />

        <StatsRow
          completedTrips={mockUser.stats.completedTrips}
          onTimeRate={mockUser.stats.onTimeRate}
          rating={mockUser.stats.rating}
        />

        <ContactInfoCard
          info={{
            vehiclePlate: mockUser.vehiclePlate,
            phone: mockUser.phone,
            email: mockUser.email,
          }}
        />

        <MenuItem
          icon="settings-outline"
          label="Cài đặt"
          onPress={() => console.log('Settings')}
        />

        <MenuItem
          icon="log-out-outline"
          label="Đăng xuất"
          variant="danger"
          onPress={handleLogout}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
});
