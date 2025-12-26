import { StyleSheet } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { ThemedView } from '@shared/components/themed-view';

export default function ProfilePage() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Cá nhân</ThemedText>
      <ThemedText>Thông tin cá nhân sẽ hiển thị ở đây</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

