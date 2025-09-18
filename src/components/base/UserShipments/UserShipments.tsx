import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  UserShipmentsClientCard,
  UserShipmentsCreateForm,
  UserShipmentsDeliveryCard,
} from '@components/base';
import { UserShipmentsCreateFormWrap } from '../UserShipmentsCreateForm/UserShipmentsCreateFormWrap';

import {
  Page,
  Header,
  BackButton,
  TopRow,
  ShipmentList,
  EmptyState,
  Spinner,
  Title,
  HeaderWrap,
} from './UserShipments.styled';

export const UserShipments: React.FC<{
  id?: string;
  from?: string;
  client: IClient | null;
  shipmentList: IShipment[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setShipmentList: Dispatch<SetStateAction<IShipment[]>>;
}> = ({
  id,
  from,
  client,
  shipmentList,
  loading,
  setLoading,
  setShipmentList,
}) => {
  const navigate = useNavigate();

  return (
    <Page>
      <HeaderWrap>
        <Header>
          <TopRow>
            <BackButton onClick={() => navigate(from || '/dashboard')}>
              ← Вернуться к заказу
            </BackButton>
          </TopRow>

          <Title>Способы доставки клиента </Title>

          {client ? <UserShipmentsClientCard client={client} /> : null}
        </Header>
        <UserShipmentsCreateFormWrap>
          <UserShipmentsCreateForm
            client={client}
            id={id}
            loading={loading}
            setLoading={setLoading}
            setShipmentList={setShipmentList}
          />
        </UserShipmentsCreateFormWrap>
      </HeaderWrap>

      {loading ? (
        <Spinner>Загрузка...</Spinner>
      ) : shipmentList.length === 0 ? (
        <EmptyState>У клиента нет вариантов доставки</EmptyState>
      ) : (
        <ShipmentList>
          {shipmentList.map(shipment => {
            return (
              <UserShipmentsDeliveryCard
                shipment={shipment}
                setShipmentList={setShipmentList}
                key={shipment._id}
              />
            );
          })}
        </ShipmentList>
      )}
    </Page>
  );
};
