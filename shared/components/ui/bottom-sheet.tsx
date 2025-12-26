/**
 * Bottom Sheet Component
 * Reusable bottom sheet modal component with smooth animation
 */

import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@shared/components/themed-text';
import { BackgroundColors, BorderColors, NeutralColors } from '@shared/constants/colors';
import { Radius, Spacing } from '@shared/constants/layout';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ANIMATION_DURATION = 300;

// ============================================================================
// TYPES
// ============================================================================

interface BottomSheetProps {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  onClose: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * BottomSheet Component
 * Reusable modal bottom sheet with slide-up animation
 */
export function BottomSheet({
  visible,
  title,
  children,
  style,
  onClose,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 20,
          stiffness: 150,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset values when hidden
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    // Animate out
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
        </Animated.View>

        {/* Bottom Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: insets.bottom + Spacing.xl,
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          {/* Handle */}
          <View style={styles.handle} />

          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="subtitle">{title || ''}</ThemedText>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={NeutralColors.gray500} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    backgroundColor: BackgroundColors.card,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.xl,
    shadowColor: NeutralColors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: BorderColors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: 4,
  },
  content: {
    paddingBottom: Spacing.md,
  },
});
