import { useAppSelector } from '@/redux/hooks';

import {
  selectIsAuthenticated,
  selectIsLoading,
  selectUserList,
} from '@/redux/auth/authSelectors';

export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const userList = useAppSelector(selectUserList);

  return {
    isAuthenticated,
    isLoading,
    userList,
  };
};
