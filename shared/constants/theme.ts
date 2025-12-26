/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';
import { PrimaryColors, StatusColors } from './colors';

// Using purple theme from colors.ts
const tintColorLight = PrimaryColors.primary; // '#7c3aed' - Purple
const tintColorDark = PrimaryColors.primary; // '#7c3aed' - Purple

export const Colors = {
  light: {
    text: '#0f172a', // foreground
    background: '#f1f3f6', // background
    tint: tintColorLight,
    icon: '#64748b', // muted-foreground
    tabIconDefault: '#64748b',
    tabIconSelected: tintColorLight,
    // Additional colors from theme
    primary: PrimaryColors.primary,
    success: StatusColors.success,
    warning: StatusColors.warning,
    info: StatusColors.info,
    destructive: StatusColors.destructive,
  },
  dark: {
    text: '#f8fafc', // foreground
    background: '#0f172a', // background
    tint: tintColorDark,
    icon: '#94a3b8', // muted-foreground
    tabIconDefault: '#94a3b8',
    tabIconSelected: tintColorDark,
    // Additional colors from theme
    primary: PrimaryColors.primary,
    success: StatusColors.success,
    warning: StatusColors.warning,
    info: StatusColors.info,
    destructive: StatusColors.destructive,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
