# Hướng dẫn sử dụng TanStack Query và Axios

## Tổng quan

Dự án sử dụng **TanStack Query (React Query)** để quản lý server state và **Axios** để thực hiện HTTP requests.

## Cài đặt

Các package đã được cài đặt:
- `@tanstack/react-query`: Quản lý server state, caching, và synchronization
- `axios`: HTTP client

## Cấu trúc

```
shared/api/
├── client.ts          # Axios instance và interceptors
├── query-client.tsx   # QueryClient và QueryProvider
├── index.ts          # Export tất cả
└── README.md         # Hướng dẫn này
```

## Cấu hình Axios

### Base Configuration

File `client.ts` đã được cấu hình với:
- Base URL từ environment variable (`EXPO_PUBLIC_API_URL`)
- Timeout: 30 giây
- Request/Response interceptors
- **Token refresh tự động** khi access token hết hạn
- **SecureStore** để lưu trữ tokens an toàn
- Error handling chung với ApiErrorResponse format

### Tính năng Authentication

API client đã được tích hợp với:
- **Automatic token injection**: Tự động thêm Bearer token vào header cho các protected endpoints
- **Token refresh**: Tự động refresh token khi nhận 401 error
- **Request queue**: Queue các requests khi đang refresh token để tránh multiple refresh calls
- **Public endpoints**: Tự động skip token cho các endpoint công khai (login, signup, etc.)
- **Secure storage**: Sử dụng Expo SecureStore để lưu tokens an toàn

### Sử dụng API Client

```typescript
import { apiClient } from '@shared/api';

// GET request
const response = await apiClient.get('/users');

// POST request
const response = await apiClient.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
});

// PUT request
const response = await apiClient.put('/users/1', {
  name: 'Jane Doe',
});

// DELETE request
const response = await apiClient.delete('/users/1');
```

## Cấu hình TanStack Query

### QueryProvider

`QueryProvider` đã được thêm vào `app/_layout.tsx` để wrap toàn bộ app.

### Cấu hình mặc định

- **staleTime**: 5 phút - Data được coi là fresh trong 5 phút
- **gcTime**: 10 phút - Data được giữ trong cache 10 phút
- **retry**: 1 lần - Retry 1 lần khi lỗi
- **refetchOnWindowFocus**: false - Không refetch khi focus (phù hợp mobile)

## Sử dụng TanStack Query

### 1. Query (GET requests)

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@shared/api';

// Định nghĩa API function
const fetchUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

// Sử dụng trong component
export const UsersList = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) return <Text>Đang tải...</Text>;
  if (error) return <Text>Lỗi: {error.message}</Text>;

  return (
    <View>
      {data?.map((user) => (
        <Text key={user.id}>{user.name}</Text>
      ))}
      <Button title="Làm mới" onPress={() => refetch()} />
    </View>
  );
};
```

### 2. Mutation (POST, PUT, DELETE)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@shared/api';

// Định nghĩa mutation function
const createUser = async (userData: { name: string; email: string }) => {
  const response = await apiClient.post('/users', userData);
  return response.data;
};

// Sử dụng trong component
export const CreateUserForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate và refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error creating user:', error);
    },
  });

  const handleSubmit = (data: { name: string; email: string }) => {
    mutation.mutate(data);
  };

  return (
    <View>
      {/* Form fields */}
      <Button
        title={mutation.isPending ? 'Đang tạo...' : 'Tạo người dùng'}
        onPress={() => handleSubmit({ name: 'John', email: 'john@example.com' })}
        disabled={mutation.isPending}
      />
      {mutation.isError && (
        <Text>Lỗi: {mutation.error.message}</Text>
      )}
      {mutation.isSuccess && (
        <Text>Tạo thành công!</Text>
      )}
    </View>
  );
};
```

### 3. Query với Parameters

```typescript
const fetchUser = async (userId: string) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

export const UserDetail = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId], // Query key bao gồm parameter
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // Chỉ fetch khi có userId
  });

  if (isLoading) return <Text>Đang tải...</Text>;

  return <Text>{data?.name}</Text>;
};
```

### 4. Dependent Queries

