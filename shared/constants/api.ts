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
 * Chỉ match chính xác endpoint hoặc endpoint với query params
 * Ví dụ: /sessions là public, nhưng /sessions/current không phải
 */
export const isPublicEndpoint = (url: string | undefined): boolean => {
  if (!url) return false;
  
  // Remove query params và trailing slash để so sánh
  const cleanUrl = url.split('?')[0].replace(/\/$/, '');
  
  return PUBLIC_ENDPOINTS.some((endpoint) => {
    // Match chính xác endpoint
    if (cleanUrl === endpoint) return true;
    // Match endpoint với trailing slash
    if (cleanUrl === `${endpoint}/`) return true;
    // Không match nếu có path sau endpoint (ví dụ: /sessions/current)
    return false;
  });
};

