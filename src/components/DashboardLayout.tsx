import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { AppBar } from './base';
// import { Container } from './ui';

export const DashboardLayout = () => {
  return (
    <div style={{ height: '100vh', marginTop: 64 }}>
      <AppBar />

      {/* <Container> */}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      {/* </Container> */}
    </div>
  );
};
