/**
 * API Constants
 * Constants cho API endpoints và configuration
 */

/**
 * Danh sách các public endpoints không cần authentication token
 * Các endpoint này sẽ không có Bearer token trong header
 */
export const PUBLIC_ENDPOINTS = [
  '/sessions', // Login endpoint
  '/auth/login',
  '/auth/signup',
  '/auth/register',
  '/auth/refresh',
  '/auth/forgot-password',
  '/auth/reset-password',
] as const;

/**
 * Kiểm tra xem một endpoint có phải là public endpoint không
 */
export const isPublicEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));
};

