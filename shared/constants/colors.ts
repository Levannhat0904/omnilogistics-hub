/**
 * Color palette converted from CSS variables (HSL to Hex)
 * Based on Purple Theme from Tailwind CSS config
 */

// Primary Brand Colors (Purple)
export const PrimaryColors = {
  primary: '#7c3aed', // hsl(262, 80%, 50%)
  primaryHover: '#6d28d9', // hsl(262, 80%, 45%)
  primaryLight: '#f3e8ff', // hsl(262, 80%, 95%)
  primaryForeground: '#ffffff', // hsl(0, 0%, 100%)
} as const;

// Background & Surfaces
export const BackgroundColors = {
  background: '#f1f3f6', // hsl(220, 20%, 97%)
  foreground: '#0f172a', // hsl(222, 47%, 11%)
  card: '#ffffff', // hsl(0, 0%, 100%)
  cardForeground: '#0f172a', // hsl(222, 47%, 11%)
  popover: '#ffffff',
  popoverForeground: '#0f172a',
} as const;

// Secondary & Muted
export const SecondaryColors = {
  secondary: '#f1f5f9', // hsl(220, 14%, 96%)
  secondaryForeground: '#0f172a',
  muted: '#f1f5f9',
  mutedForeground: '#64748b', // hsl(220, 9%, 46%)
} as const;

// Accent
export const AccentColors = {
  accent: '#f3e8ff', // hsl(262, 80%, 96%)
  accentForeground: '#6d28d9', // hsl(262, 80%, 40%)
} as const;

// Status Colors
export const StatusColors = {
  success: '#16a34a', // hsl(142, 76%, 36%)
  successForeground: '#ffffff',
  successLight: '#dcfce7', // hsl(142, 76%, 95%)
  warning: '#f59e0b', // hsl(38, 92%, 50%)
  warningForeground: '#ffffff',
  warningLight: '#fef3c7', // hsl(38, 92%, 95%)
  info: '#0ea5e9', // hsl(199, 89%, 48%)
  infoForeground: '#ffffff',
  infoLight: '#e0f2fe', // hsl(199, 89%, 95%)
  destructive: '#ef4444', // hsl(0, 84%, 60%)
  destructiveForeground: '#ffffff',
  destructiveLight: '#fee2e2', // hsl(0, 84%, 95%)
} as const;

// Neutral / Gray Colors
export const NeutralColors = {
  gray50: '#f8fafc',
  gray100: '#f1f5f9',
  gray200: '#e2e8f0',
  gray300: '#cbd5e1',
  gray400: '#94a3b8',
  gray500: '#64748b',
  gray600: '#475569',
  gray700: '#334155',
  gray800: '#1e293b',
  gray900: '#0f172a',
  white: '#ffffff',
  black: '#000000',
} as const;

// Tab & Interactive Colors
export const InteractiveColors = {
  tabInactive: '#eef2f6',
  tabActive: '#f3e8ff',
  indigoLight: '#eef2ff',
} as const;

// Borders & Inputs
export const BorderColors = {
  border: '#e2e8f0', // hsl(220, 13%, 91%)
  input: '#e2e8f0',
  ring: '#7c3aed', // hsl(262, 80%, 50%)
} as const;

// Dark Mode Colors
export const DarkModeColors = {
  primary: '#8b5cf6', // hsl(262, 80%, 60%)
  primaryForeground: '#ffffff',
  background: '#0f172a', // hsl(222, 47%, 8%)
  foreground: '#f8fafc', // hsl(210, 40%, 98%)
  card: '#1e293b', // hsl(222, 47%, 11%)
  cardForeground: '#f8fafc',
  secondary: '#1e293b', // hsl(217, 33%, 17%)
  secondaryForeground: '#f8fafc',
  muted: '#1e293b',
  mutedForeground: '#94a3b8', // hsl(215, 20%, 65%)
  border: '#1e293b',
  input: '#1e293b',
  ring: '#8b5cf6',
} as const;

// Export all colors
export const Colors = {
  ...PrimaryColors,
  ...BackgroundColors,
  ...SecondaryColors,
  ...AccentColors,
  ...StatusColors,
  ...NeutralColors,
  ...InteractiveColors,
  ...BorderColors,
  dark: DarkModeColors,
} as const;