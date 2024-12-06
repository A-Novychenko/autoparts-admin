import { Outlet } from 'react-router-dom';

import { PageContainer, PageWrap, Sidebar } from '@/components/ui';

export default function ProductsPage() {
  return (
    <>
      <h1 className="visually-hidden">ProductsPage</h1>

      <PageWrap>
        <Sidebar />

        <PageContainer>
          <Outlet />
        </PageContainer>
      </PageWrap>
    </>
  );
}
