import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { serverApi } from '@/redux/auth/authOperations';

type Product = {
  id: number;
  article: string;
  name: string;
  img: string;
  price: number;
  price_promo: number | null;
  quantity: number;
  availability: string;
  _id: string;
};

type Item = {
  _id: string;
  number: string;
  status: string;
  name: string;
  phone: string;
  email: string;
  comment: string;
  delivery: string;
  deliveryCity: string;
  postOffice: string;
  payment: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
};

export default function OrdersListPage() {
  const [orders, setOrders] = useState<Item[]>([]);

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

  return (
    <div>
      <h2>Список заказов</h2>
      <ul>
        {orders &&
          orders.map(
            ({
              _id,
              number,
              status,
              name,
              phone,
              delivery,
              payment,
              products,
            }) => (
              <li key={_id} style={{ display: 'flex', gap: 20 }}>
                <p>Заказ №{number}</p>
                <p>{status}</p>
                <p>Имя {name}</p>
                <p>Телефон {phone}</p>
                <p>{delivery === 'pickup' ? 'Самовывоз' : 'Новая почта'}</p>
                <p>{payment}</p>
                <p>К-во товаров: {products.length}</p>

                <Link to={`/dashboard/orders/order/${_id}`}>Открыть заказ</Link>
              </li>
            )
          )}
      </ul>
    </div>
  );
}