```typescript
// Query phụ thuộc vào kết quả của query khác
export const UserProfile = ({ userId }: { userId: string }) => {
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  const { data: posts } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!user, // Chỉ fetch khi đã có user data
  });

  // ...
};
```

## Best Practices

### 1. Query Keys

Sử dụng query keys có cấu trúc và nhất quán:

```typescript
// ✅ Tốt
['users']
['user', userId]
['posts', { userId, page }]
['shipments', { status: 'pending' }]

// ❌ Không tốt
['data']
['userData']
```

### 2. API Functions

Tách API functions ra file riêng trong mỗi feature:

```typescript
// features/users/api/users.api.ts
import { apiClient } from '@shared/api';

export const usersApi = {
  getAll: () => apiClient.get('/users'),
  getById: (id: string) => apiClient.get(`/users/${id}`),
  create: (data: CreateUserData) => apiClient.post('/users', data),
  update: (id: string, data: UpdateUserData) => apiClient.put(`/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/users/${id}`),
};
```

### 3. Custom Hooks

Tạo custom hooks để tái sử dụng:

```typescript
// features/users/hooks/use-users.ts
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/users.api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await usersApi.getAll();
      return response.data;
    },
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await usersApi.getById(userId);
      return response.data;
    },
    enabled: !!userId,
  });
};
```

### 4. Error Handling

```typescript
const { data, error, isError } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  retry: (failureCount, error) => {
    // Không retry nếu là lỗi 404
    if (error.response?.status === 404) {
      return false;
    }
    return failureCount < 3;
  },
});

if (isError) {
  // Hiển thị error message phù hợp
  return <ErrorView error={error} />;
}
```

### 5. Optimistic Updates

```typescript
const mutation = useMutation({
  mutationFn: updateUser,
  onMutate: async (newUser) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['users'] });

    // Snapshot previous value
    const previousUsers = queryClient.getQueryData(['users']);

    // Optimistically update
    queryClient.setQueryData(['users'], (old: any) => {
      return old.map((user: any) =>
        user.id === newUser.id ? { ...user, ...newUser } : user
      );
    });

    return { previousUsers };
  },
  onError: (err, newUser, context) => {
    // Rollback on error
    queryClient.setQueryData(['users'], context?.previousUsers);
  },
  onSettled: () => {
    // Refetch after error or success
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

## Ví dụ hoàn chỉnh

Xem các file trong `features/` để tham khảo cách sử dụng trong thực tế:
- Tạo API functions trong `features/[feature]/api/`
- Tạo custom hooks trong `features/[feature]/hooks/`
- Sử dụng trong components/pages

## Auth Storage Helper

Sử dụng helper functions để quản lý auth tokens:

```typescript
import {
  saveAuthTokens,
  getAccessToken,
  getRefreshToken,
  getUser,
  clearAuthStorage,
  isAuthenticated,
} from '@shared/lib/auth-storage';

// Sau khi đăng nhập thành công
await saveAuthTokens({
  accessToken: '...',
  refreshToken: '...',
  user: { id: '1', email: 'user@example.com' },
});

// Kiểm tra đăng nhập
const authenticated = await isAuthenticated();

// Lấy tokens
const accessToken = await getAccessToken();
const refreshToken = await getRefreshToken();
const user = await getUser();

// Đăng xuất
await clearAuthStorage();
```

## Public Endpoints

Các endpoint sau được coi là public (không cần token):
- `/auth/login`
- `/auth/signup`
- `/auth/register`
- `/auth/refresh`
- `/auth/forgot-password`
- `/auth/reset-password`

## Token Refresh Flow

1. Request gửi đi với access token
2. Nếu nhận 401 error:
   - Kiểm tra xem có phải public endpoint không
   - Nếu không, lấy refresh token từ SecureStore
   - Gọi `/auth/refresh` để lấy tokens mới
   - Lưu tokens mới vào SecureStore
   - Retry request ban đầu với token mới
   - Process queue các requests đang chờ
3. Nếu refresh token cũng fail → Clear auth storage

## Tài liệu tham khảo

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools) - Có thể cài thêm để debug

