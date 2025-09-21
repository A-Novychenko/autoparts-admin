import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { OrderOverview, OrderProducts, OrderSummary } from '@/components/base';

import { serverApi } from '@/redux/auth/authOperations';
import { Loader } from '@/components/ui';

const OrderDetailsPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [client, setClient] = useState<IClient | null>(null);
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [shipment, setShipment] = useState<IShipment | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await serverApi.get(`orders/${id}`);
        if (!data?.order) {
          setError('Заказ не найден');
          return;
        }

        const {
          _id,
          message,
          comment,
          number,
          status,
          createdAt,
          updatedAt,
          totalAmount,
          totalAmountWithDiscount,
          totalDiscount,
          isAccounted,
          createdBy,
          declarationNumber,
          isPaid,
          updatedBy,
          client,
          shipment,
          products,
        } = data.order;

        setOrder({
          _id,
          message,
          comment,
          number,
          status,
          createdAt,
          updatedAt,
          totalAmount,
          totalAmountWithDiscount,
          totalDiscount,
          isAccounted,
          createdBy,
          declarationNumber,
          isPaid,
          updatedBy,
        });

        setClient(client);
        setShipment(shipment);
        setProducts(products ? products : []);
      } catch (err) {
        console.error(err);
        setError('Ошибка загрузки заказа');
      } finally {
        setLoading(false);
      }
    };

    getOrder();
  }, [id]);

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

  return (
    <>
      {order && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 64px)',
          }}
        >
          <OrderOverview
            order={order}
            client={client}
            shipment={shipment}
            setOrder={setOrder}
            setClient={setClient}
            setShipment={setShipment}
          />

          <OrderProducts
            products={products}
            orderId={order._id}
            orderIsAccounted={order.isAccounted}
            setProducts={setProducts}
            setOrder={setOrder}
          />

          <OrderSummary
            order={order}
            client={client}
            shipment={shipment}
            products={products}
            setOrder={setOrder}
            setClient={setClient}
          />
        </div>
      )}
    </>
  );
};

export default OrderDetailsPage;
