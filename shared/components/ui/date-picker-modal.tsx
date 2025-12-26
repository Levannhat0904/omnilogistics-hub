import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@shared/components/themed-text';
import { Colors } from '@shared/constants/colors';
import { Spacing } from '@shared/constants/layout';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  date: Date;
  onChange: (date: Date) => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  date,
  onChange,
}) => {
  const [tempDate, setTempDate] = useState(date);

  useEffect(() => {
    if (visible) {
      setTempDate(date);
    }
  }, [visible, date]);

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      onClose();
      if (selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const confirmIOSDate = () => {
    onChange(tempDate);
    onClose();
  };

  if (Platform.OS === 'android') {
    return visible ? (
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onDateChange}
      />
    ) : null;
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={styles.cancelButton}>Hủy</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmIOSDate}>
              <ThemedText style={styles.doneButton}>Xong</ThemedText>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={tempDate}
            mode="date"
            display="spinner"
            onChange={onDateChange}
            style={styles.picker}
            locale="vi-VN"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: Spacing['2xl'],
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cancelButton: {
    color: Colors.mutedForeground,
    fontWeight: '500',
    fontSize: 16,
  },
  doneButton: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  picker: {
    height: 200,
    width: '100%',
    alignSelf: 'center',
  },
});
