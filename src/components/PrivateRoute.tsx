import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks';

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  const { isAuthenticated, isRefreshing, isActive } = useAuth();
  const shouldRedirect =
    !isAuthenticated && isActive !== 'enabled' && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
