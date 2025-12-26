import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { NeutralColors, PrimaryColors, StatusColors } from '@shared/constants/colors';
import { Radius, Spacing } from '@shared/constants/layout';

interface User {
  name: string;
  role: string;
  id: string;
  initials: string;
}

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <ThemedText type="title" style={styles.avatarText}>
            {user.initials}
          </ThemedText>
        </View>
        <View style={styles.profileInfo}>
          <ThemedText type="subtitle" style={styles.userName}>
            {user.name}
          </ThemedText>
          <ThemedText type="body" style={styles.userRole}>
            {user.role}
          </ThemedText>
          <ThemedText type="caption" style={styles.userId}>
            ID: {user.id}
          </ThemedText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    padding: Spacing.xl,
    borderRadius: Radius.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: PrimaryColors.primaryLight,
    borderWidth: 3,
    borderColor: PrimaryColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: PrimaryColors.primary,
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  userName: {
    fontSize: 20,
  },
  userRole: {
    color: NeutralColors.gray500,
  },
  userId: {
    color: StatusColors.success,
  },
});
