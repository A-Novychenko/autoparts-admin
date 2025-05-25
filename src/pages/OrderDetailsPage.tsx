import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { serverApi } from '@/redux/auth/authOperations';
import { formatDateToUkrainian } from '@/utils';
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

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Item | null>(null);

  console.log('order', order);

  useEffect(() => {
    const getOrder = async () => {
      const { data } = await serverApi.get(`orders/${id}`);

      setOrder(data.order);
    };

    getOrder();
  }, [id]);

  return (
    <div>
      {order && (
        <>
          <h3>Детали заказа №{order.number}</h3>
          <div>
            <div style={{ marginBottom: '32px' }}>
              <p>{order.status}</p>
              <p>Имя {order.name}</p>
              <p>Телефон {order.phone}</p>
              <p>Email {order.email}</p>
              <p>Comment {order.comment}</p>
              <p>{order.delivery === 'pickup' ? 'Самовывоз' : 'Новая почта'}</p>
              {order.delivery === 'post' && (
                <div>
                  <p>Город: {order.deliveryCity}</p>
                  <p>Отделение: {order.postOffice}</p>
                </div>
              )}
              <p>{order.payment}</p>
              <p>Создано {formatDateToUkrainian(order.createdAt)}</p>
            </div>

            <div>
              <p>К-во товаров: {order.products.length}</p>
              <ul
                style={{ width: 500, marginLeft: 'auto', marginRight: 'auto' }}
              >
                {order.products &&
                  order.products.map(
                    ({
                      _id,
                      img,
                      name,
                      article,
                      price,
                      price_promo,
                      quantity,
                      availability,
                    }) => (
                      <li
                        key={_id}
                        style={{ display: 'flex', border: 'solid 1px grey' }}
                      >
                        <div style={{ width: 100, height: 100 }}>
                          <img
                            src={img}
                            alt={name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                        <div>
                          <p>{name}</p>
                          <p>{article}</p>
                          <p>{price}грн</p>
                          {price_promo && (
                            <p style={{ color: 'red' }}>
                              Со скидкой {price_promo}грн
                            </p>
                          )}
                          <p>Количество: {quantity}</p>
                          <p>Количество на складе: {availability}</p>
                        </div>
                      </li>
                    )
                  )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetailsPage;
