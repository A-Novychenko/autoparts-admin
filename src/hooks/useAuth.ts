import { useAppSelector } from '@/redux/hooks';

import {
  selectIsAuthenticated,
  selectIsRefreshing,
  selectIsActive,
  selectIsLoading,
  selectUserRole,
  selectUser,
  selectUserList,
} from '@/redux/auth/authSelectors';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const isActive = useAppSelector(selectIsActive);
  const isLoading = useAppSelector(selectIsLoading);
  const userRole = useAppSelector(selectUserRole);
  const user = useAppSelector(selectUser);
  const userList = useAppSelector(selectUserList);

  return {
    isAuthenticated,
    isRefreshing,
    isActive,
    isLoading,
    userRole,
    user,
    userList,
  };
};
