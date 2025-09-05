import React, { useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { toast } from 'react-toastify';

import { DeliveryNotePDF, ModalDialog } from '@/components/ui';
import { InvoicePDF } from '@/components/ui';

import { MdModeEdit } from 'react-icons/md';

import { serverApi } from '@/redux/auth/authOperations';
import { formatDateToUkrainian, makeTextPaymentMethod } from '@/utils';

import { FaRegFilePdf } from 'react-icons/fa6';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { MdDeleteForever } from 'react-icons/md';
import { IoMdArrowBack } from 'react-icons/io';

import staticData from '@/data/common.json';

import {
  Controls,
  DocBox,
  DocBtnInv,
  DocBtn,
  TextAreaStyled,
  // SaveBtn,
  StatusSelect,
  ChooseBtn,
  ProductList,
  ProductCard,
  OrderOverviewSection,
  PageWrap,
  ProductSection,
  NumberBox,
  OrderNumber,
  SummarySection,
  SummaryInfoBox,
  SummaryInfoItem,
  DataBox,
  DataItem,
  DataItemTitle,
  DataItemValue,
  DataLabel,
  ShipmentBox,
  OrderClientBox,
  InfoBox,
  MsgBox,
  Msg,
  ProductImageThumb,
  ProductImage,
  ProductNumber,
  ProductDescription,
  ProductArticle,
  ProductInStock,
  ProductsHeader,
  ProductsHeaderItem,
  ProductTotal,
  ProductInStockItem,
  ProductWrap,
  ProductCardDelBtn,
  ProductSupplierPrice,
  ProductPricePromo,
  ProductPrice,
  NumberWrap,
  NumberInner,
  SummaryBottom,
  SummaryBox,
  SummaryWrap,
  BackBtn,
  ProductComment,
} from './OrderDetail.styled';
import { Link, useLocation } from 'react-router-dom';

const { statusOptions } = staticData.order;

export const OrderDetail = ({
  order,
  setOrder,
}: {
  order: OrderItem;
  setOrder: React.Dispatch<React.SetStateAction<OrderItem | null>>;
}) => {
  const client = order?.client || null;

  const [openMsg, setOpenMsg] = useState<boolean>(false);

  const [comment, setComment] = useState(order?.comment || '');
  const [status, setStatus] = useState<OrderItem['status']>(
    order?.status || 'new'
  );
  const [isDirty, setIsDirty] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (order) {
      setComment(order.comment || '');
      setStatus(order.status);
      setIsDirty(false);
    }
  }, [order]);

  ////////////////ORDER-SHIPMENT//////////////////////
  const clientId = order.client._id;
  const clientShipment = order.shipment;

  const location = useLocation();

  const [currentShipment, setCurrentShipment] =
    useState<IShipment>(clientShipment);
  const [shipmentList, setShipmentList] = useState<IShipment[]>();

  const {
    // _id,
    // client,
    // name,
    // phone,
    delivery,
    deliveryCity,
    postOffice,
    payment,
    // createdAt,
    // updatedAt,
  } = currentShipment;

  console.log('delivery', delivery);

  useEffect(() => {
    const fetchShipments = async () => {
      const { data } = await serverApi.get(`/clients/shipments/${clientId}`);

      setShipmentList(data.shipments);
    };

    fetchShipments();
  }, [clientId]);

  const [open, setOpen] = useState(false);

  const handleChoose = (shipmentItem: IShipment) => {
    setCurrentShipment(shipmentItem);
    setOpen(false);
  };
  ////////////////ORDER-SHIPMENT//////////////////////

  if (!order) return null;

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as OrderItem['status'];
    setStatus(newStatus);

    try {
      await serverApi.patch(`/orders/${order._id}`, { status: newStatus });
      // обновляем локально
      setOrder(prev => (prev ? { ...prev, status: newStatus } : prev));
      toast.success('Статус обновлён');
    } catch (err) {
      console.error('Ошибка обновления статуса', err);
      toast.error('Не удалось обновить статус');
      setStatus(order.status); // откат
    }
  };

  const saveComment = async () => {
    if (!isDirty) return;
    try {
      // setIsSaving(true);
      await serverApi.patch(`/orders/${order._id}`, { comment });
      setOrder(prev => (prev ? { ...prev, comment } : prev));
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

  const handleOpenDeliveryNotePdf = async () => {
    try {
      const blob = await pdf(<DeliveryNotePDF order={order} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (err) {
      console.error('PDF генерирование (накладная):', err);
      toast.error('Ошибка генерации накладной');
    }
  };

  const handleOpenInvoicePdf = async () => {
    try {
      const blob = await pdf(<InvoicePDF order={order} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (err) {
      console.error('PDF генерирование (счет):', err);
      toast.error('Ошибка генерации счёта');
    }
  };

  const productsCount = order.products?.length || 0;
  // const total = order.totalAmountWithDiscount ?? order.totalAmount ?? 0;

  const productsHeaderItems = [
    '№',
    'Фото',
    'Описание',
    'Артикул',
    'Наличие',
    'Цена вход.',
    'Кол-во',
    'цена',
    'Скд. %',
    'Скд. ₴',
    'Цена с уч. акц. скид.',
    'Сумма',
    'Комментарий',
    'Удал.',
  ];

  return (
    <PageWrap>
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
              <StatusSelect
                value={status}
                status={status as string}
                onChange={handleStatusChange}
                aria-label="Статус заказа"
              >
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </StatusSelect>
            </NumberBox>
          </NumberWrap>

          <DataBox>
            <DataLabel>Клиент</DataLabel>
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
                <DataItemTitle>Оборот</DataItemTitle>
                <DataItemValue>0грн</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Компания:</DataItemTitle>
                <DataItemValue>ТОВ "ПОКАЗАТЬ ЕСЛИ ЭТО ЮР.ЛИЦО"</DataItemValue>
              </DataItem>
            </ul>
          </DataBox>
        </OrderClientBox>

        <ShipmentBox>
          <DataBox>
            <DataLabel>Доставка:</DataLabel>

            <ChooseBtn onClick={() => setOpen(true)}>
              <MdModeEdit size={16} />
              Изменить
            </ChooseBtn>

            <ul>
              <DataItem>
                <DataItemTitle>Получатель:</DataItemTitle>
                <DataItemValue>{client?.name ?? '—'}</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Телефон:</DataItemTitle>
                <DataItemValue>{client?.phone ?? '—'}</DataItemValue>
              </DataItem>
              <DataItem>
                <DataItemTitle>Тип доставки:</DataItemTitle>
                <DataItemValue>
                  {delivery === 'post' ? 'Новая Почта' : 'Самовывоз'}
                </DataItemValue>
              </DataItem>

              {delivery === 'post' && (
                <>
                  <DataItem>
                    <DataItemTitle>Город:</DataItemTitle>
                    <DataItemValue>{deliveryCity || '—'}</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemTitle>Отделение:</DataItemTitle>
                    <DataItemValue>{postOffice || '—'}</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemTitle>Оплата:</DataItemTitle>
                    <DataItemValue>
                      {makeTextPaymentMethod(payment)}
                    </DataItemValue>
                  </DataItem>
                </>
              )}
            </ul>
          </DataBox>
          <DataBox>
            <DataLabel>Отправка</DataLabel>

            <ul>
              {delivery === 'post' && (
                <>
                  <DataItem>
                    <DataItemTitle>Номер ТТН:</DataItemTitle>
                    <DataItemValue>590014476***95</DataItemValue>
                  </DataItem>

                  <DataItem>
                    <DataItemTitle>Оплата:</DataItemTitle>
                    <DataItemValue>Оплачено?</DataItemValue>
                  </DataItem>
                </>
              )}
            </ul>
          </DataBox>
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
              value={comment}
              onChange={e => {
                setComment(e.target.value);
                setIsDirty(true);
              }}
              onBlur={handleBlur}
              aria-label="Комментарий"
            />
            {/* {isDirty && (
                <SaveBtn
                  type="button"
                  onClick={saveComment}
                  disabled={isSaving}
                >
                  {isSaving ? 'Сохраняется...' : 'Сохранить'}
                </SaveBtn>
              )} */}
          </DataBox>
        </InfoBox>

        <InfoBox>
          <DataBox>
            <DataLabel>Реквизиты для оплаты</DataLabel>
            <div>
              <p>
                {`Одержувач ФОП Новіченко Юрій Євгенійович
                  IBAN UA823220010000026004340017527
                  ЄДРПОУ 3127114190
                  МФО 322001 
                  Найменування банку АТ «УНІВЕРСАЛ БАНК» 
                  Призначення платежу: Оплата за товар замовлення №${order.number}
                  Сума до сплати: ${order.totalAmountWithDiscount}грн`}
              </p>
            </div>
          </DataBox>
        </InfoBox>
      </OrderOverviewSection>

      <ProductSection>
        <ProductWrap>
          <ProductsHeader>
            {productsHeaderItems &&
              productsHeaderItems.map((el, idx) => (
                <ProductsHeaderItem key={idx + el}>{el}</ProductsHeaderItem>
              ))}
          </ProductsHeader>
          <ProductList>
            {order.products.map((product: OrderProduct, idx: number) => (
              <ProductCard key={product._id}>
                <ProductNumber>{idx + 1}</ProductNumber>

                <ProductImageThumb>
                  <ProductImage
                    src={product.img || '/images/no-photo.png'}
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                </ProductImageThumb>

                <ProductDescription>
                  {product.name.slice(0, 150)}
                </ProductDescription>

                <ProductArticle style={{ margin: 0 }}>
                  {product.article}
                </ProductArticle>

                <ProductInStock>
                  <ProductInStockItem qty={product.availability}>
                    Киев {product.availability}
                  </ProductInStockItem>
                  <ProductInStockItem qty={product.availability}>
                    Львов {product.availability}
                  </ProductInStockItem>
                </ProductInStock>

                <ProductSupplierPrice>
                  111
                  {/* supplier prise */}
                </ProductSupplierPrice>

                <p>{product.quantity}</p>

                <ProductPrice hasPromo={product.price_promo}>
                  {product.price}
                </ProductPrice>

                <p>
                  {product.price_promo
                    ? Math.round(
                        ((product.price - product.price_promo) /
                          product.price) *
                          100
                      )
                    : 0}
                  %
                </p>
                <p>
                  {product.price_promo
                    ? product.price - product.price_promo
                    : 0}
                </p>

                <ProductPricePromo hasPromo={product.price_promo}>
                  {product.price_promo ? product.price_promo : product.price}
                </ProductPricePromo>

                <ProductTotal>
                  {product.price_promo
                    ? product.price_promo * product.quantity
                    : product.price * product.quantity}
                </ProductTotal>

                <ProductComment
                  value={comment}
                  onChange={e => {
                    setComment(e.target.value);
                    setIsDirty(true);
                  }}
                  onBlur={handleBlur}
                  aria-label="Комментарий"
                />

                <ProductCardDelBtn type="button">
                  <MdDeleteForever size={20} />
                </ProductCardDelBtn>
              </ProductCard>
            ))}
          </ProductList>
        </ProductWrap>
      </ProductSection>

      <SummarySection>
        <SummaryWrap>
          <SummaryBox>
            <p>Товаров: {productsCount}</p>

            <p>Сумма: {order.totalAmount} грн</p>
            <p>Скидка: {order.totalDiscount} грн</p>
            <p>Сумма со скидкой: {order.totalAmountWithDiscount} грн</p>
          </SummaryBox>

          <p>Итого к оплате: {order.totalAmountWithDiscount} грн</p>
        </SummaryWrap>

        <SummaryBottom>
          <SummaryInfoBox>
            <ul>
              <SummaryInfoItem>
                <p>Создано: {formatDateToUkrainian(order.createdAt)}</p>
              </SummaryInfoItem>
              <SummaryInfoItem>
                <p>Изменено: {formatDateToUkrainian(order.updatedAt)}</p>
              </SummaryInfoItem>
            </ul>
            <ul>
              <SummaryInfoItem>
                <p>Кем создано: 💻</p>
              </SummaryInfoItem>
              <SummaryInfoItem>
                <p>Кем изменено: 👀</p>
              </SummaryInfoItem>
            </ul>
          </SummaryInfoBox>
          <Controls>
            <DocBox>
              <DocBtnInv
                type="button"
                onClick={handleOpenInvoicePdf}
                aria-label="Открыть счет"
              >
                <LiaFileInvoiceSolid />
                Счет
              </DocBtnInv>

              <DocBtn
                type="button"
                onClick={handleOpenDeliveryNotePdf}
                aria-label="Открыть накладную"
              >
                <FaRegFilePdf />
                Расходная
              </DocBtn>
            </DocBox>
          </Controls>
        </SummaryBottom>
      </SummarySection>

      <ModalDialog
        open={open}
        title="Варианты доставок"
        onClose={() => setOpen(false)}
        cancelText="Закрыть"
      >
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {shipmentList &&
            shipmentList.map(shipmentItem => {
              const {
                _id,
                name,
                phone,
                delivery,
                deliveryCity,
                postOffice,
                payment,
              } = shipmentItem;
              return (
                <li key={_id}>
                  <span>{name}</span>
                  <span>{phone}</span>
                  <span>{delivery}</span>
                  <span>{deliveryCity}</span>
                  <span>{postOffice}</span>
                  <span>{payment}</span>
                  <button
                    type="button"
                    onClick={() => {
                      handleChoose(shipmentItem);
                    }}
                  >
                    Выбрать
                  </button>
                </li>
              );
            })}
        </ul>

        <Link
          to="/dashboard/user-shipments"
          state={{ id: clientId, from: location.pathname }}
        >
          Изменить варианты доставки
        </Link>
      </ModalDialog>

      <ModalDialog
        open={openMsg}
        title="Сообщение от клиента"
        onClose={() => setOpenMsg(false)}
        cancelText="Закрыть"
      >
        <p>{order.message || ''}</p>
      </ModalDialog>
    </PageWrap>
  );
};

export default OrderDetail;
