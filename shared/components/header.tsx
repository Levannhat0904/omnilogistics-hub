import { Colors, PrimaryColors } from '@/shared/constants/colors';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Header() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={PrimaryColors.primary} />
      <View style={[styles.header, { paddingTop: insets.top - 10 }]}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>T</Text>
          </View>
          <Text style={styles.title}>TMS</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: PrimaryColors.primary,
    paddingBottom: 6,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PrimaryColors.primaryHover, // Màu tím đậm hơn
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

