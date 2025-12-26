import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

/**
 * Tạo QueryClient instance với cấu hình mặc định
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Thời gian cache mặc định: 5 phút
      staleTime: 5 * 60 * 1000,
      // Thời gian giữ data trong cache: 10 phút
      gcTime: 10 * 60 * 1000, // Trước đây là cacheTime
      // Retry khi lỗi
      retry: 1,
      // Refetch khi window focus (tắt cho mobile)
      refetchOnWindowFocus: false,
      // Refetch khi reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry khi mutation lỗi
      retry: 1,
    },
  },
});

/**
 * Provider component để wrap app với QueryClientProvider
 */
export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

