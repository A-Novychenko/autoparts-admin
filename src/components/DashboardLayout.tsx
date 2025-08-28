import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from './base';

export const DashboardLayout = () => {
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
