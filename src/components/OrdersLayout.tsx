import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PageContainer, PageWrap } from './ui';

export const OrdersLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  let activeTab: 'orders' | 'vin' | 'callback' | null = null;

  console.log('pathname', pathname);

  if (pathname.includes('/order-list') || pathname.includes('/orders/order')) {
    activeTab = 'orders';
  } else if (
    pathname.includes('/vin-requests') ||
    pathname.includes('/orders/vin-request')
  ) {
    activeTab = 'vin';
  } else if (pathname.includes('/callback')) {
    activeTab = 'callback';
  }

  let bgColor;

  switch (activeTab) {
    case 'orders':
      bgColor = '#c2ffd4';
      break;
    case 'vin':
      bgColor = '#e4edff';
      break;
    case 'callback':
      bgColor = '#ffeece';
      break;

    default:
      bgColor = '#fefefe';
  }
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
    >
      <PageWrap>
        <PageContainer>
          <div
            style={{
              width: '100%',
              height: 64,
              backgroundColor: bgColor,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: 64,
                position: 'fixed',
                backgroundColor: bgColor,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  marginLeft: 16,
                  marginRight: 16,
                }}
              >
                <button
                  onClick={() => navigate('/dashboard/orders/order-list')}
                  style={{
                    backgroundColor:
                      activeTab === 'orders'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : bgColor,

                    transform:
                      activeTab === 'orders' ? 'scale(1)' : 'scale(0.8)',
                    zIndex: activeTab === 'orders' ? '10' : '1',
                    color: activeTab === 'orders' ? '#101340' : '#858585',
                    flexGrow: 1,
                    border: 'transparent',
                    outline: 'none',
                    // boxShadow:
                    //   activeTab === 'orders'
                    //     ? '0 4px 6px rgba(0, 0, 0, 0.15)'
                    //     : '',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  Заказы
                </button>

                <button
                  onClick={() => navigate('/dashboard/orders/vin-requests')}
                  style={{
                    backgroundColor:
                      activeTab === 'vin'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : bgColor,
                    transform: activeTab === 'vin' ? 'scale(1)' : 'scale(0.8)',
                    zIndex: activeTab === 'vin' ? '10' : '1',
                    color: activeTab === 'vin' ? '#101340' : '#858585',
                    flexGrow: 1,
                    border: 'transparent',
                    outline: 'none',
                    // boxShadow:
                    //   activeTab === 'vin'
                    //     ? '0 4px 6px rgba(0, 0, 0, 0.15)'
                    //     : '',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  VIN-запросы
                </button>

                <button
                  onClick={() => navigate('/dashboard/orders/callback')}
                  style={{
                    backgroundColor:
                      activeTab === 'callback'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : bgColor,
                    transform:
                      activeTab === 'callback' ? 'scale(1)' : 'scale(0.8)',
                    zIndex: activeTab === 'callback' ? '10' : '1',
                    color: activeTab === 'callback' ? '#101340' : '#858585',
                    flexGrow: 1,
                    border: 'transparent',
                    outline: 'none',
                    // boxShadow:
                    //   activeTab === 'callback'
                    //     ? '0 4px 6px rgba(0, 0, 0, 0.15)'
                    //     : '',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  Обратные звонки
                </button>
              </div>
            </div>
          </div>

          <Outlet />
        </PageContainer>
      </PageWrap>
    </div>
  );
};
