import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { OrderDetail } from '@/components/base';

import { serverApi } from '@/redux/auth/authOperations';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderItem | null>(null);

  console.log('order', order);

  useEffect(() => {
    const getOrder = async () => {
      const { data } = await serverApi.get(`orders/${id}`);

      setOrder(data.order);
    };

    getOrder();
  }, [id]);

  console.log('order', order);

  return (
    <>
      <OrderDetail order={order} setOrder={setOrder} />
    </>
  );
};

export default OrderDetailsPage;
