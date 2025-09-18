import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { OrderOverview, OrderProducts, OrderSummary } from '@/components/base';

import { serverApi } from '@/redux/auth/authOperations';

const OrderDetailsPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [client, setClient] = useState<IClient | null>(null);
  const [products, setProducts] = useState<OrderProduct[] | null>(null);
  const [shipment, setShipment] = useState<IShipment | null>(null);

  useEffect(() => {
    const getOrder = async () => {
      const { data } = await serverApi.get(`orders/${id}`);

      if (data.order) {
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
          createdBy,
          declarationNumber,
          isPaid,
          updatedBy,
        } = data.order;

        const orderData: OrderData = {
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
          createdBy,
          declarationNumber,
          isPaid,
          updatedBy,
        };

        setOrder(orderData);
        setClient(data.order.client);
        setShipment(data.order.shipment);
        setProducts(data.order.products);
      }
    };

    getOrder();
  }, [id, setOrder]);

  return (
    <>
      {order && client && products && products?.length > 0 && shipment && (
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
            setShipment={setShipment}
          />

          <OrderProducts
            products={products}
            orderId={order._id}
            setProducts={setProducts}
          />

          <OrderSummary
            order={order}
            client={client}
            shipment={shipment}
            products={products}
          />
        </div>
      )}
    </>
  );
};

export default OrderDetailsPage;
