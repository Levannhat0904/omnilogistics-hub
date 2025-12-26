/**
 * Button Component
 * Reusable button component với loading state, variants, và icon support
 */

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from 'react-native';

import { Colors, NeutralColors, PrimaryColors } from '@shared/constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  containerStyle,
  textStyle,
  backgroundColor,
  textColor,
  ...touchableProps
}) => {
  const isDisabled = disabled || loading;

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.button, styles[size]];

    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primary);
        break;
      case 'secondary':
        baseStyle.push(styles.secondary);
        break;
      case 'outline':
        baseStyle.push(styles.outline);
        break;
      case 'ghost':
        baseStyle.push(styles.ghost);
        break;
    }

    // Custom background color
    if (backgroundColor) {
      baseStyle.push({ backgroundColor });
    }

    // Full width
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }

    // Disabled state
    if (isDisabled) {
      baseStyle.push(styles.disabled);
    }

    // Custom container style
    if (containerStyle) {
      baseStyle.push(containerStyle);
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.buttonText, styles[`${size}Text`]];

    // Variant text styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyle.push(styles.outlineText);
        break;
      case 'ghost':
        baseStyle.push(styles.ghostText);
        break;
    }

    // Custom text color
    if (textColor) {
      baseStyle.push({ color: textColor });
    }

    // Custom text style
    if (textStyle) {
      baseStyle.push(textStyle);
    }

    return baseStyle;
  };

  const renderIcon = () => {
    if (!icon || loading) return null;

    const iconColor =
      textColor ||
      (variant === 'primary' || variant === 'secondary'
        ? Colors.white
        : variant === 'outline' || variant === 'ghost'
        ? PrimaryColors.primary
        : Colors.foreground);

    return (
      <Ionicons
        name={icon}
        size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
        color={iconColor}
        style={iconPosition === 'left' ? styles.iconLeft : styles.iconRight}
      />
    );
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'secondary' ? Colors.white : PrimaryColors.primary}
        />
      ) : (
        <>
          {iconPosition === 'left' && renderIcon()}
          <Text style={getTextStyle()}>{title}</Text>
          {iconPosition === 'right' && renderIcon()}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: PrimaryColors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 52,
  },
  large: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    minHeight: 60,
  },
  // Variants
  primary: {
    backgroundColor: PrimaryColors.primary,
  },
  secondary: {
    backgroundColor: NeutralColors.gray500,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: PrimaryColors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // Text styles
  buttonText: {
    fontWeight: '600',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: PrimaryColors.primary,
  },
  ghostText: {
    color: PrimaryColors.primary,
  },
  // States
  disabled: {
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
  },
  // Icon styles
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

