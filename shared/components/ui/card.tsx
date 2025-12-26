/**
 * Card Component
 * Reusable card component với shadow và elevation nhất quán
 */

import { BackgroundColors } from '@shared/constants/colors';
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';

type CardVariant = 'default' | 'outlined';

interface CardProps extends Omit<ViewProps, 'style'> {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number | { top?: number; bottom?: number; left?: number; right?: number };
  backgroundColor?: string;
  borderRadius?: number;
  pressable?: boolean;
  onPress?: () => void;
  variant?: CardVariant;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 16,
  backgroundColor = BackgroundColors.card,
  borderRadius = 12,
  pressable = false,
  onPress,
  variant = 'default',
  ...viewProps
}) => {
  // Xử lý padding
  const getPaddingStyle = (): ViewStyle => {
    if (typeof padding === 'number') {
      return {
        padding,
      };
    }
    return {
      paddingTop: padding.top ?? 16,
      paddingBottom: padding.bottom ?? 16,
      paddingLeft: padding.left ?? 16,
      paddingRight: padding.right ?? 16,
    };
  };

  const cardStyle: ViewStyle[] = [
    styles.card,
    {
      backgroundColor,
      borderRadius,
      ...getPaddingStyle(),
    },
  ];

  // Thêm border nếu variant là outlined
  if (variant === 'outlined') {
    cardStyle.push(styles.outlined);
  }

  // Thêm custom style
  if (style) {
    cardStyle.push(style);
  }

  // Nếu pressable, sử dụng TouchableOpacity
  if (pressable && onPress) {
    // Loại bỏ các props không tương thích với TouchableOpacity
    const { onBlur, onFocus, ...touchableProps } = viewProps;
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.8}
        {...touchableProps}
      >
        {children}
      </TouchableOpacity>
    );
  }

  // Ngược lại, sử dụng View
  return (
    <View style={cardStyle} {...viewProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: BackgroundColors.card,
    borderRadius: 12,
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation cho Android
    elevation: 3,
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
});

