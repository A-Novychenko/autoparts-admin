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
  const { isAuthenticated, isRefreshing } = useAuth();
  const shouldRedirect = !isAuthenticated && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
