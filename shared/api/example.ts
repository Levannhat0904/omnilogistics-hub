/**
 * Ví dụ sử dụng API với TanStack Query
 * 
 * File này minh họa cách tạo API functions và custom hooks
 * Bạn có thể tham khảo và áp dụng vào các feature thực tế
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';

// ==================== Types ====================
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

// ==================== API Functions ====================

/**
 * Lấy danh sách users
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

/**
 * Lấy user theo ID
 */
export const fetchUser = async (userId: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${userId}`);
  return response.data;
};

/**
 * Tạo user mới
 */
export const createUser = async (data: CreateUserData): Promise<User> => {
  const response = await apiClient.post<User>('/users', data);
  return response.data;
};

/**
 * Cập nhật user
 */
export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<CreateUserData>;
}): Promise<User> => {
  const response = await apiClient.put<User>(`/users/${id}`, data);
  return response.data;
};

/**
 * Xóa user
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await apiClient.delete(`/users/${userId}`);
};

// ==================== Custom Hooks ====================

/**
 * Hook để lấy danh sách users
 */
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

/**
 * Hook để lấy user theo ID
 */
export const useUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId, // Chỉ fetch khi có userId
  });
};

/**
 * Hook để tạo user mới
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate users list để refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

/**
 * Hook để cập nhật user
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      // Update cache cho user cụ thể
      queryClient.setQueryData(['user', data.id], data);
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

/**
 * Hook để xóa user
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

