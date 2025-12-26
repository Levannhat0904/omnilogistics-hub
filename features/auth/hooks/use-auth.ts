/**
 * Auth Hooks
 * Custom hooks cho authentication với TanStack Query
 */

import { clearAuthStorage, saveAuthTokens } from '@shared/lib/auth-storage';
import { LoginRequest } from '@shared/types/auth.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { loginApi, logoutApi } from '../api/auth.api';

/**
 * Hook để đăng nhập
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const data = await loginApi(credentials);
      
      // Lưu tokens vào SecureStore
      await saveAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        accessTokenExpiredAt: data.accessTokenExpiredAt,
      });

      return data;
    },
    onSuccess: async () => {
      // Invalidate queries nếu cần
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      // Invalidate và refetch session data ngay sau khi login thành công
      queryClient.invalidateQueries({ queryKey: ['sessions', 'current'] });
      // Redirect to tabs after successful login
      router.replace('/(tabs)/(shipments)');
    },
    onError: (error: any) => {
      // Error đã được log, có thể thêm toast notification ở đây nếu cần
      // Hiện tại chỉ log để tránh duplicate với Alert trong login screen
      console.error('Login error:', error);
    },
  });
};

/**
 * Hook để đăng xuất
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      try {
        await logoutApi();
      } catch (error) {
        // Vẫn clear storage ngay cả khi API call fail
        console.error('Logout API error:', error);
      } finally {
        // Xóa tất cả auth data
        await clearAuthStorage();
      }
    },
    onSuccess: () => {
      // Remove session query trước khi clear tất cả
      queryClient.removeQueries({ queryKey: ['sessions', 'current'] });
      // Clear tất cả queries
      queryClient.clear();
      // Redirect to login after logout
      router.replace('/(auth)/login');
    },
  });
};

