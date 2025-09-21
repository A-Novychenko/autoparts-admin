import { IoStorefrontSharp } from 'react-icons/io5';
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';

import NpLogo from '@assets/np-logo.svg?react';
import NpLogoBlack from '@assets/np-logo-black.svg?react';

import {
  Card,
  Container,
  GridItem,
  GridItemAddress,
  Header,
  List,
  OrderNumber,
  OrdersEmptyLabel,
  StatusBadge,
} from './OrderList.styled';
import { OrderListProps } from './types';
import { makeBadgeColor, makeBadgeText } from '@/utils';
import { OrderCreate } from '../OrderCreate';

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

      {orders.length > 0 ? (
        <List>
          {orders.map(order => (
            <Card
              key={order.number}
              to={`/dashboard/orders/order/${order._id}`}
              isAccounted={order.isAccounted}
            >
              <GridItem>
                <OrderNumber> №{order.number}</OrderNumber>
              </GridItem>
              <GridItem>
                <StatusBadge
                  style={{
                    background: makeBadgeColor(
                      order.isAccounted ? 'accounted' : order.status
                    ),
                  }}
                >
                  {order.isAccounted ? 'Учтён' : makeBadgeText(order.status)}
                </StatusBadge>
              </GridItem>

              <GridItem>{order?.client?.name}</GridItem>
              <GridItem>{order?.client?.phone}</GridItem>

              <GridItemAddress>
                {order.shipment && (
                  <>
                    {order.isAccounted && (
                      <span style={{ flexShrink: 0, marginRight: 4 }}>
                        {order.shipment?.delivery === 'post' ? (
                          <NpLogoBlack width={20} height={20} />
                        ) : (
                          <IoStorefrontSharp size={20} color="#767676" />
                        )}
                      </span>
                    )}

                    {!order.isAccounted && (
                      <span style={{ flexShrink: 0, marginRight: 4 }}>
                        {order.shipment?.delivery === 'post' ? (
                          <NpLogo width={20} height={20} />
                        ) : (
                          <IoStorefrontSharp size={20} color="#101340" />
                        )}
                      </span>
                    )}

                    {order.shipment?.delivery === 'post'
                      ? order.shipment?.deliveryCity &&
                        `${order.shipment?.deliveryCity}`
                      : 'Самовывоз'}
                    {order.shipment?.delivery === 'post'
                      ? order.shipment?.postOffice &&
                        ` №${order.shipment?.postOffice}`
                      : null}
                  </>
                )}
              </GridItemAddress>

              <GridItem>
                {order.shipment && (
                  <>
                    <div
                      style={{ display: 'flex', justifyContent: 'flex-start' }}
                    >
                      <span style={{ flexShrink: 0, marginRight: 4 }}>
                        {' '}
                        {order.shipment?.payment === 'prepayment' ? (
                          <MdPayment
                            size={20}
                            color={order.isAccounted ? 'grey' : 'blue'}
                          />
                        ) : (
                          <FaMoneyBillWave
                            size={20}
                            color={order.isAccounted ? 'grey' : 'green'}
                          />
                        )}
                      </span>
                      {order.totalAmountWithDiscount || '###'} грн
                    </div>
                  </>
                )}
              </GridItem>
              <GridItem>{order.message || '-'}</GridItem>

              <GridItem>
                {new Date(order.createdAt).toLocaleString('uk-UA')}
              </GridItem>
            </Card>
          ))}

          <OrderCreate />
        </List>
      ) : (
        <OrdersEmptyLabel>Заказов нет</OrdersEmptyLabel>
      )}
    </Container>
  );
};
