import { IoStorefrontSharp } from 'react-icons/io5';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';

import NpLogo from '@assets/np-logo.svg?react';

import {
  Card,
  Container,
  GridItem,
  GridItemAddress,
  Header,
  List,
  OrderNumber,
  StatusBadge,
} from './OrderList.styled';
import { OrderListProps } from './types';

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const badgeColor = (status: string) => {
    switch (status) {
      case 'new':
        return '#2a67ff';
      case 'in-progress':
        return '#ff8018';
      case 'done':
        return '#22c55e';
      case 'rejected':
        return '#ff2a2a';

      default:
        return '#2a67ff';
    }
  };
  const badgeText = (status: string) => {
    switch (status) {
      case 'new':
        return 'Новый';
      case 'in-progress':
        return 'В обработке';
      case 'done':
        return 'Выполнен';
      case 'rejected':
        return 'Отклонен';

      default:
        return '#2a67ff';
    }
  };

  return (
    <Container>
      <Header>
        <div>№</div>
        <div>Статус</div>
        <div>Имя</div>
        <div>Телефон</div>
        <div>Email</div>
        <div>Доставка</div>
        <div>Оплата</div>
        <div>Сообщение</div>
        <div>Дата</div>
      </Header>

      <List>
        {orders.map(order => (
          <Card key={order.number} to={`/dashboard/orders/order/${order._id}`}>
            <GridItem>
              <OrderNumber> №{order.number}</OrderNumber>
            </GridItem>
            <GridItem>
              <StatusBadge style={{ background: badgeColor(order.status) }}>
                {badgeText(order.status)}
              </StatusBadge>
            </GridItem>

            <GridItem>{order.name}</GridItem>
            <GridItem>{order.phone}</GridItem>
            <GridItem>{order.email}</GridItem>
            <GridItemAddress>
              {order.delivery === 'post' ? (
                <NpLogo width={20} height={20} />
              ) : (
                <IoStorefrontSharp size={20} color="#101340" />
              )}
              {order.deliveryCity && `${order.deliveryCity}`}
              {order.postOffice && ` №${order.postOffice}`}
            </GridItemAddress>
            <GridItem>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {order.payment === 'prepayment' ? (
                  <MdPayment size={20} color="blue" />
                ) : (
                  <FaMoneyBillWave size={20} color="green" />
                )}
              </div>
            </GridItem>
            <GridItem>{order.message || '-'}</GridItem>
            <GridItem>
              {new Date(order.createdAt).toLocaleString('uk-UA')}
            </GridItem>
          </Card>
        ))}
      </List>
    </Container>
  );
};
