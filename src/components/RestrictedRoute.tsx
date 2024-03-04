import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks';

export const RestrictedRoute = ({
  component: Component,
  redirectTo = '/',
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to={redirectTo} /> : Component;
};
