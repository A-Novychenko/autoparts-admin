import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
}: {
  component: React.ReactNode;
  redirectTo?: string;
}) => {
  const { isAuthenticated, isRefreshing, isLoading, isActive } = useAuth();

  // Если идёт инициализация состояния авторизации — не делаем redirect.
  // Возвращаем компонент, чтобы путь оставался "занятым" и не было fallback к родителю.
  if (isRefreshing || isLoading) {
    return Component;
  }

  const shouldRedirect = !isAuthenticated || isActive !== 'enabled';
  return shouldRedirect ? <Navigate to={redirectTo} replace /> : Component;
};
