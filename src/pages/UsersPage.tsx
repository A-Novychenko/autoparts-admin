import { useEffect } from 'react';

import { NewUserFormDialog, UserList } from '@/components/base';
import { useAuth } from '@/hooks';
import { getAllUsers } from '@/redux/auth/authOperations';
import { useAppDispatch } from '@/redux/hooks';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { userList } = useAuth();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <NewUserFormDialog />
      <UserList users={userList} />
    </>
  );
}
