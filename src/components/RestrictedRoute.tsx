import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';

export const RestrictedRoute = ({
  component: Component,
  redirectTo = '/dashboard',
}: {
  component: React.ReactNode;
  redirectTo?: string;
}) => {
  const { isAuthenticated, isRefreshing, isLoading } = useAuth();

  if (isRefreshing || isLoading) {
    return Component;
  }

  return isAuthenticated ? <Navigate to={redirectTo} replace /> : Component;
};
