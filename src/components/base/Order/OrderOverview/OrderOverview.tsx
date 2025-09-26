import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CopyBtn, ModalDialog } from '@/components/ui';
import {
  OrderStatus,
  OrderDeclarationNumber,
  UserShipmentCompactCard,
  OrderPaymentStatus,
  ClientSelector,
} from '@components/base';

import { serverApi } from '@/redux/auth/authOperations';
import {
  formatDateToUkrainian,
  makeDeliveryMethod,
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
  DataItemValueCompany,
} from './OrderOverview.styled';

export const OrderOverview: React.FC<{
  order: OrderData;
  client: IClient | null;
  shipment: IShipment | null;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
  setShipment: Dispatch<SetStateAction<IShipment | null>>;
  setClient: Dispatch<SetStateAction<IClient | null>>;
}> = ({ order, client, shipment, setOrder, setShipment, setClient }) => {
  const clientId = client?._id ? client._id : null;

  const location = useLocation();

  const [isDirty, setIsDirty] = useState(false);
  const [shipmentList, setShipmentList] = useState<IShipment[]>([]);
  const [openMsg, setOpenMsg] = useState<boolean>(false);
  const [openShipmentsModal, setOpenShipmentsModal] = useState<boolean>(false);
  const [openClientsModal, setOpenClientsModal] = useState<boolean>(false);

  useEffect(() => {
    if (!clientId) return;

    const fetchShipments = async () => {
      const { data } = await serverApi.get(`/clients/shipment/${clientId}`);

      setShipmentList(data.shipments);
    };
    fetchShipments();
  }, [clientId]);

  const saveComment = async () => {
    if (!isDirty) return;

    try {
      const { data } = await serverApi.patch(`/orders/${order._id}`, {
        comment: order.comment,
      });
      setOrder(prev =>
        prev
          ? { ...prev, comment: order.comment, updatedBy: data.updatedBy }
          : prev
      );
      setIsDirty(false);
      toast.success('Комментарий сохранён');
    } catch (err) {
      console.error('Ошибка сохранения комментария', err);
      toast.error('Не удалось сохранить комментарий');
    }
  };

  const handleBlur = () => {
    saveComment();
  };

  return (
    <>
      <OrderOverviewSection isAccounted={order.isAccounted}>
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

              <OrderStatus order={order} setOrder={setOrder} client={client} />
            </NumberBox>
          </NumberWrap>

          <DataBox>
            <DataLabel>Клиент</DataLabel>
            <ChooseBtn
              disabled={order.isAccounted}
              onClick={() => {
                setOpenClientsModal(true);
              }}
            >
              <MdModeEdit size={16} />
              Выбрать клиента
            </ChooseBtn>
            {client ? (
              <ul>
                <DataItem>
                  <DataItemTitle>Код клиента:</DataItemTitle>
                  <DataItemValue>{client?.clientCode ?? '—'}</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemTitle>Имя:</DataItemTitle>
                  <DataItemValue>{client?.name ?? '—'}</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemTitle>Телефон:</DataItemTitle>
                  <DataItemValue>{client?.phone ?? '—'}</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemTitle>Email:</DataItemTitle>
                  <DataItemValue>{client?.email ?? '—'}</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemTitle>Оборот: </DataItemTitle>
                  <DataItemValue>{client?.totalSpent}грн</DataItemValue>
                </DataItem>
                {client?.company && (
                  <DataItem>
                    <DataItemTitle>Компания:</DataItemTitle>
                    <DataItemValue>{client?.company}</DataItemValue>
                  </DataItem>
                )}
              </ul>
            ) : null}
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

            {client && (
              <ChooseBtn
                disabled={order.isAccounted}
                onClick={() => {
                  setOpenShipmentsModal(true);
                }}
              >
                <MdModeEdit size={16} />
                Изменить
              </ChooseBtn>
            )}

            <ul>
              <DataItem>
                <DataItemTitle>Тип оплаты заказа:</DataItemTitle>
                <DataItemValue>
                  {makeTextPaymentMethod(shipment?.payment)}
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
                  {makeDeliveryMethod(shipment?.delivery)}
                </DataItemValue>
              </DataItem>
              {shipment?.company && (
                <DataItem>
                  <DataItemTitle>Компания:</DataItemTitle>
                  <DataItemValueCompany>
                    {shipment.company}
                  </DataItemValueCompany>
                </DataItem>
              )}

              {shipment?.delivery === 'post' && (
                <>
                  <DataItem>
                    <DataItemTitle>Город:</DataItemTitle>
                    <DataItemValue>
                      {shipment?.deliveryCity || '—'} №
                      {shipment?.postOffice || '—'}
                    </DataItemValue>
                  </DataItem>

                  <DataItem>
                    <DataItemTitle>Оплата доставки:</DataItemTitle>
                    <DataItemValue>
                      {makeDeliveryPayMethod(shipment?.deliveryPayment)}
                    </DataItemValue>
                  </DataItem>
                </>
              )}
            </ul>
          </DataBox>

          {shipment && (
            <OrderDeclarationNumber
              order={order}
              shipment={shipment}
              setOrder={setOrder}
            />
          )}
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
              disabled={order.isAccounted}
              onChange={e => {
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
                </li>

                <li>
                  <p>Найменування банку АТ «УНІВЕРСАЛ БАНК»</p>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <p>
                    Призначення платежу: Оплата за товар замовлення
                    <span style={{ fontWeight: 700 }}> №{order.number}</span>
                  </p>
                  <CopyBtn
                    text={`Оплата за товар замовлення №${order.number}`}
                  />
                </li>
                <li>
                  <p>
                    Сума до сплати:{' '}
                    <span style={{ fontWeight: 700 }}>
                      {order.totalAmountWithDiscount.toFixed(2)}грн
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
              key={shipmentItem?._id}
              setOpenShipmentsModal={setOpenShipmentsModal}
              shipment={shipmentItem}
              setShipment={setShipment}
              setOrder={setOrder}
              isDefault={shipment?._id === shipmentItem?._id}
              orderId={order._id}
            />
          ))}
        </ShipmentsList>
      </ModalDialog>

      <ModalDialog
        open={openClientsModal}
        title="Список клиентов"
        onClose={() => setOpenClientsModal(false)}
        cancelText="Закрыть"
        maxWidth="lg"
      >
        <ClientSelector
          orderId={order._id}
          setClient={setClient}
          setOrder={setOrder}
          onSelect={() => {
            setOpenClientsModal(false);
          }}
        />
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
