import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks';

export const AdminRoute = ({
  component: Component,
  redirectTo = '/dashboard',
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  const { userRole } = useAuth();
  const shouldRedirect = userRole !== 'admin';

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
