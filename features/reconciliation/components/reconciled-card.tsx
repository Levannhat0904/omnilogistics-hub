import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { Card } from '@shared/components/ui/card';
import { BackgroundColors, StatusColors } from '@shared/constants/colors';
import { IconSize, Radius, Spacing } from '@shared/constants/layout';

interface ReconciledCardProps {
  amount: number;
  cycleCount: number;
}

const formatCurrency = (value: number) => `${value.toLocaleString('vi-VN')} đ`;

export function ReconciledCard({ amount, cycleCount }: ReconciledCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <View>
          <View style={styles.topRow}>
            <View style={styles.left}>
              <View style={styles.iconPill}>
                <Ionicons
                  name="trending-up-outline"
                  size={IconSize.md}
                  color={StatusColors.success}
                />
              </View>
              <ThemedText type="caption">
                Đã đối soát tháng này
              </ThemedText>
            </View>
          </View>
          <View style={styles.bottomRow}>
            <ThemedText
              type="value"
              style={{ color: StatusColors.success }}
            >
              {formatCurrency(amount)}
            </ThemedText>
          </View>
        </View>
        <View style={styles.right}>
          <ThemedText
            type="value"
            style={{ color: BackgroundColors.foreground, lineHeight: 28 }}
          >
            {cycleCount} đợt
          </ThemedText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: StatusColors.success,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  bottomRow: {
    marginTop: 0,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPill: {
    width: 32,
    height: 32,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: StatusColors.successLight,
  },
});
