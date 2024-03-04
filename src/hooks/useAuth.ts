import { useAppSelector } from '@/redux/hooks';

import {
  selectIsAuthenticated,
  selectIsRefreshing,
  selectIsLoading,
  selectUser,
  selectUserList,
} from '@/redux/auth/authSelectors';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);
  const userList = useAppSelector(selectUserList);

  return {
    isAuthenticated,
    isRefreshing,
    isLoading,
    user,
    userList,
  };
};
