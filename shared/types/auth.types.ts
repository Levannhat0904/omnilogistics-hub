/**
 * Auth Types
 * Types và constants cho authentication
 */

/**
 * Storage keys cho SecureStore
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const;

/**
 * API Error structure
 */
export interface ApiError {
  message: string;
  error?: string;
  statusCode: number;
}

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  name: string;
  message: string;
  response: {
    data: ApiError;
    status: number;
  };
}

/**
 * Auth Response từ API
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt?: number; // Unix timestamp
  user?: {
    id: string;
    email?: string;
    phoneNumber?: string;
    name?: string;
    [key: string]: any;
  };
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  errors?: Array<{
    message: string;
    extensions?: {
      code: number;
      stacktrace?: any[];
    };
  }>;
}

/**
 * Login Request
 */
export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

/**
 * Login Response Data
 */
export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: number;
}

