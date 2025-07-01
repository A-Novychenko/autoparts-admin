import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { AppBar } from './base';
// import { Container } from './ui';

export const DashboardLayout = () => {
  return (
    // <div style={{ height: '100vh', marginTop: 64 }}>
    // <div style={{ height: 'calc(100vh - 128px)', marginTop: 64 }}>
    <div>
      <AppBar />

      {/* <Container> */}
      <main style={{ height: 'calc(100vh - 64px)', marginTop: 64 }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      {/* </Container> */}
    </div>
  );
};
