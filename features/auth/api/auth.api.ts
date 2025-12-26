/**
 * Auth API
 * API functions cho authentication
 */

import { apiClient } from '@shared/api';
import { ApiResponse, LoginRequest, LoginResponseData } from '@shared/types/auth.types';

/**
 * Đăng nhập
 * POST /api/v1/sessions
 */
export const loginApi = async (
  credentials: LoginRequest
): Promise<LoginResponseData> => {
  const response = await apiClient.post<ApiResponse<LoginResponseData>>(
    '/sessions',
    credentials
  );

  // API trả về format: { success: true, data: { accessToken, refreshToken, accessTokenExpiredAt } }
  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error('Invalid login response format');
};

/**
 * Đăng xuất
 * DELETE /api/v1/sessions
 */
export const logoutApi = async (): Promise<void> => {
  await apiClient.delete('/sessions');
};

/**
 * Refresh token
 * POST /api/v1/auth/refresh
 */
export const refreshTokenApi = async (
  refreshToken: string
): Promise<LoginResponseData> => {
  const response = await apiClient.post<ApiResponse<LoginResponseData>>(
    '/auth/refresh',
    { refreshToken }
  );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error('Invalid refresh token response format');
};

