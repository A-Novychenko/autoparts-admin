import { PageContainer, PageWrap } from '@/components/ui';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function OrdersPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.includes('vin-requests')
    ? 'vin'
    : 'orders';

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          paddingBottom: '20px',
          width: '100%',
          height: 60,
          position: 'fixed',
          top: 64,
          backgroundColor: '#fff',
        }}
      >
        <button
          onClick={() => navigate('/dashboard/orders/list')}
          style={{
            backgroundColor: activeTab === 'orders' ? '#101340' : '#fff',
            color: activeTab === 'orders' ? '#fff' : '#101340',
            flexGrow: 1,
          }}
        >
          Заказы
        </button>
        <button
          onClick={() => navigate('/dashboard/orders/vin-requests')}
          style={{
            backgroundColor: activeTab === 'vin' ? '#101340' : '#fff',
            color: activeTab === 'vin' ? '#fff' : '#101340',
            flexGrow: 1,
          }}
        >
          VIN-запросы
        </button>
      </div>

      <div style={{ marginTop: 124 }}>
        <PageWrap>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </PageWrap>
      </div>
    </>
  );
}
