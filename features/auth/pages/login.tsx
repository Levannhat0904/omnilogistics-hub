/**
 * Màn hình đăng nhập
 * UI theo thiết kế TMS Pro
 */

import { BackgroundColors, Colors, NeutralColors, PrimaryColors } from '@/shared/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@shared/components/ui/button';
import { ControlledInput } from '@shared/components/ui/input';
import { loginSchema, type LoginFormData } from '@shared/schemas';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLogin } from '../hooks/use-auth';

export const LoginScreen = () => {
  const loginMutation = useLogin();
  const primary = PrimaryColors.primary;

  const {
    control,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      // Đăng nhập thành công - useLogin hook sẽ tự động redirect
    } catch (error: any) {
      // Hiển thị lỗi từ API
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Đăng nhập thất bại. Vui lòng thử lại.';
      console.error('Login error:', error);
      Alert.alert('Lỗi đăng nhập', errorMessage);
    }
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section - Purple Background */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="car-outline" size={64} color="#fff" />
          </View>
          <Text style={styles.appName}>TMS Pro</Text>
          <Text style={styles.tagline}>
            Hệ thống Quản lý Điều vận & Đối soát
          </Text>
        </View>

        {/* Login Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Đăng nhập</Text>

          {/* Phone Number Input */}
          <ControlledInput
            control={control}
            name="phoneNumber"
            label="Số điện thoại"
            icon="call-outline"
            placeholder="0912 345 678"
            keyboardType="phone-pad"
            autoCapitalize="none"
            disabled={loginMutation.isPending}
          />

          {/* Password Input */}
          <ControlledInput
            control={control}
            name="password"
            label="Mật khẩu"
            icon="lock-closed-outline"
            placeholder="Nhập mật khẩu"
            secureTextEntry
            showPasswordToggle
            autoCapitalize="none"
            disabled={loginMutation.isPending}
          />

          {/* Forgot Password Link */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => {
              // TODO: Navigate to forgot password screen
              Alert.alert('Quên mật khẩu', 'Tính năng đang phát triển');
            }}
          >
            <Text style={[styles.forgotPasswordText, { color: primary }]}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            title="Đăng nhập"
            variant="primary"
            size="medium"
            loading={loginMutation.isPending}
            onPress={handleSubmit(onSubmit)}
            backgroundColor={primary}
            fullWidth
          />
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.copyright}>
              © 2024 TMS Pro. All rights reserved.
            </Text>
          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColors.card,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: PrimaryColors.primary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  formCard: {
    flex: 1,
    backgroundColor: BackgroundColors.card,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.foreground,
    marginBottom: 24,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingVertical: 24,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 12,
    color: NeutralColors.gray400,
  },
});

