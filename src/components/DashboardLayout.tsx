import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AppBar } from '@/components/base';

import { getAllGroups } from '@/redux/group/groupOperations';
import { useAppDispatch } from '@/redux/hooks';

export const DashboardLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  return (
    <div>
      <AppBar />
      <main style={{ height: 'calc(100vh - 64px)', marginTop: 64 }}>
        <Suspense fallback={<div>Завантаження...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
