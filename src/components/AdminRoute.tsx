import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';

export const AdminRoute = ({
  component: Component,
  redirectTo = '/dashboard',
}: {
  component: React.ReactNode;
  redirectTo?: string;
}) => {
  const { isAuthenticated, isRefreshing, isLoading, userRole } = useAuth();

  if (isRefreshing || isLoading) {
    return Component;
  }

  const isAdmin = userRole === 'admin';
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={redirectTo} replace />;
  }

  return Component;
};
