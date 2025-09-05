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
import { makeBadgeColor, makeBadgeText } from '@/utils';

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <Container>
      <Header>
        <div>№</div>
        <div>Статус</div>
        <div>Имя</div>
        <div>Телефон</div>

        <div>Доставка</div>
        <div>Оплата/Сумма</div>
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
              <StatusBadge style={{ background: makeBadgeColor(order.status) }}>
                {makeBadgeText(order.status)}
              </StatusBadge>
            </GridItem>

            <GridItem>{order?.client?.name}</GridItem>
            <GridItem>{order?.client?.phone}</GridItem>

            <GridItemAddress>
              <span style={{ flexShrink: 0, marginRight: 4 }}>
                {order.shipment.delivery === 'post' ? (
                  <NpLogo width={20} height={20} />
                ) : (
                  <IoStorefrontSharp size={20} color="#101340" />
                )}
              </span>
              {order.shipment.deliveryCity && `${order.shipment.deliveryCity}`}
              {order.shipment.postOffice && ` №${order.shipment.postOffice}`}
            </GridItemAddress>
            <GridItem>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <span style={{ flexShrink: 0, marginRight: 4 }}>
                  {' '}
                  {order.shipment.payment === 'prepayment' ? (
                    <MdPayment size={20} color="blue" />
                  ) : (
                    <FaMoneyBillWave size={20} color="green" />
                  )}
                </span>
                {order.totalAmountWithDiscount || '###'} грн
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
