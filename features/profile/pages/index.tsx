import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { useLogout } from '@features/auth/hooks/use-auth';
import { ThemedText } from '@shared/components/themed-text';
import { ThemedView } from '@shared/components/themed-view';
import { Colors, PrimaryColors, StatusColors } from '@shared/constants/colors';
import { Spacing } from '@shared/constants/layout';

import {
  ContactInfoCard,
  MenuItem,
  ProfileHeader,
  StatsRow,
} from '../components';
import { useSession } from '../context/session-context';
import { SessionData } from '../types';

/**
 * Map session data từ API sang format component cần
 */
function mapSessionToUser(sessionData: SessionData) {
  // Xử lý fullName có thể undefined/null
  const fullName = sessionData.fullName || 'Người dùng';
  
  // Tạo initials từ fullName, fallback về "U" nếu không có
  const initials = fullName
    .split(' ')
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'U';

  return {
    name: fullName,
    role: sessionData.role?.name || 'Tài xế',
    id: `DRV-${sessionData.id || '000'}`,
    initials,
    vehiclePlate: '51A-123.45', // fix cứng
    phone: sessionData.phoneNumber || 'Chưa cập nhật',
    email: sessionData.email || 'Chưa cập nhật',
    stats: {
      completedTrips: 156, // fix cứng
      onTimeRate: 98, // fix cứng
      rating: 4.8, // fix cứng
    },
  };
}

export default function ProfilePage() {
  const { session, isLoading, error, refetch } = useSession();
  const logoutMutation = useLogout();
  const [refreshing, setRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (err) {
      console.error('[ProfilePage] Error refreshing:', err);
    } finally {
      setRefreshing(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={PrimaryColors.primary} />
          <ThemedText type="body" style={styles.loadingText}>
            Đang tải thông tin...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  // Error state
  if (error) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.centerContainer}>
          <ThemedText type="subtitle" style={styles.errorText}>
            Lỗi khi tải thông tin
          </ThemedText>
          <ThemedText type="body" style={styles.errorMessage}>
            {error.message || 'Đã xảy ra lỗi không xác định'}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  // Empty state
  if (!session) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.centerContainer}>
          <ThemedText type="subtitle" style={styles.errorText}>
            Không có thông tin session
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  // Map session data to user format
  console.log('[ProfilePage] Raw session data:', JSON.stringify(session, null, 2));
  const user = mapSessionToUser(session);
  console.log('[ProfilePage] Mapped user data:', JSON.stringify(user, null, 2));

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={PrimaryColors.primary}
            colors={[PrimaryColors.primary]}
          />
        }
      >
        <ProfileHeader user={user} />

        <StatsRow
          completedTrips={user.stats.completedTrips}
          onTimeRate={user.stats.onTimeRate}
          rating={user.stats.rating}
        />

        <ContactInfoCard
          info={{
            vehiclePlate: user.vehiclePlate,
            phone: user.phone,
            email: user.email,
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    marginTop: Spacing.md,
    color: Colors.mutedForeground,
  },
  errorText: {
    color: StatusColors.destructive,
    marginBottom: Spacing.xs,
  },
  errorMessage: {
    color: Colors.mutedForeground,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
});
