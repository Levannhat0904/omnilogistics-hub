import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@shared/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'caption' | 'value' | 'body';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'caption' ? styles.caption : undefined,
        type === 'value' ? styles.value : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'body' ? styles.body : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 12,
    lineHeight: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold', 
  },
  link: {
    lineHeight: 20,
    fontSize: 16,
    color: '#0a7ea4',
  },
  caption: {
    fontSize: 12,
    color: '#64748b', // mutedForeground is hardcoded here since we don't import Colors yet, but based on inspection it was #64748b
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  defaultSemiBold: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
  },
});
