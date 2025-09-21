import { MdStar } from 'react-icons/md';
import {
  ShipmentCard,
  CardRow,
  CardLabel,
  CardValue,
  DefaultBtn,
} from './UserShipmentCompactCard.styled';
import { makeTextPaymentMethod, makeDeliveryPayMethod } from '@/utils';
import { serverApi } from '@/redux/auth/authOperations';
import { Dispatch, SetStateAction } from 'react';

interface ShipmentCompactCardProps {
  setOpenShipmentsModal: Dispatch<SetStateAction<boolean>>;
  shipment: IShipment;
  setShipment: Dispatch<SetStateAction<IShipment | null>>;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
  isDefault?: boolean;
  orderId: string;
}

export const UserShipmentCompactCard: React.FC<ShipmentCompactCardProps> = ({
  setOpenShipmentsModal,
  shipment,
  setShipment,
  isDefault = false,
  orderId,
  setOrder,
}) => {
  const handleChooseShipment = async (id: string) => {
    const { data } = await serverApi.patch(
      `/orders/choose-shipment/${orderId}`,
      {
        shipmentId: id,
      }
    );

    const newOrder = data.order;

    setShipment(newOrder.shipment);
    setOrder(prev => (prev ? { ...prev, updatedBy: data.updatedBy } : prev));
    setOpenShipmentsModal(false);
  };

  return (
    <ShipmentCard>
      <div>
        <CardRow>
          <CardLabel>Тип</CardLabel>
          <CardValue>
            {shipment.delivery === 'post' ? 'Новая Почта' : 'Самовывоз'}
          </CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>Оплата</CardLabel>
          <CardValue>{makeTextPaymentMethod(shipment.payment)}</CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>Имя получателя</CardLabel>
          <CardValue>{shipment.name ?? '—'}</CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>Телефон</CardLabel>
          <CardValue>{shipment.phone ?? '—'}</CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>Компания</CardLabel>
          <CardValue>{shipment.company ?? '—'}</CardValue>
        </CardRow>
        {shipment.delivery === 'post' && (
          <>
            <CardRow>
              <CardLabel>Город</CardLabel>
              <CardValue>{shipment.deliveryCity ?? '—'}</CardValue>
            </CardRow>

            <CardRow>
              <CardLabel>Отделение</CardLabel>
              <CardValue>{shipment.postOffice ?? '—'}</CardValue>
            </CardRow>

            <CardRow>
              <CardLabel>Оплата доставки</CardLabel>
              <CardValue>
                {makeDeliveryPayMethod(shipment.deliveryPayment)}
              </CardValue>
            </CardRow>
          </>
        )}
      </div>

      <DefaultBtn
        active={isDefault}
        onClick={() => handleChooseShipment(shipment._id)}
      >
        <MdStar size={16} /> {isDefault ? 'Выбрано' : 'Применть к заказу'}
      </DefaultBtn>
    </ShipmentCard>
  );
};
