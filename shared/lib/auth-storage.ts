/**
 * Auth Storage Helper
 * Utilities để quản lý authentication tokens trong SecureStore
 */

import { AuthResponse, STORAGE_KEYS } from '@shared/types/auth.types';
import * as SecureStore from 'expo-secure-store';

/**
 * Lưu tokens sau khi đăng nhập thành công
 */
export const saveAuthTokens = async (authData: AuthResponse): Promise<void> => {
  try {
    await Promise.all([
      SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, authData.accessToken),
      SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, authData.refreshToken),
    ]);

    // Lưu user data nếu có
    if (authData.user) {
      await SecureStore.setItemAsync(
        STORAGE_KEYS.USER,
        JSON.stringify(authData.user)
      );
    }
  } catch (error) {
    console.error('Error saving auth tokens:', error);
    throw error;
  }
};

/**
 * Lấy access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

/**
 * Lấy refresh token
 */
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

/**
 * Lấy user data
 */
export const getUser = async (): Promise<any | null> => {
  try {
    const userString = await SecureStore.getItemAsync(STORAGE_KEYS.USER);
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

/**
 * Xóa tất cả auth data
 */
export const clearAuthStorage = async (): Promise<void> => {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
    ]);
  } catch (error) {
    console.error('Error clearing auth storage:', error);
    throw error;
  }
};

/**
 * Kiểm tra xem user đã đăng nhập chưa
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAccessToken();
  return !!token;
};

