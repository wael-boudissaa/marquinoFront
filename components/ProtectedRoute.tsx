'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  redirectTo = '/login'
}) => {
  const { isLoggedIn, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isLoggedIn) {
        router.push(redirectTo);
      } else if (!requireAuth && isLoggedIn) {
        router.push('/');
      }
    }
  }, [isLoggedIn, loading, requireAuth, redirectTo, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (requireAuth && !isLoggedIn) {
    return null;
  }

  if (!requireAuth && isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};