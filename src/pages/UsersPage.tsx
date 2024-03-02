import { NewUserFormDialog, UserList } from '@/components/ui';
import { useAuth } from '@/hooks';
import { getAllUsers } from '@/redux/auth/authOperations';
import { useAppDispatch } from '@/redux/hooks';
import { useEffect } from 'react';

export default function UsersPage() {
  const dispatch = useAppDispatch();
  const { userList } = useAuth();

  console.log('userList', userList);

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
