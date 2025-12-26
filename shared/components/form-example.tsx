/**
 * Component ví dụ sử dụng React Hook Form với Zod
 * 
 * Component này minh họa cách sử dụng react-hook-form kết hợp với zod schema
 * Bạn có thể tham khảo và áp dụng vào các form thực tế trong dự án
 */

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { loginSchema, type LoginFormData } from '@shared/schemas';

export const LoginFormExample = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur', // Validate khi blur (rời khỏi field)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Form submitted:', data);
      // TODO: Gọi API đăng nhập
      // await loginAPI(data);
      
      // Reset form sau khi submit thành công (nếu cần)
      // reset();
    } catch (error) {
      console.error('Login error:', error);
      // Xử lý lỗi (hiển thị toast, alert, etc.)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      {/* Email Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.email && styles.inputError,
              ]}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Nhập email của bạn"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSubmitting}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      {/* Password Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Mật khẩu</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.password && styles.inputError,
              ]}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Nhập mật khẩu"
              secureTextEntry
              editable={!isSubmitting}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Đăng nhập</Text>
        )}
      </TouchableOpacity>

      {/* Reset Button (optional) */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => reset()}
        disabled={isSubmitting}
      >
        <Text style={styles.resetButtonText}>Reset form</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 50,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#6b7280',
    fontSize: 14,
  },
});

