/**
 * API Client
 * Centralized HTTP client with interceptors for authentication and token refresh
 */

import { isPublicEndpoint } from '@shared/constants/api';
import { ApiError, ApiErrorResponse, STORAGE_KEYS } from '@shared/types/auth.types';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import * as SecureStore from 'expo-secure-store';

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_VERSION = 'api/v1';
const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/${API_VERSION}`;

// ============================================================================
// AXIOS INSTANCE
// ============================================================================

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// ============================================================================
// TOKEN REFRESH STATE
// ============================================================================

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Clear all auth data from secure storage
 */
async function clearAuthStorage(): Promise<void> {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
    ]);
  } catch (error) {
    console.error('Error clearing auth storage:', error);
  }
}

/**
 * Convert Axios error to ApiErrorResponse
 */
function toApiErrorResponse(err: any): ApiErrorResponse {
  const status = err?.response?.status ?? 500;
  const responseData = err?.response?.data;

  // Handle GraphQL-style error format with errors array
  let errorMessage = 'Unknown error';
  let errorCode: string | undefined;

  if (responseData?.errors && Array.isArray(responseData.errors) && responseData.errors.length > 0) {
    // GraphQL error format: { errors: [{ message: "...", extensions: { code: 401 } }] }
    errorMessage = responseData.errors[0].message || errorMessage;
    errorCode = responseData.errors[0].extensions?.code?.toString();
  } else if (responseData?.error?.message) {
    // Standard error format: { error: { message: "...", code: "..." } }
    errorMessage = responseData.error.message;
    errorCode = responseData.error.code;
  } else if (responseData?.message) {
    // Simple error format: { message: "..." }
    errorMessage = responseData.message;
  }

  // Convert backend format → ApiError format
  const apiError: ApiError = {
    message: errorMessage,
    error: errorCode,
    statusCode: status,
  };

  return {
    name: 'ApiErrorResponse',
    message: apiError.message.toString(),
    response: {
      data: apiError,
      status,
    },
  };
}

// ============================================================================
// REQUEST INTERCEPTOR
// ============================================================================

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip token injection for auth endpoints that don't need it
    if (!isPublicEndpoint(config.url)) {
      // Get access token from secure storage
      const accessToken = await SecureStore.getItemAsync(
        STORAGE_KEYS.ACCESS_TOKEN
      );

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================================================
// RESPONSE INTERCEPTOR
// ============================================================================

apiClient.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 errors (unauthorized) with token refresh
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // Don't attempt token refresh for public endpoints (login, signup, etc.)
      if (isPublicEndpoint(originalRequest.url)) {
        // For public endpoints, just return the error (invalid credentials, etc.)
        return Promise.reject(toApiErrorResponse(error));
      }

      // Avoid infinite loops
      if (originalRequest.url?.includes('/auth/refresh')) {
        // Token refresh failed, clear auth state
        await clearAuthStorage();
        isRefreshing = false;
        processQueue(error, null);
        return Promise.reject(toApiErrorResponse(error));
      }

      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            // Retry original request after token refresh
            return apiClient(originalRequest);
          })
          .catch((error) => {
            return Promise.reject(toApiErrorResponse(error));
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get refresh token from storage
        const refreshToken = await SecureStore.getItemAsync(
          STORAGE_KEYS.REFRESH_TOKEN
        );

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh token endpoint
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        // Handle API response format: { success: true, data: { accessToken, refreshToken, accessTokenExpiredAt } }
        const responseData = response.data as any;
        const authData = responseData?.success && responseData?.data 
          ? responseData.data 
          : responseData;

        let newAccessToken = authData.accessToken;
        let newRefreshToken = authData.refreshToken;

        // Ensure tokens are strings
        if (typeof newAccessToken !== 'string') {
          newAccessToken = String(newAccessToken || '');
        }
        if (typeof newRefreshToken !== 'string') {
          newRefreshToken = String(newRefreshToken || '');
        }

        if (!newAccessToken || !newRefreshToken) {
          throw new Error('Invalid tokens received from refresh endpoint');
        }

        // Store new tokens
        await SecureStore.setItemAsync(
          STORAGE_KEYS.ACCESS_TOKEN,
          newAccessToken
        );
        await SecureStore.setItemAsync(
          STORAGE_KEYS.REFRESH_TOKEN,
          newRefreshToken
        );

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process queued requests
        processQueue(null, newAccessToken);

        // Retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear auth state
        await clearAuthStorage();
        processQueue(refreshError as AxiosError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Return other errors
    return Promise.reject(toApiErrorResponse(error));
  }
);

// ============================================================================
// EXPORTS
// ============================================================================

/**
 * Helper function để tạo request config
 */
export const createRequestConfig = (
  config?: AxiosRequestConfig
): AxiosRequestConfig => {
  return {
    ...config,
  };
};

/**
 * Export các types hữu ích
 */
export type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Export the API client as default
 */
export default apiClient;

