/**
 * Session Context
 * Context để quản lý session data cho toàn bộ app
 */

import React, { createContext, useContext, useMemo } from 'react';

import { useCurrentSessionQuery } from '../hooks';
import { SessionData } from '../types';

/**
 * Session Context Value
 */
interface SessionContextValue {
  session: SessionData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Session Context
 */
const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

/**
 * Hook để sử dụng session context
 * Phải được gọi trong SessionProvider
 */
export const useSession = (): SessionContextValue => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

/**
 * Session Provider Component
 * Wrap app với provider này để sử dụng session data ở mọi nơi
 */
export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: session,
    isLoading,
    error,
    refetch: refetchQuery,
  } = useCurrentSessionQuery();

  // Wrap refetch để return Promise<void>
  const refetch = async (): Promise<void> => {
    await refetchQuery();
  };

  const value = useMemo<SessionContextValue>(
    () => ({
      session: session || null,
      isLoading,
      error: error || null,
      refetch,
    }),
    [session, isLoading, error, refetch]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

