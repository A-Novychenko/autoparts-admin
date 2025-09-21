import { useEffect, useState } from 'react';

import { OrderList } from '@/components/base';

import { serverApi } from '@/redux/auth/authOperations';
import { Loader } from '@/components/ui';

export default function OrdersListPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllOrders = async () => {
      setLoading(true);
      try {
        const { data } = await serverApi.get('/orders');
        setOrders(data.orders);
      } catch (e) {
        setOrders([]);
        console.error(e);
        setError('Ошибка загрузки заказа');
      } finally {
        setLoading(false);
      }
    };

    getAllOrders();
  }, []);

  if (loading)
    return (
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </div>
    );

  if (error) return <div>{error}</div>;

  return <OrderList orders={orders} />;
}
