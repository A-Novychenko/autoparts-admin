import { useEffect, useState } from 'react';

import { OrderList } from '@/components/ui';

import { serverApi } from '@/redux/auth/authOperations';

export default function OrdersListPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const getAllOrders = async () => {
      const { data } = await serverApi.get('/orders');

      setOrders(data.orders);
    };

    getAllOrders();
  }, []);

  if (orders.length < 1) {
    return <p>Нет заказов</p>;
  }

  return <OrderList orders={orders} />;
}
