/**
 * Auth Guard Component
 * Bảo vệ các màn hình cần authentication
 * Redirect đến login nếu chưa đăng nhập
 */

import { isAuthenticated } from '@shared/lib/auth-storage';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      const authenticated = await isAuthenticated();
      setIsAuth(authenticated);

      if (!authenticated) {
        // Redirect to login
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      router.replace('/(auth)/login');
    } finally {
      setIsChecking(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading while checking auth
  if (isChecking) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  // Only render children if authenticated
  if (!isAuth) {
    return null;
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

