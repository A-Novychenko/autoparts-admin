import {
  Card,
  Container,
  GridItem,
  Header,
  List,
  OpenBtn,
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

  return (
    <Container>
      <Header>
        <div>№ / Статус</div>
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
          <Card key={order.number}>
            <GridItem>
              №{order.number}
              <StatusBadge style={{ background: badgeColor(order.status) }}>
                {order.status}
              </StatusBadge>
            </GridItem>

            <GridItem>{order.name}</GridItem>
            <GridItem>{order.phone}</GridItem>
            <GridItem>{order.email}</GridItem>
            <GridItem>
              {order.delivery}
              {order.deliveryCity && `, ${order.deliveryCity}`}
              {order.postOffice && `, №${order.postOffice}`}
            </GridItem>
            <GridItem>{order.payment}</GridItem>
            <GridItem>{order.message || '-'}</GridItem>
            <GridItem>
              {new Date(order.createdAt).toLocaleString('uk-UA')}
              <div style={{ marginTop: 4 }}>
                <OpenBtn to={`/dashboard/orders/order/${order._id}`}>
                  Открыть заказ
                </OpenBtn>
              </div>
            </GridItem>
          </Card>
        ))}
      </List>
    </Container>
  );
};
