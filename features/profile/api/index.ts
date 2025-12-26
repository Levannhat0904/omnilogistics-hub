/**
 * Profile API
 * API functions cho profile và session
 */

import { apiClient } from '@shared/api';
import { ApiResponse } from '@shared/types/auth.types';

import { SessionData, SessionResponseData } from '../types';

/**
 * Lấy thông tin session hiện tại
 * GET /api/v1/sessions/current
 * 
 * API trả về format:
 * {
 *   "success": true,
 *   "data": {
 *     "user": SessionData,
 *     "permissions": PermissionModule[]
 *   }
 * }
 */
export const getCurrentSessionApi = async (): Promise<SessionData> => {
  const response = await apiClient.get<ApiResponse<SessionResponseData>>(
    '/sessions/current'
  );

  // Log raw response để debug
  console.log('[getCurrentSessionApi] Raw response:', JSON.stringify(response.data, null, 2));

  // API trả về format: { success: true, data: { user: SessionData, permissions: [...] } }
  if (response.data.success && response.data.data?.user) {
    const sessionData = response.data.data.user;
    console.log('[getCurrentSessionApi] Session data (user):', JSON.stringify(sessionData, null, 2));
    console.log('[getCurrentSessionApi] Permissions:', JSON.stringify(response.data.data.permissions, null, 2));
    return sessionData;
  }

  console.error('[getCurrentSessionApi] Invalid response format:', response.data);
  throw new Error('Invalid session response format');
};

