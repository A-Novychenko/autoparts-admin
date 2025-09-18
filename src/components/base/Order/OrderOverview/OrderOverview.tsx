import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CopyBtn, ModalDialog } from '@/components/ui';
import {
  OrderStatus,
  OrderDeclarationNumber,
  UserShipmentCompactCard,
  OrderPaymentStatus,
} from '@components/base';

import { serverApi } from '@/redux/auth/authOperations';
import {
  formatDateToUkrainian,
  makeDeliveryPayMethod,
  makeTextPaymentMethod,
} from '@/utils';

import { IoMdArrowBack } from 'react-icons/io';
import { MdModeEdit } from 'react-icons/md';

import {
  TextAreaStyled,
  ChooseBtn,
  OrderOverviewSection,
  NumberBox,
  OrderNumber,
  DataItemValue,
  DataLabel,
  ShipmentBox,
  OrderClientBox,
  InfoBox,
  MsgBox,
  Msg,
  NumberWrap,
  NumberInner,
  BackBtn,
  DeliveryBtn,
  ShipmentsList,
  DataBox,
  DataItem,
  DataItemTitle,
} from './OrderOverview.styled';

export const OrderOverview: React.FC<{
  order: OrderData;
  client: IClient;
  shipment: IShipment;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
  setShipment: Dispatch<SetStateAction<IShipment | null>>;
}> = ({ order, client, shipment, setOrder, setShipment }) => {
  const clientId = client._id;

  const location = useLocation();

  const [isDirty, setIsDirty] = useState(false);
  const [shipmentList, setShipmentList] = useState<IShipment[]>([]);
  const [openMsg, setOpenMsg] = useState<boolean>(false);
  const [openShipmentsModal, setOpenShipmentsModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchShipments = async () => {
      const { data } = await serverApi.get(`/clients/shipment/${clientId}`);

      setShipmentList(data.shipments);
    };
    fetchShipments();
  }, [clientId]);

  const saveComment = async () => {
    if (!isDirty) return;
    try {
      // setIsSaving(true);
      await serverApi.patch(`/orders/${order._id}`, { comment: order.comment });
      setOrder(prev => (prev ? { ...prev, comment: order.comment } : prev));
      setIsDirty(false);
      toast.success('Комментарий сохранён');
    } catch (err) {
      console.error('Ошибка сохранения комментария', err);
      toast.error('Не удалось сохранить комментарий');
    } finally {
      // setIsSaving(false);
    }
  };

  const handleBlur = () => {
    saveComment();
  };

  return (
    <>
      <OrderOverviewSection>
        <OrderClientBox>
          <NumberWrap>
            <NumberInner>
              <BackBtn
                to={'/dashboard/orders/order-list'}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <IoMdArrowBack size={16} color="#101340" /> назад к заказам
              </BackBtn>
              <p>{formatDateToUkrainian(order.createdAt)}</p>
            </NumberInner>
            <NumberBox>
              <OrderNumber>№{order.number}</OrderNumber>

              <OrderStatus order={order} setOrder={setOrder} />
            </NumberBox>
          </NumberWrap>

          <DataBox>
            <DataLabel>Клиент</DataLabel>
            <ul>
              <DataItem>
                <DataItemTitle>Код клиента:</DataItemTitle>
                <DataItemValue>{client.clientCode ?? '—'}</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Имя:</DataItemTitle>
                <DataItemValue>{client?.name ?? '—'}</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Телефон:</DataItemTitle>
                <DataItemValue>{client.phone ?? '—'}</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Email:</DataItemTitle>
                <DataItemValue>{client.email ?? '—'}</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Оборот: </DataItemTitle>
                <DataItemValue>{client.totalSpent}грн</DataItemValue>
              </DataItem>
              {client.company && (
                <DataItem>
                  <DataItemTitle>Компания:</DataItemTitle>
                  <DataItemValue>{client?.company}</DataItemValue>
                </DataItem>
              )}
            </ul>
          </DataBox>

          <DataBox>
            <DataLabel>Оплата</DataLabel>

            <DataItem>
              <DataItemValue>
                <OrderPaymentStatus order={order} setOrder={setOrder} />
              </DataItemValue>
            </DataItem>
          </DataBox>
        </OrderClientBox>

        <ShipmentBox>
          <DataBox>
            <DataLabel>Доставка:</DataLabel>

            <ChooseBtn
              onClick={() => {
                setOpenShipmentsModal(true);
              }}
            >
              <MdModeEdit size={16} />
              Изменить
            </ChooseBtn>

            <ul>
              <DataItem>
                <DataItemTitle>Тип оплаты заказа:</DataItemTitle>
                <DataItemValue>
                  {makeTextPaymentMethod(shipment.payment)}
                </DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Получатель:</DataItemTitle>
                <DataItemValue>{shipment?.name ?? '—'}</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Телефон:</DataItemTitle>
                <DataItemValue>{shipment?.phone ?? '—'}</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Тип доставки:</DataItemTitle>
                <DataItemValue>
                  {shipment.delivery === 'post' ? 'Новая Почта' : 'Самовывоз'}
                </DataItemValue>
              </DataItem>
              {shipment.company && (
                <DataItem>
                  <DataItemTitle>Компания:</DataItemTitle>
                  <DataItemValue>{shipment.company}</DataItemValue>
                </DataItem>
              )}

              {shipment.delivery === 'post' && (
                <>
                  <DataItem>
                    <DataItemTitle>Город:</DataItemTitle>
                    <DataItemValue>
                      {shipment.deliveryCity || '—'} №
                      {shipment.postOffice || '—'}
                    </DataItemValue>
                  </DataItem>

                  <DataItem>
                    <DataItemTitle>Оплата доставки:</DataItemTitle>
                    <DataItemValue>
                      {makeDeliveryPayMethod(shipment.deliveryPayment)}
                    </DataItemValue>
                  </DataItem>
                </>
              )}
            </ul>
          </DataBox>

          <OrderDeclarationNumber
            order={order}
            shipment={shipment}
            setOrder={setOrder}
          />
        </ShipmentBox>

        <InfoBox>
          <DataBox>
            <DataLabel>Сообщение клиента</DataLabel>

            <MsgBox>
              <Msg
                onClick={() => {
                  setOpenMsg(true);
                }}
              >
                {order.message || ''}
              </Msg>
            </MsgBox>
          </DataBox>

          <DataBox>
            <DataLabel>Комментарий к заказу</DataLabel>

            <TextAreaStyled
              value={order.comment}
              onChange={e => {
                // setComment(e.target.value);
                setOrder(prev =>
                  prev
                    ? {
                        ...prev,
                        comment: e.target.value,
                      }
                    : prev
                );
                setIsDirty(true);
              }}
              onBlur={handleBlur}
              aria-label="Комментарий"
            />
          </DataBox>
        </InfoBox>

        <InfoBox>
          <DataBox style={{ width: 340 }}>
            <DataLabel>Реквизиты для оплаты</DataLabel>
            <div>
              <CopyBtn
                label="Скопировать все реквизиты"
                text={`                  Одержувач ФОП Новіченко Юрій Євгенійович 
                    IBAN UA823220010000026004340017527
                    ЄДРПОУ 3127114190
                    МФО 322001
                    Найменування банку АТ «УНІВЕРСАЛ БАНК»
                    Призначення платежу:
                    Оплата за товар замовлення №${order.number} 
                    Сума до сплати: ${order.totalAmountWithDiscount}грн`}
              />

              <ul>
                <li>
                  <p>{`Одержувач ФОП Новіченко Юрій Євгенійович`}</p>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <p>{`IBAN UA823220010000026004340017527`}</p>
                  <CopyBtn text="UA823220010000026004340017527" />
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <p>{`ЄДРПОУ 3127114190`}</p>
                  <CopyBtn text="3127114190" />
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <p>{'МФО 322001'}</p>
                  <CopyBtn text="322001" />
                </li>

                <li>
                  <p>
                    Найменування банку АТ «УНІВЕРСАЛ БАНК» Призначення платежу:
                    Оплата за товар замовлення{' '}
                    <span style={{ fontWeight: 700 }}>№{order.number}</span>
                  </p>
                </li>
                <li>
                  <p>
                    Сума до сплати:{' '}
                    <span style={{ fontWeight: 700 }}>
                      {order.totalAmountWithDiscount}грн
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </DataBox>
        </InfoBox>
      </OrderOverviewSection>

      <ModalDialog
        open={openShipmentsModal}
        title="Список доставок"
        onClose={() => setOpenShipmentsModal(false)}
        cancelText="Закрыть"
        maxWidth="lg"
      >
        <DeliveryBtn
          to="/dashboard/user-shipments"
          state={{ id: clientId, from: location.pathname }}
        >
          <MdModeEdit size={16} />
          Перейти к редактору доставок
        </DeliveryBtn>

        <ShipmentsList>
          {shipmentList?.map(shipmentItem => (
            <UserShipmentCompactCard
              key={shipmentItem._id}
              shipment={shipmentItem}
              setShipment={setShipment}
              isDefault={shipment._id === shipmentItem._id}
              orderId={order._id}
            />
          ))}
        </ShipmentsList>
      </ModalDialog>

      <ModalDialog
        open={openMsg}
        title="Сообщение от клиента"
        onClose={() => setOpenMsg(false)}
        cancelText="Закрыть"
      >
        <p>{order.message || ''}</p>
      </ModalDialog>
    </>
  );
};
