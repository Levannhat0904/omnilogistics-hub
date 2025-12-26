import { StyleSheet } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { ThemedView } from '@shared/components/themed-view';

export default function ReconciliationPage() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Đối soát</ThemedText>
      <ThemedText>Danh sách đối soát sẽ hiển thị ở đây</ThemedText>
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

