/**
 * Profile Hooks
 * Custom hooks cho profile và session với TanStack Query
 */

import { getAccessToken } from '@shared/lib/auth-storage';
import { useQuery } from '@tanstack/react-query';

import { getCurrentSessionApi } from '../api';
import { SessionData } from '../types';

/**
 * Hook để lấy thông tin session hiện tại
 * Sử dụng React Query để cache và manage state
 */
export const useCurrentSessionQuery = () => {
  return useQuery<SessionData, Error>({
    queryKey: ['sessions', 'current'],
    queryFn: async () => {
      console.log('[useCurrentSessionQuery] Fetching session data...');
      // Kiểm tra authentication trước khi fetch
      const token = await getAccessToken();
      if (!token) {
        console.warn('[useCurrentSessionQuery] No token found');
        throw new Error('Not authenticated');
      }
      console.log('[useCurrentSessionQuery] Token found, calling API...');
      const data = await getCurrentSessionApi();
      console.log('[useCurrentSessionQuery] Session data received:', data);
      return data;
    },
    enabled: true, // Sẽ được enable/disable dựa trên authentication state
    staleTime: 5 * 60 * 1000, // 5 phút
    gcTime: 10 * 60 * 1000, // 10 phút
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 1,
    onError: (error) => {
      console.error('[useCurrentSessionQuery] Error fetching session:', error);
    },
    onSuccess: (data) => {
      console.log('[useCurrentSessionQuery] Successfully fetched session:', data);
    },
  });
};

