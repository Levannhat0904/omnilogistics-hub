/**
 * Session Types
 * Types cho session data từ API
 */

/**
 * Role information trong session
 */
export interface Role {
  id: number;
  name: string;
  code: string;
}

/**
 * Session data từ API response (user object)
 */
export interface SessionData {
  id: number;
  email: string | null;
  phoneNumber: string | null;
  fullName: string | null;
  roleId: number;
  status: string;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  createdById?: number | null;
  updatedById?: number | null;
  role?: Role | null;
}

/**
 * Permission trong session
 */
export interface Permission {
  id: number;
  code: string;
  name: string;
  allowed: boolean;
}

/**
 * Permission module
 */
export interface PermissionModule {
  module: string;
  moduleName: string;
  moduleDescription: string;
  permissions: Permission[];
}

/**
 * Session response data từ API
 * API trả về: { success: true, data: { user: SessionData, permissions: PermissionModule[] } }
 */
export interface SessionResponseData {
  user: SessionData;
  permissions: PermissionModule[];
}

/**
 * API Response wrapper cho current session
 */
export interface CurrentSessionResponse {
  success: boolean;
  data: SessionResponseData;
}

